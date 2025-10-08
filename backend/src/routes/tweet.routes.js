import { Router } from "express";
import {
  createTweet,
  deleteTweet,
  getUserTweets,
  getTweetById,
  updateTweet,
  getAllTweets,
} from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(createTweet).get(getAllTweets);
router.route("/user/:userId").get(getUserTweets);
router
  .route("/:tweetId")
  .get(getTweetById)
  .patch(updateTweet)
  .delete(deleteTweet);

export default router;
