"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useEffect } from "react"
import {
  Home,
  Video,
  Users,
  Compass,
  MessageCircle,
  Bookmark,
  TrendingUp,
  Hash,
  ChevronLeft,
  ChevronRight,
  FileText,
  X,
} from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import { useIsMobile } from "../ui/use-mobile"

const navigation = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Posts", href: "/posts", icon: FileText },
  { name: "Videos", href: "/videos", icon: Video },
  { name: "Explore", href: "/explore", icon: Compass },
  { name: "Subscriptions", href: "/subscriptions", icon: Users },
  { name: "Messages", href: "/messages", icon: MessageCircle },
  { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { name: "Trending", href: "/trending", icon: TrendingUp },
]

const trendingTopics = ["#TechNews", "#WebDev", "#AI", "#NextJS", "#React", "#TypeScript"]

interface AppSidebarProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  className?: string
  isOpen?: boolean
  setIsOpen?: (isOpen: boolean) => void
}

export function AppSidebar({ collapsed, setCollapsed, className, isOpen, setIsOpen }: AppSidebarProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile && !collapsed) {
      setCollapsed(true)
    }
  }, [isMobile, collapsed, setCollapsed])

  // Close sidebar when clicking on navigation links on mobile
  const handleLinkClick = () => {
    if (isMobile && setIsOpen) {
      setIsOpen(false)
    }
  }

  // Handle backdrop click on mobile
  const handleBackdropClick = () => {
    if (isMobile && setIsOpen) {
      setIsOpen(false)
    }
  }

  // Handle swipe gestures on mobile
  useEffect(() => {
    if (!isMobile || !isOpen) return

    let startX = 0
    let currentX = 0
    let isDragging = false

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      isDragging = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      currentX = e.touches[0].clientX
      const diffX = currentX - startX

      // Only allow swiping left (negative direction)
      if (diffX < -10) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDragging) return
      isDragging = false

      const diffX = currentX - startX
      // If swiped more than 50px to the left, close the sidebar
      if (diffX < -50 && setIsOpen) {
        setIsOpen(false)
      }
    }

    const sidebar = document.getElementById('mobile-sidebar')
    if (sidebar) {
      sidebar.addEventListener('touchstart', handleTouchStart, { passive: false })
      sidebar.addEventListener('touchmove', handleTouchMove, { passive: false })
      sidebar.addEventListener('touchend', handleTouchEnd, { passive: false })
    }

    return () => {
      if (sidebar) {
        sidebar.removeEventListener('touchstart', handleTouchStart)
        sidebar.removeEventListener('touchmove', handleTouchMove)
        sidebar.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isMobile, isOpen, setIsOpen])

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleBackdropClick}
        />
      )}

      <motion.aside
        id="mobile-sidebar"
        initial={{ x: -300 }}
        animate={{
          x: isMobile ? (isOpen ? 0 : -300) : 0
        }}
        className={cn(
          "fixed z-50 h-[calc(100vh-4rem)] bg-background border-r transition-all duration-300",
          // Desktop styles
          !isMobile && (collapsed ? "w-16" : "w-64"),
          // Mobile styles
          isMobile && "w-64 mobile-sidebar",
          className,
        )}
      >
        <div className={`flex flex-col h-full ${isMobile && "mt-4"}`}>
          {/* Toggle Button */}
          {!isMobile && <div className={cn(
            "flex p-2",
            isMobile ? "justify-between items-center" : (collapsed ? "justify-center" : "justify-end")
          )}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => isMobile && setIsOpen ? setIsOpen(false) : setCollapsed(!collapsed)}
              className="h-8 w-8"
            >
              {(
                collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>}

          {/* Navigation */}
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href} onClick={handleLinkClick}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {(!collapsed || isMobile) && <span className="ml-3 truncate">{item.name}</span>}
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* Trending Topics */}
          {(!collapsed || isMobile) && (
            <div className="p-4 border-t">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">Trending</h3>
              <div className="space-y-2">
                {trendingTopics.map((topic) => (
                  <Link
                    key={topic}
                    href={`/search?q=${encodeURIComponent(topic)}`}
                    onClick={handleLinkClick}
                    className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Hash className="h-3 w-3 mr-2" />
                    {topic.slice(1)}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  )
}