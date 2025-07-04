"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Hash, MapPin, Clock, Eye, MessageCircle, Users, Video, Image, Music } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { VideoCard } from "../../../components/cards/video-card"
import { PostCard } from "../../../components/cards/post-card"
import Link from "next/link"

// Mock trending hashtags
const mockTrendingHashtags = [
  {
    id: "1",
    hashtag: "#WebDev",
    posts: 25400,
    growth: "+15%",
    category: "Technology",
  },
  {
    id: "2",
    hashtag: "#NextJS",
    posts: 18700,
    growth: "+23%",
    category: "Technology",
  },
  {
    id: "3",
    hashtag: "#TypeScript",
    posts: 34200,
    growth: "+12%",
    category: "Technology",
  },
  {
    id: "4",
    hashtag: "#Photography",
    posts: 56800,
    growth: "+8%",
    category: "Creative",
  },
  {
    id: "5",
    hashtag: "#Fitness",
    posts: 89200,
    growth: "+18%",
    category: "Lifestyle",
  },
  {
    id: "6",
    hashtag: "#Cooking",
    posts: 45600,
    growth: "+10%",
    category: "Food",
  },
  {
    id: "7",
    hashtag: "#Travel",
    posts: 123400,
    growth: "+5%",
    category: "Lifestyle",
  },
  {
    id: "8",
    hashtag: "#Music",
    posts: 78900,
    growth: "+14%",
    category: "Entertainment",
  },
]

// Mock trending videos
const mockTrendingVideos = [
  {
    id: "1",
    title: "Building a Modern Web App with Next.js 15",
    description: "Complete tutorial on building a full-stack application",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "15:42",
    views: 125000,
    createdAt: "2024-01-14T14:20:00Z",
    author: {
      id: "1",
      username: "webdevpro",
      displayName: "WebDev Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    trendingRank: 1,
  },
  {
    id: "2",
    title: "Advanced TypeScript Tips and Tricks",
    description: "Level up your TypeScript skills with these advanced techniques",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "22:15",
    views: 98500,
    createdAt: "2024-01-13T16:30:00Z",
    author: {
      id: "2",
      username: "typescriptguru",
      displayName: "TypeScript Guru",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    trendingRank: 2,
  },
  {
    id: "3",
    title: "Photography Basics: Composition Rules",
    description: "Master the fundamental rules of composition in photography",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "18:45",
    views: 87200,
    createdAt: "2024-01-12T14:20:00Z",
    author: {
      id: "3",
      username: "photopro",
      displayName: "Photo Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    trendingRank: 3,
  },
]

// Mock trending posts
const mockTrendingPosts = [
  {
    id: "1",
    content: "Hot take: TypeScript is not just about types. It's about better developer experience, refactoring safety, and code documentation. Change my mind 🔥 #typescript #javascript",
    author: {
      id: "1",
      username: "typescriptguru",
      displayName: "TypeScript Guru",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    createdAt: "2024-01-13T16:30:00Z",
    likes: 2340,
    comments: 567,
    reposts: 280,
    isLiked: false,
    isReposted: false,
    isBookmarked: false,
    hashtags: ["typescript", "javascript"],
  },
  {
    id: "2",
    content: "Golden hour photography tips 📸 The best light happens twice a day - don't miss it! Here's how to make the most of it... #photography #goldenhour",
    author: {
      id: "2",
      username: "photopro",
      displayName: "Photo Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    createdAt: "2024-01-12T14:20:00Z",
    likes: 1560,
    comments: 280,
    reposts: 150,
    isLiked: true,
    isReposted: false,
    isBookmarked: true,
    hashtags: ["photography", "goldenhour"],
  },
]

// Mock trending topics
const mockTrendingTopics = [
  {
    id: "1",
    topic: "Web Development",
    posts: 12500,
    videos: 3400,
    growth: "+25%",
    description: "Latest trends in web development",
  },
  {
    id: "2",
    topic: "Artificial Intelligence",
    posts: 8900,
    videos: 2100,
    growth: "+35%",
    description: "AI developments and tutorials",
  },
  {
    id: "3",
    topic: "Photography",
    posts: 15600,
    videos: 4800,
    growth: "+12%",
    description: "Photography tips and showcases",
  },
  {
    id: "4",
    topic: "Fitness & Health",
    posts: 11200,
    videos: 2800,
    growth: "+18%",
    description: "Fitness routines and health tips",
  },
]

export default function TrendingPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredHashtags = selectedCategory === "all" 
    ? mockTrendingHashtags 
    : mockTrendingHashtags.filter(tag => tag.category.toLowerCase() === selectedCategory)

  return (
    <div className="w-full relative">
      <main className="">
        <div className="w-full mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h1 className="text-3xl font-bold flex items-center space-x-2">
                <TrendingUp className="h-8 w-8" />
                <span>Trending</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Discover what's popular right now
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Updated hourly</span>
              </Badge>
            </div>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="hashtags" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="hashtags" className="flex items-center space-x-2">
                <Hash className="h-4 w-4" />
                <span>Hashtags</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center space-x-2">
                <Video className="h-4 w-4" />
                <span>Videos</span>
              </TabsTrigger>
              <TabsTrigger value="posts" className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Posts</span>
              </TabsTrigger>
              <TabsTrigger value="topics" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Topics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hashtags" className="space-y-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-4">
                {["all", "technology", "creative", "lifestyle", "food", "entertainment"].map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filteredHashtags.map((hashtag, index) => (
                  <motion.div
                    key={hashtag.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Hash className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-lg">{hashtag.hashtag.slice(1)}</span>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className="text-green-600 bg-green-50 dark:bg-green-900/20"
                          >
                            {hashtag.growth}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Posts</span>
                            <span className="font-medium">{hashtag.posts.toLocaleString()}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {hashtag.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {mockTrendingVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-card rounded-lg border hover:shadow-lg transition-shadow"
                  >
                    <div className="flex-shrink-0">
                      <Badge className="bg-primary text-primary-foreground">
                        #{video.trendingRank}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <VideoCard video={video} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="posts" className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-0"
              >
                {mockTrendingPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="topics" className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {mockTrendingTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{topic.topic}</span>
                          <Badge 
                            variant="secondary" 
                            className="text-green-600 bg-green-50 dark:bg-green-900/20"
                          >
                            {topic.growth}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {topic.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{topic.posts.toLocaleString()} posts</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Video className="h-4 w-4" />
                            <span>{topic.videos.toLocaleString()} videos</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
