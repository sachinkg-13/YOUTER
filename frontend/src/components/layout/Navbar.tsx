"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Upload, Bell, MessageCircle, User, LogOut, Settings, Video, Loader2, Menu } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useAuth } from "../providers/auth-provider"
import { ThemeToggle } from "../theme-toggle"
import { useIsMobile } from "../ui/use-mobile"

interface NavbarProps {
  onMenuClick?: () => void
}

function Navbar({ onMenuClick }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { user, logout } = useAuth()
  const router = useRouter()
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifLoading, setNotifLoading] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const isMobile = useIsMobile()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  // Dummy notifications
  const dummyNotifications = [
    {
      id: 1,
      type: "video",
      title: "Coder Army uploaded: Prototype Design Pattern | UML + Code | System Design",
      thumbnail: "/placeholder.jpg",
      time: "13 hours ago",
      link: "/videos/1",
    },
    {
      id: 2,
      type: "text",
      title: "Thapa Technical uploaded: Host Website Live in just 1 Minute 🔥",
      thumbnail: "/placeholder-logo.png",
      time: "15 hours ago",
      link: "/posts/2",
    },
    {
      id: 3,
      type: "video",
      title: "Primetime Action Movies uploaded: Rashmika Mandanna's Girlfriend - Hindi Dubbed Full Movie",
      thumbnail: "/placeholder.jpg",
      time: "1 day ago",
      link: "/videos/3",
    },
    {
      id: 4,
      type: "text",
      title: "Thapa Technical uploaded: Suspense in Next.js: Load Async Part Only – Rest of UI Loads Immediately!",
      thumbnail: "/placeholder-logo.png",
      time: "1 day ago",
      link: "/posts/4",
    },
  ]

  // Handle notification popup open
  const handleNotifClick = () => {
    setNotifOpen((prev) => !prev)
    if (!notifOpen) {
      setNotifLoading(true)
      setTimeout(() => {
        setNotifications(dummyNotifications)
        setNotifLoading(false)
      }, 1200)
    }
  }

  // Close popup on outside click
  useEffect(() => {
    if (!notifOpen) return
    const handleClick = (e: MouseEvent) => {
      const notif = document.getElementById("notif-popup")
      const bell = document.getElementById("notif-bell-btn")
      if (notif && !notif.contains(e.target as Node) && bell && !bell.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [notifOpen])

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="mr-2 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-1"
            >
              <Video className="h-8 w-8 text-foreground" />
              <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                YOUTER
              </span>
            </motion.div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className={`flex-1 max-w-md ${isMobile ? 'mx-2' : 'mx-8'}`}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder={isMobile ? "Search..." : "Search videos, posts, users..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full outline-none ring-0 focus:ring-0 focus:outline-none transition duration-200"
              />
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {!isMobile && <ThemeToggle />}

            <Button variant="ghost" size="icon" asChild className="relative" title="Upload Video">
              <Link href="/upload">
                <Upload className="h-5 w-5" />
              </Link>
            </Button>

            {/* Notification Button & Popup */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              id="notif-bell-btn"
              type="button"
              title="Notifications"
              onClick={handleNotifClick}
            >
              <Bell className="h-5 w-5" />
              {notifications.length !== 0 && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs border-2 border-background"></span>
              )}
            </Button>
            {notifOpen && (
              <div
                id="notif-popup"
                className={`absolute ${isMobile ? 'right-4 top-14 w-80' : 'right-16 top-14 w-96'
                  } max-w-full bg-background border border-border rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2`}
              >
                <div className="p-4 border-b font-semibold text-lg">Notifications</div>
                <div className="max-h-96 overflow-y-auto">
                  {notifLoading ? (
                    <div className="flex justify-center items-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">No notifications</div>
                  ) : (
                    notifications.map((notif) => (
                      <Link
                        key={notif.id}
                        href={notif.link}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition"
                      >
                        <img
                          src={notif.thumbnail}
                          alt="thumbnail"
                          className="h-12 w-12 rounded object-cover border"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm line-clamp-2">{notif.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">{notif.time}</div>
                        </div>
                        {notif.type === "video" ? (
                          <Video className="h-5 w-5 text-primary" />
                        ) : (
                          <MessageCircle className="h-5 w-5 text-primary" />
                        )}
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}

            {!isMobile && (
              <Button variant="ghost" size="icon" asChild className="relative" title="Messages">
                <Link href="/messages">
                  <MessageCircle className="h-5 w-5" />
                </Link>
              </Button>
            )}

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-slate-600">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.displayName} />
                    <AvatarFallback>{user?.displayName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{user?.displayName}</p>
                  <p className="text-xs leading-none text-muted-foreground">@{user?.username}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/profile/${user?.username}`}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                {isMobile && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/messages">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        <span>Messages</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <div className="flex items-center w-full">
                        <ThemeToggle />
                      </div>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Navbar