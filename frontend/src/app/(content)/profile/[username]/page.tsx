"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { 
  Settings, 
  Bell, 
  Share, 
  MoreHorizontal, 
  Play, 
  Users, 
  Video, 
  MessageCircle, 
  Calendar,
  Eye,
  ThumbsUp,
  Grid,
  List,
  Search
} from "lucide-react"
import { Button } from "../../../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { Badge } from "../../../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { VideoCard } from "../../../../components/cards/video-card"
import { PostCard } from "../../../../components/cards/post-card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../../components/ui/dropdown-menu"
import { Input } from "../../../../components/ui/input"
import { useAuth } from "../../../../components/providers/auth-provider"
import Link from "next/link"

// Mock user data
const mockUsers = {
  "sachinkumargupta": {
    id: "1",
    username: "sachinkumargupta",
    displayName: "Sachin kumar Gupta",
    avatar: "/placeholder.svg?height=160&width=160",
    bannerImage: "https://images.unsplash.com/photo-1554306274-f23873d9a26c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    verified: true,
    subscriberCount: 2,
    videoCount: 4,
    joinDate: "2023-05-15T00:00:00Z",
    description: "More about this channel ...",
    location: "India",
    isOwner: true,
    isSubscribed: false,
    notificationsEnabled: false,
    totalViews: 1247,
    socialLinks: {
      twitter: "https://twitter.com/sachinkumargupta996",
      instagram: "https://instagram.com/sachinkumargupta996",
      website: "https://sachinkumargupta.dev"
    }
  },
  "webdevpro": {
    id: "2",
    username: "webdevpro",
    displayName: "WebDev Pro",
    avatar: "/placeholder.svg?height=160&width=160",
    bannerImage: "/placeholder.svg?height=200&width=800",
    verified: true,
    subscriberCount: 125000,
    videoCount: 89,
    joinDate: "2022-01-10T00:00:00Z",
    description: "Full-stack developer sharing tips and tutorials about modern web development. Join me on my journey to create amazing web applications!",
    location: "San Francisco, CA",
    isOwner: false,
    isSubscribed: true,
    notificationsEnabled: true,
    totalViews: 2500000,
    socialLinks: {
      twitter: "https://twitter.com/webdevpro",
      website: "https://webdevpro.com"
    }
  }
}

