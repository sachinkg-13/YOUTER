"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Textarea } from "../../../components/ui/textarea"
import { ImageIcon, VideoIcon, SmileIcon, HashIcon } from "lucide-react"
import { PostCard } from "../../../components/cards/post-card"
import { VideoCard } from "../../../components/cards/video-card"
import { useAuth } from "../../../components/providers/auth-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"

// Mock data - replace with API calls
const mockPosts = [
  {
    id: "1",
    content: "Just launched my new project! Excited to share it with the world. Built with #NextJS and #TypeScript 🚀",
    author: {
      id: "2",
      username: "techcreator",
      displayName: "Tech Creator",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    createdAt: "2024-01-15T10:30:00Z",
    likes: 42,
    comments: 8,
    reposts: 12,
    isLiked: false,
    isReposted: false,
    isBookmarked: false,
  },
  {
    id: "2",
    content: "Beautiful sunset today! Nature never fails to amaze me 🌅 #photography #nature",
    author: {
      id: "3",
      username: "photographer",
      displayName: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    createdAt: "2024-01-15T08:15:00Z",
    likes: 128,
    comments: 23,
    reposts: 45,
    isLiked: true,
    isReposted: false,
    isBookmarked: true,
  },
]

const mockVideos = [
  {
    id: "3",
    title: "Building a Modern Web App with Next.js 15",
    description: "Complete tutorial on building a full-stack application",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "15:42",
    views: 12500,
    createdAt: "2024-01-14T14:20:00Z",
    author: {
      id: "4",
      username: "webdevpro",
      displayName: "WebDev Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "4",
    title: "My Morning Routine as a Content Creator",
    description: "How I start my day to stay productive and creative",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "8:33",
    views: 8900,
    createdAt: "2024-01-14T09:45:00Z",
    author: {
      id: "5",
      username: "lifestyleblogger",
      displayName: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
  },
]

export default function Page() {
  const [activeTab, setActiveTab] = useState("all")
  const [newPost, setNewPost] = useState("")
  const { user } = useAuth()

  const handlePostSubmit = async () => {
    if (!newPost.trim()) return

    // TODO: API call to create post
    console.log("Creating post:", newPost)
    setNewPost("")
  }

  return (
    <div className="bg-background ">

      <main className="">
        <div className="">
          {/* Create Post */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex space-x-3">
                  <img
                    src={user?.avatar || "/placeholder.svg"}
                    alt={user?.displayName}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1">
                    <Textarea
                      placeholder="What's happening?"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="border-0 resize-none text-lg placeholder:text-muted-foreground focus-visible:ring-0"
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" className="text-primary">
                          <ImageIcon className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-primary">
                          <VideoIcon className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-primary">
                          <SmileIcon className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-primary">
                          <HashIcon className="h-5 w-5" />
                        </Button>
                      </div>
                      <Button onClick={handlePostSubmit} disabled={!newPost.trim()} className="rounded-full px-6">
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Feed Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-0">
              <div className="space-y-0">
                {mockPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
                <div className="grid grid-cols-1 gap-4 p-4">
                  {mockVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="posts" className="space-y-0">
              {mockPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </TabsContent>

            <TabsContent value="videos" className="space-y-0">
              <div className="grid grid-cols-1 gap-4 p-4">
                {mockVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
