'use client';

import { useState } from 'react';
import { useVideoStore, Video } from '@/stores/videoStore';
import { Plus, Pencil, Trash2, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoManagementModal from './VideoManagementModal';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function VideoManagement() {
  const { videos, addVideo, updateVideo, deleteVideo, getAverageRating } = useVideoStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  const categories = Array.from(
    new Set(videos.flatMap((video) => video.categories))
  );
  
  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === null || video.categories.includes(categoryFilter) || categoryFilter === 'all';
    
    return matchesSearch && matchesCategory;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  const handleEdit = (video: Video) => {
    setCurrentVideo(video);
    setIsEditModalOpen(true);
  };
  
  const handleDelete = (video: Video) => {
    setCurrentVideo(video);
    setIsDeleteModalOpen(true);
  };
  
  const confirmDelete = () => {
    if (currentVideo) {
      deleteVideo(currentVideo.id);
      setIsDeleteModalOpen(false);
      setCurrentVideo(null);
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark-900 mb-2">Manage Videos</h1>
          <p className="text-dark-600">Upload, edit and manage training videos</p>
        </div>
        
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center bg-primary text-white text-md rounded-md transition-all font-bold cursor-pointer " 
        >
          <Plus size={18} className="mr-1" />
          Add New Video
        </Button>

        <VideoManagementModal isOpen={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
      </div>
      
      <div className="bg-background p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-dark-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-dark-500" />
            {/* <select
              value={categoryFilter || ''}
              onChange={(e) => setCategoryFilter(e.target.value || null)}
              className="border border-dark-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select> */}

            <Select onValueChange={(value) => setCategoryFilter(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>


          </div>
        </div>
      </div>
      
      <div className="bg-background rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-dark-50 border-b border-dark-100">
                <th className="text-left py-3 px-4 text-dark-600 font-medium">Video</th>
                <th className="text-center py-3 px-4 text-dark-600 font-medium">Duration</th>
                <th className="text-center py-3 px-4 text-dark-600 font-medium">Views</th>
                <th className="text-center py-3 px-4 text-dark-600 font-medium">Rating</th>
                <th className="text-center py-3 px-4 text-dark-600 font-medium">Uploaded</th>
                <th className="text-center py-3 px-4 text-dark-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video) => (
                  <tr key={video.id} className="border-b border-dark-50 hover:bg-dark-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-16 h-9 object-cover rounded mr-3"
                        />
                        <div>
                          <p className="font-medium text-dark-900">{video.title}</p>
                          <p className="text-xs text-dark-500 mt-1 line-clamp-1">
                            {video.categories.join(', ')}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-dark-900">{video.duration}</td>
                    <td className="py-3 px-4 text-center text-dark-900">{video.views}</td>
                    <td className="py-3 px-4 text-center text-dark-900">
                      {getAverageRating(video.id).toFixed(1)}
                    </td>
                    <td className="py-3 px-4 text-center text-dark-900">
                      {formatDate(video.uploadedAt)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(video)}
                          className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(video)}
                          className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-dark-600">
                    No videos found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modals would be implemented here */}
      {/* For simplicity, we're not implementing the full forms */}
      {isDeleteModalOpen && currentVideo && (
        <div className="fixed inset-0 bg-dark-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full animate-fade-in">
            <h3 className="text-lg font-bold text-dark-900 mb-4">Delete Video</h3>
            <p className="text-dark-700 mb-6">
              Are you sure you want to delete "{currentVideo.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-dark-300 text-dark-700 rounded-md hover:bg-dark-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}