// Mock videos for the user
const mockUserVideos = {
  "sachinkumargupta": [
    {
      id: "1",
      title: "26 May 2024(1)",
      description: "Event highlights from May 26, 2024",
      thumbnail: "/placeholder.svg?height=180&width=320",
      duration: "3:01",
      views: 1,
      createdAt: "2024-05-26T00:00:00Z",
      author: {
        id: "1",
        username: "sachinkumargupta996",
        displayName: "Sachin kumar Gupta",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
    },
    {
      id: "2",
      title: "26 May 2024(3)",
      description: "Event highlights from May 26, 2024 - Part 3",
      thumbnail: "/placeholder.svg?height=180&width=320",
      duration: "1:49",
      views: 0,
      createdAt: "2024-05-26T00:00:00Z",
      author: {
        id: "1",
        username: "sachinkumargupta996",
        displayName: "Sachin kumar Gupta",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
    },
    {
      id: "3",
      title: "26 May 2024(4)",
      description: "Event highlights from May 26, 2024 - Part 4",
      thumbnail: "/placeholder.svg?height=180&width=320",
      duration: "0:31",
      views: 0,
      createdAt: "2024-05-26T00:00:00Z",
      author: {
        id: "1",
        username: "sachinkumargupta996",
        displayName: "Sachin kumar Gupta",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
    },
    {
      id: "4",
      title: "26 May 2024(2)",
      description: "Event highlights from May 26, 2024 - Part 2",
      thumbnail: "/placeholder.svg?height=180&width=320",
      duration: "0:13",
      views: 0,
      createdAt: "2024-05-26T00:00:00Z",
      author: {
        id: "1",
        username: "sachinkumargupta996",
        displayName: "Sachin kumar Gupta",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
    },
  ],
  "webdevpro": [
    {
      id: "1",
      title: "Building a Modern Web App with Next.js 15",
      description: "Complete tutorial on building a full-stack application",
      thumbnail: "/placeholder.svg?height=180&width=320",
      duration: "15:42",
      views: 125000,
      createdAt: "2024-01-14T14:20:00Z",
      author: {
        id: "2",
        username: "webdevpro",
        displayName: "WebDev Pro",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: true,
      },
    },
  ]
}

// Mock playlists
const mockPlaylists = {
  "sachinkumargupta": [
    {
      id: "1",
      title: "Event Highlights",
      description: "Collection of event highlights from 2024",
      thumbnail: "/placeholder.svg?height=180&width=320",
      videoCount: 6,
      totalViews: 156,
      visibility: "public",
      createdAt: "2024-05-26T00:00:00Z",
      updatedAt: "2024-05-26T00:00:00Z",
    },
    {
      id: "2",
      title: "Tech Talks",
      description: "Technical presentations and talks",
      thumbnail: "/placeholder.svg?height=180&width=320",
      videoCount: 11,
      totalViews: 1247,
      visibility: "public",
      createdAt: "2024-03-15T00:00:00Z",
      updatedAt: "2024-05-20T00:00:00Z",
    },
  ]
}

export default function ProfilePage() {
  const params = useParams()
  const { user: currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState("home")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  
  const username = params.username as string
  const user = mockUsers[username as keyof typeof mockUsers]
  const userVideos = mockUserVideos[username as keyof typeof mockUserVideos] || []
  const userPlaylists = mockPlaylists[username as keyof typeof mockPlaylists] || []

  useEffect(() => {
    if (user) {
      setIsSubscribed(user.isSubscribed)
      setNotificationsEnabled(user.notificationsEnabled)
    }
  }, [user])

  if (!user) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Channel not found</h2>
          <p className="text-muted-foreground">This channel doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed)
    // TODO: API call to subscribe/unsubscribe
  }

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled)
    // TODO: API call to toggle notifications
  }

  const formatSubscriberCount = (count: number) => {
    if (count < 1000) return count.toString()
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`
    return `${(count / 1000000).toFixed(1)}M`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const filteredVideos = userVideos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full relative">
      <main className="">
        <div className="w-full mx-auto">
          {/* Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-48 md:h-64 lg:h-80 mb-6 rounded-lg overflow-hidden"
          >
            <img
              src={user.bannerImage}
              alt={`${user.displayName} banner`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>

          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-6"
          >
            <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background">
              <AvatarImage src={user.avatar} alt={user.displayName} />
              <AvatarFallback className="text-4xl">{user.displayName.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <h1 className="text-3xl md:text-4xl font-bold">{user.displayName}</h1>
                {user.verified && (
                  <Badge className="bg-primary">
                    <span className="text-xs">✓</span>
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>@{user.username}</span>
                <span>•</span>
                <span>{formatSubscriberCount(user.subscriberCount)} subscribers</span>
                <span>•</span>
                <span>{user.videoCount} videos</span>
              </div>

              <p className="text-muted-foreground max-w-2xl">
                {user.description}
              </p>

              <div className="flex items-center space-x-2 pt-2">
                {user.isOwner ? (
                  <div className="flex items-center space-x-2">
                    <Button asChild>
                      <Link href="/settings">
                        <Settings className="h-4 w-4 mr-2" />
                        Customize channel
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/upload">
                        Manage videos
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button 
                      onClick={handleSubscribe}
                      variant={isSubscribed ? "outline" : "default"}
                      className="flex items-center space-x-2"
                    >
                      <Users className="h-4 w-4" />
                      <span>{isSubscribed ? "Subscribed" : "Subscribe"}</span>
                    </Button>
                    {isSubscribed && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNotificationToggle}
                        className={notificationsEnabled ? "bg-primary text-primary-foreground" : ""}
                      >
                        <Bell className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Share className="mr-2 h-4 w-4" />
                      Share channel
                    </DropdownMenuItem>
                    {!user.isOwner && (
                      <>
                        <DropdownMenuItem>
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Send message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Block user
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
            </TabsList>

            {/* Home Tab */}
            <TabsContent value="home" className="space-y-6">
              {/* Channel Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Total Views</p>
                        <p className="text-2xl font-bold">{user.totalViews.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Subscribers</p>
                        <p className="text-2xl font-bold">{formatSubscriberCount(user.subscriberCount)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Joined</p>
                        <p className="text-2xl font-bold">{formatDate(user.joinDate)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Latest Videos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold mb-4">Latest Videos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {userVideos.slice(0, 4).map((video, index) => (
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
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Videos</h2>
                <div className="flex items-center space-x-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search videos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  
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
              </div>

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
                {filteredVideos.map((video, index) => (
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

            {/* Playlists Tab */}
            <TabsContent value="playlists" className="space-y-6">
              <h2 className="text-xl font-semibold">Created playlists</h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {userPlaylists.map((playlist, index) => (
                  <motion.div
                    key={playlist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="relative">
                        <img
                          src={playlist.thumbnail}
                          alt={playlist.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                          {playlist.videoCount} videos
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{playlist.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {playlist.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{playlist.totalViews.toLocaleString()} views</span>
                          <span>Updated {formatDate(playlist.updatedAt)}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Posts Tab */}
            <TabsContent value="posts" className="space-y-6">
              <div className="text-center py-12">
                <MessageCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                <p className="text-muted-foreground">
                  This channel hasn't posted anything yet.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
