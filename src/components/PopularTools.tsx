'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'

interface Tool {
  id: number
  name: Record<string, string>
  description: Record<string, string>
  category: Record<string, string>
  icon: string
  url: string
}

const popularTools: Tool[] = [
  {
    id: 1,
    name: { 'zh-CN': '模拟时钟小组件', 'zh-HK': '模擬時鐘小組件', 'en': 'Analog Clock Widget' },
    description: { 
      'zh-CN': '精美的现代风格模拟时钟小组件，实时更新。具有时尚设计美学、流畅动画和响应式设计。', 
      'zh-HK': '精美嘅現代風格模擬時鐘小組件，實時更新。具有時尚設計美學、流暢動畫同響應式設計。', 
      'en': 'Beautiful modern analog clock widget with real-time updates, stylish design aesthetics, smooth animations and responsive design.' 
    },
    category: { 'zh-CN': '网页组件', 'zh-HK': '網頁組件', 'en': 'Web Components' },
    icon: '⏰',
    url: '/tools/analog-clock'
  },
  {
    id: 2,
    name: { 'zh-CN': 'JSON格式化工具', 'zh-HK': 'JSON格式化工具', 'en': 'JSON Formatter' },
    description: { 
      'zh-CN': '在线格式化、验证和压缩JSON数据。支持语法高亮、错误检测、树形视图和JSON压缩。', 
      'zh-HK': '在線格式化、驗證同壓縮JSON數據。支持語法高亮、錯誤檢測、樹形視圖同JSON壓縮。', 
      'en': 'Online JSON formatting, validation and compression. Supports syntax highlighting, error detection, tree view and JSON compression.' 
    },
    category: { 'zh-CN': '开发工具', 'zh-HK': '開發工具', 'en': 'Development' },
    icon: '{}',
    url: '/tools/json-formatter'
  },
  {
    id: 3,
    name: { 'zh-CN': 'URL编码解码工具', 'zh-HK': 'URL編碼解碼工具', 'en': 'URL Encoder/Decoder' },
    description: { 
      'zh-CN': '在线URL编码解码工具。将特殊字符转换为URL安全格式，解码URL编码字符串。', 
      'zh-HK': '在線URL編碼解碼工具。將特殊字符轉換為URL安全格式，解碼URL編碼字符串。', 
      'en': 'Online URL encoding/decoding tool. Converts special characters to URL-safe format, decodes URL-encoded strings.' 
    },
    category: { 'zh-CN': '网络工具', 'zh-HK': '網絡工具', 'en': 'Network Tools' },
    icon: '🔗',
    url: '/tools/url-encoder'
  },
  {
    id: 4,
    name: { 'zh-CN': '乌克兰地址生成器', 'zh-HK': '烏克蘭地址生成器', 'en': 'Ukraine Address Generator' },
    description: { 
      'zh-CN': '免费在线生成符合乌克兰本地格式的虚拟地址和身份数据，包括详细街道地址、邮编、州区等。', 
      'zh-HK': '免費在線生成符合烏克蘭本地格式嘅虛擬地址同身份數據，包括詳細街道地址、郵編、州區等。', 
      'en': 'Free online generation of virtual addresses and identity data in Ukrainian local format, including detailed street addresses, zip codes, states, etc.' 
    },
    category: { 'zh-CN': '数据生成', 'zh-HK': '數據生成', 'en': 'Data Generation' },
    icon: '🏠',
    url: '/tools/ukraine-address'
  },
  {
    id: 5,
    name: { 'zh-CN': '亚特兰大随机地址生成器', 'zh-HK': '亞特蘭大隨機地址生成器', 'en': 'Atlanta Random Address Generator' },
    description: { 
      'zh-CN': '在线生成随机亚特兰大地址。桃子州首府城市的真实地址格式，完美适用于开发者测试数据。', 
      'zh-HK': '在線生成隨機亞特蘭大地址。桃子州首府城市嘅真實地址格式，完美適用於開發者測試數據。', 
      'en': 'Online generation of random Atlanta addresses. Real address format for the Peach State capital city, perfect for developer test data.' 
    },
    category: { 'zh-CN': '数据生成', 'zh-HK': '數據生成', 'en': 'Data Generation' },
    icon: '🏢',
    url: '/tools/atlanta-address'
  },
  {
    id: 6,
    name: { 'zh-CN': '以色列地址生成器', 'zh-HK': '以色列地址生成器', 'en': 'Israel Address Generator' },
    description: { 
      'zh-CN': '免费在线生成符合以色列本地格式的虚拟地址和身份数据，包括详细街道地址、邮编、地区等。', 
      'zh-HK': '免費在線生成符合以色列本地格式嘅虛擬地址同身份數據，包括詳細街道地址、郵編、地區等。', 
      'en': 'Free online generation of virtual addresses and identity data in Israeli local format, including detailed street addresses, zip codes, regions, etc.' 
    },
    category: { 'zh-CN': '数据生成', 'zh-HK': '數據生成', 'en': 'Data Generation' },
    icon: '🏛️',
    url: '/tools/israel-address'
  },
  {
    id: 7,
    name: { 'zh-CN': '休斯敦随机地址生成器', 'zh-HK': '休斯敦隨機地址生成器', 'en': 'Houston Random Address Generator' },
    description: { 
      'zh-CN': '在线生成随机休斯敦地址。太空城的真实地址格式，完美适用于开发者测试数据。', 
      'zh-HK': '在線生成隨機休斯敦地址。太空城嘅真實地址格式，完美適用於開發者測試數據。', 
      'en': 'Online generation of random Houston addresses. Real address format for Space City, perfect for developer test data.' 
    },
    category: { 'zh-CN': '数据生成', 'zh-HK': '數據生成', 'en': 'Data Generation' },
    icon: '🚀',
    url: '/tools/houston-address'
  },
  {
    id: 8,
    name: { 'zh-CN': '俄勒冈州随机地址生成器', 'zh-HK': '俄勒岡州隨機地址生成器', 'en': 'Oregon Random Address Generator' },
    description: { 
      'zh-CN': '在线生成俄勒冈州的随机地址，俄勒冈是美国免消费税州之一，适用于开发者测试数据。', 
      'zh-HK': '在線生成俄勒岡州嘅隨機地址，俄勒岡係美國免消費稅州之一，適用於開發者測試數據。', 
      'en': 'Online generation of random Oregon addresses. Oregon is one of the US states with no sales tax, suitable for developer test data.' 
    },
    category: { 'zh-CN': '数据生成', 'zh-HK': '數據生成', 'en': 'Data Generation' },
    icon: '🌲',
    url: '/tools/oregon-address'
  },
  {
    id: 9,
    name: { 'zh-CN': '凤凰城随机地址生成器', 'zh-HK': '鳳凰城隨機地址生成器', 'en': 'Phoenix Random Address Generator' },
    description: { 
      'zh-CN': '在线生成凤凰城的随机地址，亚利桑那州最大城市，适用于开发者测试数据。', 
      'zh-HK': '在線生成鳳凰城嘅隨機地址，亞利桑那州最大城市，適用於開發者測試數據。', 
      'en': 'Online generation of random Phoenix addresses. Largest city in Arizona, suitable for developer test data.' 
    },
    category: { 'zh-CN': '数据生成', 'zh-HK': '數據生成', 'en': 'Data Generation' },
    icon: '🌵',
    url: '/tools/phoenix-address'
  }
]

export default function PopularTools() {
  const { language } = useLanguage()
  const t = translations[language]
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.popular.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.popular.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularTools.map((tool) => (
            <Link 
              key={tool.id}
              href="/tools"
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-xl">{tool.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{tool.name[language]}</h3>
                    <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {tool.category[language]}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{tool.description[language]}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <span>⭐ 4.8</span>
                    <span className="mx-2">•</span>
                    <span>1.2k 次使用</span>
                  </div>
                  <span className="text-blue-600 font-medium text-sm">
                    {t.popular.useNow} →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/tools" className="inline-block border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
            {t.common.viewAll}
          </Link>
        </div>
      </div>
    </section>
  )
}