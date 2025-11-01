'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'

interface Category {
  id: number
  name: Record<string, string>
  description: Record<string, string>
  icon: string
  toolCount: number
  color: string
}

const categories: Category[] = [
  {
    id: 1,
    name: { 'zh-CN': '开发工具', 'zh-HK': '開發工具', 'en': 'Development' },
    description: { 
      'zh-CN': '前端、后端、移动端开发相关工具', 
      'zh-HK': '前端、後端、移動端開發相關工具', 
      'en': 'Frontend, backend, mobile development tools' 
    },
    icon: '💻',
    toolCount: 156,
    color: 'blue'
  },
  {
    id: 2,
    name: { 'zh-CN': '文本处理', 'zh-HK': '文本處理', 'en': 'Text Processing' },
    description: { 
      'zh-CN': '文本编辑、格式化、转换工具', 
      'zh-HK': '文本編輯、格式化、轉換工具', 
      'en': 'Text editing, formatting, conversion tools' 
    },
    icon: '📝',
    toolCount: 89,
    color: 'green'
  },
  {
    id: 3,
    name: { 'zh-CN': '数据生成', 'zh-HK': '數據生成', 'en': 'Data Generation' },
    description: { 
      'zh-CN': '测试数据、随机数据生成器', 
      'zh-HK': '測試數據、隨機數據生成器', 
      'en': 'Test data, random data generators' 
    },
    icon: '📊',
    toolCount: 67,
    color: 'purple'
  },
  {
    id: 4,
    name: { 'zh-CN': '加密解密', 'zh-HK': '加密解密', 'en': 'Encryption' },
    description: { 
      'zh-CN': '加密、解密、哈希算法工具', 
      'zh-HK': '加密、解密、哈希算法工具', 
      'en': 'Encryption, decryption, hashing tools' 
    },
    icon: '🔒',
    toolCount: 45,
    color: 'red'
  },
  {
    id: 5,
    name: { 'zh-CN': '网络工具', 'zh-HK': '網絡工具', 'en': 'Network Tools' },
    description: { 
      'zh-CN': '网络测试、分析、监控工具', 
      'zh-HK': '網絡測試、分析、監控工具', 
      'en': 'Network testing, analysis, monitoring tools' 
    },
    icon: '🌐',
    toolCount: 78,
    color: 'indigo'
  },
  {
    id: 6,
    name: { 'zh-CN': '图像处理', 'zh-HK': '圖像處理', 'en': 'Image Processing' },
    description: { 
      'zh-CN': '图片编辑、压缩、转换工具', 
      'zh-HK': '圖片編輯、壓縮、轉換工具', 
      'en': 'Image editing, compression, conversion tools' 
    },
    icon: '🖼️',
    toolCount: 92,
    color: 'pink'
  }
]

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  red: 'bg-red-100 text-red-600',
  indigo: 'bg-indigo-100 text-indigo-600',
  pink: 'bg-pink-100 text-pink-600'
}

export default function ToolCategories() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section id="tool-categories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.categories.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.categories.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id}
              href="/tools"
              className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-gray-100 cursor-pointer"
            >
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{category.name[language]}</h3>
                <p className="text-gray-600 text-sm">{category.description[language]}</p>
              </div>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  {category.toolCount} {language === 'zh-CN' ? '个工具' : language === 'zh-HK' ? '個工具' : 'tools'}
                </span>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  {t.common.viewAll} →
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}