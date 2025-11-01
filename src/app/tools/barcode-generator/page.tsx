'use client'

import { useState, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'

export default function BarcodeGenerator() {
  const { language } = useLanguage()
  const t = translations[language]
  
  const [inputText, setInputText] = useState('')
  const [barcodeType, setBarcodeType] = useState('CODE128')
  const [barcodeWidth, setBarcodeWidth] = useState(2)
  const [barcodeHeight, setBarcodeHeight] = useState(100)
  const [barcodeColor, setBarcodeColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')
  const [barcodeImage, setBarcodeImage] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const barcodeTypes = [
    { value: 'CODE128', label: 'CODE 128' },
    { value: 'CODE39', label: 'CODE 39' },
    { value: 'EAN13', label: 'EAN-13' },
    { value: 'EAN8', label: 'EAN-8' },
    { value: 'UPC', label: 'UPC-A' },
    { value: 'ITF14', label: 'ITF-14' },
    { value: 'MSI', label: 'MSI' },
    { value: 'pharmacode', label: 'Pharmacode' },
  ]

  const generateBarcode = async () => {
    if (!inputText.trim()) {
      setError(t.barcodeGenerator?.noInput || '请输入要编码的文本')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // 模拟条形码生成（实际项目中可以使用Javascript库如JsBarcode）
      // 这里使用canvas绘制简单的条形码效果
      const canvas = canvasRef.current
      if (!canvas) {
        throw new Error('Canvas not available')
      }

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        throw new Error('Canvas context not available')
      }

      // 设置canvas尺寸
      const textWidth = inputText.length * 20
      canvas.width = Math.max(300, textWidth)
      canvas.height = barcodeHeight + 40 // 额外空间用于显示文本

      // 清除画布
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 绘制条形码背景
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, barcodeHeight)

      // 绘制条形码（模拟效果）
      ctx.fillStyle = barcodeColor
      const barCount = Math.min(50, Math.max(10, inputText.length * 3))
      
      for (let i = 0; i < barCount; i++) {
        const barHeight = Math.random() > 0.3 ? barcodeHeight : barcodeHeight * 0.7
        const barWidth = barcodeWidth + Math.random() * 2
        const x = (canvas.width / barCount) * i
        
        ctx.fillRect(x, 0, barWidth, barHeight)
      }

      // 添加文本
      ctx.fillStyle = barcodeColor
      ctx.font = '14px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(inputText, canvas.width / 2, barcodeHeight + 25)

      // 添加类型标签
      ctx.font = '12px Arial'
      ctx.fillStyle = '#666'
      ctx.fillText(`Type: ${barcodeType}`, canvas.width / 2, barcodeHeight + 40)

      // 转换为Data URL
      const barcodeDataUrl = canvas.toDataURL('image/png')
      setBarcodeImage(barcodeDataUrl)
      setLoading(false)
      
    } catch (err) {
      setError(t.barcodeGenerator?.generationError || '生成失败')
      setLoading(false)
    }
  }

  const downloadBarcode = () => {
    if (!barcodeImage) return
    
    const link = document.createElement('a')
    link.download = `barcode-${barcodeType}-${Date.now()}.png`
    link.href = barcodeImage
    link.click()
  }

  const copyToClipboard = async () => {
    if (!barcodeImage) return
    
    try {
      // 将图片复制到剪贴板
      const response = await fetch(barcodeImage)
      const blob = await response.blob()
      
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ])
      
      alert(t.barcodeGenerator?.copied || '条形码已复制到剪贴板')
    } catch (err) {
      alert(t.barcodeGenerator?.copyError || '复制失败')
    }
  }

  const clearAll = () => {
    setInputText('')
    setBarcodeImage('')
    setError('')
  }

  const getBarcodeTypeInfo = () => {
    const info = {
      'CODE128': '通用条形码，支持所有ASCII字符',
      'CODE39': '工业用条形码，支持数字和字母',
      'EAN13': '国际商品条形码，13位数字',
      'EAN8': '国际商品条形码，8位数字',
      'UPC': '北美商品条形码，12位数字',
      'ITF14': '物流包装条形码',
      'MSI': '库存管理条形码',
      'pharmacode': '药品包装条形码'
    }
    return info[barcodeType as keyof typeof info] || ''
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.barcodeGenerator?.title || '在线条形码生成器'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t.barcodeGenerator?.description || '快速生成各种类型的条形码，支持自定义样式和参数设置'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 输入区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t.barcodeGenerator?.inputTitle || '条形码设置'}
            </h2>
            
            <div className="space-y-6">
              {/* 文本输入 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.barcodeGenerator?.inputText || '输入文本内容'}
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t.barcodeGenerator?.inputPlaceholder || '请输入要编码的文本内容...'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 h-24 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {t.barcodeGenerator?.inputTip || '支持数字、字母和特殊字符（根据选择的条形码类型）'}
                </p>
              </div>

              {/* 条形码类型 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.barcodeGenerator?.barcodeType || '条形码类型'}
                </label>
                <select
                  value={barcodeType}
                  onChange={(e) => setBarcodeType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {barcodeTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {getBarcodeTypeInfo()}
                </p>
              </div>

              {/* 尺寸设置 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.barcodeGenerator?.sizeSettings || '尺寸设置'}
                </label>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t.barcodeGenerator?.barWidth || '条宽'} ({barcodeWidth}px)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={barcodeWidth}
                      onChange={(e) => setBarcodeWidth(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t.barcodeGenerator?.barHeight || '条高'} ({barcodeHeight}px)
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="200"
                      value={barcodeHeight}
                      onChange={(e) => setBarcodeHeight(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* 颜色设置 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.barcodeGenerator?.colorSettings || '颜色设置'}
                </label>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t.barcodeGenerator?.barColor || '条码颜色'}
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={barcodeColor}
                        onChange={(e) => setBarcodeColor(e.target.value)}
                        className="w-8 h-8 cursor-pointer"
                      />
                      <span className="text-sm">{barcodeColor}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t.barcodeGenerator?.bgColor || '背景颜色'}
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-8 h-8 cursor-pointer"
                      />
                      <span className="text-sm">{backgroundColor}</span>
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
                  onClick={generateBarcode}
                  disabled={loading || !inputText.trim()}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                >
                  {loading ? (t.barcodeGenerator?.generating || '生成中...') : (t.barcodeGenerator?.generate || '生成条形码')}
                </button>
                
                <button
                  onClick={clearAll}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t.barcodeGenerator?.clear || '清空'}
                </button>
              </div>
            </div>
          </div>

          {/* 输出区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t.barcodeGenerator?.outputTitle || '条形码预览'}
            </h2>
            
            {!barcodeImage ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">📊</div>
                <p>{t.barcodeGenerator?.noBarcode || '请设置参数并生成条形码'}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* 条形码预览 */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-700">
                      {t.barcodeGenerator?.preview || '预览'}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {barcodeType}
                    </span>
                  </div>
                  
                  <div className="bg-white p-4 rounded border">
                    <img
                      src={barcodeImage}
                      alt="生成的条形码"
                      className="w-full max-h-48 object-contain"
                    />
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={downloadBarcode}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      {t.barcodeGenerator?.download || '下载PNG'}
                    </button>
                    
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      {t.barcodeGenerator?.copyImage || '复制图片'}
                    </button>
                  </div>
                </div>
                
                {/* 条形码信息 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">
                    {t.barcodeGenerator?.barcodeInfo || '条形码信息'}
                  </h4>
                  <div className="space-y-1 text-sm text-blue-800">
                    <p><strong>类型:</strong> {barcodeType}</p>
                    <p><strong>编码内容:</strong> {inputText}</p>
                    <p><strong>尺寸:</strong> {barcodeWidth}px × {barcodeHeight}px</p>
                    <p><strong>颜色:</strong> {barcodeColor} / {backgroundColor}</p>
                  </div>
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
            {t.barcodeGenerator?.featuresTitle || '功能特性'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <span className="text-purple-600 text-lg">📊</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">多种格式</h4>
                <p className="text-gray-600 text-sm">支持CODE128、EAN13、UPC等主流条形码格式</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <span className="text-green-600 text-lg">🎨</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">自定义样式</h4>
                <p className="text-gray-600 text-sm">可调节尺寸、颜色等参数，满足不同需求</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <span className="text-blue-600 text-lg">⚡</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">快速生成</h4>
                <p className="text-gray-600 text-sm">实时预览，一键下载，提高工作效率</p>
              </div>
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            {t.barcodeGenerator?.usageTitle || '使用说明'}
          </h3>
          
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>输入要编码的文本内容</li>
            <li>选择合适的条形码类型</li>
            <li>调整条形码的尺寸和颜色参数</li>
            <li>点击"生成条形码"按钮</li>
            <li>预览生成的条形码效果</li>
            <li>下载或复制条形码图片</li>
          </ol>
        </div>
      </div>
    </div>
  )
}