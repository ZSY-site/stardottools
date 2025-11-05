'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'

// 工具接口定义
interface Tool {
  id: number
  name: Record<string, string>
  description: Record<string, string>
  category: Record<string, string>
  icon: string
  url: string
  rating: number
  usageCount: number
  tags: string[]
  featured: boolean
}

// 模拟工具数据
const mockTools: Tool[] = [
  {
    id: 1,
    name: { 'zh-CN': 'JSON格式化工具', 'en': 'JSON Formatter' },
    description: { 
      'zh-CN': '在线JSON格式化、验证和美化工具', 
      'en': 'Online JSON formatting, validation and beautification tool' 
    },
    category: { 'zh-CN': '开发工具', 'en': 'Development' },
    icon: '{}',
    url: '/tools/json-formatter',
    rating: 4.8,
    usageCount: 1200,
    tags: ['json格式化', 'json验证器', 'json美化'],
    featured: true
  },
  {
    id: 2,
    name: { 'zh-CN': 'URL编码解码', 'en': 'URL Encoder/Decoder' },
    description: { 
      'zh-CN': 'URL编码和解码工具，支持多种编码格式', 
      'en': 'URL encoding and decoding tool supporting multiple formats' 
    },
    category: { 'zh-CN': '网络工具', 'en': 'Network Tools' },
    icon: '🔗',
    url: '/tools/url-encoder',
    rating: 4.7,
    usageCount: 890,
    tags: ['url编码', 'url解码', '百分号编码'],
    featured: true
  },
  {
    id: 3,
    name: { 'zh-CN': '乌克兰地址生成器', 'en': 'Ukraine Address Generator' },
    description: { 
      'zh-CN': '生成乌克兰风格的随机地址信息', 
      'en': 'Generate random Ukraine-style address information' 
    },
    category: { 'zh-CN': '数据生成', 'en': 'Data Generation' },
    icon: '🏠',
    url: '/tools/ukraine-address',
    rating: 4.6,
    usageCount: 670,
    tags: ['乌克兰地址生成器', '乌克兰虚拟地址', '乌克兰邮编生成'],
    featured: true
  },
  {
    id: 4,
    name: { 'zh-CN': 'Base64编码解码', 'en': 'Base64 Encoder/Decoder' },
    description: { 
      'zh-CN': 'Base64编码和解码工具，支持文本和文件', 
      'en': 'Base64 encoding and decoding tool supporting text and files' 
    },
    category: { 'zh-CN': '加密解密', 'en': 'Encryption' },
    icon: '🔒',
    url: '/tools/base64',
    rating: 4.5,
    usageCount: 780,
    tags: ['base64编码', 'base64解码', '文件编码'],
    featured: false
  },
  {
    id: 5,
    name: { 'zh-CN': '文本差异比较', 'en': 'Text Diff Tool' },
    description: { 
      'zh-CN': '比较两个文本文件的差异，高亮显示不同之处', 
      'en': 'Compare differences between two text files with highlighting' 
    },
    category: { 'zh-CN': '文本处理', 'en': 'Text Processing' },
    icon: '📝',
    url: '/tools/text-diff',
    rating: 4.4,
    usageCount: 560,
    tags: ['文本比较', '差异对比', '代码对比'],
    featured: false
  },
  {
    id: 6,
    name: { 'zh-CN': '图片压缩工具', 'en': 'Image Compressor' },
    description: { 
      'zh-CN': '在线图片压缩，保持质量的同时减小文件大小', 
      'en': 'Online image compression while maintaining quality' 
    },
    category: { 'zh-CN': '图像处理', 'en': 'Image Processing' },
    icon: '🖼️',
    url: '/tools/image-compress',
    rating: 4.7,
    usageCount: 920,
    tags: ['图片压缩', '图像优化', '文件压缩'],
    featured: false
  },
  {
    id: 7,
    name: { 'zh-CN': '模拟时钟小组件', 'en': 'Analog Clock Widget' },
    description: { 
      'zh-CN': '精美的现代风格模拟时钟小组件，实时更新', 
      'en': 'Beautiful modern analog clock widget with real-time updates' 
    },
    category: { 'zh-CN': '网页工具', 'en': 'Web Tools' },
    icon: '⏰',
    url: '/tools/analog-clock',
    rating: 4.3,
    usageCount: 430,
    tags: ['模拟时钟', '实时时钟', '网页时钟'],
    featured: false
  },
  {
    id: 8,
    name: { 'zh-CN': '亚特兰大随机地址生成器', 'en': 'Atlanta Address Generator' },
    description: { 
      'zh-CN': '在线生成随机亚特兰大地址', 
      'en': 'Generate random Atlanta addresses online' 
    },
    category: { 'zh-CN': '数据生成', 'en': 'Data Generation' },
    icon: '🗺️',
    url: '/tools/atlanta-address',
    rating: 4.2,
    usageCount: 380,
    tags: ['亚特兰大地址生成器', '亚特兰大地址', '乔治亚地址'],
    featured: false
  },
  {
    id: 9,
    name: { 'zh-CN': '以色列地址生成器', 'en': 'Israel Address Generator' },
    description: { 
      'zh-CN': '生成以色列风格的随机地址信息', 
      'en': 'Generate random Israel-style address information' 
    },
    category: { 'zh-CN': '数据生成', 'en': 'Data Generation' },
    icon: '🏠',
    url: '/tools/israel-address',
    rating: 4.5,
    usageCount: 420,
    tags: ['以色列地址生成器', '以色列虚拟地址', '以色列邮编生成'],
    featured: false
  },
  // 新添加的工具
  {
    id: 10,
    name: { 'zh-CN': 'YouTube缩略图提取器', 'en': 'YouTube Thumbnail Extractor' },
    description: { 
      'zh-CN': '提取YouTube视频的缩略图，支持多种分辨率', 
      'en': 'Extract YouTube video thumbnails with multiple resolutions' 
    },
    category: { 'zh-CN': '网络工具', 'en': 'Network Tools' },
    icon: '📺',
    url: '/tools/youtube-thumbnail',
    rating: 4.6,
    usageCount: 850,
    tags: ['YouTube缩略图', '视频截图', '缩略图提取'],
    featured: true
  },
  {
    id: 11,
    name: { 'zh-CN': '二维码识别器', 'en': 'QR Code Scanner' },
    description: { 
      'zh-CN': '在线识别二维码内容，支持图片上传和摄像头扫描', 
      'en': 'Online QR code recognition supporting image upload and camera scan' 
    },
    category: { 'zh-CN': '图像处理', 'en': 'Image Processing' },
    icon: '📱',
    url: '/tools/qr-scanner',
    rating: 4.7,
    usageCount: 920,
    tags: ['二维码识别', 'QR码扫描', '条码识别'],
    featured: true
  },
  {
    id: 12,
    name: { 'zh-CN': '图片尺寸调整工具', 'en': 'Image Resizer' },
    description: { 
      'zh-CN': '在线调整图片尺寸，支持自定义宽高和比例缩放', 
      'en': 'Online image resizing with custom dimensions and proportional scaling' 
    },
    category: { 'zh-CN': '图像处理', 'en': 'Image Processing' },
    icon: '🖼️',
    url: '/tools/image-resize',
    rating: 4.5,
    usageCount: 780,
    tags: ['图片尺寸调整', '图片缩放', '尺寸修改'],
    featured: false
  },
  {
    id: 13,
    name: { 'zh-CN': '图片转Base64编码工具', 'en': 'Image to Base64 Converter' },
    description: { 
      'zh-CN': '将图片转换为Base64编码，支持多种图片格式', 
      'en': 'Convert images to Base64 encoding supporting multiple formats' 
    },
    category: { 'zh-CN': '图像处理', 'en': 'Image Processing' },
    icon: '🔤',
    url: '/tools/image-to-base64',
    rating: 4.4,
    usageCount: 650,
    tags: ['图片转Base64', 'Base64编码', '图片编码'],
    featured: false
  },
  {
    id: 14,
    name: { 'zh-CN': '在线图片马赛克工具', 'en': 'Online Image Mosaic Tool' },
    description: { 
      'zh-CN': '为图片添加马赛克效果，保护隐私信息', 
      'en': 'Add mosaic effects to images for privacy protection' 
    },
    category: { 'zh-CN': '图像处理', 'en': 'Image Processing' },
    icon: '🧩',
    url: '/tools/image-mosaic',
    rating: 4.3,
    usageCount: 580,
    tags: ['图片马赛克', '隐私保护', '图像模糊'],
    featured: false
  },
  {
    id: 15,
    name: { 'zh-CN': '在线条形码生成器', 'en': 'Online Barcode Generator' },
    description: { 
      'zh-CN': '生成多种格式的条形码，支持自定义样式', 
      'en': 'Generate barcodes in multiple formats with custom styling' 
    },
    category: { 'zh-CN': '图像处理', 'en': 'Image Processing' },
    icon: '📊',
    url: '/tools/barcode-generator',
    rating: 4.6,
    usageCount: 720,
    tags: ['条形码生成', '条码制作', '商品条码'],
    featured: false
  },
  {
    id: 16,
    name: { 'zh-CN': '幻影坦克生成器', 'en': 'Phantom Tank Generator' },
    description: { 
      'zh-CN': '生成幻影坦克效果图片，在不同背景下显示不同内容', 
      'en': 'Generate phantom tank effect images showing different content on different backgrounds' 
    },
    category: { 'zh-CN': '图像处理', 'en': 'Image Processing' },
    icon: '🎭',
    url: '/tools/phantom-tank',
    rating: 4.2,
    usageCount: 490,
    tags: ['幻影坦克', '图片特效', '视觉错觉'],
    featured: false
  },
  {
    id: 17,
    name: { 'zh-CN': '照片时间地点水印生成器', 'en': 'Photo Watermark Generator' },
    description: { 
      'zh-CN': '为照片添加时间、地点等水印信息', 
      'en': 'Add time, location and other watermark information to photos' 
    },
    category: { 'zh-CN': '图像处理', 'en': 'Image Processing' },
    icon: '⏰',
    url: '/tools/photo-watermark',
    rating: 4.4,
    usageCount: 610,
    tags: ['照片水印', '时间水印', '地点水印'],
    featured: false
  },
  {
    id: 18,
    name: { 'zh-CN': '七日年化收益率计算器', 'en': '7-Day Annualized Yield Calculator' },
    description: { 
      'zh-CN': '计算七日年化收益率，评估投资收益水平', 
      'en': 'Calculate 7-day annualized yield to evaluate investment returns' 
    },
    category: { 'zh-CN': '网页工具', 'en': 'Web Tools' },
    icon: '💰',
    url: '/tools/annual-yield-calculator',
    rating: 4.5,
    usageCount: 530,
    tags: ['收益率计算', '投资计算', '年化收益'],
    featured: false
  },
  {
    id: 19,
    name: { 'zh-CN': '中秋博饼小工具', 'en': 'Mid-Autumn Dice Game' },
    description: { 
      'zh-CN': '中秋博饼游戏模拟器，体验传统中秋文化', 
      'en': 'Mid-Autumn dice game simulator to experience traditional culture' 
    },
    category: { 'zh-CN': '网页工具', 'en': 'Web Tools' },
    icon: '🎲',
    url: '/tools/mid-autumn-dice',
    rating: 4.7,
    usageCount: 680,
    tags: ['中秋博饼', '骰子游戏', '传统文化'],
    featured: true
  },
  {
    id: 20,
    name: { 'zh-CN': '净利率计算器', 'en': 'Net Profit Margin Calculator' },
    description: { 
      'zh-CN': '计算企业净利率，分析盈利能力', 
      'en': 'Calculate net profit margin to analyze profitability' 
    },
    category: { 'zh-CN': '网页工具', 'en': 'Web Tools' },
    icon: '📈',
    url: '/tools/net-profit-margin',
    rating: 4.3,
    usageCount: 470,
    tags: ['净利率计算', '财务分析', '盈利能力'],
    featured: false
  },
  {
    id: 21,
    name: { 'zh-CN': '租售比计算器', 'en': 'Rent-to-Price Ratio Calculator' },
    description: { 
      'zh-CN': '计算房产租售比，评估投资价值', 
      'en': 'Calculate rent-to-price ratio to evaluate investment value' 
    },
    category: { 'zh-CN': '网页工具', 'en': 'Web Tools' },
    icon: '🏠',
    url: '/tools/rent-to-price-ratio',
    rating: 4.4,
    usageCount: 520,
    tags: ['租售比计算', '房产投资', '租金收益'],
    featured: false
  },
  {
    id: 22,
    name: { 'zh-CN': '税率计算器', 'en': 'Tax Calculator' },
    description: { 
      'zh-CN': '计算个人所得税、增值税等多种税种的应纳税额', 
      'en': 'Calculate taxes for income tax, VAT and other tax types' 
    },
    category: { 'zh-CN': '网页工具', 'en': 'Web Tools' },
    icon: '🧮',
    url: '/tools/tax-calculator',
    rating: 4.5,
    usageCount: 590,
    tags: ['税率计算', '个人所得税', '增值税'],
    featured: false
  },
  {
    id: 23,
    name: { 'zh-CN': 'M3U8播放器', 'en': 'M3U8 Player' },
    description: { 
      'zh-CN': '在线播放M3U8格式的视频流和直播内容', 
      'en': 'Online M3U8 video stream and live content player' 
    },
    category: { 'zh-CN': '网络工具', 'en': 'Network Tools' },
    icon: '🎬',
    url: '/tools/m3u8-player',
    rating: 4.6,
    usageCount: 710,
    tags: ['M3U8播放', '视频流', '直播播放'],
    featured: true
  },
  // 新添加的7个工具
  {
    id: 24,
    name: { 'zh-CN': '吃什么转盘', 'en': 'Food Roulette' },
    description: { 
      'zh-CN': '随机选择吃什么，解决选择困难症', 
      'en': 'Random food selection to solve decision fatigue' 
    },
    category: { 'zh-CN': '网页工具', 'en': 'Web Tools' },
    icon: '🎡',
    url: '/tools/food-roulette',
    rating: 4.7,
    usageCount: 890,
    tags: ['吃什么转盘', '随机选择', '食物选择'],
    featured: true
  },
  {
    id: 25,
    name: { 'zh-CN': '在线提词器', 'en': 'Teleprompter' },
    description: { 
      'zh-CN': '在线提词器，支持滚动速度和字体大小调整', 
      'en': 'Online teleprompter with scroll speed and font size adjustment' 
    },
    category: { 'zh-CN': '文本处理', 'en': 'Text Processing' },
    icon: '📜',
    url: '/tools/teleprompter',
    rating: 4.6,
    usageCount: 760,
    tags: ['在线提词器', '提词器', '演讲辅助'],
    featured: false
  },
  {
    id: 26,
    name: { 'zh-CN': '大小写转换器', 'en': 'Case Converter' },
    description: { 
      'zh-CN': '文本大小写转换，支持多种转换格式', 
      'en': 'Text case conversion supporting multiple formats' 
    },
    category: { 'zh-CN': '文本处理', 'en': 'Text Processing' },
    icon: '🔠',
    url: '/tools/case-converter',
    rating: 4.5,
    usageCount: 820,
    tags: ['大小写转换', '文本转换', '字母大小写'],
    featured: false
  },
  {
    id: 27,
    name: { 'zh-CN': '按姓氏笔画排列顺序工具', 'en': 'Name Sort by Stroke Count' },
    description: { 
      'zh-CN': '按姓氏笔画数排列姓名顺序，支持笔画和拼音排序', 
      'en': 'Sort names by surname stroke count with stroke and pinyin options' 
    },
    category: { 'zh-CN': '文本处理', 'en': 'Text Processing' },
    icon: '📝',
    url: '/tools/name-sort',
    rating: 4.4,
    usageCount: 680,
    tags: ['姓氏笔画排序', '姓名排序', '笔画数'],
    featured: false
  },
  {
    id: 28,
    name: { 'zh-CN': '文字转时间计算器', 'en': 'Text to Time Calculator' },
    description: { 
      'zh-CN': '将文字描述转换为具体时间，支持中文数字和时间单位', 
      'en': 'Convert text descriptions to specific times with Chinese numbers and time units' 
    },
    category: { 'zh-CN': '网页工具', 'en': 'Web Tools' },
    icon: '⏱️',
    url: '/tools/text-to-time',
    rating: 4.3,
    usageCount: 590,
    tags: ['文字转时间', '时间计算', '时间转换'],
    featured: false
  },
  {
    id: 29,
    name: { 'zh-CN': '文本按行分隔工具', 'en': 'Text Line Splitter' },
    description: { 
      'zh-CN': '按行、分隔符或固定长度分隔文本，支持多种处理选项', 
      'en': 'Split text by lines, delimiters or fixed length with multiple options' 
    },
    category: { 'zh-CN': '文本处理', 'en': 'Text Processing' },
    icon: '📄',
    url: '/tools/text-splitter',
    rating: 4.5,
    usageCount: 710,
    tags: ['文本分隔', '按行分隔', '文本处理'],
    featured: false
  },
  {
    id: 30,
    name: { 'zh-CN': '文本计数器', 'en': 'Text Counter' },
    description: { 
      'zh-CN': '统计文本字符数、字数、行数等详细信息', 
      'en': 'Count text characters, words, lines and other detailed information' 
    },
    category: { 'zh-CN': '文本处理', 'en': 'Text Processing' },
    icon: '🔢',
    url: '/tools/text-counter',
    rating: 4.6,
    usageCount: 950,
    tags: ['文本计数', '字符统计', '字数统计'],
    featured: true
  }
]

