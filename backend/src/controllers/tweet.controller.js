import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.models.js";
import { User } from "../models/users.models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponses } from "../utils/ApiResponses.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getAllTweets = asyncHandler(async (req, res) => {
  const tweets = await Tweet.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              username: 1,
              fullName: 1,
              avatar: 1,
              email: 1
            }
          }
        ]
      }
    },
    {
      $unwind: "$owner"
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "tweet",
        as: "likes"
      }
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "tweet",
        as: "comments"
      }
    },
    {
      $addFields: {
        likesCount: { $size: "$likes" },
        commentsCount: { $size: "$comments" },
        isLiked: {
          $cond: {
            if: req.user?._id ? {
              $in: [req.user._id, "$likes.isLikedBy"]
            } : false,
            then: true,
            else: false
          }
        }
      }
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $project: {
        likes: 0,  // Remove likes array from output
        comments: 0  // Remove comments array from output
      }
    }
  ]);

  return res
    .status(200)
    .json(new ApiResponses(200, { tweets }, "All tweets fetched successfully"));
});

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet
  const { content } = req.body;
  if (!content) {
    throw new ApiErrors(500, "Content is required");
  }

  const createdTweet = await Tweet.create({
    content,
    owner: req.user?._id,
  });
  if (!createdTweet) {
    throw new ApiErrors(404, "Tweet not created");
  }
  
  // Populate owner details before returning
  const populatedTweet = await Tweet.findById(createdTweet._id)
    .populate('owner', 'username fullName avatar email');
  
  return res
    .status(200)
    .json(new ApiResponses(200, populatedTweet, "Tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets
  const { userId } = req.params;
  if (!userId) {
    throw new ApiErrors(404, "User ID not found");
  }
  
  const tweets = await Tweet.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(userId) }
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              username: 1,
              fullName: 1,
              avatar: 1,
              email: 1
            }
          }
        ]
      }
    },
    {
      $unwind: "$owner"
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "tweet",
        as: "likes"
      }
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "tweet",
        as: "comments"
      }
    },
    {
      $addFields: {
        likesCount: { $size: "$likes" },
        commentsCount: { $size: "$comments" },
        isLiked: {
          $cond: {
            if: req.user?._id ? {
              $in: [req.user._id, "$likes.isLikedBy"]
            } : false,
            then: true,
            else: false
          }
        }
      }
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $project: {
        likes: 0,  // Remove likes array from output
        comments: 0  // Remove comments array from output
      }
    }
  ]);

  console.log("Tweets: " + JSON.stringify(tweets));

  if (!tweets) {
    throw new ApiErrors(500, "Tweets not found");
  }
  if (tweets.length === 0) {
    return res
      .status(200)
      .json(
        new ApiResponses(
          200,
          { tweets: [] },
          "No tweets found for this user"
        )
      );
  }
  return res
    .status(200)
    .json(
      new ApiResponses(
        200,
        { tweets },
        "User tweets fetched successfully"
      )
    );
});

const getTweetById = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  
  if (!tweetId) {
    throw new ApiErrors(400, "Tweet ID not found");
  }
  
  const tweet = await Tweet.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(tweetId) }
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              username: 1,
              fullName: 1,
              avatar: 1,
              email: 1
            }
          }
        ]
      }
    },
    {
      $unwind: "$owner"
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "tweet",
        as: "likes"
      }
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "tweet",
        as: "comments"
      }
    },
    {
      $addFields: {
        likesCount: { $size: "$likes" },
        commentsCount: { $size: "$comments" },
        isLiked: {
          $cond: {
            if: req.user?._id ? {
              $in: [req.user._id, "$likes.isLikedBy"]
            } : false,
            then: true,
            else: false
          }
        }
      }
    },
    {
      $project: {
        likes: 0,  // Remove likes array from output
        comments: 0  // Remove comments array from output
      }
    }
  ]);
  
  if (!tweet || tweet.length === 0) {
    throw new ApiErrors(404, "Tweet not found");
  }
  
  return res
    .status(200)
    .json(new ApiResponses(200, tweet[0], "Tweet retrieved successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet

  const { tweetId } = req.params;
  const { content } = req.body;
  if (!tweetId) {
    throw new ApiErrors(404, "Tweet ID not provided for update");
  }
  if (!content) {
    throw new ApiErrors(404, "Tweet data not provided for update");
  }
  const tweet = await Tweet.findByIdAndUpdate(
    tweetId,
    { content: content },
    { new: true }
  );
  return res
    .status(200)
    .json(new ApiResponses(201, tweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet
  const { tweetId } = req.params;
  if (!tweetId) {
    throw new ApiErrors(500, "Tweet ID not found");
  }
  
  await Tweet.findByIdAndDelete(tweetId);
  return res
    .status(200)
    .json( 
      new ApiResponses(200, `Deleted successfully`)
    );
});

export { getAllTweets,createTweet, getUserTweets, getTweetById, updateTweet, deleteTweet };
