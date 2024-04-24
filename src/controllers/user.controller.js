import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { User } from "../models/users.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponses } from "../utils/ApiResponses.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userID) => {
  try {
    const user = await User.findById(userID);
    // console.log("generateAccessAndRefreshToken: " + user);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false }); //user.save()--> yhn pe password field ya dusra requied field jo hoga whn pe wo v kick IN kr jyega jisse ki haar baar login krna pdega, esliye "validateBeforeSave:false" esliye yeh kiye hai... validition kuch mt lagao tm sidha ja k save kr do

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("\n Error: " + error);
    throw new ApiErrors(
      500,
      "Something went wrong while generating access or refresh token"
    );
  }
};

const regiterUser = asyncHandler(async (req, res) => {
  // STEPS ---->
  // get user details from frontend
  // vaildtion - not empty
  // check if user already exists : username , email
  // check upload images , check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token from the field resposne
  //check for user cretion
  //return res

  const { username, email, fullname, password } = req.body;

  // console.log("\nEmail:- " + email +" FullName:- "+fullname+" Refresh Token "+refreshToken+" Password "+password);

  // if(username ===''){
  //     return new ApiErrors(404 , "username is required");
  // }

  if (
    [username, email, fullname, password].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new ApiErrors(400, "All fields are required");
  }

  //Here we need to check whether email is of vaild syntax or not
  // if(email){
  //     check
  // }

  // User.findOne({username}),User.findOne({email}) ---> we can use this approach also but there is a better approach for this

  const existedUser = await User.findOne({
    // findOne does finds the first occurence of the matched entry
    $or: [{ username }, { email }],
  });
  console.log("existedUser: ", existedUser);
  if (existedUser) {
    throw new ApiErrors(409, "User with this email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path; //TO : console req.files , req.files.avatar....
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  // console.log("Avatar Local Path:- "+avatarLocalPath)

  if (!avatarLocalPath) {
    throw new ApiErrors(400, "Avatar image is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // console.log("Avatar "+avatar+"\n")

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    fullname,
  });

  const createdUser = await User.findById(user._id).select([
    "-password -refreshToken -watch",
  ]);
  /*
    checking if user is registered or not...
    ._id -->> mongoDB create by default an id 
    .select-->> by default it selects all the entities from which we had excluded password and refresh token by "-" operator 
    */

  if (!createdUser) {
    throw new ApiErrors(500, "Something went wrong while registering an User"); //500 means INTERNAL SERVER ERROR
  }

  return res
    .status(201)
    .json(
      new ApiResponses(200, createdUser, "User has been successfully Created!")
    );
});

const loginUser = asyncHandler(async (req, res) => {
  //req.body->data
  //username or email
  //find the user
  //password check
  //access and refresh token
  //send cookie

  const { email, password, username } = req.body;

  if (!(username || email)) {
    //if(!username || !email) yeh glt tha yhn pe -> LOGICAL error
    throw new ApiErrors(400, "Username or email is required");
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  // console.log("User: " + user);
  if (!user) {
    throw new ApiErrors(404, "Username or email does not exists");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  /*console.log(
     "IsPassword Correct: " + isPasswordValid + " UserID: " + user._id
  );*/

  if (!isPasswordValid) {
    throw new ApiErrors(401, "Invaild credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  console.log("Access Token: " + accessToken);

  const loggedInUser = await User.findOne(user._id).select(
    "-password, -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponses(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", options)
    .cookie("refreshToken", options)
    .json(new ApiResponses(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiErrors(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiErrors(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiErrors(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponses(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiErrors(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  console.log(" oldPassword "+oldPassword+" newPassword "+newPassword);
  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  console.log("User: "+user+"\n isPasswordCorrect "+isPasswordCorrect)
  
  if (!isPasswordCorrect) {
    throw new ApiErrors(401, "Old password is incorrect");
  }
  user.password = newPassword;
  user.save({ validateBeforeSave: false });
  res.status(new ApiResponses(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponses(200, req.user, "User  fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body;

  const user = User.findByIdAndUpdate(
    req.user?._id,
    {
      fullname, //fullname:fullname --> ES6 update
      email,
    },
    {
      new: true,
    }
  ).select("-password");
  res
    .status(200)
    .json(new ApiResponses(200, user, "Account details updated successfully"));
});

const updateAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  // console.log("req.file: "+req.file)
  // console.log("req.file: "+avatarLocalPath +" path "+req.file?.path)

  if (!avatarLocalPath) {
    throw new ApiResponses(400, "Please select an avatar image to upload.");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  console.log("Avatar: "+avatar)

  if (!avatar.url) {
    throw new ApiResponses(400, "Error while uploading avatar file");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        //$set changes only the specified file or field
        avatar: avatar.url,
      },
    },
    {
      new: true,
    }
  ).select("-password");
  res
    .status(200)
    .json(new ApiResponses(200, user, "Avatar updated successfully"));
});

const updateCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiResponses(400, "Please select an cover image to upload.");
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!coverImage.url) {
    throw new ApiResponses(400, "Error while uploading coverImage file");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        //$set changes only the specified file or field
        coverImage: coverImage.url,
      },
    },
    {
      new: true,
    }
  ).select("-password");
  res
    .status(200)
    .json(new ApiResponses(200, user, "Cover image updated successfully"));
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params; //request URL se aa rha hai, request body se nhi params se liye h

  if (!username?.trim()) {
    throw new ApiErrors(400, "Username is missing");
  }

  const channel = await User.aggregate([
    {
      $match: {
        //match --> pehla wala return krta hai
        username: username?.toLowerCase(),
      }, //Yhn pr hmne filter kr liye ek document , aab hamare pass ek document hai
    },
    {
      $lookup: {
        from: "subscriptions", //subscriptionSchema se aaya hai Whn pe Subscription tha jo ki database mai "subscriptions" jaisa store hoga
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      }, // yhn tk sare channels ko find kr liye h , jisse kya hoga ki sara subscriber ka count nhi pr document select ho jygega.Isko aage ja k count v kr lenge toh sara subscriber count mil jyega
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber", //yeh subscriber subscriptionSchema mai jo subscriber hai whn se aaya h.
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        //$addFields  -> fields add karenge yahan pe,
        subscribersCount: {
          $size: "$subscribers", //$size -> size of array.... subscribers k aage $ esliye lagaye hai q ki wo aab ek field baan chuka h
          //counts the document selected at the $lookup: from: "subscriptions" as: "subscribers"
        },
        channelsSubscribedToCount: {
          $size: "$subscribedTo",
          //counts the document selected at the $lookup: from: "subscriptions" as: "subscribedTo"
        },
        isSubscribed: {
          //isse hmlog yeh dekheynge ki user subscribes hai ki nhi.
          $cond: {
            //$cond--> condition check
            if: { $in: [req.user?._id, "$subscribers.subscriber"] }, //$in->> jisse users id agar list mein ho to true return karte hai,
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        //sare values ko nhi deta but selected values ko deta h...
        fullName: 1,
        username: 1,
        subscribersCount: 1,
        channelsSubscribedToCount: 1,
        isSubscribed: 1,
        avatar: 1,
        coverImage: 1,
        email: 1,
      },
    },
  ]);

  if (!channel?.length) {
    throw new ApiErrors(404, "Channel does not exists");
  }

  return res
    .status(200)
    .json(
      new ApiResponses(200, channel[0], "User channel fetched successfully")
    );
});

const getWatchHistory = asyncHandler(async (req, res) => {
  /*req.user._id;//aise user ko access kr skte h pr problem yeh h ki mongoDB mai jo _id store hota h wo ObjectId(fafhhrfi8479247949) aisa kuch structure mai store hota h , toh ismai pipeline se kaam nhi skte, mgr "new mongoose.Types.ObjectId(req.user._id)" se user mil jyega*/
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    //#project ko bahar nikal kr k v dekhna ki kya hota hai.... bahar in sense ki iss pipeline se bahar nikal k main pipeline mai
                    fullName: 1,
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            //Iss part ko skip v kr skte the , q ki yeh pipeline jo return krega "ownwer" field k aandar wo ek array hoga jis kya hoga ki hm log ko further ek loop lagana hoga ,pr jaise ki hmlog jante h ki hume sirf first value hi milega toh uska firse value hi return kr dete h.
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponses(
        200,
        user[0].watchHistory,
        "Fetched watch History successfully"
      )
    );
});

export {
  regiterUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateAvatar,
  updateCoverImage,
  getUserChannelProfile,
  getWatchHistory,
};
