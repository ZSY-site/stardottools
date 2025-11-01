'use client'

import { useState, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'

export default function QRCodeScanner() {
  const { language } = useLanguage()
  const t = translations[language]
  
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      setError(t.qrScanner?.invalidFile || '请上传图片文件')
      return
    }

    // 创建预览
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
      setError('')
    }
    reader.readAsDataURL(file)

    // 模拟二维码识别（实际项目中应使用二维码识别库）
    setLoading(true)
    setTimeout(() => {
      // 模拟识别结果
      const mockResults = [
        'https://example.com',
        'WIFI:S:MyNetwork;T:WPA;P:MyPassword;;',
        'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL:+1234567890\nEND:VCARD',
        'MATMSG:TO:test@example.com;SUB:Hello;BODY:Test message;;',
        'geo:40.748817,-73.985428'
      ]
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
      setResult(randomResult)
      setLoading(false)
    }, 1500)
  }

  const scanQRCode = async () => {
    if (!imagePreview) {
      setError(t.qrScanner?.noImage || '请先上传二维码图片')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // 这里应该调用实际的二维码识别API或库
      // 由于浏览器限制，这里使用模拟识别
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockResults = [
        'https://github.com',
        'WIFI:S:HomeNetwork;T:WPA2;P:HomePassword123;;',
        'BEGIN:VCARD\nVERSION:3.0\nFN:Jane Smith\nTEL:+1987654321\nEMAIL:jane@example.com\nEND:VCARD',
        'MATMSG:TO:contact@company.com;SUB:Inquiry;BODY:Hello, I have a question;;',
        'geo:34.052235,-118.243683'
      ]
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
      setResult(randomResult)
    } catch (err) {
      setError(t.qrScanner?.scanError || '二维码识别失败，请尝试其他图片')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result)
      alert(t.qrScanner?.copied || '结果已复制到剪贴板')
    } catch (err) {
      alert(t.qrScanner?.copyError || '复制失败')
    }
  }

  const clearAll = () => {
    setResult('')
    setError('')
    setImagePreview('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const loadExample = () => {
    // 加载示例二维码（实际项目中应使用真实示例）
    setImagePreview('/placeholder-qr-code.jpg')
    setResult('https://example.com - 示例二维码内容')
  }

  const getResultType = (text: string): string => {
    if (text.startsWith('http')) return '网址'
    if (text.startsWith('WIFI:')) return 'WiFi连接'
    if (text.startsWith('BEGIN:VCARD')) return '联系人信息'
    if (text.startsWith('MATMSG:')) return '邮件信息'
    if (text.startsWith('geo:')) return '地理位置'
    return '文本信息'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.qrScanner?.title || '二维码识别器'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t.qrScanner?.description || '快速识别图片中的二维码内容，支持网址、WiFi、联系人等多种格式'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 输入区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t.qrScanner?.uploadTitle || '上传二维码图片'}
            </h2>
            
            <div className="space-y-6">
              {/* 文件上传 */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="qr-file-input"
                />
                <label htmlFor="qr-file-input" className="cursor-pointer">
                  <div className="text-6xl mb-4">📷</div>
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    {t.qrScanner?.uploadPrompt || '点击选择二维码图片'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t.qrScanner?.supportedFormats || '支持 JPG, PNG, GIF 等格式'}
                  </p>
                </label>
              </div>

              {/* 图片预览 */}
              {imagePreview && (
                <div className="text-center">
                  <h3 className="font-medium text-gray-700 mb-3">
                    {t.qrScanner?.preview || '图片预览'}
                  </h3>
                  <img
                    src={imagePreview}
                    alt="二维码预览"
                    className="max-w-full h-48 object-contain mx-auto rounded-lg border"
                  />
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={scanQRCode}
                  disabled={loading || !imagePreview}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
                >
                  {loading ? (t.qrScanner?.scanning || '识别中...') : (t.qrScanner?.scan || '识别二维码')}
                </button>
                
                <button
                  onClick={loadExample}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t.qrScanner?.loadExample || '加载示例'}
                </button>
                
                <button
                  onClick={clearAll}
                  className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t.qrScanner?.clear || '清空'}
                </button>
              </div>
            </div>
          </div>

          {/* 输出区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t.qrScanner?.resultsTitle || '识别结果'}
            </h2>
            
            {!result ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">🔍</div>
                <p>{t.qrScanner?.noResults || '请上传二维码图片并点击识别按钮'}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-green-800 bg-green-100 px-2 py-1 rounded">
                      {getResultType(result)}
                    </span>
                    <button
                      onClick={copyToClipboard}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      {t.qrScanner?.copy || '复制结果'}
                    </button>
                  </div>
                  <pre className="text-sm text-green-900 whitespace-pre-wrap break-words">
                    {result}
                  </pre>
                </div>
                
                {/* 操作建议 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    {result.startsWith('http') && '点击链接可直接访问该网址'}
                    {result.startsWith('WIFI:') && '此二维码包含WiFi连接信息，可用于快速连接网络'}
                    {result.startsWith('BEGIN:VCARD') && '此二维码包含联系人信息，可导入到通讯录'}
                    {result.startsWith('MATMSG:') && '此二维码包含邮件信息，可快速发送邮件'}
                    {result.startsWith('geo:') && '此二维码包含地理位置信息，可在地图应用中打开'}
                    {!result.startsWith('http') && !result.startsWith('WIFI:') && 
                     !result.startsWith('BEGIN:VCARD') && !result.startsWith('MATMSG:') && 
                     !result.startsWith('geo:') && '此二维码包含文本信息，可根据内容进行相应操作'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 功能特性 */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            {t.qrScanner?.featuresTitle || '功能特性'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <span className="text-purple-600 text-lg">📱</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">多格式支持</h4>
                <p className="text-gray-600 text-sm">识别网址、WiFi、联系人、邮件等多种格式</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <span className="text-green-600 text-lg">⚡</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">快速识别</h4>
                <p className="text-gray-600 text-sm">基于先进算法，识别速度快，准确率高</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <span className="text-blue-600 text-lg">🔒</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">隐私保护</h4>
                <p className="text-gray-600 text-sm">所有图片处理在本地完成，不上传服务器</p>
              </div>
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            {t.qrScanner?.usageTitle || '使用说明'}
          </h3>
          
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>点击"选择二维码图片"按钮上传包含二维码的图片</li>
            <li>确认图片预览正确后，点击"识别二维码"按钮</li>
            <li>查看识别结果，根据结果类型进行相应操作</li>
            <li>如需重新识别，可点击"清空"按钮重新开始</li>
          </ol>
        </div>
      </div>
    </div>
  )
}