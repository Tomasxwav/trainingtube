import { Pencil, Table, Trash2 } from 'lucide-react';

export default function EmployeeVideosTable({ videos }: { videos: any[] }) {

    if (!videos || videos.length === 0) {
        return (
        <div className="bg-background p-4 rounded-lg shadow-sm mb-6">
            <div className="flex items-center justify-center h-full">
            <p className="text-dark-500">No videos found</p>
            </div>
        </div>
        );
    }

  return (
    <div className="bg-background p-4 rounded-lg shadow-sm mb-6">
      {videos.length > 0 ? (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Video ID</th>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
              <th className="py-2 px-4">Rating</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.id} className="border-b">
                <td className="py-2 px-4">{video.id}</td>
                <td className="py-2 px-4">{video.title}</td>
                <td className="py-2 px-4">{video.status}</td>
                <td className="py-2 px-4">
                  <button className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
                    <Pencil size={16} />
                  </button>
                  <button className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
                <td className="py-2 px-4">{video.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-dark-500">No videos found</p>
        </div>
      )}
    </div>
  );
}