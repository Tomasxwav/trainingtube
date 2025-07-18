'use client';

import { useVideosActions } from '@/actions/useVideosActions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import VideoPlayer from '@/components/VideoPlayer';
import { sinceDate } from '@/utils/sinceDate';
import { BookMarked, Calendar, Eye, Heart, MessageSquare, Send, ThumbsUp } from 'lucide-react';
import {  useSearchParams } from 'next/navigation';

export default function VideoPage() {

  const { videos, addFavoriteVideo } = useVideosActions();
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get('url') ? decodeURIComponent(searchParams.get('url')!) : '';
  const video = videos.find((video) => video.videoUrl === videoUrl.replaceAll(' ', '%20'));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8  2xl:gap-12 p-2 md:p-8">

      {/* Video Player */}
      <div className="lg:col-span-5 flex lg:gap-8 flex-col xl:flex-row gap-4">
        <VideoPlayer videoUrl={videoUrl} />

        {/* Rating Section */}
        <Card className='gap-2 m-0 p-0 md:py-4 '>
          <span className='hidden md:inline-block'>
            <CardHeader>
              <h3 className="font-semibold md:mb-2">Acciones</h3>
            </CardHeader>
            <Separator />
          </span>
          <CardContent className="flex justify-around gap-2 flex-wrap py-4"> 
            <Button
              className="md:w-full justify-start md:gap-3" 
            >
              <ThumbsUp className={`w-4 h-4 `} />
              <span className='hidden md:inline-block'>Me gusta</span>
            </Button>
            <Button
              className="md:w-full justify-start md:gap-3"
              onClick={() => addFavoriteVideo(video?.id)}
            >
              <Heart className={`w-4 h-4 `} />
              <span className='hidden md:inline-block'>Agregar a Favoritos</span>
            </Button>
            <Button
              className="md:w-full justify-start md:gap-3"
            >
              <BookMarked className={`w-4 h-4 `} />
              <span className='hidden md:inline-block'>Ver más tarde</span>
            </Button>

          </CardContent>
        </Card>
      </div>


      {/* Description Section */}
      <Card className='lg:col-span-3'>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold leading-tight">
                {video?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>24,567 vistas</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{sinceDate(video?.uploadDate)}</span>
                </div>
                <Badge variant="secondary">Ventas</Badge>
                <Badge variant="secondary">TI</Badge>
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
              <h3 className="font-semibold">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed">

                {video?.description.concat(`En este tutorial completo, exploraremos formularios avanzados para vender productos en línea. 
                Cubriremos administración, pagos y marketing, y cómo evaluar el éxito de tu campaña.
                También veremos cómo manejar reembolsos y disputas, y cómo prevenir fraudes.
                En este tutorial completo, exploraremos formularios avanzados para vender productos en línea. 
                Cubriremos administración, pagos y marketing, y cómo evaluar el éxito de tu campaña.
                También veremos cómo manejar reembolsos y disputas, y cómo prevenir fraudes.`)}

              </p>
              <p className="text-muted-foreground leading-relaxed">
                Temas cubiertos: • Formularios • Validación • Pagos • Reembolsos • Disputas • Prevención de Fraudes
                 • Seguridad • Marketing
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <div className='bg-card rounded-lg  lg:col-span-2'>
        <div className='p-4 border-b flex items-center justify-between'>
          <h1 className='text-2xl font-bold '>Comentarios </h1>
          <span className='text-sm text-foreground/40 flex gap-2 items-center'><MessageSquare className='size-4' />0 Comentarios</span>
        </div>
        <div className='p-4'>
          <div className='flex items-center gap-4'>
            <img src='https://avatars.githubusercontent.com/u/82981330?v=4' alt='Avatar' className='w-16 h-16 rounded-full' />
            <div className='flex flex-col'>
              <div className='flex items-center justify-between w-full'>
                <div className='flex items-center space-x-2'>
                  <h1 className='text-lg font-bold'>Tomasxwav</h1>
                  <p className='text-sm text-foreground/40'>{video?.department}</p>
                </div>
                <span className='text-sm text-foreground/40'>{sinceDate(video?.uploadDate)}</span>
              </div>
              <p className='text-xs ml-2 mt-2'>Lorem ipsum dolor sit scing nec, ultricinas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orc</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 p-8 ">
          <Textarea
            placeholder="Agrega un comentario..."
            className="min-h-[80px] resize-none"
          />
          <div className="flex justify-end">
            <Button size="sm" >
              <Send className="w-4 h-4 mr-2" />
              Publicar
            </Button>
          </div>
        </div> 
      </div>
    </div>
  );
}