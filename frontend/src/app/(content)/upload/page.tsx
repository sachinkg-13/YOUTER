'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Upload,
  Video,
  FileText,
  Image as ImageIcon,
  Hash,
  X,
  Plus
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
// import { useAuthStore } from '../../lib/store';

export default function UploadPage() {
  const [postType, setPostType] = useState<'text' | 'video'>('text');
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [currentHashtag, setCurrentHashtag] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  // const { user } = useAuthStore();

  const addHashtag = () => {
    if (currentHashtag.trim() && !hashtags.includes(currentHashtag.trim())) {
      setHashtags([...hashtags, currentHashtag.trim()]);
      setCurrentHashtag('');
    }
  };

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter(t => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error('Please add some content');
      return;
    }

    if (postType === 'video' && !videoFile) {
      toast.error('Please select a video file');
      return;
    }

    setIsUploading(true);

    try {
      // TODO: Implement actual upload logic
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate upload

      toast.success('Post created successfully!');
      router.push('/home');
    } catch (error) {
      toast.error('Failed to create post');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="">

      <main className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
            <Upload className="h-8 w-8 text-primary" />
            Create New Post
          </h1>
          <p className="text-muted-foreground mt-2">
            Share your thoughts or upload a video to engage with your audience
          </p>
        </motion.div>

        {/* Upload Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`}
                    alt={""}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>@{""}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Post Type Selection */}
                <Tabs value={postType} onValueChange={(value) => setPostType(value as 'text' | 'video')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="text" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Text Post
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Video Post
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="text" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="content">What's on your mind?</Label>
                      <Textarea
                        id="content"
                        placeholder="Share your thoughts..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[120px] resize-none bg-muted/50 border-0 focus:bg-background"
                        maxLength={280}
                      />
                      <div className="text-xs text-muted-foreground text-right">
                        {content.length}/280
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="video" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="video">Upload Video</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <input
                          type="file"
                          id="video"
                          accept="video/*"
                          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        <label htmlFor="video" className="cursor-pointer">
                          <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">
                            {videoFile ? videoFile.name : 'Click to upload video'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            MP4, WebM, or MOV (max 100MB)
                          </p>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="video-title">Video Title</Label>
                      <Input
                        id="video-title"
                        placeholder="Give your video a catchy title..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="bg-muted/50 border-0 focus:bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="thumbnail">Thumbnail (Optional)</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                        <input
                          type="file"
                          id="thumbnail"
                          accept="image/*"
                          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                        <label htmlFor="thumbnail" className="cursor-pointer">
                          <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            {thumbnail ? thumbnail.name : 'Upload custom thumbnail'}
                          </p>
                        </label>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Hashtags */}
                <div className="space-y-3">
                  <Label>Hashtags</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Add hashtag"
                        value={currentHashtag}
                        onChange={(e) => setCurrentHashtag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHashtag())}
                        className="pl-10 bg-muted/50 border-0 focus:bg-background"
                      />
                    </div>
                    <Button type="button" onClick={addHashtag} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {hashtags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          #{tag}
                          <X
                            className="h-3 w-3 cursor-pointer hover:text-destructive"
                            onClick={() => removeHashtag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isUploading}>
                    {isUploading ? 'Publishing...' : 'Publish'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>

  );
}