"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, BellOff, Grid, List, Users, Video, MessageCircle, TrendingUp } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { VideoCard } from "../../../components/cards/video-card"
import { PostCard } from "../../../components/cards/post-card"
import Link from "next/link"

// Mock subscription data
const mockSubscriptions = [
  {
    id: "1",
    username: "webdevpro",
    displayName: "WebDev Pro",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
    subscribers: 125000,
    description: "Full-stack developer sharing tips and tutorials",
    isNotifying: true,
    latestVideo: {
      id: "1",
      title: "Building a Modern Web App with Next.js 15",
      thumbnail: "/placeholder.svg?height=180&width=320",
      views: 12500,
      createdAt: "2024-01-14T14:20:00Z",
    },
    category: "Technology",
  },
  {
    id: "2",
    username: "lifestyleblogger",
    displayName: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: false,
    subscribers: 89000,
    description: "Lifestyle content creator and wellness advocate",
    isNotifying: false,
    latestVideo: {
      id: "2",
      title: "My Morning Routine as a Content Creator",
      thumbnail: "/placeholder.svg?height=180&width=320",
      views: 8900,
      createdAt: "2024-01-14T09:45:00Z",
    },
    category: "Lifestyle",
  },
  {
    id: "3",
    username: "typescriptguru",
    displayName: "TypeScript Guru",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
    subscribers: 234000,
    description: "Advanced TypeScript tutorials and best practices",
    isNotifying: true,
    latestVideo: {
      id: "3",
      title: "Advanced TypeScript Tips and Tricks",
      thumbnail: "/placeholder.svg?height=180&width=320",
      views: 15600,
      createdAt: "2024-01-13T16:30:00Z",
    },
    category: "Technology",
  },
  {
    id: "4",
    username: "chefmario",
    displayName: "Chef Mario",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: false,
    subscribers: 67000,
    description: "Professional chef teaching authentic Italian cuisine",
    isNotifying: false,
    latestVideo: {
      id: "4",
      title: "Cooking the Perfect Pasta",
      thumbnail: "/placeholder.svg?height=180&width=320",
      views: 7800,
      createdAt: "2024-01-13T12:15:00Z",
    },
    category: "Food",
  },
  {
    id: "5",
    username: "photopro",
    displayName: "Photo Pro",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: true,
    subscribers: 156000,
    description: "Professional photographer sharing techniques and gear reviews",
    isNotifying: true,
    latestVideo: {
      id: "5",
      title: "Photography Basics: Composition Rules",
      thumbnail: "/placeholder.svg?height=180&width=320",
      views: 9200,
      createdAt: "2024-01-12T14:20:00Z",
    },
    category: "Photography",
  },
  {
    id: "6",
    username: "fitnesstrainer",
    displayName: "Fitness Trainer",
    avatar: "/placeholder.svg?height=40&width=40",
    verified: false,
    subscribers: 98000,
    description: "Certified fitness trainer helping you reach your goals",
    isNotifying: false,
    latestVideo: {
      id: "6",
      title: "Fitness Workout for Beginners",
      thumbnail: "/placeholder.svg?height=180&width=320",
      views: 11400,
      createdAt: "2024-01-12T08:00:00Z",
    },
    category: "Fitness",
  },
]

// Mock recent content from subscriptions
const mockRecentContent = [
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
]

export default function SubscriptionsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions)

  const toggleNotification = (id: string) => {
    setSubscriptions(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, isNotifying: !sub.isNotifying } : sub
      )
    )
  }

  const totalSubscriptions = subscriptions.length
  const notifyingCount = subscriptions.filter(sub => sub.isNotifying).length

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
              <h1 className="text-3xl font-bold">Subscriptions</h1>
              <p className="text-muted-foreground mt-1">
                {totalSubscriptions} subscriptions · {notifyingCount} with notifications
              </p>
            </div>

            <div className="flex items-center space-x-4">
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

          {/* Tabs */}
          <Tabs defaultValue="all" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>All Subscriptions</span>
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center space-x-2">
                <Video className="h-4 w-4" />
                <span>Recent Videos</span>
              </TabsTrigger>
              <TabsTrigger value="posts" className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>Recent Posts</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={
                  viewMode === "grid" 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "space-y-4"
                }
              >
                {subscriptions.map((subscription, index) => (
                  <motion.div
                    key={subscription.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <Link href={`/profile/${subscription.username}`}>
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={subscription.avatar} alt={subscription.displayName} />
                                <AvatarFallback>{subscription.displayName.charAt(0)}</AvatarFallback>
                              </Avatar>
                            </Link>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <Link href={`/profile/${subscription.username}`}>
                                  <h3 className="font-semibold hover:underline">
                                    {subscription.displayName}
                                  </h3>
                                </Link>
                                {subscription.verified && (
                                  <div className="h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                                    <span className="text-primary-foreground text-xs">✓</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {subscription.subscribers.toLocaleString()} subscribers
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleNotification(subscription.id)}
                            className={subscription.isNotifying ? "text-primary" : "text-muted-foreground"}
                          >
                            {subscription.isNotifying ? (
                              <Bell className="h-4 w-4" />
                            ) : (
                              <BellOff className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                          {subscription.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {subscription.category}
                          </Badge>
                          <Link href={`/video/${subscription.latestVideo.id}`}>
                            <Button variant="outline" size="sm">
                              Latest Video
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {mockRecentContent.map((video, index) => (
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
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Recent Posts</h3>
                  <p className="text-muted-foreground">
                    Your subscriptions haven't posted anything recently.
                  </p>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
