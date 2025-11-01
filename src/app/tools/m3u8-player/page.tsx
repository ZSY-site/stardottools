'use client';

import { useState, useRef } from 'react';

export default function M3U8Player() {
  const [m3u8Url, setM3u8Url] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (!m3u8Url.trim()) {
      setError('请输入有效的M3U8链接');
      return;
    }

    setError('');
    setIsPlaying(true);
    
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(err => {
        setError('播放失败：' + err.message);
        setIsPlaying(false);
      });
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (volume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  };

  const sampleM3U8Urls = [
    {
      name: '示例直播流1',
      url: 'https://example.com/live/stream.m3u8'
    },
    {
      name: '示例直播流2', 
      url: 'https://example.com/video/playlist.m3u8'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">M3U8播放器</h1>
          <p className="text-lg text-gray-300">在线播放M3U8格式的视频流和直播内容</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 控制面板 */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">播放控制</h2>
              
              <div className="space-y-4">
                {/* M3U8链接输入 */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">M3U8链接</label>
                  <input
                    type="url"
                    value={m3u8Url}
                    onChange={(e) => setM3u8Url(e.target.value)}
                    placeholder="请输入M3U8链接地址"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* 错误提示 */}
                {error && (
                  <div className="bg-red-900 border border-red-700 rounded-lg p-3">
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                )}

                {/* 控制按钮 */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={handlePlay}
                    disabled={isPlaying}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 disabled:bg-green-800 disabled:cursor-not-allowed"
                  >
                    播放
                  </button>
                  <button
                    onClick={handlePause}
                    disabled={!isPlaying}
                    className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition duration-200 disabled:bg-yellow-800 disabled:cursor-not-allowed"
                  >
                    暂停
                  </button>
                  <button
                    onClick={handleStop}
                    disabled={!isPlaying}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200 disabled:bg-red-800 disabled:cursor-not-allowed"
                  >
                    停止
                  </button>
                </div>

                {/* 音量控制 */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">音量控制</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    defaultValue="1"
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* 快速跳转 */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">快速跳转</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleSeek(0)}
                      className="bg-gray-700 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                      开始
                    </button>
                    <button
                      onClick={() => handleSeek(30)}
                      className="bg-gray-700 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                      30秒
                    </button>
                    <button
                      onClick={() => handleSeek(60)}
                      className="bg-gray-700 text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                      1分钟
                    </button>
                  </div>
                </div>

                {/* 示例链接 */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-2">示例链接</h3>
                  <div className="space-y-2">
                    {sampleM3U8Urls.map((sample, index) => (
                      <button
                        key={index}
                        onClick={() => setM3u8Url(sample.url)}
                        className="w-full text-left p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200"
                      >
                        <div className="text-blue-400 text-sm">{sample.name}</div>
                        <div className="text-gray-400 text-xs truncate">{sample.url}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 视频播放区域 */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-lg shadow-lg overflow-hidden">
              {isPlaying ? (
                <video
                  ref={videoRef}
                  controls
                  className="w-full h-96 lg:h-[480px] bg-black"
                  crossOrigin="anonymous"
                >
                  <source src={m3u8Url} type="application/x-mpegURL" />
                  您的浏览器不支持M3U8视频播放
                </video>
              ) : (
                <div className="w-full h-96 lg:h-[480px] bg-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl text-gray-600 mb-4">🎬</div>
                    <p className="text-gray-400">请输入M3U8链接并点击播放按钮</p>
                  </div>
                </div>
              )}
            </div>

            {/* 播放信息 */}
            <div className="mt-4 bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">播放信息</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">状态：</span>
                  <span className={isPlaying ? 'text-green-400' : 'text-yellow-400'}>
                    {isPlaying ? '播放中' : '待播放'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">链接：</span>
                  <span className="text-blue-400 truncate">{m3u8Url || '未输入'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 功能特性 */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg shadow p-6 text-center">
            <div className="text-3xl mb-3">📺</div>
            <h3 className="font-semibold text-white mb-2">流媒体支持</h3>
            <p className="text-gray-400 text-sm">支持M3U8格式的直播流和点播视频播放</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow p-6 text-center">
            <div className="text-3xl mb-3">⚙️</div>
            <h3 className="font-semibold text-white mb-2">播放控制</h3>
            <p className="text-gray-400 text-sm">提供播放、暂停、停止、音量调节等完整控制功能</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow p-6 text-center">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-semibold text-white mb-2">兼容性强</h3>
            <p className="text-gray-400 text-sm">基于HTML5视频播放器，兼容现代浏览器</p>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">使用说明</h2>
          <div className="space-y-3 text-gray-300">
            <p>1. 在输入框中粘贴您的M3U8链接地址</p>
            <p>2. 点击"播放"按钮开始播放视频流</p>
            <p>3. 使用控制面板进行播放、暂停、停止等操作</p>
            <p>4. 调节音量滑块控制播放音量</p>
            <p>5. 使用快速跳转按钮快速定位到指定时间点</p>
            <p className="text-sm text-gray-500 mt-4">注意：M3U8播放需要网络连接，且链接必须可公开访问。</p>
          </div>
        </div>

        {/* 技术说明 */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-2">技术说明</h3>
          <p className="text-gray-400 text-sm">
            M3U8是HTTP Live Streaming (HLS)协议使用的播放列表格式，广泛用于在线视频直播和点播服务。
            本播放器基于HTML5 video标签实现，支持标准的M3U8格式播放。
          </p>
        </div>
      </div>
    </div>
  );
}