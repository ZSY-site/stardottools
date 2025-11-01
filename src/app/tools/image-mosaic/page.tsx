'use client'

import { useState, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'

export default function ImageMosaic() {
  const { language } = useLanguage()
  const t = translations[language]
  
  const [originalImage, setOriginalImage] = useState<string>('')
  const [mosaicImage, setMosaicImage] = useState<string>('')
  const [mosaicSize, setMosaicSize] = useState<number>(10)
  const [mosaicIntensity, setMosaicIntensity] = useState<number>(50)
  const [selectedArea, setSelectedArea] = useState<{x: number, y: number, width: number, height: number} | null>(null)
  const [isSelecting, setIsSelecting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      setError(t.imageMosaic?.invalidFile || '请上传图片文件')
      return
    }

    // 验证文件大小（限制10MB）
    if (file.size > 10 * 1024 * 1024) {
      setError(t.imageMosaic?.fileTooLarge || '文件大小不能超过10MB')
      return
    }

    // 创建预览
    const reader = new FileReader()
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string)
      setMosaicImage('')
      setSelectedArea(null)
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const applyMosaic = () => {
    if (!originalImage || !canvasRef.current) {
      setError(t.imageMosaic?.noImage || '请先上传图片')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        throw new Error('无法获取canvas上下文')
      }

      const img = new Image()
      img.onload = () => {
        // 设置canvas尺寸
        canvas.width = img.width
        canvas.height = img.height
        
        // 绘制原图
        ctx.drawImage(img, 0, 0)
        
        // 获取图像数据
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        
        // 应用马赛克效果
        const blockSize = Math.max(1, mosaicSize)
        const intensity = mosaicIntensity / 100
        
        for (let y = 0; y < canvas.height; y += blockSize) {
          for (let x = 0; x < canvas.width; x += blockSize) {
            // 计算块的平均颜色
            let r = 0, g = 0, b = 0, count = 0
            
            for (let dy = 0; dy < blockSize && y + dy < canvas.height; dy++) {
              for (let dx = 0; dx < blockSize && x + dx < canvas.width; dx++) {
                const index = ((y + dy) * canvas.width + (x + dx)) * 4
                r += data[index]
                g += data[index + 1]
                b += data[index + 2]
                count++
              }
            }
            
            if (count > 0) {
              r = Math.floor(r / count)
              g = Math.floor(g / count)
              b = Math.floor(b / count)
              
              // 应用强度
              r = Math.floor(r * intensity)
              g = Math.floor(g * intensity)
              b = Math.floor(b * intensity)
              
              // 绘制马赛克块
              for (let dy = 0; dy < blockSize && y + dy < canvas.height; dy++) {
                for (let dx = 0; dx < blockSize && x + dx < canvas.width; dx++) {
                  const index = ((y + dy) * canvas.width + (x + dx)) * 4
                  data[index] = r
                  data[index + 1] = g
                  data[index + 2] = b
                }
              }
            }
          }
        }
        
        // 应用图像数据
        ctx.putImageData(imageData, 0, 0)
        
        // 转换为Data URL
        const mosaicDataUrl = canvas.toDataURL('image/jpeg', 0.9)
        setMosaicImage(mosaicDataUrl)
        setLoading(false)
      }
      
      img.src = originalImage
    } catch (err) {
      setError(t.imageMosaic?.processingError || '处理失败')
      setLoading(false)
    }
  }

  const applyAreaMosaic = () => {
    if (!originalImage || !selectedArea || !canvasRef.current) {
      setError(t.imageMosaic?.noSelection || '请先选择区域')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        throw new Error('无法获取canvas上下文')
      }

      const img = new Image()
      img.onload = () => {
        // 设置canvas尺寸
        canvas.width = img.width
        canvas.height = img.height
        
        // 绘制原图
        ctx.drawImage(img, 0, 0)
        
        // 获取选定区域的图像数据
        const { x, y, width, height } = selectedArea
        const imageData = ctx.getImageData(x, y, width, height)
        const data = imageData.data
        
        // 应用马赛克效果到选定区域
        const blockSize = Math.max(1, mosaicSize)
        const intensity = mosaicIntensity / 100
        
        for (let dy = 0; dy < height; dy += blockSize) {
          for (let dx = 0; dx < width; dx += blockSize) {
            // 计算块的平均颜色
            let r = 0, g = 0, b = 0, count = 0
            
            for (let blockY = 0; blockY < blockSize && dy + blockY < height; blockY++) {
              for (let blockX = 0; blockX < blockSize && dx + blockX < width; blockX++) {
                const index = ((dy + blockY) * width + (dx + blockX)) * 4
                r += data[index]
                g += data[index + 1]
                b += data[index + 2]
                count++
              }
            }
            
            if (count > 0) {
              r = Math.floor(r / count)
              g = Math.floor(g / count)
              b = Math.floor(b / count)
              
              // 应用强度
              r = Math.floor(r * intensity)
              g = Math.floor(g * intensity)
              b = Math.floor(b * intensity)
              
              // 绘制马赛克块
              for (let blockY = 0; blockY < blockSize && dy + blockY < height; blockY++) {
                for (let blockX = 0; blockX < blockSize && dx + blockX < width; blockX++) {
                  const index = ((dy + blockY) * width + (dx + blockX)) * 4
                  data[index] = r
                  data[index + 1] = g
                  data[index + 2] = b
                }
              }
            }
          }
        }
        
        // 应用图像数据到选定区域
        ctx.putImageData(imageData, x, y)
        
        // 转换为Data URL
        const mosaicDataUrl = canvas.toDataURL('image/jpeg', 0.9)
        setMosaicImage(mosaicDataUrl)
        setLoading(false)
      }
      
      img.src = originalImage
    } catch (err) {
      setError(t.imageMosaic?.processingError || '处理失败')
      setLoading(false)
    }
  }

  const downloadImage = () => {
    if (!mosaicImage) return
    
    const link = document.createElement('a')
    link.download = 'mosaic-image.jpg'
    link.href = mosaicImage
    link.click()
  }

  const clearAll = () => {
    setOriginalImage('')
    setMosaicImage('')
    setSelectedArea(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!originalImage) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // 设置选择区域（固定大小100x100）
    setSelectedArea({
      x: Math.max(0, x - 50),
      y: Math.max(0, y - 50),
      width: 100,
      height: 100
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.imageMosaic?.title || '在线图片马赛克工具'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t.imageMosaic?.description || '为图片添加马赛克效果，保护隐私信息，支持全图马赛克和局部区域马赛克'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 输入区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t.imageMosaic?.inputTitle || '图片上传和设置'}
            </h2>
            
            <div className="space-y-6">
              {/* 文件上传 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.imageMosaic?.uploadImage || '上传图片'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="mosaic-file-input"
                  />
                  <label htmlFor="mosaic-file-input" className="cursor-pointer">
                    <div className="text-6xl mb-4">🖼️</div>
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      {t.imageMosaic?.clickToUpload || '点击选择图片文件'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t.imageMosaic?.fileLimit || '支持 JPG, PNG, GIF, WebP 等格式，最大10MB'}
                    </p>
                  </label>
                </div>
              </div>

              {/* 马赛克设置 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.imageMosaic?.mosaicSettings || '马赛克设置'}
                </label>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t.imageMosaic?.blockSize || '马赛克块大小'} ({mosaicSize}px)
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      value={mosaicSize}
                      onChange={(e) => setMosaicSize(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>精细</span>
                      <span>粗糙</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t.imageMosaic?.intensity || '马赛克强度'} ({mosaicIntensity}%)
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={mosaicIntensity}
                      onChange={(e) => setMosaicIntensity(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>轻微</span>
                      <span>强烈</span>
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={applyMosaic}
                  disabled={loading || !originalImage}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                >
                  {loading ? (t.imageMosaic?.processing || '处理中...') : (t.imageMosaic?.applyFull || '全图马赛克')}
                </button>
                
                <button
                  onClick={applyAreaMosaic}
                  disabled={loading || !originalImage || !selectedArea}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors"
                >
                  {t.imageMosaic?.applyArea || '局部马赛克'}
                </button>
                
                <button
                  onClick={clearAll}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t.imageMosaic?.clear || '清空'}
                </button>
              </div>
            </div>
          </div>

          {/* 输出区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t.imageMosaic?.outputTitle || '马赛克效果预览'}
            </h2>
            
            {!originalImage ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">🔍</div>
                <p>{t.imageMosaic?.noImage || '请上传图片开始处理'}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* 原图预览 */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    {t.imageMosaic?.originalImage || '原图预览'}
                  </h3>
                  <div 
                    className="border border-gray-200 rounded-lg p-3 relative cursor-crosshair"
                    onClick={handleImageClick}
                  >
                    <img
                      src={originalImage}
                      alt="原图"
                      className="w-full max-h-64 object-contain rounded"
                    />
                    {selectedArea && (
                      <div 
                        className="absolute border-2 border-red-500 bg-red-500 bg-opacity-20"
                        style={{
                          left: `${selectedArea.x}px`,
                          top: `${selectedArea.y}px`,
                          width: `${selectedArea.width}px`,
                          height: `${selectedArea.height}px`
                        }}
                      >
                        <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          选中区域
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {t.imageMosaic?.clickToSelect || '点击图片选择马赛克区域'}
                  </p>
                </div>
                
                {/* 马赛克效果预览 */}
                {mosaicImage && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      {t.imageMosaic?.mosaicResult || '马赛克效果'}
                    </h3>
                    <div className="border border-gray-200 rounded-lg p-3">
                      <img
                        src={mosaicImage}
                        alt="马赛克效果"
                        className="w-full max-h-64 object-contain rounded"
                      />
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={downloadImage}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                      >
                        {t.imageMosaic?.download || '下载图片'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 隐藏的canvas */}
        <canvas ref={canvasRef} className="hidden" />

        {/* 功能特性 */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            {t.imageMosaic?.featuresTitle || '功能特性'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <span className="text-purple-600 text-lg">🎯</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">精准区域选择</h4>
                <p className="text-gray-600 text-sm">支持点击选择特定区域进行马赛克处理</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <span className="text-green-600 text-lg">⚙️</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">可调节参数</h4>
                <p className="text-gray-600 text-sm">马赛克块大小和强度均可自定义调节</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <span className="text-blue-600 text-lg">🔒</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">隐私保护</h4>
                <p className="text-gray-600 text-sm">本地处理，图片数据不上传服务器</p>
              </div>
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            {t.imageMosaic?.usageTitle || '使用说明'}
          </h3>
          
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>上传需要处理的图片文件</li>
            <li>调整马赛克块大小和强度参数</li>
            <li>选择处理方式：全图马赛克或局部马赛克</li>
            <li>如需局部马赛克，点击图片选择区域</li>
            <li>点击相应按钮应用马赛克效果</li>
            <li>下载处理后的图片</li>
          </ol>
        </div>
      </div>
    </div>
  )
}