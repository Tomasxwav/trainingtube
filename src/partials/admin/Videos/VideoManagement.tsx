'use client';

import { useEffect, useState } from 'react';
import { Plus, Search, Filter, Film, BarChart3, Eye, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import VideoManagementModal from '@/partials/admin/Videos/VideoManagementModal';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import VideoManagementTable from '@/partials/admin/Videos/VideoManagementTable';
import { useDepartmentStore } from '@/stores/departmentStore'; 
import { useVideosActions } from '@/actions/useVideosActions';
import { Video, VideoUpload } from '@/types/videos';
import { toast } from 'sonner';

export default function VideoManagement() {
  const departments = useDepartmentStore((state) => state.departments);
  const { getAllVideos, updateVideo, deleteVideo, addVideo } = useVideosActions();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);

  useEffect(() => {
    setLoading(true)
    getAllVideos()
      .then((data: Video[]) => {
        setVideos(data || [])
      })
      .finally(() => setLoading(false))
  }, [refreshTrigger])

  const handleVideosChanged = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleAddVideo = async (video: VideoUpload) => {
    try {
      await addVideo(video);
      
      const updatedVideos = await getAllVideos();
      setVideos(updatedVideos || []);
      
      setIsModalOpen(false);
      toast.success('Video agregado exitosamente!');
    } catch (error) {
      console.error('Error al agregar video:', error);
      toast.error('No se pudo agregar el video. Por favor, inténtalo de nuevo.');
    }
  };

  const handleUpdateVideo = async (video: VideoUpload) => {
    if (!editingVideo) return;
    
    try {
      const updatedVideoData: Video = {
        ...editingVideo,
        title: video.title,
        description: video.description,
        department: departments.find(d => d.id === video.department_id.toString()) || editingVideo.department
      };

      await updateVideo(updatedVideoData);
      
      setVideos(prev => prev.map(v => v.id === editingVideo.id ? updatedVideoData : v));
      
      setEditingVideo(null);
      setIsModalOpen(false);
      toast.success('Video actualizado exitosamente!');
    } catch (error) {
      console.error('Error al actualizar video:', error);
      toast.error('No se pudo actualizar el video. Por favor, inténtalo de nuevo.');
    }
  };

  const handleDeleteVideo = async (id: string) => {
    try {
      await deleteVideo(id);
      
      // Actualizar el estado local removiendo el video
      setVideos(prev => prev.filter(v => v.id !== id));
      
      toast.success('Video eliminado exitosamente!');
    } catch (error) {
      console.error('Error al eliminar video:', error);
      toast.error('No se pudo eliminar el video. Por favor, inténtalo de nuevo.');
    }
  };

  const handleEditVideo = (video: Video) => {
    setEditingVideo(video);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingVideo(null);
    setIsModalOpen(true);
  };

   const closeModal = () => {
    setIsModalOpen(false);
    setEditingVideo(null);
  };

  return (
    <div className="animate-fade-in space-y-6">
      {/* Sección de encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Film className="h-8 w-8 text-primary" />
            Gestión de Videos
          </h1>
          <p className="text-muted-foreground">
            Sube, organiza y administra tu biblioteca de videos de capacitación
          </p>
        </div>
        
        <Button
          onClick={openCreateModal}
          className="flex items-center gap-2 mt-4 sm:mt-0" 
        >
          <Plus size={18} />
          Agregar Nuevo Video
        </Button>
      </div>

      {/* Tarjetas de estadísticas */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Videos</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVideos}</div>
            <p className="text-xs text-muted-foreground">
              <Badge variant="secondary" className="text-xs">
                +{stats.recentUploads} este mes
              </Badge>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Visualizaciones</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% respecto al mes pasado
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calificación Promedio</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgRating}/5</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">Comentarios excelentes</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departamentos</CardTitle>
            <Badge variant="outline">{departments.length}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">
              Departamentos activos
            </p>
          </CardContent>
        </Card>
      </div> */}
      
      {/* Sección de filtros */}
      <Card>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar videos por título, descripción o departamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <Filter size={18} className="text-muted-foreground" />
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="px-5">
                  <SelectValue placeholder="Filtrar por departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Departamentos</SelectLabel>
                    <SelectItem value="all">Todos los Departamentos</SelectItem>
                    {departments.map((dpto) => (
                      <SelectItem key={dpto.id} value={dpto.name}>
                        {dpto.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de videos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Film className="h-5 w-5" />
            Biblioteca de Videos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <VideoManagementTable 
            videos={videos}
            onEdit={handleEditVideo}
            onDelete={handleDeleteVideo}
            isLoading={loading}
            searchTerm={searchTerm} 
            departmentFilter={departmentFilter} 
            refreshTrigger={refreshTrigger}
          />
        </CardContent>
      </Card>

      <VideoManagementModal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        video={editingVideo}
        handleAction={editingVideo ? handleUpdateVideo : handleAddVideo}
      />
    </div>
  );
}