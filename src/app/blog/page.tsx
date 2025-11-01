'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'
import Link from 'next/link'

// 模拟博客文章数据（12篇文章）
const blogPosts = [
  {
    id: 1,
    title: { 
      'zh-CN': 'ChatGPT Atlas浏览器官网下载 - OpenAI推出的AI智能浏览器', 
      'zh-HK': 'ChatGPT Atlas瀏覽器官網下載 - OpenAI推出嘅AI智能瀏覽器', 
      'en': 'ChatGPT Atlas Browser Official Download - AI Smart Browser by OpenAI' 
    },
    excerpt: {
      'zh-CN': 'OpenAI推出的革命性AI浏览器，集成ChatGPT智能助手，支持侧边栏聊天、智能记忆、自动化操作等创新功能。',
      'zh-HK': 'OpenAI推出嘅革命性AI瀏覽器，集成ChatGPT智能助手，支持側邊欄聊天、智能記憶、自動化操作等創新功能。',
      'en': 'Revolutionary AI browser by OpenAI, integrating ChatGPT smart assistant, supporting sidebar chat, intelligent memory, automation and other innovative features.'
    },
    category: { 'zh-CN': 'AI工具', 'zh-HK': 'AI工具', 'en': 'AI Tools' },
    date: '2025-10-25',
    readTime: { 'zh-CN': '5分钟阅读', 'zh-HK': '5分鐘閱讀', 'en': '5 min read' },
    featured: true,
    tags: ['ChatGPT浏览器', 'AI浏览器', 'OpenAI', 'Atlas浏览器', '智能浏览器', 'AI助手']
  },
  {
    id: 2,
    title: { 
      'zh-CN': 'Perplexity Comet浏览器官网下载 - AI驱动的智能浏览器', 
      'zh-HK': 'Perplexity Comet瀏覽器官網下載 - AI驅動嘅智能瀏覽器', 
      'en': 'Perplexity Comet Browser Official Download - AI-Powered Smart Browser' 
    },
    excerpt: {
      'zh-CN': 'Comet是由Perplexity推出的AI智能浏览器，集成强大的AI助手功能，支持智能搜索、内容理解、标签管理等创新功能。',
      'zh-HK': 'Comet係由Perplexity推出嘅AI智能瀏覽器，集成強大嘅AI助手功能，支持智能搜索、內容理解、標籤管理等創新功能。',
      'en': 'Comet is an AI smart browser launched by Perplexity, integrating powerful AI assistant features, supporting intelligent search, content understanding, tag management and other innovative functions.'
    },
    category: { 'zh-CN': 'AI工具', 'zh-HK': 'AI工具', 'en': 'AI Tools' },
    date: '2025-10-24',
    readTime: { 'zh-CN': '4分钟阅读', 'zh-HK': '4分鐘閱讀', 'en': '4 min read' },
    featured: true,
    tags: ['AI浏览器', 'Perplexity', 'Comet', '智能浏览器', 'AI助手', 'Comet浏览器下载']
  },
  {
    id: 3,
    title: { 
      'zh-CN': 'Next.js 14新特性详解 - 服务端组件和App Router', 
      'zh-HK': 'Next.js 14新特性詳解 - 服務端組件同App Router', 
      'en': 'Next.js 14 New Features - Server Components and App Router' 
    },
    excerpt: {
      'zh-CN': '深入解析Next.js 14的最新特性，包括服务端组件、App Router、Turbopack等核心功能的详细使用指南。',
      'zh-HK': '深入解析Next.js 14嘅最新特性，包括服務端組件、App Router、Turbopack等核心功能嘅詳細使用指南。',
      'en': 'In-depth analysis of Next.js 14 latest features, including server components, App Router, Turbopack and other core functionalities.'
    },
    category: { 'zh-CN': '前端开发', 'zh-HK': '前端開發', 'en': 'Frontend Development' },
    date: '2025-10-23',
    readTime: { 'zh-CN': '8分钟阅读', 'zh-HK': '8分鐘閱讀', 'en': '8 min read' },
    featured: true,
    tags: ['Next.js', 'React', '前端框架', '服务端渲染', 'App Router']
  },
  {
    id: 4,
    title: { 
      'zh-CN': 'TypeScript 5.5新功能解析 - 类型系统优化', 
      'zh-HK': 'TypeScript 5.5新功能解析 - 類型系統優化', 
      'en': 'TypeScript 5.5 New Features - Type System Optimization' 
    },
    excerpt: {
      'zh-CN': 'TypeScript 5.5带来了多项类型系统优化，包括改进的推断能力、新的实用类型和更好的错误提示。',
      'zh-HK': 'TypeScript 5.5帶來咗多項類型系統優化，包括改進嘅推斷能力、新嘅實用類型同更好嘅錯誤提示。',
      'en': 'TypeScript 5.5 brings multiple type system optimizations, including improved inference capabilities, new utility types and better error messages.'
    },
    category: { 'zh-CN': '前端开发', 'zh-HK': '前端開發', 'en': 'Frontend Development' },
    date: '2025-10-22',
    readTime: { 'zh-CN': '6分钟阅读', 'zh-HK': '6分鐘閱讀', 'en': '6 min read' },
    featured: false,
    tags: ['TypeScript', 'JavaScript', '类型系统', '前端开发']
  },
  {
    id: 5,
    title: { 
      'zh-CN': 'Docker容器化部署最佳实践', 
      'zh-HK': 'Docker容器化部署最佳實踐', 
      'en': 'Docker Container Deployment Best Practices' 
    },
    excerpt: {
      'zh-CN': '分享Docker容器化部署的最佳实践，包括镜像优化、网络配置、安全设置和性能调优。',
      'zh-HK': '分享Docker容器化部署嘅最佳實踐，包括鏡像優化、網絡配置、安全設置同性能調優。',
      'en': 'Sharing Docker container deployment best practices, including image optimization, network configuration, security settings and performance tuning.'
    },
    category: { 'zh-CN': '后端开发', 'zh-HK': '後端開發', 'en': 'Backend Development' },
    date: '2025-10-21',
    readTime: { 'zh-CN': '10分钟阅读', 'zh-HK': '10分鐘閱讀', 'en': '10 min read' },
    featured: true,
    tags: ['Docker', '容器化', '部署', 'DevOps', '云原生']
  },
  {
    id: 6,
    title: { 
      'zh-CN': 'Node.js性能优化技巧', 
      'zh-HK': 'Node.js性能優化技巧', 
      'en': 'Node.js Performance Optimization Tips' 
    },
    excerpt: {
      'zh-CN': '深入探讨Node.js应用的性能优化技巧，包括内存管理、事件循环优化和异步编程最佳实践。',
      'zh-HK': '深入探討Node.js應用嘅性能優化技巧，包括內存管理、事件循環優化同異步編程最佳實踐。',
      'en': 'In-depth discussion of Node.js application performance optimization techniques, including memory management, event loop optimization and asynchronous programming best practices.'
    },
    category: { 'zh-CN': '后端开发', 'zh-HK': '後端開發', 'en': 'Backend Development' },
    date: '2025-10-20',
    readTime: { 'zh-CN': '7分钟阅读', 'zh-HK': '7分鐘閱讀', 'en': '7 min read' },
    featured: false,
    tags: ['Node.js', '性能优化', 'JavaScript', '后端开发']
  },
  {
    id: 7,
    title: { 
      'zh-CN': 'React 18并发特性深度解析', 
      'zh-HK': 'React 18併發特性深度解析', 
      'en': 'React 18 Concurrent Features Deep Dive' 
    },
    excerpt: {
      'zh-CN': '详细解析React 18的并发特性，包括自动批处理、过渡更新和Suspense等新功能。',
      'zh-HK': '詳細解析React 18嘅併發特性，包括自動批處理、過渡更新同Suspense等新功能。',
      'en': 'Detailed analysis of React 18 concurrent features, including automatic batching, transition updates and Suspense.'
    },
    category: { 'zh-CN': '前端开发', 'zh-HK': '前端開發', 'en': 'Frontend Development' },
    date: '2025-10-19',
    readTime: { 'zh-CN': '9分钟阅读', 'zh-HK': '9分鐘閱讀', 'en': '9 min read' },
    featured: false,
    tags: ['React', '前端框架', '并发渲染', 'JavaScript']
  },
  {
    id: 8,
    title: { 
      'zh-CN': 'Python FastAPI高性能Web框架指南', 
      'zh-HK': 'Python FastAPI高性能Web框架指南', 
      'en': 'Python FastAPI High Performance Web Framework Guide' 
    },
    excerpt: {
      'zh-CN': 'FastAPI是现代Python Web框架，具有自动API文档生成、类型提示和高性能特性。',
      'zh-HK': 'FastAPI係現代Python Web框架，具有自動API文檔生成、類型提示同高性能特性。',
      'en': 'FastAPI is a modern Python web framework with automatic API documentation generation, type hints and high performance.'
    },
    category: { 'zh-CN': '后端开发', 'zh-HK': '後端開發', 'en': 'Backend Development' },
    date: '2025-10-18',
    readTime: { 'zh-CN': '6分钟阅读', 'zh-HK': '6分鐘閱讀', 'en': '6 min read' },
    featured: false,
    tags: ['Python', 'FastAPI', 'Web框架', '后端开发']
  },
  {
    id: 9,
    title: { 
      'zh-CN': 'Tailwind CSS实用技巧与最佳实践', 
      'zh-HK': 'Tailwind CSS實用技巧與最佳實踐', 
      'en': 'Tailwind CSS Practical Tips and Best Practices' 
    },
    excerpt: {
      'zh-CN': '分享Tailwind CSS在实际项目中的使用技巧，包括组件提取、自定义配置和性能优化。',
      'zh-HK': '分享Tailwind CSS在實際項目中嘅使用技巧，包括組件提取、自定義配置同性能優化。',
      'en': 'Sharing Tailwind CSS usage tips in real projects, including component extraction, custom configuration and performance optimization.'
    },
    category: { 'zh-CN': '前端开发', 'zh-HK': '前端開發', 'en': 'Frontend Development' },
    date: '2025-10-17',
    readTime: { 'zh-CN': '5分钟阅读', 'zh-HK': '5分鐘閱讀', 'en': '5 min read' },
    featured: false,
    tags: ['Tailwind CSS', 'CSS框架', '前端开发', '样式']
  },
  {
    id: 10,
    title: { 
      'zh-CN': 'Git高级技巧与团队协作规范', 
      'zh-HK': 'Git高級技巧與團隊協作規範', 
      'en': 'Git Advanced Techniques and Team Collaboration Standards' 
    },
    excerpt: {
      'zh-CN': '深入讲解Git的高级使用技巧，包括分支管理、合并策略和团队协作的最佳实践。',
      'zh-HK': '深入講解Git嘅高級使用技巧，包括分支管理、合併策略同團隊協作嘅最佳實踐。',
      'en': 'In-depth explanation of Git advanced techniques, including branch management, merge strategies and team collaboration best practices.'
    },
    category: { 'zh-CN': '开发工具', 'zh-HK': '開發工具', 'en': 'Development Tools' },
    date: '2025-10-16',
    readTime: { 'zh-CN': '8分钟阅读', 'zh-HK': '8分鐘閱讀', 'en': '8 min read' },
    featured: false,
    tags: ['Git', '版本控制', '团队协作', '开发工具']
  },
  {
    id: 11,
    title: { 
      'zh-CN': '数据库优化与索引设计原则', 
      'zh-HK': '數據庫優化與索引設計原則', 
      'en': 'Database Optimization and Index Design Principles' 
    },
    excerpt: {
      'zh-CN': '分享数据库性能优化的关键技巧，包括索引设计、查询优化和存储引擎选择。',
      'zh-HK': '分享數據庫性能優化嘅關鍵技巧，包括索引設計、查詢優化同存儲引擎選擇。',
      'en': 'Sharing key techniques for database performance optimization, including index design, query optimization and storage engine selection.'
    },
    category: { 'zh-CN': '数据库', 'zh-HK': '數據庫', 'en': 'Database' },
    date: '2025-10-15',
    readTime: { 'zh-CN': '11分钟阅读', 'zh-HK': '11分鐘閱讀', 'en': '11 min read' },
    featured: false,
    tags: ['数据库', 'SQL', '性能优化', '索引']
  },
  {
    id: 12,
    title: { 
      'zh-CN': '微服务架构设计与实践指南', 
      'zh-HK': '微服務架構設計與實踐指南', 
      'en': 'Microservices Architecture Design and Practice Guide' 
    },
    excerpt: {
      'zh-CN': '全面介绍微服务架构的设计原则、技术选型和实际项目中的最佳实践。',
      'zh-HK': '全面介紹微服務架構嘅設計原則、技術選型同實際項目中嘅最佳實踐。',
      'en': 'Comprehensive introduction to microservices architecture design principles, technology selection and best practices in real projects.'
    },
    category: { 'zh-CN': '架构设计', 'zh-HK': '架構設計', 'en': 'Architecture Design' },
    date: '2025-10-14',
    readTime: { 'zh-CN': '12分钟阅读', 'zh-HK': '12分鐘閱讀', 'en': '12 min read' },
    featured: true,
    tags: ['微服务', '架构设计', '分布式系统', '云原生']
  }
]

