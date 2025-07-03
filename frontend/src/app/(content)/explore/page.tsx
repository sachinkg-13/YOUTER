"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Hash, Users, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Button } from "../../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { VideoCard } from "../../../components/cards/video-card"
import { PostCard } from "../../../components/cards/post-card"

// Mock trending data
const trendingTopics = [
  { tag: "NextJS", posts: 1234, growth: "+15%" },
  { tag: "AI", posts: 2567, growth: "+28%" },
  { tag: "WebDev", posts: 987, growth: "+12%" },
  { tag: "React", posts: 1876, growth: "+8%" },
  { tag: "TypeScript", posts: 743, growth: "+22%" },
  { tag: "Design", posts: 1432, growth: "+18%" },
]

const suggestedUsers = [
  {
    id: "1",
    username: "techguru",
    displayName: "Tech Guru",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Full-stack developer sharing coding tips",
    followers: 12500,
    verified: true,
  },
  {
    id: "2",
    username: "designpro",
    displayName: "Design Pro",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "UI/UX designer creating beautiful interfaces",
    followers: 8900,
    verified: false,
  },
  {
    id: "3",
    username: "contentcreator",
    displayName: "Content Creator",
    avatar: "/placeholder.svg?height=40&width=40",
    bio: "Creating engaging content about tech and lifestyle",
    followers: 15600,
    verified: true,
  },
]

const trendingVideos = [
  {
    id: "1",
    title: "The Future of Web Development in 2024",
    description: "Exploring upcoming trends and technologies",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "12:45",
    views: 45600,
    createdAt: "2024-01-15T10:00:00Z",
    author: {
      id: "1",
      username: "futurist",
      displayName: "Tech Futurist",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "2",
    title: "Mastering CSS Grid in 10 Minutes",
    description: "Quick tutorial on CSS Grid fundamentals",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "10:23",
    views: 23400,
    createdAt: "2024-01-15T08:30:00Z",
    author: {
      id: "2",
      username: "cssmaster",
      displayName: "CSS Master",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
  },
]

const trendingPosts = [
  {
    id: "1",
    content:
      "Just discovered this amazing new JavaScript feature! The optional chaining operator is a game-changer for handling nested objects safely. #JavaScript #WebDev",
    author: {
      id: "1",
      username: "jsdev",
      displayName: "JS Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    createdAt: "2024-01-15T12:00:00Z",
    likes: 234,
    comments: 45,
    reposts: 67,
    isLiked: false,
    isReposted: false,
    isBookmarked: false,
  },
]

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState("trending")

  return (
    <div className="bg-background">
      <main className="">
        <div className=" mx-auto p-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Explore</h1>
            <p className="text-muted-foreground">Discover trending content, topics, and creators</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  <TabsTrigger value="posts">Posts</TabsTrigger>
                </TabsList>

                <TabsContent value="trending" className="space-y-6">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Trending Now
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {trendingVideos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                      ))}
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Hot Discussions
                    </h2>
                    <div className="space-y-0">
                      {trendingPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="videos">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trendingVideos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="posts">
                  <div className="space-y-0">
                    {trendingPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Topics */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Hash className="h-5 w-5 mr-2" />
                      Trending Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {trendingTopics.map((topic, index) => (
                      <motion.div
                        key={topic.tag}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="font-medium">#{topic.tag}</p>
                          <p className="text-sm text-muted-foreground">{topic.posts.toLocaleString()} posts</p>
                        </div>
                        <Badge variant="secondary" className="text-green-600">
                          {topic.growth}
                        </Badge>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Suggested Users */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Users className="h-5 w-5 mr-2" />
                      Who to Follow
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {suggestedUsers.map((user, index) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start space-x-3"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.displayName} />
                          <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1">
                            <p className="font-medium text-sm truncate">{user.displayName}</p>
                            {user.verified && (
                              <div className="h-3 w-3 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-primary-foreground text-xs">✓</span>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">@{user.username}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{user.bio}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {user.followers.toLocaleString()} followers
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Follow
                        </Button>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
