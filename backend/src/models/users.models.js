import mongoose, { Schema } from "mongoose";
import jwt  from "jsonwebtoken";
import  bcrypt from 'bcrypt'; 

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // Search by this field , Can aslo avoid it as without this also search will be good
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true, // Search by this field
    },
    avatar: {
      type: String, // cloudinary
      required: false,
    },
    coverImage: {
      type: String, // cloudinary
    },
    watch: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String, // TO BE discussed about why we had not encryped it
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save",async function (next){  // Pre method :-
    if(!this.isModified("password")) return next() // It passes the flag to next command if no changes had been made
    
    this.password =await bcrypt.hash(this.password,10) // 10:- Rounds of hashing
    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password, this.password)//Password :- Original Password, this.password:-Hashed password
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id : this.id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id : this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);
