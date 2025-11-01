'use client'

import { useState, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'

export default function ImageToBase64() {
  const { language } = useLanguage()
  const t = translations[language]
  
  const [originalImage, setOriginalImage] = useState<string>('')
  const [base64String, setBase64String] = useState('')
  const [format, setFormat] = useState<string>('jpeg')
  const [quality, setQuality] = useState<number>(85)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      setError(t.imageToBase64?.invalidFile || '请上传图片文件')
      return
    }

    // 验证文件大小（限制10MB）
    if (file.size > 10 * 1024 * 1024) {
      setError(t.imageToBase64?.fileTooLarge || '文件大小不能超过10MB')
      return
    }

    // 创建预览
    const reader = new FileReader()
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string)
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const convertToBase64 = async () => {
    if (!originalImage) {
      setError(t.imageToBase64?.noImage || '请先上传图片')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // 创建canvas进行格式转换
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        throw new Error('无法获取canvas上下文')
      }

      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        
        // 绘制图片
        ctx.drawImage(img, 0, 0)
        
        // 转换为指定格式的base64
        const mimeType = format === 'jpeg' ? 'image/jpeg' : 
                        format === 'png' ? 'image/png' : 
                        format === 'webp' ? 'image/webp' : 'image/jpeg'
        
        const base64Data = canvas.toDataURL(mimeType, quality / 100)
        
        // 提取纯base64数据（去掉data:image/...;base64,前缀）
        const pureBase64 = base64Data.split(',')[1]
        setBase64String(pureBase64)
        setLoading(false)
      }
      
      img.src = originalImage
    } catch (err) {
      setError(t.imageToBase64?.conversionError || '转换失败')
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (!base64String) return
    
    try {
      await navigator.clipboard.writeText(base64String)
      alert(t.imageToBase64?.copied || 'Base64数据已复制到剪贴板')
    } catch (err) {
      alert(t.imageToBase64?.copyError || '复制失败')
    }
  }

  const copyFullDataUrl = async () => {
    if (!base64String) return
    
    try {
      const mimeType = format === 'jpeg' ? 'image/jpeg' : 
                      format === 'png' ? 'image/png' : 
                      format === 'webp' ? 'image/webp' : 'image/jpeg'
      
      const fullDataUrl = `data:${mimeType};base64,${base64String}`
      await navigator.clipboard.writeText(fullDataUrl)
      alert(t.imageToBase64?.dataUrlCopied || '完整Data URL已复制')
    } catch (err) {
      alert(t.imageToBase64?.copyError || '复制失败')
    }
  }

  const clearAll = () => {
    setOriginalImage('')
    setBase64String('')
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getBase64Size = () => {
    if (!base64String) return '0 KB'
    const sizeInBytes = (base64String.length * 3) / 4
    if (sizeInBytes < 1024) return `${sizeInBytes} B`
    if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(2)} KB`
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.imageToBase64?.title || '图片转Base64编码工具'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t.imageToBase64?.description || '将图片转换为Base64编码，支持多种格式和质量设置，适用于网页开发'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 输入区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t.imageToBase64?.inputTitle || '图片上传'}
            </h2>
            
            <div className="space-y-6">
              {/* 文件上传 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.imageToBase64?.uploadImage || '上传图片'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="base64-file-input"
                  />
                  <label htmlFor="base64-file-input" className="cursor-pointer">
                    <div className="text-6xl mb-4">🖼️</div>
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      {t.imageToBase64?.clickToUpload || '点击选择图片文件'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t.imageToBase64?.fileLimit || '支持 JPG, PNG, GIF, WebP 等格式，最大10MB'}
                    </p>
                  </label>
                </div>
              </div>

              {/* 转换设置 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.imageToBase64?.conversionSettings || '转换设置'}
                </label>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t.imageToBase64?.format || '输出格式'}
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
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      {t.imageToBase64?.quality || '质量'} ({quality}%)
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full"
                    />
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
                  onClick={convertToBase64}
                  disabled={loading || !originalImage}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                >
                  {loading ? (t.imageToBase64?.converting || '转换中...') : (t.imageToBase64?.convert || '转换为Base64')}
                </button>
                
                <button
                  onClick={clearAll}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t.imageToBase64?.clear || '清空'}
                </button>
              </div>
            </div>
          </div>

          {/* 输出区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t.imageToBase64?.outputTitle || 'Base64编码结果'}
            </h2>
            
            {!base64String ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">🔤</div>
                <p>{t.imageToBase64?.noResult || '请上传图片并点击转换按钮'}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 图片预览 */}
                {originalImage && (
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      {t.imageToBase64?.preview || '图片预览'}
                    </h3>
                    <img
                      src={originalImage}
                      alt="原图预览"
                      className="w-full h-32 object-contain rounded"
                    />
                  </div>
                )}
                
                {/* Base64数据 */}
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-700">
                      {t.imageToBase64?.base64Data || 'Base64编码数据'}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {getBase64Size()}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 rounded p-3 max-h-40 overflow-y-auto">
                    <pre className="text-xs text-gray-800 whitespace-pre-wrap break-all">
                      {base64String}
                    </pre>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 bg-green-600 text-white px-3 py-2 text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      {t.imageToBase64?.copyBase64 || '复制Base64'}
                    </button>
                    
                    <button
                      onClick={copyFullDataUrl}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      {t.imageToBase64?.copyDataUrl || '复制Data URL'}
                    </button>
                  </div>
                </div>
                
                {/* 使用示例 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">
                    {t.imageToBase64?.usageExample || '使用示例'}
                  </h4>
                  <p className="text-xs text-blue-800">
                    {t.imageToBase64?.usageDescription || '将Base64数据用于HTML img标签的src属性：'}
                  </p>
                  <code className="text-xs bg-blue-100 text-blue-900 px-2 py-1 rounded mt-1 inline-block">
                    &lt;img src="data:image/{format};base64,{base64String.substring(0, 20)}..." /&gt;
                  </code>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 功能特性 */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            {t.imageToBase64?.featuresTitle || '功能特性'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <span className="text-purple-600 text-lg">🔄</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">多格式支持</h4>
                <p className="text-gray-600 text-sm">支持JPEG、PNG、WebP等多种图片格式转换</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <span className="text-green-600 text-lg">⚡</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">快速转换</h4>
                <p className="text-gray-600 text-sm">基于浏览器原生API，转换速度快，效率高</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <span className="text-blue-600 text-lg">🔒</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">隐私安全</h4>
                <p className="text-gray-600 text-sm">所有操作在本地完成，图片数据不上传服务器</p>
              </div>
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            {t.imageToBase64?.usageTitle || '使用说明'}
          </h3>
          
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>上传需要转换的图片文件</li>
            <li>选择输出格式和质量设置</li>
            <li>点击"转换为Base64"按钮</li>
            <li>复制生成的Base64编码数据</li>
            <li>将数据用于网页开发或其他用途</li>
          </ol>
        </div>
      </div>
    </div>
  )
}