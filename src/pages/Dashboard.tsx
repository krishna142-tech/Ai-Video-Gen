import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Download, Trash2, Plus, Calendar, Clock, FileText, Video as VideoIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface VideoProject {
  id: string;
  title: string;
  script: string;
  status: 'processing' | 'completed' | 'failed';
  createdAt: string;
  duration: number;
  views: number;
  downloadUrl?: string;
  thumbnailUrl?: string;
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [projects] = useState<VideoProject[]>([
    {
      id: '1',
      title: 'Social Media Marketing Tips',
      script: 'Learn the top 5 strategies for social media success...',
      status: 'completed',
      createdAt: '2024-01-15',
      duration: 60,
      views: 1250,
      downloadUrl: '#',
      thumbnailUrl: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'AI Revolution in Business',
      script: 'How artificial intelligence is transforming modern business...',
      status: 'processing',
      createdAt: '2024-01-14',
      duration: 45,
      views: 0
    },
    {
      id: '3',
      title: 'Productivity Hacks for Entrepreneurs',
      script: 'Discover the secrets to maximizing your daily productivity...',
      status: 'completed',
      createdAt: '2024-01-13',
      duration: 90,
      views: 2100,
      downloadUrl: '#',
      thumbnailUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);

  const stats = [
    { label: 'Total Videos', value: projects.length, icon: VideoIcon },
    { label: 'Total Views', value: projects.reduce((sum, p) => sum + p.views, 0).toLocaleString(), icon: Play },
    { label: 'Credits Remaining', value: user?.credits || 0, icon: FileText },
    { label: 'This Month', value: projects.filter(p => new Date(p.createdAt).getMonth() === new Date().getMonth()).length, icon: Calendar }
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-300">Manage your AI-generated videos and track your success.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
            to="/editor"
            className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Video</span>
          </Link>
          <Link
            to="/analytics"
            className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Clock className="h-5 w-5" />
            <span>View Analytics</span>
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Your Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
                <div className="aspect-video bg-gray-700 relative">
                  {project.thumbnailUrl ? (
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <VideoIcon className="h-12 w-12 text-gray-500" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : project.status === 'processing'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.script}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{project.duration}s</span>
                    <span>{project.views} views</span>
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    {project.status === 'completed' && (
                      <>
                        <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                          <Play className="h-4 w-4 mx-auto" />
                        </button>
                        <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                          <Download className="h-4 w-4 mx-auto" />
                        </button>
                      </>
                    )}
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};