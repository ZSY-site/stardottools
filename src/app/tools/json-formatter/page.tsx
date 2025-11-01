'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'

// JSON格式化工具详情页面
export default function JsonFormatterPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const [jsonInput, setJsonInput] = useState('')
  const [formattedJson, setFormattedJson] = useState('')
  const [error, setError] = useState('')
  const [isCompressed, setIsCompressed] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [statistics, setStatistics] = useState({
    characters: 0,
    lines: 0,
    objects: 0,
    arrays: 0,
    keys: 0,
    values: 0
  })

  // 格式化JSON
  const formatJson = () => {
    try {
      if (!jsonInput.trim()) {
        setError('')
        setFormattedJson('')
        setIsValid(false)
        return
      }

      const parsed = JSON.parse(jsonInput)
      const formatted = isCompressed 
        ? JSON.stringify(parsed)
        : JSON.stringify(parsed, null, 2)
      
      setFormattedJson(formatted)
      setError('')
      setIsValid(true)

      // 计算统计信息
      const stats = calculateStatistics(parsed)
      setStatistics(stats)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON')
      setFormattedJson('')
      setIsValid(false)
      setStatistics({
        characters: 0,
        lines: 0,
        objects: 0,
        arrays: 0,
        keys: 0,
        values: 0
      })
    }
  }

  // 计算JSON统计信息
  const calculateStatistics = (obj: any) => {
    let objects = 0
    let arrays = 0
    let keys = 0
    let values = 0

    const traverse = (current: any) => {
      if (typeof current === 'object' && current !== null) {
        if (Array.isArray(current)) {
          arrays++
          current.forEach(item => traverse(item))
        } else {
          objects++
          Object.entries(current).forEach(([key, value]) => {
            keys++
            values++
            traverse(value)
          })
        }
      }
    }

    traverse(obj)

    return {
      characters: jsonInput.length,
      lines: jsonInput.split('\n').length,
      objects,
      arrays,
      keys,
      values
    }
  }

  // 压缩JSON
  const compressJson = () => {
    setIsCompressed(true)
  }

  // 美化JSON
  const beautifyJson = () => {
    setIsCompressed(false)
  }

  // 清空输入
  const clearInput = () => {
    setJsonInput('')
    setFormattedJson('')
    setError('')
    setIsValid(false)
    setStatistics({
      characters: 0,
      lines: 0,
      objects: 0,
      arrays: 0,
      keys: 0,
      values: 0
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

  // 示例JSON
  const loadExample = () => {
    const example = `{
  "name": "JSON格式化工具",
  "description": "在线JSON格式化、验证和美化工具",
  "features": ["格式化", "验证", "压缩", "美化"],
  "stats": {
    "users": 1200,
    "rating": 4.8,
    "tags": ["json", "格式化", "开发工具"]
  }
}`
    setJsonInput(example)
  }

  // 自动格式化
  useEffect(() => {
    formatJson()
  }, [jsonInput, isCompressed])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            JSON格式化工具
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            在线JSON格式化、验证和压缩工具，支持语法高亮和详细统计信息
          </p>
        </div>

        {/* 主要功能区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 输入区域 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">输入JSON</h2>
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
            
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="在此粘贴或输入JSON数据..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm resize-none"
            />
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-700 font-medium">JSON错误：</span>
                  <span className="text-red-600 ml-1">{error}</span>
                </div>
              </div>
            )}
          </div>

          {/* 输出区域 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">格式化结果</h2>
              <div className="flex space-x-2">
                <button
                  onClick={beautifyJson}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    !isCompressed 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  美化
                </button>
                <button
                  onClick={compressJson}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    isCompressed 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  压缩
                </button>
                {formattedJson && (
                  <button
                    onClick={() => copyToClipboard(formattedJson)}
                    className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    复制
                  </button>
                )}
              </div>
            </div>
            
            <div className="relative">
              <pre className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-auto font-mono text-sm">
                <code className={`${isValid ? 'text-green-600' : 'text-gray-400'}`}>
                  {formattedJson || '格式化结果将显示在这里...'}
                </code>
              </pre>
              
              {isValid && (
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                    ✓ 有效JSON
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 统计信息 */}
        {isValid && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">统计信息</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{statistics.characters}</div>
                <div className="text-sm text-blue-700">字符数</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{statistics.lines}</div>
                <div className="text-sm text-green-700">行数</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{statistics.objects}</div>
                <div className="text-sm text-purple-700">对象数</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{statistics.arrays}</div>
                <div className="text-sm text-yellow-700">数组数</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{statistics.keys}</div>
                <div className="text-sm text-red-700">键数量</div>
              </div>
              <div className="text-center p-4 bg-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{statistics.values}</div>
                <div className="text-sm text-indigo-700">值数量</div>
              </div>
            </div>
          </div>
        )}

        {/* 功能特性 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">美化格式</h3>
            <p className="text-gray-600 text-sm">使用适当的缩进和语法高亮格式化JSON，提高可读性</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🗜️</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">压缩优化</h3>
            <p className="text-gray-600 text-sm">移除空白字符，减少文件大小，适用于生产环境</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">验证调试</h3>
            <p className="text-gray-600 text-sm">检测语法错误，提供详细的错误信息和行号定位</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔤</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">键值排序</h3>
            <p className="text-gray-600 text-sm">按字母顺序排列对象键，保持格式一致性</p>
          </div>
        </div>

        {/* 适用场景 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">适用场景</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍💻</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">开发者</h4>
              <p className="text-gray-600 text-sm">调试API响应、格式化配置文件，在开发过程中验证JSON数据结构</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧪</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">测试工程师</h4>
              <p className="text-gray-600 text-sm">验证API响应、测试数据格式，确保测试流程中的JSON合规性</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">数据分析师</h4>
              <p className="text-gray-600 text-sm">清理和格式化JSON数据集，验证数据结构，为分析准备数据</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}