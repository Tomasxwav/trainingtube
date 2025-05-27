'use client';

import { useState } from 'react';
import { Plus, Search, Filter} from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import VideoManagementTable from './VideoManagementTable';

export default function VideoManagement() {

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [categoryFilter, setCategoryFilter] = useState('all');
  const categories = ['Training', 'Safety', 'Compliance', 'Onboarding', 'Technical Skills'];

  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-dark-900 mb-2">Manage Videos</h1>
          <p className="text-dark-600">Upload, edit and manage training videos</p>
        </div>
        
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center  text-white text-md rounded-md transition-all font-bold cursor-pointer " 
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
            <Input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-dark-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-dark-500" />

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
      

      <VideoManagementTable />
      
    </div>
  );
}