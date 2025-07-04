import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Eye, Clock, Download, Users, Play } from 'lucide-react';

const viewsData = [
  { name: 'Jan', views: 1200, downloads: 45 },
  { name: 'Feb', views: 1900, downloads: 68 },
  { name: 'Mar', views: 2400, downloads: 89 },
  { name: 'Apr', views: 2100, downloads: 72 },
  { name: 'May', views: 2800, downloads: 95 },
  { name: 'Jun', views: 3200, downloads: 118 },
];

const topVideos = [
  { title: 'Social Media Marketing Tips', views: 1250, downloads: 42 },
  { title: 'AI Revolution in Business', views: 980, downloads: 38 },
  { title: 'Productivity Hacks', views: 2100, downloads: 67 },
  { title: 'Digital Marketing Trends', views: 1800, downloads: 55 },
  { title: 'Content Creation Guide', views: 1400, downloads: 48 },
];

const formatData = [
  { name: 'YouTube', value: 45, color: '#8B5CF6' },
  { name: 'Instagram', value: 30, color: '#3B82F6' },
  { name: 'TikTok', value: 25, color: '#10B981' },
];

export const Analytics: React.FC = () => {
  const stats = [
    { label: 'Total Views', value: '12.5K', change: '+23%', icon: Eye, color: 'text-blue-400' },
    { label: 'Total Downloads', value: '456', change: '+18%', icon: Download, color: 'text-green-400' },
    { label: 'Watch Time', value: '2.8K hrs', change: '+12%', icon: Clock, color: 'text-purple-400' },
    { label: 'Engagement Rate', value: '8.3%', change: '+5%', icon: Users, color: 'text-pink-400' },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-gray-300">Track your video performance and engagement metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-opacity-20 flex items-center justify-center ${stat.color.replace('text-', 'bg-')}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <span className="text-sm text-green-400">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Views Over Time */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">Views & Downloads Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
                <Line type="monotone" dataKey="views" stroke="#8B5CF6" strokeWidth={2} />
                <Line type="monotone" dataKey="downloads" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Format Distribution */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <h2 className="text-xl font-semibold text-white mb-4">Video Format Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={formatData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {formatData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Videos */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Top Performing Videos</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-300 pb-2">Video Title</th>
                  <th className="text-left text-gray-300 pb-2">Views</th>
                  <th className="text-left text-gray-300 pb-2">Downloads</th>
                  <th className="text-left text-gray-300 pb-2">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {topVideos.map((video, index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="py-3 text-white">{video.title}</td>
                    <td className="py-3 text-gray-300">{video.views.toLocaleString()}</td>
                    <td className="py-3 text-gray-300">{video.downloads}</td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${(video.downloads / video.views) * 100 * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-400">
                          {((video.downloads / video.views) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Video generated', title: 'AI Business Tips', time: '2 hours ago', icon: Play },
              { action: 'Video downloaded', title: 'Marketing Strategies', time: '4 hours ago', icon: Download },
              { action: 'Video viewed', title: 'Productivity Hacks', time: '6 hours ago', icon: Eye },
              { action: 'Video generated', title: 'Tech Trends 2024', time: '1 day ago', icon: Play },
            ].map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Icon className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white">
                      <span className="font-medium">{activity.action}</span>
                      <span className="text-gray-400"> - {activity.title}</span>
                    </p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};