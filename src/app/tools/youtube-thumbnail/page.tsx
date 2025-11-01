'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'

export default function YouTubeThumbnailExtractor() {
  const { language } = useLanguage()
  const t = translations[language]
  
  const [videoUrl, setVideoUrl] = useState('')
  const [thumbnails, setThumbnails] = useState<string[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
      /(?:youtube\.com\/v\/)([^&\n?#]+)/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }
    return null
  }

  const getThumbnails = async () => {
    if (!videoUrl.trim()) {
      setError(t.youtubeThumbnail?.urlRequired || '请输入YouTube视频链接')
      return
    }

    const videoId = extractYouTubeId(videoUrl)
    if (!videoId) {
      setError(t.youtubeThumbnail?.invalidUrl || '无效的YouTube链接')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // 生成不同尺寸的缩略图URL
      const thumbnailUrls = [
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, // 最高分辨率
        `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,    // 标准分辨率
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,     // 高质量
        `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,     // 中等质量
        `https://img.youtube.com/vi/${videoId}/default.jpg`        // 默认质量
      ]
      
      setThumbnails(thumbnailUrls)
    } catch (err) {
      setError(t.youtubeThumbnail?.extractError || '提取缩略图失败')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      alert(t.youtubeThumbnail?.copied || '链接已复制到剪贴板')
    } catch (err) {
      alert(t.youtubeThumbnail?.copyError || '复制失败')
    }
  }

  const loadExample = () => {
    setVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
  }

  const clearAll = () => {
    setVideoUrl('')
    setThumbnails([])
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.youtubeThumbnail?.title || 'YouTube缩略图提取器'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t.youtubeThumbnail?.description || '快速提取YouTube视频的各种尺寸缩略图，支持最高分辨率到默认质量'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 输入区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t.youtubeThumbnail?.inputTitle || '输入YouTube链接'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.youtubeThumbnail?.urlLabel || 'YouTube视频链接'}
                </label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={getThumbnails}
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                >
                  {loading ? (t.youtubeThumbnail?.extracting || '提取中...') : (t.youtubeThumbnail?.extract || '提取缩略图')}
                </button>
                
                <button
                  onClick={loadExample}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t.youtubeThumbnail?.loadExample || '加载示例'}
                </button>
                
                <button
                  onClick={clearAll}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t.youtubeThumbnail?.clear || '清空'}
                </button>
              </div>
            </div>
          </div>

          {/* 输出区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t.youtubeThumbnail?.resultsTitle || '缩略图结果'}
            </h2>
            
            {thumbnails.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">📺</div>
                <p>{t.youtubeThumbnail?.noResults || '请输入YouTube链接并点击提取按钮'}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {thumbnails.map((thumbnail, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="mb-3">
                      <img
                        src={thumbnail}
                        alt={`缩略图 ${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-image.jpg'
                        }}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {['最高分辨率', '标准分辨率', '高质量', '中等质量', '默认质量'][index]}
                      </span>
                      <button
                        onClick={() => copyToClipboard(thumbnail)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        {t.youtubeThumbnail?.copy || '复制链接'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 功能特性 */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            {t.youtubeThumbnail?.featuresTitle || '功能特性'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <span className="text-green-600 text-lg">⚡</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">快速提取</h4>
                <p className="text-gray-600 text-sm">无需下载任何软件，在线即时提取</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <span className="text-blue-600 text-lg">📱</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">多尺寸支持</h4>
                <p className="text-gray-600 text-sm">提供5种不同分辨率的缩略图</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <span className="text-purple-600 text-lg">🔒</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">隐私安全</h4>
                <p className="text-gray-600 text-sm">所有操作在浏览器本地完成</p>
              </div>
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            {t.youtubeThumbnail?.usageTitle || '使用说明'}
          </h3>
          
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>复制YouTube视频的完整链接地址</li>
            <li>粘贴到输入框中，点击"提取缩略图"按钮</li>
            <li>选择适合的缩略图尺寸，点击"复制链接"</li>
            <li>将复制的链接用于您的项目或分享</li>
          </ol>
        </div>
      </div>
    </div>
  )
}