// 分类数据
const categories = [
  { id: 'all', name: { 'zh-CN': '所有工具', 'en': 'All Tools' } },
  { id: 'development', name: { 'zh-CN': '开发工具', 'en': 'Development' } },
  { id: 'text', name: { 'zh-CN': '文本处理', 'en': 'Text Processing' } },
  { id: 'data', name: { 'zh-CN': '数据生成', 'en': 'Data Generation' } },
  { id: 'encryption', name: { 'zh-CN': '加密解密', 'en': 'Encryption' } },
  { id: 'network', name: { 'zh-CN': '网络工具', 'en': 'Network Tools' } },
  { id: 'image', name: { 'zh-CN': '图像处理', 'en': 'Image Processing' } },
  { id: 'web', name: { 'zh-CN': '网页工具', 'en': 'Web Tools' } }
]

export default function ToolsPage() {
  const { language } = useLanguage()
  const t = translations[language]
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredTools, setFilteredTools] = useState<Tool[]>(mockTools)
  const [currentPage, setCurrentPage] = useState(1)
  const toolsPerPage = 8

  // 过滤工具
  useEffect(() => {
    let filtered = mockTools

    // 按分类过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => 
        tool.category[language].toLowerCase().includes(
          categories.find(cat => cat.id === selectedCategory)?.name[language].toLowerCase() || ''
        )
      )
    }

    // 按搜索查询过滤
    if (searchQuery) {
      filtered = filtered.filter(tool => 
        tool.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredTools(filtered)
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, language])

  // 分页逻辑
  const indexOfLastTool = currentPage * toolsPerPage
  const indexOfFirstTool = indexOfLastTool - toolsPerPage
  const currentTools = filteredTools.slice(indexOfFirstTool, indexOfLastTool)
  const totalPages = Math.ceil(filteredTools.length / toolsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.tools.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.tools.subtitle}
            </p>
          </div>

          {/* 搜索栏 */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder={t.tools.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* 分类筛选 */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name[language]}
              </button>
            ))}
          </div>

          {/* 工具数量统计 */}
          <div className="text-center text-gray-600">
            {t.tools.found.replace('{count}', filteredTools.length.toString())}
          </div>
        </div>
      </div>

      {/* 工具列表 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTools.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t.tools.noResults}
            </h3>
            <p className="text-gray-600">
              {t.tools.tryDifferent}
            </p>
          </div>
        ) : (
          <>
            {/* 工具网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {currentTools.map((tool) => (
                <a
                  key={tool.id}
                  href={tool.url}
                  className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden cursor-pointer"
                >
                  <div className="p-6">
                    {/* 工具头部 */}
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-xl">{tool.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {tool.name[language]}
                        </h3>
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {tool.category[language]}
                        </span>
                      </div>
                      {tool.featured && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          ⭐ {t.tools.featured}
                        </span>
                      )}
                    </div>

                    {/* 工具描述 */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {tool.description[language]}
                    </p>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {tool.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 工具底部信息 */}
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          ⭐ {tool.rating}
                        </span>
                        <span>
                          {tool.usageCount >= 1000 
                            ? `${(tool.usageCount / 1000).toFixed(1)}k` 
                            : tool.usageCount
                          } {language === 'zh-CN' ? '次使用' : 'uses'}
                        </span>
                      </div>
                      <span className="text-blue-600 font-medium">
                        {t.tools.useNow} →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* 分页 */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  ← {t.tools.previous}
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                  if (pageNumber > totalPages) return null
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === pageNumber
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                })}
                
                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  {t.tools.next} →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}