// 按时间排序（最新文章在前）
const sortedBlogPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export default function BlogPage() {
  const { language } = useLanguage()
  const t = translations[language]

  // 获取精选文章
  const featuredPosts = blogPosts.filter(post => post.featured)
  
  // 获取所有文章（按时间排序）
  const allPosts = sortedBlogPosts
  
  // 获取所有分类
  const categories = [...new Set(blogPosts.map(post => post.category[language]))]
  
  // 获取所有标签
  const allTags = blogPosts.flatMap(post => post.tags)
  const tagCounts = allTags.reduce((acc: Record<string, number>, tag) => {
    acc[tag] = (acc[tag] || 0) + 1
    return acc
  }, {})
  const popularTags = Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([tag]) => tag)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 - 参考星点工具箱设计 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.blog.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.blog.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* 博客内容 - 专注工具网站的简洁布局 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 精选文章 - 简洁展示 */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full mr-3">
                ⭐
              </span>
              {t.blog.featured}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 overflow-hidden group">
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {post.category[language]}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      <Link href={`/blog/${post.id}`}>
                        {post.title[language]}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt[language]}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <Link 
                        href={`/blog/${post.id}`} 
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform"
                      >
                        {t.blog.readMore}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* 所有文章 - 简洁网格布局 */}
         <section>
           <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
             <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-600 text-white rounded-full mr-3">
               📝
             </span>
             {t.blog.allArticles}
           </h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {allPosts.map((post) => (
               <article key={post.id} className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 overflow-hidden group">
                 <div className="p-5">
                   <div className="flex items-center mb-3">
                     <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                       {post.category[language]}
                     </span>
                     <span className="mx-2 text-gray-400">•</span>
                     <span className="text-xs text-gray-500">{post.date}</span>
                   </div>
                   
                   <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                     <Link href={`/blog/${post.id}`}>
                       {post.title[language]}
                     </Link>
                   </h3>
                   
                   <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                     {post.excerpt[language]}
                   </p>
                   
                   <div className="flex items-center justify-between">
                     <span className="text-xs text-gray-500">{post.readTime[language]}</span>
                     <Link 
                       href={`/blog/${post.id}`} 
                       className="text-blue-600 hover:text-blue-700 font-medium text-xs flex items-center group-hover:translate-x-1 transition-transform"
                     >
                       {t.blog.readMore}
                       <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                       </svg>
                     </Link>
                   </div>
                 </div>
               </article>
             ))}
           </div>
         </section>
      </div>
    </div>
  )
}