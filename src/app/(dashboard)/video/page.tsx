import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import VideoPlayer from '@/components/VideoPlayer';
import { BookMarked, Calendar, Eye, Heart, MessageSquare, Send, ThumbsUp } from 'lucide-react';

export default function VideoPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-12 grid-rows-2 p-2 md:p-8">

      {/* Video Player */}
      <div className="col-span-5 flex gap-8">
        <VideoPlayer />

        {/* Rating Section */}
        <Card >
          <CardHeader>
            <h3 className="font-semibold">Actions</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-start gap-3"
            >
              <ThumbsUp className={`w-4 h-4 `} />
              Like
            </Button>
            <Button
              className="w-full justify-start gap-3"
            >
              <Heart className={`w-4 h-4 `} />
              Add to Favorites
            </Button>
            <Button
              className="w-full justify-start gap-3"
            >
              <BookMarked className={`w-4 h-4 `} />
              Add to Watch Later
            </Button>

          </CardContent>
        </Card>
      </div>


      {/* Description Section */}
      <Card className='col-span-3'>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold leading-tight">
                How to sell drugs online
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>24,567 views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Published 3 days ago</span>
                </div>
                <Badge variant="secondary">Sales</Badge>
                <Badge variant="secondary">IT</Badge>
                <Badge variant="secondary">Marketing</Badge>
              </div>
            </div>

            <Separator />

            {/* Channel Info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/82981330?v=4" />
                  <AvatarFallback>TC</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Tomasxwav</h3>
                  <p className="text-sm text-muted-foreground">125 videos</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-semibold">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                In this comprehensive tutorial, we'll explore advanced forms to sell drugs online. 
                We'll cover administration, payments, and marketing, and how to evaluate the success of your campaign.
                We'll also cover how to handle refunds and disputes, and how to prevent fraud.

              </p>
              <p className="text-muted-foreground leading-relaxed">
                Topics covered: • Forms • Validation • Payments • Refunds • Disputes • Fraud Prevention
                 • Security • Marketing
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <div className='bg-card rounded-lg  col-span-2'>
        <div className='p-4 border-b flex items-center justify-between'>
          <h1 className='text-2xl font-bold '>Comments </h1>
          <span className='text-sm text-foreground/40 flex gap-2 items-center'><MessageSquare className='size-4' />0 Comments</span>
        </div>
        <div className='p-4'>
          <div className='flex items-center gap-4'>
            <img src='https://avatars.githubusercontent.com/u/82981330?v=4' alt='Avatar' className='w-16 h-16 rounded-full' />
            <div className='flex flex-col'>
              <div className='flex items-center justify-between w-full'>
                <div className='flex items-center space-x-2'>
                  <h1 className='text-lg font-bold'>Tomasxwav</h1>
                  <p className='text-sm text-foreground/40'>Sales</p>
                </div>
                <span className='text-sm text-foreground/40'>2 days ago</span>
              </div>
              <p className='text-xs ml-2 mt-2'>Lorem ipsum dolor sit scing nec, ultricinas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orc</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 p-8 ">
          <Textarea
            placeholder="Add a comment..."
            className="min-h-[80px] resize-none"
          />
          <div className="flex justify-end">
            <Button size="sm" >
              <Send className="w-4 h-4 mr-2" />
              Post
            </Button>
          </div>
        </div> 
      </div>
    </div>
  );
}