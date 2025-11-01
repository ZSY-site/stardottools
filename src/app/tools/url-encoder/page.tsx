'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'

// URL编码解码工具详情页面
export default function UrlEncoderPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const [inputText, setInputText] = useState('')
  const [encodedText, setEncodedText] = useState('')
  const [decodedText, setDecodedText] = useState('')
  const [encodingMethod, setEncodingMethod] = useState<'encodeURIComponent' | 'encodeURI'>('encodeURIComponent')
  const [enableMultiDecode, setEnableMultiDecode] = useState(false)
  const [statistics, setStatistics] = useState({
    inputLength: 0,
    encodedLength: 0,
    decodedLength: 0,
    encodedRatio: 0
  })

  // URL编码函数
  const encodeText = (text: string, method: 'encodeURIComponent' | 'encodeURI') => {
    try {
      if (method === 'encodeURIComponent') {
        return encodeURIComponent(text)
      } else {
        return encodeURI(text)
      }
    } catch (error) {
      return '编码错误'
    }
  }

  // URL解码函数
  const decodeText = (text: string, multiDecode: boolean) => {
    try {
      let decoded = text
      if (multiDecode) {
        let previous = ''
        while (decoded !== previous) {
          previous = decoded
          decoded = decodeURIComponent(decoded)
        }
      } else {
        decoded = decodeURIComponent(text)
      }
      return decoded
    } catch (error) {
      return '解码错误：无效的URL编码'
    }
  }

  // 处理编码
  const handleEncode = () => {
    if (!inputText.trim()) {
      setEncodedText('')
      setDecodedText('')
      return
    }

    const encoded = encodeText(inputText, encodingMethod)
    setEncodedText(encoded)
    
    // 自动解码
    const decoded = decodeText(encoded, enableMultiDecode)
    setDecodedText(decoded)

    // 更新统计信息
    setStatistics({
      inputLength: inputText.length,
      encodedLength: encoded.length,
      decodedLength: decoded.length,
      encodedRatio: inputText.length > 0 ? Math.round((encoded.length / inputText.length) * 100) : 0
    })
  }

  // 处理解码
  const handleDecode = () => {
    if (!inputText.trim()) {
      setEncodedText('')
      setDecodedText('')
      return
    }

    const decoded = decodeText(inputText, enableMultiDecode)
    setDecodedText(decoded)
    
    // 自动编码
    const encoded = encodeText(decoded, encodingMethod)
    setEncodedText(encoded)

    // 更新统计信息
    setStatistics({
      inputLength: inputText.length,
      encodedLength: encoded.length,
      decodedLength: decoded.length,
      encodedRatio: decoded.length > 0 ? Math.round((encoded.length / decoded.length) * 100) : 0
    })
  }

  // 清空输入
  const clearInput = () => {
    setInputText('')
    setEncodedText('')
    setDecodedText('')
    setStatistics({
      inputLength: 0,
      encodedLength: 0,
      decodedLength: 0,
      encodedRatio: 0
    })
  }

  // 复制到剪贴板
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('已复制到剪贴板')
    } catch (err) {
      alert('复制失败，请手动复制')
    }
  }

  // 加载示例
  const loadExample = () => {
    const example = 'https://example.com/search?q=URL编码解码工具&category=开发工具'
    setInputText(example)
  }

  // 自动处理
  useEffect(() => {
    if (inputText.trim()) {
      // 检测输入是否为URL编码格式
      const isEncoded = /%[0-9A-Fa-f]{2}/.test(inputText)
      if (isEncoded) {
        handleDecode()
      } else {
        handleEncode()
      }
    } else {
      setEncodedText('')
      setDecodedText('')
      setStatistics({
        inputLength: 0,
        encodedLength: 0,
        decodedLength: 0,
        encodedRatio: 0
      })
    }
  }, [inputText, encodingMethod, enableMultiDecode])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            URL编码解码工具
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            快速编码和解码URL。将特殊字符转换为URL安全格式，轻松解码百分号编码字符串。
          </p>
        </div>

        {/* 核心功能区域 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">核心功能</h2>
            <div className="flex space-x-2">
              <button
                onClick={loadExample}
                className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                加载示例
              </button>
              <button
                onClick={clearInput}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                清空
              </button>
            </div>
          </div>

          {/* 编码设置 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">编码方式</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="encodingMethod"
                    value="encodeURIComponent"
                    checked={encodingMethod === 'encodeURIComponent'}
                    onChange={(e) => setEncodingMethod(e.target.value as 'encodeURIComponent' | 'encodeURI')}
                    className="mr-2"
                  />
                  <span className="text-sm">encodeURIComponent</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="encodingMethod"
                    value="encodeURI"
                    checked={encodingMethod === 'encodeURI'}
                    onChange={(e) => setEncodingMethod(e.target.value as 'encodeURIComponent' | 'encodeURI')}
                    className="mr-2"
                  />
                  <span className="text-sm">encodeURI</span>
                </label>
              </div>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={enableMultiDecode}
                  onChange={(e) => setEnableMultiDecode(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">启用多重解码</span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                重复解码直到不再变化，适用于处理双重或三重编码
              </p>
            </div>
          </div>

          {/* 输入区域 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">输入文本</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="在此输入需要编码或解码的文本..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
            />
          </div>

          {/* 输出区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">编码结果</label>
                {encodedText && (
                  <button
                    onClick={() => copyToClipboard(encodedText)}
                    className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                  >
                    复制
                  </button>
                )}
              </div>
              <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 min-h-32 font-mono text-sm whitespace-pre-wrap break-all">
                {encodedText || '编码结果将显示在这里...'}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">解码结果</label>
                {decodedText && (
                  <button
                    onClick={() => copyToClipboard(decodedText)}
                    className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                  >
                    复制
                  </button>
                )}
              </div>
              <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 min-h-32 font-mono text-sm whitespace-pre-wrap">
                {decodedText || '解码结果将显示在这里...'}
              </div>
            </div>
          </div>
        </div>

        {/* 统计信息 */}
        {inputText && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">统计信息</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{statistics.inputLength}</div>
                <div className="text-sm text-blue-700">输入长度</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{statistics.encodedLength}</div>
                <div className="text-sm text-green-700">编码长度</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{statistics.decodedLength}</div>
                <div className="text-sm text-purple-700">解码长度</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{statistics.encodedRatio}%</div>
                <div className="text-sm text-yellow-700">编码比例</div>
              </div>
            </div>
          </div>
        )}

        {/* 功能特性 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">即时处理</h3>
            <p className="text-gray-600 text-sm">实时编码解码，输入即处理，无需手动触发</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">多种编码方式</h3>
            <p className="text-gray-600 text-sm">支持encodeURIComponent和encodeURI两种编码方法</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔄</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">智能解码</h3>
            <p className="text-gray-600 text-sm">自动检测并支持多重解码，处理多层编码的URL</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">详细统计</h3>
            <p className="text-gray-600 text-sm">跟踪输入输出长度和编码统计信息</p>
          </div>
        </div>

        {/* 适用场景 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">适用场景</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💻</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Web开发者</h4>
              <p className="text-gray-600 text-sm">编码查询参数，解码API响应，安全处理URL中的特殊字符</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📈</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">SEO专员</h4>
              <p className="text-gray-600 text-sm">分析URL参数，解码跟踪链接，优化搜索引擎的URL结构</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">数据分析师</h4>
              <p className="text-gray-600 text-sm">处理Web日志，解码分析数据中的URL参数，清理数据集</p>
            </div>
          </div>
        </div>

        {/* 常见问题 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">常见问题</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">什么是URL编码？</h4>
              <p className="text-gray-600 text-sm">
                URL编码（也称为百分号编码）是在URL中编码信息的机制。特殊字符被替换为百分号（%）后跟两个十六进制数字，表示字符的ASCII码。例如，空格变成%20。
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">何时使用encodeURIComponent与encodeURI？</h4>
              <p className="text-gray-600 text-sm">
                encodeURIComponent：用于编码单个URL组件，如查询参数。它编码所有特殊字符，包括/、?、:、@、&、=、+、$和#。
                encodeURI：用于编码完整URL。它保留URL结构字符如/、?、:、@、&、=、+、$和#，但编码其他特殊字符。
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">哪些字符需要URL编码？</h4>
              <p className="text-gray-600 text-sm">
                需要编码的字符包括：空格、引号（"）、井号（#）、百分号（%）、花括号（）、竖线（|）、反斜杠（\）、插入符（^）、波浪号（~）、方括号（[]）、重音符（`），以及非ASCII字符如中文、阿拉伯文或表情符号。
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">什么是多重解码？</h4>
              <p className="text-gray-600 text-sm">
                多重解码会重复解码字符串，直到不再发生变化。这在处理双重或三重编码的URL时很有用，其中%2520变成%20，然后变成空格。当您怀疑存在多层编码时，请启用此选项。
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">使用此工具时我的数据安全吗？</h4>
              <p className="text-gray-600 text-sm">
                是的！所有编码和解码都直接在您的浏览器中使用JavaScript进行。您的数据永远不会发送到我们的服务器或存储在任何地方。页面加载后，工具完全离线工作。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}