"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bookmark, Filter, Grid, List, Video, MessageCircle, Calendar, Tag, Search } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { VideoCard } from "../../../components/cards/video-card"
import { PostCard } from "../../../components/cards/post-card"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"

// Mock bookmarked videos
const mockBookmarkedVideos = [
  {
    id: "1",
    title: "Building a Modern Web App with Next.js 15",
    description: "Complete tutorial on building a full-stack application",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "15:42",
    views: 125000,
    createdAt: "2024-01-14T14:20:00Z",
    bookmarkedAt: "2024-01-14T15:30:00Z",
    author: {
      id: "1",
      username: "webdevpro",
      displayName: "WebDev Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    tags: ["tutorial", "nextjs", "webdev"],
  },
  {
    id: "2",
    title: "Advanced TypeScript Tips and Tricks",
    description: "Level up your TypeScript skills with these advanced techniques",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "22:15",
    views: 98500,
    createdAt: "2024-01-13T16:30:00Z",
    bookmarkedAt: "2024-01-13T17:00:00Z",
    author: {
      id: "2",
      username: "typescriptguru",
      displayName: "TypeScript Guru",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    tags: ["typescript", "programming", "tips"],
  },
  {
    id: "3",
    title: "Photography Basics: Composition Rules",
    description: "Master the fundamental rules of composition in photography",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "18:45",
    views: 87200,
    createdAt: "2024-01-12T14:20:00Z",
    bookmarkedAt: "2024-01-12T16:45:00Z",
    author: {
      id: "3",
      username: "photopro",
      displayName: "Photo Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    tags: ["photography", "composition", "basics"],
  },
]

// Mock bookmarked posts
const mockBookmarkedPosts = [
  {
    id: "1",
    content: "Golden hour photography tips 📸 The best light happens twice a day - don't miss it! Here's how to make the most of it... #photography #goldenhour",
    author: {
      id: "1",
      username: "photopro",
      displayName: "Photo Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    createdAt: "2024-01-12T14:20:00Z",
    bookmarkedAt: "2024-01-12T15:00:00Z",
    likes: 1560,
    comments: 280,
    reposts: 150,
    isLiked: true,
    isReposted: false,
    isBookmarked: true,
    hashtags: ["photography", "goldenhour"],
    tags: ["photography", "tips"],
  },
  {
    id: "2",
    content: "Morning coffee and code review ☕ What's your favorite way to start the day as a developer? #morningvibes #coding",
    author: {
      id: "2",
      username: "lifestyleblogger",
      displayName: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    createdAt: "2024-01-14T09:45:00Z",
    bookmarkedAt: "2024-01-14T10:15:00Z",
    likes: 89,
    comments: 34,
    reposts: 8,
    isLiked: true,
    isReposted: false,
    isBookmarked: true,
    hashtags: ["morningvibes", "coding"],
    tags: ["lifestyle", "productivity"],
  },
]

// Mock bookmark collections
const mockCollections = [
  {
    id: "1",
    name: "Web Development",
    description: "Everything related to web development",
    itemCount: 12,
    lastUpdated: "2024-01-14T15:30:00Z",
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Photography",
    description: "Photography tips and inspiration",
    itemCount: 8,
    lastUpdated: "2024-01-13T17:00:00Z",
    color: "bg-purple-500",
  },
  {
    id: "3",
    name: "Tutorials",
    description: "Step-by-step tutorials",
    itemCount: 15,
    lastUpdated: "2024-01-12T16:45:00Z",
    color: "bg-green-500",
  },
  {
    id: "4",
    name: "Inspiration",
    description: "Creative and motivational content",
    itemCount: 6,
    lastUpdated: "2024-01-11T12:30:00Z",
    color: "bg-orange-500",
  },
]

export default function BookmarksPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recent")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCollection, setSelectedCollection] = useState("all")

  const filteredVideos = mockBookmarkedVideos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const filteredPosts = mockBookmarkedPosts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.bookmarkedAt).getTime() - new Date(b.bookmarkedAt).getTime()
      case "title":
        return a.title.localeCompare(b.title)
      case "recent":
      default:
        return new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime()
    }
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.bookmarkedAt).getTime() - new Date(b.bookmarkedAt).getTime()
      case "popular":
        return b.likes - a.likes
      case "recent":
      default:
        return new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime()
    }
  })

  const totalBookmarks = mockBookmarkedVideos.length + mockBookmarkedPosts.length

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
                <Bookmark className="h-8 w-8" />
                <span>Bookmarks</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                {totalBookmarks} saved items in your collection
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search bookmarks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Collections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockCollections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${collection.color}`} />
                        <CardTitle className="text-lg">{collection.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">
                        {collection.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{collection.itemCount} items</span>
                        <span>{new Date(collection.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" className="flex items-center space-x-2">
                <Bookmark className="h-4 w-4" />
                <span>All Bookmarks</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center space-x-2">
                <Video className="h-4 w-4" />
                <span>Videos ({mockBookmarkedVideos.length})</span>
              </TabsTrigger>
              <TabsTrigger value="posts" className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Posts ({mockBookmarkedPosts.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {/* Videos Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-4">Videos</h3>
                <div className={
                  viewMode === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                    : "space-y-4"
                }>
                  {sortedVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <VideoCard video={video} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Posts Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4">Posts</h3>
                <div className="space-y-0">
                  {sortedPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <PostCard post={post} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={
                  viewMode === "grid" 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                    : "space-y-4"
                }
              >
                {sortedVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <VideoCard video={video} />
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
                {sortedPosts.map((post, index) => (
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
          </Tabs>

          {/* Empty State */}
          {totalBookmarks === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Bookmark className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No bookmarks yet</h3>
              <p className="text-muted-foreground mb-4">
                Start bookmarking videos and posts to see them here
              </p>
              <Button>
                Explore Content
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
