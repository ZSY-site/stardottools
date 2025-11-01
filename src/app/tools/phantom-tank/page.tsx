'use client'

import { useState, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'

export default function PhantomTank() {
  const { language } = useLanguage()
  const t = translations[language]
  
  const [foregroundImage, setForegroundImage] = useState<string>('')
  const [backgroundImage, setBackgroundImage] = useState<string>('')
  const [phantomImage, setPhantomImage] = useState<string>('')
  const [blendMode, setBlendMode] = useState<'difference' | 'multiply' | 'screen'>('difference')
  const [opacity, setOpacity] = useState<number>(50)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const foregroundInputRef = useRef<HTMLInputElement>(null)
  const backgroundInputRef = useRef<HTMLInputElement>(null)

  const handleForegroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError(t.phantomTank?.invalidFile || '请上传图片文件')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(t.phantomTank?.fileTooLarge || '文件大小不能超过10MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setForegroundImage(e.target?.result as string)
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError(t.phantomTank?.invalidFile || '请上传图片文件')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(t.phantomTank?.fileTooLarge || '文件大小不能超过10MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setBackgroundImage(e.target?.result as string)
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const generatePhantomTank = () => {
    if (!foregroundImage || !backgroundImage || !canvasRef.current) {
      setError(t.phantomTank?.noImages || '请上传前景和背景图片')
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

      // 加载图片
      const foregroundImg = new Image()
      const backgroundImg = new Image()
      
      let imagesLoaded = 0
      
      const onImageLoad = () => {
        imagesLoaded++
        if (imagesLoaded === 2) {
          // 设置canvas尺寸为两张图片的最大尺寸
          const width = Math.max(foregroundImg.width, backgroundImg.width)
          const height = Math.max(foregroundImg.height, backgroundImg.height)
          canvas.width = width
          canvas.height = height

          // 清除画布
          ctx.fillStyle = '#FFFFFF'
          ctx.fillRect(0, 0, width, height)

          // 绘制背景图片
          ctx.drawImage(backgroundImg, 0, 0, width, height)

          // 保存背景图像数据
          const backgroundData = ctx.getImageData(0, 0, width, height)
          
          // 清除画布并绘制前景图片
          ctx.fillStyle = '#FFFFFF'
          ctx.fillRect(0, 0, width, height)
          ctx.drawImage(foregroundImg, 0, 0, width, height)
          
          const foregroundData = ctx.getImageData(0, 0, width, height)
          
          // 应用幻影坦克效果
          for (let i = 0; i < foregroundData.data.length; i += 4) {
            const fgR = foregroundData.data[i]
            const fgG = foregroundData.data[i + 1]
            const fgB = foregroundData.data[i + 2]
            
            const bgR = backgroundData.data[i]
            const bgG = backgroundData.data[i + 1]
            const bgB = backgroundData.data[i + 2]
            
            let r, g, b
            
            switch (blendMode) {
              case 'difference':
                // 差值混合模式
                r = Math.abs(fgR - bgR)
                g = Math.abs(fgG - bgG)
                b = Math.abs(fgB - bgB)
                break
              case 'multiply':
                // 正片叠底
                r = (fgR * bgR) / 255
                g = (fgG * bgG) / 255
                b = (fgB * bgB) / 255
                break
              case 'screen':
                // 滤色
                r = 255 - ((255 - fgR) * (255 - bgR)) / 255
                g = 255 - ((255 - fgG) * (255 - bgG)) / 255
                b = 255 - ((255 - fgB) * (255 - bgB)) / 255
                break
              default:
                r = fgR
                g = fgG
                b = fgB
            }
            
            // 应用透明度
            const alpha = opacity / 100
            r = Math.floor(r * alpha + bgR * (1 - alpha))
            g = Math.floor(g * alpha + bgG * (1 - alpha))
            b = Math.floor(b * alpha + bgB * (1 - alpha))
            
            foregroundData.data[i] = r
            foregroundData.data[i + 1] = g
            foregroundData.data[i + 2] = b
          }
          
          // 应用处理后的图像数据
          ctx.putImageData(foregroundData, 0, 0)
          
          // 转换为Data URL
          const phantomDataUrl = canvas.toDataURL('image/png')
          setPhantomImage(phantomDataUrl)
          setLoading(false)
        }
      }
      
      foregroundImg.onload = onImageLoad
      backgroundImg.onload = onImageLoad
      
      foregroundImg.src = foregroundImage
      backgroundImg.src = backgroundImage
      
    } catch (err) {
      setError(t.phantomTank?.processingError || '处理失败')
      setLoading(false)
    }
  }

  const downloadImage = () => {
    if (!phantomImage) return
    
    const link = document.createElement('a')
    link.download = `phantom-tank-${Date.now()}.png`
    link.href = phantomImage
    link.click()
  }

  const clearAll = () => {
    setForegroundImage('')
    setBackgroundImage('')
    setPhantomImage('')
    setError('')
    if (foregroundInputRef.current) foregroundInputRef.current.value = ''
    if (backgroundInputRef.current) backgroundInputRef.current.value = ''
  }

  const getBlendModeDescription = () => {
    const descriptions = {
      'difference': '差值模式：显示两张图片的差异部分',
      'multiply': '正片叠底：模拟印刷中的颜色叠加效果',
      'screen': '滤色模式：产生更亮的混合效果'
    }
    return descriptions[blendMode]
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.phantomTank?.title || '幻影坦克生成器'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t.phantomTank?.description || '生成在不同背景下显示不同内容的特殊图片效果'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 输入区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t.phantomTank?.inputTitle || '图片上传和设置'}
            </h2>
            
            <div className="space-y-6">
              {/* 前景图片上传 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.phantomTank?.foregroundImage || '前景图片（主要显示内容）'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    ref={foregroundInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleForegroundUpload}
                    className="hidden"
                    id="foreground-input"
                  />
                  <label htmlFor="foreground-input" className="cursor-pointer">
                    <div className="text-4xl mb-3">🖼️</div>
                    <p className="text-lg font-medium text-gray-700 mb-1">
                      {foregroundImage ? '已上传前景图片' : '上传前景图片'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t.phantomTank?.fileLimit || '支持 JPG, PNG, GIF, WebP 等格式'}
                    </p>
                  </label>
                </div>
              </div>

              {/* 背景图片上传 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.phantomTank?.backgroundImage || '背景图片（隐藏内容）'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                  <input
                    ref={backgroundInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundUpload}
                    className="hidden"
                    id="background-input"
                  />
                  <label htmlFor="background-input" className="cursor-pointer">
                    <div className="text-4xl mb-3">🌅</div>
                    <p className="text-lg font-medium text-gray-700 mb-1">
                      {backgroundImage ? '已上传背景图片' : '上传背景图片'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t.phantomTank?.fileLimit || '支持 JPG, PNG, GIF, WebP 等格式'}
                    </p>
                  </label>
                </div>
              </div>

              {/* 混合模式设置 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.phantomTank?.blendMode || '混合模式'}
                </label>
                <select
                  value={blendMode}
                  onChange={(e) => setBlendMode(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="difference">差值模式</option>
                  <option value="multiply">正片叠底</option>
                  <option value="screen">滤色模式</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {getBlendModeDescription()}
                </p>
              </div>

              {/* 透明度设置 */}
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  {t.phantomTank?.opacity || '透明度'} ({opacity}%)
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>透明</span>
                  <span>不透明</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={generatePhantomTank}
                  disabled={loading || !foregroundImage || !backgroundImage}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                >
                  {loading ? (t.phantomTank?.generating || '生成中...') : (t.phantomTank?.generate || '生成幻影坦克')}
                </button>
                
                <button
                  onClick={clearAll}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t.phantomTank?.clear || '清空'}
                </button>
              </div>
            </div>
          </div>

          {/* 输出区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t.phantomTank?.outputTitle || '幻影坦克效果预览'}
            </h2>
            
            {!phantomImage ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">👻</div>
                <p>{t.phantomTank?.noResult || '请上传前景和背景图片并生成效果'}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* 预览区域 */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    {t.phantomTank?.preview || '幻影坦克效果'}
                  </h3>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <img
                      src={phantomImage}
                      alt="幻影坦克效果"
                      className="w-full max-h-64 object-contain rounded"
                    />
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={downloadImage}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      {t.phantomTank?.download || '下载图片'}
                    </button>
                  </div>
                </div>
                
                {/* 效果说明 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">
                    {t.phantomTank?.effectInfo || '效果说明'}
                  </h4>
                  <p className="text-sm text-blue-800">
                    {t.phantomTank?.effectDescription || 
                      '幻影坦克图片在不同背景下会显示不同的内容。尝试将图片放在不同颜色的背景上观察效果变化。'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 隐藏的canvas */}
        <canvas ref={canvasRef} className="hidden" />

        {/* 功能特性 */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            {t.phantomTank?.featuresTitle || '功能特性'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <span className="text-purple-600 text-lg">👻</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">幻影效果</h4>
                <p className="text-gray-600 text-sm">生成在不同背景下显示不同内容的特殊图片</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <span className="text-green-600 text-lg">🎭</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">多重混合</h4>
                <p className="text-gray-600 text-sm">支持差值、正片叠底、滤色等多种混合模式</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <span className="text-blue-600 text-lg">🔒</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">隐私保护</h4>
                <p className="text-gray-600 text-sm">可用于隐藏敏感信息或创建有趣的视觉效果</p>
              </div>
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            {t.phantomTank?.usageTitle || '使用说明'}
          </h3>
          
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>上传前景图片（主要显示内容）</li>
            <li>上传背景图片（隐藏内容）</li>
            <li>选择合适的混合模式和透明度</li>
            <li>点击"生成幻影坦克"按钮</li>
            <li>预览生成的幻影坦克效果</li>
            <li>下载图片并在不同背景下测试效果</li>
          </ol>
        </div>
      </div>
    </div>
  )
}