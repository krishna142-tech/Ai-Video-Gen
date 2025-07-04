import React, { useState } from 'react';
import { Play, Download, Settings, Upload, Sparkles, Mic, Volume2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface VideoSettings {
  provider: 'did' | 'heygen' | 'synthesia';
  voice: string;
  style: string;
  duration: number;
  format: 'instagram' | 'youtube' | 'tiktok';
}

interface GeneratedVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  duration: number;
  createdAt: string;
}
export const VideoEditor: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [script, setScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<GeneratedVideo | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [settings, setSettings] = useState<VideoSettings>({
    provider: 'did',
    voice: 'natural',
    style: 'professional',
    duration: 60,
    format: 'youtube'
  });

  const voices = [
    { id: 'natural', name: 'Natural (Female)' },
    { id: 'professional', name: 'Professional (Male)' },
    { id: 'casual', name: 'Casual (Female)' },
    { id: 'authoritative', name: 'Authoritative (Male)' }
  ];

  const styles = [
    { id: 'professional', name: 'Professional' },
    { id: 'casual', name: 'Casual' },
    { id: 'energetic', name: 'Energetic' },
    { id: 'calm', name: 'Calm' }
  ];

  const simulateVideoGeneration = async () => {
    const steps = [
      { progress: 20, message: 'Analyzing script...' },
      { progress: 40, message: 'Generating voice audio...' },
      { progress: 60, message: 'Creating video scenes...' },
      { progress: 80, message: 'Adding effects and transitions...' },
      { progress: 100, message: 'Finalizing video...' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGenerationProgress(step.progress);
      toast.loading(step.message, { id: 'generation-progress' });
    }

    toast.dismiss('generation-progress');
  };
  const handleGenerateVideo = async () => {
    if (!script.trim()) {
      toast.error('Please enter a script first');
      return;
    }

    if (!user?.credits || user.credits < 1) {
      toast.error('Insufficient credits. Please upgrade your plan.');
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedVideo(null);
    
    try {
      // Simulate realistic video generation process
      await simulateVideoGeneration();
      
      // Update user credits
      updateUser({ credits: user.credits - 1 });
      
      // Create mock generated video
      const mockVideo: GeneratedVideo = {
        id: Date.now().toString(),
        title: script.slice(0, 50) + (script.length > 50 ? '...' : ''),
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: settings.duration,
        createdAt: new Date().toISOString()
      };
      
      setGeneratedVideo(mockVideo);
      
      toast.success('Video generated successfully!');
    } catch (error) {
      toast.error('Failed to generate video');
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  const handleDownload = () => {
    if (generatedVideo) {
      // Create a temporary download link
      const link = document.createElement('a');
      link.href = generatedVideo.url;
      link.download = `${generatedVideo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Download started');
    }
  };

  const handleNewVideo = () => {
    setGeneratedVideo(null);
    setScript('');
    setGenerationProgress(0);
  };
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create AI Video</h1>
          <p className="text-gray-300">Transform your script into engaging video content</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Script Editor */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4">Script Editor</h2>
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                disabled={isGenerating}
                placeholder="Enter your script here... The AI will generate a video based on your text."
                className="w-full h-64 bg-gray-700/50 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none disabled:opacity-50"
              />
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-400">
                  {script.length} characters • Estimated duration: {Math.ceil(script.length / 10)}s
                </span>
                <div className="flex space-x-2">
                  <button 
                    disabled={isGenerating}
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload</span>
                  </button>
                  <button 
                    disabled={isGenerating}
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Mic className="h-4 w-4" />
                    <span>Record</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Video Settings */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4">Video Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">AI Provider</label>
                  <select
                    value={settings.provider}
                    onChange={(e) => setSettings({...settings, provider: e.target.value as any})}
                    disabled={isGenerating}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                  >
                    <option value="did">D-ID</option>
                    <option value="heygen">HeyGen</option>
                    <option value="synthesia">Synthesia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Voice</label>
                  <select
                    value={settings.voice}
                    onChange={(e) => setSettings({...settings, voice: e.target.value})}
                    disabled={isGenerating}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                  >
                    {voices.map(voice => (
                      <option key={voice.id} value={voice.id}>{voice.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Style</label>
                  <select
                    value={settings.style}
                    onChange={(e) => setSettings({...settings, style: e.target.value})}
                    disabled={isGenerating}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                  >
                    {styles.map(style => (
                      <option key={style.id} value={style.id}>{style.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Format</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['youtube', 'instagram', 'tiktok'].map(format => (
                      <button
                        key={format}
                        onClick={() => setSettings({...settings, format: format as any})}
                        disabled={isGenerating}
                        className={`px-3 py-2 rounded-lg text-sm capitalize transition-colors ${
                          settings.format === format
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50'
                        }`}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Generation Progress */}
            {isGenerating && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Generating Video...</h3>
                <div className="space-y-3">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${generationProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400 text-center">{generationProgress}% complete</p>
                </div>
              </div>
            )}
            {/* Generate Button */}
            {!generatedVideo ? (
              <button
                onClick={handleGenerateVideo}
                disabled={isGenerating || !script.trim()}
                className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating Video...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span>Generate Video</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNewVideo}
                className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                <Sparkles className="h-5 w-5" />
                <span>Create New Video</span>
              </button>
            )}

            <div className="text-center text-sm text-gray-400">
              Cost: 1 credit • {user?.credits || 0} credits remaining
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4">Preview</h2>
              
              <div className="aspect-video bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                {generatedVideo ? (
                  <video
                    src={generatedVideo.url}
                    controls
                    poster={generatedVideo.thumbnail}
                    className="w-full h-full rounded-lg"
                  />
                ) : isGenerating ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-400">Generating your video...</p>
                    <p className="text-sm text-gray-500 mt-2">{generationProgress}% complete</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Play className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Your generated video will appear here</p>
                    <p className="text-sm text-gray-500 mt-2">Enter a script and click generate to start</p>
                  </div>
                )}
              </div>

              {generatedVideo && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>Duration: {generatedVideo.duration}s</span>
                    <span>Created: {new Date(generatedVideo.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleDownload}
                      className="flex-1 flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download MP4</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                      <Settings className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Audio Settings */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-4">Audio Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Background Music</label>
                  <select 
                    disabled={isGenerating}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                  >
                    <option>None</option>
                    <option>Upbeat</option>
                    <option>Calm</option>
                    <option>Corporate</option>
                    <option>Cinematic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Voice Volume</label>
                  <div className="flex items-center space-x-2">
                    <Volume2 className="h-4 w-4 text-gray-400" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="80"
                      disabled={isGenerating}
                      className="flex-1 accent-purple-500 disabled:opacity-50"
                    />
                    <span className="text-sm text-gray-400">80%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Music Volume</label>
                  <div className="flex items-center space-x-2">
                    <Volume2 className="h-4 w-4 text-gray-400" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="20"
                      disabled={isGenerating}
                      className="flex-1 accent-purple-500 disabled:opacity-50"
                    />
                    <span className="text-sm text-gray-400">20%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};