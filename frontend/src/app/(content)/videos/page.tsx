"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, Grid, List } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { VideoCard } from "../../../components/cards/video-card"

// Mock video data
const mockVideos = [
  {
    id: "1",
    title: "Building a Modern Web App with Next.js 15",
    description: "Complete tutorial on building a full-stack application",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "15:42",
    views: 12500,
    createdAt: "2024-01-14T14:20:00Z",
    author: {
      id: "1",
      username: "webdevpro",
      displayName: "WebDev Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "2",
    title: "My Morning Routine as a Content Creator",
    description: "How I start my day to stay productive and creative",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "8:33",
    views: 8900,
    createdAt: "2024-01-14T09:45:00Z",
    author: {
      id: "2",
      username: "lifestyleblogger",
      displayName: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
  },
  {
    id: "3",
    title: "Advanced TypeScript Tips and Tricks",
    description: "Level up your TypeScript skills with these advanced techniques",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "22:15",
    views: 15600,
    createdAt: "2024-01-13T16:30:00Z",
    author: {
      id: "3",
      username: "typescriptguru",
      displayName: "TypeScript Guru",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "4",
    title: "Cooking the Perfect Pasta",
    description: "Learn the secrets to making restaurant-quality pasta at home",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "12:08",
    views: 7800,
    createdAt: "2024-01-13T12:15:00Z",
    author: {
      id: "4",
      username: "chefmario",
      displayName: "Chef Mario",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
  },
  {
    id: "5",
    title: "Photography Basics: Composition Rules",
    description: "Master the fundamental rules of composition in photography",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "18:45",
    views: 9200,
    createdAt: "2024-01-12T14:20:00Z",
    author: {
      id: "5",
      username: "photopro",
      displayName: "Photo Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
  },
  {
    id: "6",
    title: "Fitness Workout for Beginners",
    description: "Start your fitness journey with this beginner-friendly workout",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "25:30",
    views: 11400,
    createdAt: "2024-01-12T08:00:00Z",
    author: {
      id: "6",
      username: "fitnesstrainer",
      displayName: "Fitness Trainer",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
  },
]

export default function VideosPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recent")
  const [filterBy, setFilterBy] = useState("all")

  return (
    <div className="w-full relative">


      <main className="">
        <div className="w-full mx-auto p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h1 className="text-3xl font-bold">Videos</h1>
              <p className="text-muted-foreground mt-1">Discover amazing video content from creators</p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort and Filter */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
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

          {/* Videos Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={
              viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
          >
            {mockVideos.map((video, index) => (
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
        </div>
      </main>
    </div>
  )
}
