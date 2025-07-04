"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Send, Phone, Video, MoreHorizontal, UserPlus, MessageCircle, Check, CheckCheck } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardHeader } from "../../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import { ScrollArea } from "../../../components/ui/scroll-area"
import { Separator } from "../../../components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu"

// Mock conversations data
const mockConversations = [
  {
    id: "1",
    participant: {
      id: "1",
      username: "webdevpro",
      displayName: "WebDev Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      online: true,
    },
    lastMessage: {
      id: "1",
      content: "Thanks for the feedback on my latest tutorial! 🙏",
      timestamp: "2024-01-14T15:30:00Z",
      isRead: true,
      isOwn: false,
    },
    unreadCount: 0,
  },
  {
    id: "2",
    participant: {
      id: "2",
      username: "lifestyleblogger",
      displayName: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
      online: false,
      lastSeen: "2024-01-14T12:00:00Z",
    },
    lastMessage: {
      id: "2",
      content: "Would love to collaborate on a project!",
      timestamp: "2024-01-14T14:45:00Z",
      isRead: false,
      isOwn: false,
    },
    unreadCount: 2,
  },
  {
    id: "3",
    participant: {
      id: "3",
      username: "typescriptguru",
      displayName: "TypeScript Guru",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      online: true,
    },
    lastMessage: {
      id: "3",
      content: "You: That's a great point about type safety!",
      timestamp: "2024-01-14T11:20:00Z",
      isRead: true,
      isOwn: true,
    },
    unreadCount: 0,
  },
  {
    id: "4",
    participant: {
      id: "4",
      username: "photopro",
      displayName: "Photo Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      online: false,
      lastSeen: "2024-01-14T10:30:00Z",
    },
    lastMessage: {
      id: "4",
      content: "Check out my latest photography tips video!",
      timestamp: "2024-01-14T10:15:00Z",
      isRead: true,
      isOwn: false,
    },
    unreadCount: 0,
  },
]

// Mock messages for active conversation
const mockMessages = [
  {
    id: "1",
    content: "Hey! I watched your latest video about Next.js 15. Really helpful!",
    timestamp: "2024-01-14T15:00:00Z",
    isOwn: false,
    isRead: true,
  },
  {
    id: "2",
    content: "Thanks so much! I'm glad you found it useful. Are you working on any Next.js projects?",
    timestamp: "2024-01-14T15:05:00Z",
    isOwn: true,
    isRead: true,
  },
  {
    id: "3",
    content: "Yes, I'm building a content platform similar to this one actually. Your tutorial came at the perfect time!",
    timestamp: "2024-01-14T15:10:00Z",
    isOwn: false,
    isRead: true,
  },
  {
    id: "4",
    content: "That's awesome! Feel free to reach out if you have any questions during development.",
    timestamp: "2024-01-14T15:15:00Z",
    isOwn: true,
    isRead: true,
  },
  {
    id: "5",
    content: "Thanks for the feedback on my latest tutorial! 🙏",
    timestamp: "2024-01-14T15:30:00Z",
    isOwn: false,
    isRead: true,
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [messageInput, setMessageInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = mockConversations.filter(conv =>
    conv.participant.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participant.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // TODO: Implement message sending
      console.log("Sending message:", messageInput)
      setMessageInput("")
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="w-full relative">
      <main className="h-[calc(100vh-5rem)]">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-80 border-r bg-card">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Messages</h1>
                <Button variant="ghost" size="icon">
                  <UserPlus className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Conversations */}
            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredConversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg cursor-pointer transition-colors mb-1 ${
                      selectedConversation.id === conversation.id 
                        ? "bg-primary/10 border border-primary/20" 
                        : "hover:bg-accent"
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.displayName} />
                          <AvatarFallback>{conversation.participant.displayName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.participant.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <span className="font-medium truncate">{conversation.participant.displayName}</span>
                            {conversation.participant.verified && (
                              <div className="h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-primary-foreground text-xs">✓</span>
                              </div>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.lastMessage.content}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <Badge className="ml-2 bg-primary text-primary-foreground">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConversation.participant.avatar} alt={selectedConversation.participant.displayName} />
                      <AvatarFallback>{selectedConversation.participant.displayName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {selectedConversation.participant.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">{selectedConversation.participant.displayName}</span>
                      {selectedConversation.participant.verified && (
                        <div className="h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {selectedConversation.participant.online 
                        ? "Online" 
                        : `Last seen ${formatTime(selectedConversation.participant.lastSeen || "")}`
                      }
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                      <DropdownMenuItem>Block User</DropdownMenuItem>
                      <DropdownMenuItem>Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[70%] ${message.isOwn ? "order-2" : "order-1"}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          message.isOwn
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div className={`flex items-center mt-1 space-x-1 ${message.isOwn ? "justify-end" : "justify-start"}`}>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.isOwn && (
                          <div className="text-muted-foreground">
                            {message.isRead ? (
                              <CheckCheck className="h-3 w-3" />
                            ) : (
                              <Check className="h-3 w-3" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t bg-card">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
