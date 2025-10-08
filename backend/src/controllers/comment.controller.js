import mongoose from "mongoose";
import { Comment } from "../models/comment.models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponses } from "../utils/ApiResponses.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!videoId) {
    throw new ApiErrors(404, "Video ID not found");
  }
  console.log("Video Id: " + videoId);

  const getAllComments = Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
        pipeline: [
          {
            $project: {
              username: 1,
              avatar: 1,
              fullName: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$ownerDetails",
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "comment",
        as: "likes",
      },
    },
    {
      $addFields: {
        likesCount: {
          $size: "$likes",
        },
        isLiked: {
          $cond: {
            if: {
              $in: [req.user._id, "$likes.isLikedBy"],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        content: 1,
        createdAt: 1,
        likesCount: 1,
        owner: "$ownerDetails",
        isLiked: 1,
      },
    },
  ]);

  console.log("getAllComments: ", getAllComments);
  

  if (!getAllComments) {
    throw new ApiErrors(500, "Error while creating aggregation pipeline");
  }

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  
  
  const comments = await Comment.aggregatePaginate(getAllComments, options);
  console.log("Comments: ", comments);

  if (!comments) {
    throw new ApiErrors(500, "Error while fetching comments");
  }
  return res
    .status(200)
    .json(new ApiResponses(201, comments, "Comments fetched successfully!"));
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { videoId } = req.params;
  const { content } = req.body;
  if (!videoId) {
    throw new ApiErrors(400, "Video ID not found");
  }

  console.log("Video Id: " + videoId);
  console.log("Content: " + content);
  
  if (!content) {
    throw new ApiErrors(400, "Content is required");
  }

  const addedComment = await Comment.create({
    content,
    video: videoId,
    owner: req.user?._id,
  });
  if (!addedComment) {
    throw new ApiErrors(500, "Failed to add comment");
  }

  console.log("Added Comment: ", addedComment);

  return res
    .status(200)
    .json(new ApiResponses(201, addedComment, "Comment added successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { commentId } = req.params;
  if (!commentId) {
    throw new ApiErrors(404, "Comment ID is required ");
  }

  const { content } = req.body;
  if (!content) {
    throw new ApiErrors(404, "Content is required ");
  }
  console.log(content);

  const getComment = await Comment.findById(commentId);
  if (!getComment) {
    throw new ApiErrors(404, "Error while fetching the comment");
  }

  const commentOwner = getComment.owner.toString();

  if (req.user._id.toString() !== commentOwner) {
    throw new ApiErrors(404, "Wrong Owner fetched while deleting the comment");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content: content,
      },
    },
    { new: true }
  );
  if (!updatedComment) {
    throw new ApiErrors(500, "Error while updating comment");
  }

  return res
    .status(200)
    .json(
      new ApiResponses(
        201,
        updatedComment,
        "Comment has been updated Successfully"
      )
    );
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;
  if (!commentId) {
    throw new ApiErrors(404, "Comment Id is required");
  }
  const getComment = await Comment.findById(commentId);
  if (!getComment) {
    throw new ApiErrors(404, "Error while fetching the comment");
  }
  const commentOwner = getComment.owner.toString();

  if (req.user._id.toString() !== commentOwner) {
    throw new ApiErrors(404, "Wrong Owner fetched while deleting the comment");
  }
  const deletedComment = await Comment.findByIdAndDelete(commentId);
  if (!deletedComment) {
    throw new ApiErrors(404, "Error while deleting comment");
  }

  return res
    .status(200)
    .json(
      new ApiResponses(201, deletedComment, "Comment deleted successfully ")
    );
});

const getTweetComments = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!tweetId) {
    throw new ApiErrors(404, "Tweet ID not found");
  }

  const getAllComments = Comment.aggregate([
    {
      $match: {
        tweet: new mongoose.Types.ObjectId(tweetId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
        pipeline: [
          {
            $project: {
              username: 1,
              avatar: 1,
              fullName: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$ownerDetails",
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "comment",
        as: "likes",
      },
    },
    {
      $addFields: {
        likesCount: {
          $size: "$likes",
        },
        isLiked: {
          $cond: {
            if: {
              $in: [req.user._id, "$likes.isLikedBy"],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        content: 1,
        createdAt: 1,
        likesCount: 1,
        owner: "$ownerDetails",
        isLiked: 1,
      },
    },
  ]);

  if (!getAllComments) {
    throw new ApiErrors(500, "Error while creating aggregation pipeline");
  }

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  const comments = await Comment.aggregatePaginate(getAllComments, options);

  if (!comments) {
    throw new ApiErrors(500, "Error while fetching comments");
  }
  return res
    .status(200)
    .json(new ApiResponses(201, comments, "Comments fetched successfully!"));
});

const addTweetComment = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const { content } = req.body;
  
  if (!tweetId) {
    throw new ApiErrors(400, "Tweet ID not found");
  }
  
  if (!content) {
    throw new ApiErrors(400, "Content is required");
  }

  const addedComment = await Comment.create({
    content,
    tweet: tweetId,
    owner: req.user?._id,
  });
  
  if (!addedComment) {
    throw new ApiErrors(500, "Failed to add comment");
  }

  // Populate owner details
  const populatedComment = await Comment.findById(addedComment._id)
    .populate('owner', 'username avatar fullName');

  return res
    .status(200)
    .json(new ApiResponses(201, populatedComment, "Comment added successfully"));
});

export { getVideoComments, getTweetComments, addComment, addTweetComment, updateComment, deleteComment };
