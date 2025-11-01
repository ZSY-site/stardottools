'use client'

import { useState, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'

export default function ImageResizeTool() {
  const { language } = useLanguage()
  const t = translations[language]
  
  const [originalImage, setOriginalImage] = useState<string>('')
  const [resizedImage, setResizedImage] = useState<string>('')
  const [width, setWidth] = useState<number>(800)
  const [height, setHeight] = useState<number>(600)
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [quality, setQuality] = useState<number>(85)
  const [format, setFormat] = useState<string>('jpeg')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      setError(t.imageResize?.invalidFile || '请上传图片文件')
      return
    }

    // 创建预览
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      setOriginalImage(imageUrl)
      setError('')
      
      // 获取原始图片尺寸
      const img = new Image()
      img.onload = () => {
        if (maintainAspectRatio) {
          const aspectRatio = img.width / img.height
          setWidth(800)
          setHeight(Math.round(800 / aspectRatio))
        } else {
          setWidth(img.width)
          setHeight(img.height)
        }
      }
      img.src = imageUrl
    }
    reader.readAsDataURL(file)
  }

  const resizeImage = async () => {
    if (!originalImage) {
      setError(t.imageResize?.noImage || '请先上传图片')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // 创建canvas进行图片调整
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        throw new Error('无法获取canvas上下文')
      }

      const img = new Image()
      img.onload = () => {
        canvas.width = width
        canvas.height = height
        
        // 设置图片质量
        ctx.imageSmoothingQuality = 'high'
        
        // 绘制调整后的图片
        ctx.drawImage(img, 0, 0, width, height)
        
        // 转换为指定格式
        const mimeType = format === 'jpeg' ? 'image/jpeg' : 
                        format === 'png' ? 'image/png' : 'image/webp'
        
        const resizedDataUrl = canvas.toDataURL(mimeType, quality / 100)
        setResizedImage(resizedDataUrl)
        setLoading(false)
      }
      
      img.src = originalImage
    } catch (err) {
      setError(t.imageResize?.resizeError || '图片调整失败')
      setLoading(false)
    }
  }

  const downloadImage = () => {
    if (!resizedImage) return
    
    const link = document.createElement('a')
    link.download = `resized-image.${format}`
    link.href = resizedImage
    link.click()
  }

  const copyToClipboard = async () => {
    if (!resizedImage) return
    
    try {
      // 将base64图片复制到剪贴板
      const response = await fetch(resizedImage)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ])
      alert(t.imageResize?.copied || '图片已复制到剪贴板')
    } catch (err) {
      alert(t.imageResize?.copyError || '复制失败')
    }
  }

  const clearAll = () => {
    setOriginalImage('')
    setResizedImage('')
    setWidth(800)
    setHeight(600)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth)
    if (maintainAspectRatio && originalImage) {
      const img = new Image()
      img.onload = () => {
        const aspectRatio = img.width / img.height
        setHeight(Math.round(newWidth / aspectRatio))
      }
      img.src = originalImage
    }
  }

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight)
    if (maintainAspectRatio && originalImage) {
      const img = new Image()
      img.onload = () => {
        const aspectRatio = img.width / img.height
        setWidth(Math.round(newHeight * aspectRatio))
      }
      img.src = originalImage
    }
  }

  const presetSizes = [
    { name: '社交媒体', width: 1080, height: 1080 },
    { name: '网页横幅', width: 1200, height: 400 },
    { name: '缩略图', width: 300, height: 200 },
    { name: '手机壁纸', width: 1080, height: 1920 },
    { name: '电脑壁纸', width: 1920, height: 1080 }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.imageResize?.title || '图片尺寸调整工具'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t.imageResize?.description || '在线调整图片尺寸，支持自定义宽高、保持比例、质量调整等功能'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 设置区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t.imageResize?.settingsTitle || '调整设置'}
            </h2>
            
            <div className="space-y-6">
              {/* 文件上传 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.imageResize?.uploadImage || '上传图片'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="image-file-input"
                  />
                  <label htmlFor="image-file-input" className="cursor-pointer">
                    <div className="text-4xl mb-2">📸</div>
                    <p className="text-sm text-gray-600">
                      {t.imageResize?.clickToUpload || '点击选择图片文件'}
                    </p>
                  </label>
                </div>
              </div>

              {/* 尺寸设置 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.imageResize?.dimensions || '尺寸设置'}
                </label>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">宽度 (px)</label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => handleWidthChange(Number(e.target.value))}
                      min="1"
                      max="5000"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">高度 (px)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => handleHeightChange(Number(e.target.value))}
                      min="1"
                      max="5000"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={maintainAspectRatio}
                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">
                    {t.imageResize?.maintainRatio || '保持宽高比例'}
                  </span>
                </label>
              </div>

              {/* 质量设置 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.imageResize?.quality || '图片质量'} ({quality}%)
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>低质量</span>
                  <span>高质量</span>
                </div>
              </div>

              {/* 格式选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.imageResize?.format || '输出格式'}
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="jpeg">JPEG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>

              {/* 预设尺寸 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.imageResize?.presetSizes || '预设尺寸'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {presetSizes.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setWidth(preset.width)
                        setHeight(preset.height)
                      }}
                      className="px-3 py-2 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      {preset.name}<br/>{preset.width}×{preset.height}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={resizeImage}
                  disabled={loading || !originalImage}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                >
                  {loading ? (t.imageResize?.processing || '处理中...') : (t.imageResize?.resize || '调整尺寸')}
                </button>
                
                <button
                  onClick={clearAll}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t.imageResize?.clear || '清空'}
                </button>
              </div>
            </div>
          </div>

          {/* 原图预览 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t.imageResize?.originalTitle || '原图预览'}
            </h2>
            
            {!originalImage ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">🖼️</div>
                <p>{t.imageResize?.noOriginal || '请上传图片文件'}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={originalImage}
                    alt="原图"
                    className="w-full h-64 object-contain rounded-lg border"
                  />
                </div>
                <div className="text-center text-sm text-gray-600">
                  {width} × {height} 像素
                </div>
              </div>
            )}
          </div>

          {/* 调整后预览 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t.imageResize?.resizedTitle || '调整后图片'}
            </h2>
            
            {!resizedImage ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">📐</div>
                <p>{t.imageResize?.noResized || '点击调整尺寸按钮生成新图片'}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={resizedImage}
                    alt="调整后图片"
                    className="w-full h-64 object-contain rounded-lg border"
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={downloadImage}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    {t.imageResize?.download || '下载图片'}
                  </button>
                  
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    {t.imageResize?.copy || '复制图片'}
                  </button>
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  格式: {format.toUpperCase()} | 质量: {quality}%
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 功能特性 */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            {t.imageResize?.featuresTitle || '功能特性'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <span className="text-purple-600 text-lg">📏</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">精确尺寸控制</h4>
                <p className="text-gray-600 text-sm">支持像素级精确调整，自定义宽高设置</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <span className="text-green-600 text-lg">⚖️</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">比例保持</h4>
                <p className="text-gray-600 text-sm">自动保持原始图片宽高比例，避免变形</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <span className="text-blue-600 text-lg">🎯</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">质量优化</h4>
                <p className="text-gray-600 text-sm">可调节输出质量，平衡文件大小和清晰度</p>
              </div>
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            {t.imageResize?.usageTitle || '使用说明'}
          </h3>
          
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>上传需要调整尺寸的图片文件</li>
            <li>设置目标尺寸（可自定义或选择预设）</li>
            <li>选择是否保持宽高比例</li>
            <li>调整输出质量和格式</li>
            <li>点击"调整尺寸"按钮生成新图片</li>
            <li>下载或复制调整后的图片</li>
          </ol>
        </div>
      </div>
    </div>
  )
}