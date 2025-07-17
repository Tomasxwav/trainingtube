'use client';

import EmployeeVideosScroller from '@/partials/employee/videos/EmployeeVideoScroller';
import { useVideoStore } from '@/stores/videoStore';
import { BookOpen, Clock } from 'lucide-react';

export default function Pending() {
  const { videos } = useVideoStore();
    
  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-xl">
              <Clock size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-dark-900">Pending Training</h1>
              <p className="text-dark-600">Complete these required courses to stay compliant</p>
            </div>
          </div>
          
          {/* Status Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-dark-600">Required Training</span>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary">
              {videos.length} videos pending
            </span>
          </div>
        </div>

        {/* Content */}
        {videos.length > 0 ? (
          <EmployeeVideosScroller videos={videos} />
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-dark-900 mb-2">All caught up! 🎉</h3>
            <p className="text-dark-600 max-w-md mx-auto">
              You have no pending training requirements. Great job staying on top of your learning!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}