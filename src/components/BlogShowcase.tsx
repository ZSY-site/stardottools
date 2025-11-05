'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'
import Link from 'next/link'

// 模拟博客文章数据（精选6篇文章）
const featuredBlogPosts = [
  {
    id: 1,
    title: { 
      'zh-CN': 'ChatGPT Atlas浏览器官网下载 - OpenAI推出的AI智能浏览器', 
      'en': 'ChatGPT Atlas Browser Official Download - AI Smart Browser by OpenAI' 
    },
    excerpt: {
      'zh-CN': 'OpenAI推出的革命性AI浏览器，集成ChatGPT智能助手，支持侧边栏聊天、智能记忆、自动化操作等创新功能。',
      'en': 'Revolutionary AI browser by OpenAI, integrating ChatGPT smart assistant, supporting sidebar chat, intelligent memory, automation and other innovative features.'
    },
    category: { 'zh-CN': 'AI工具', 'en': 'AI Tools' },
    date: '2025-10-25',
    readTime: { 'zh-CN': '5分钟阅读', 'en': '5 min read' },
    featured: true,
    tags: ['ChatGPT浏览器', 'AI浏览器', 'OpenAI', 'Atlas浏览器', '智能浏览器', 'AI助手']
  },
  {
    id: 2,
    title: { 
      'zh-CN': 'Perplexity Comet浏览器官网下载 - AI驱动的智能浏览器', 
      'en': 'Perplexity Comet Browser Official Download - AI-Powered Smart Browser' 
    },
    excerpt: {
      'zh-CN': 'Comet是由Perplexity推出的AI智能浏览器，集成强大的AI助手功能，支持智能搜索、内容理解、标签管理等创新功能。',
      'en': 'Comet is an AI smart browser launched by Perplexity, integrating powerful AI assistant features, supporting intelligent search, content understanding, tag management and other innovative functions.'
    },
    category: { 'zh-CN': 'AI工具', 'en': 'AI Tools' },
    date: '2025-10-24',
    readTime: { 'zh-CN': '4分钟阅读', 'en': '4 min read' },
    featured: true,
    tags: ['AI浏览器', 'Perplexity', 'Comet', '智能浏览器', 'AI助手', 'Comet浏览器下载']
  },
  {
    id: 3,
    title: { 
      'zh-CN': 'Next.js 14新特性详解 - 服务端组件和App Router', 
      'en': 'Next.js 14 New Features - Server Components and App Router' 
    },
    excerpt: {
      'zh-CN': '深入解析Next.js 14的最新特性，包括服务端组件、App Router、Turbopack等核心功能的详细使用指南。',
      'en': 'In-depth analysis of Next.js 14 latest features, including server components, App Router, Turbopack and other core functionalities.'
    },
    category: { 'zh-CN': '前端开发', 'en': 'Frontend Development' },
    date: '2025-10-23',
    readTime: { 'zh-CN': '8分钟阅读', 'en': '8 min read' },
    featured: true,
    tags: ['Next.js', 'React', '前端框架', '服务端渲染', 'App Router']
  },
  {
    id: 5,
    title: { 
      'zh-CN': 'Docker容器化部署最佳实践', 
      'en': 'Docker Container Deployment Best Practices' 
    },
    excerpt: {
      'zh-CN': '分享Docker容器化部署的最佳实践，包括镜像优化、网络配置、安全设置和性能调优。',
      'en': 'Sharing Docker container deployment best practices, including image optimization, network configuration, security settings and performance tuning.'
    },
    category: { 'zh-CN': '后端开发', 'en': 'Backend Development' },
    date: '2025-10-21',
    readTime: { 'zh-CN': '10分钟阅读', 'en': '10 min read' },
    featured: true,
    tags: ['Docker', '容器化', '部署', 'DevOps', '云原生']
  },
  {
    id: 12,
    title: { 
      'zh-CN': '微服务架构设计与实践指南', 
      'en': 'Microservices Architecture Design and Practice Guide' 
    },
    excerpt: {
      'zh-CN': '全面介绍微服务架构的设计原则、技术选型和实际项目中的最佳实践。',
      'en': 'Comprehensive introduction to microservices architecture design principles, technology selection and best practices in real projects.'
    },
    category: { 'zh-CN': '架构设计', 'en': 'Architecture Design' },
    date: '2025-10-14',
    readTime: { 'zh-CN': '12分钟阅读', 'en': '12 min read' },
    featured: true,
    tags: ['微服务', '架构设计', '分布式系统', '云原生']
  },
  {
    id: 10,
    title: { 
      'zh-CN': 'Git高级技巧与团队协作规范', 
      'en': 'Git Advanced Techniques and Team Collaboration Standards' 
    },
    excerpt: {
      'zh-CN': '深入讲解Git的高级使用技巧，包括分支管理、合并策略和团队协作的最佳实践。',
      'en': 'In-depth explanation of Git advanced techniques, including branch management, merge strategies and team collaboration best practices.'
    },
    category: { 'zh-CN': '开发工具', 'en': 'Development Tools' },
    date: '2025-10-16',
    readTime: { 'zh-CN': '8分钟阅读', 'en': '8 min read' },
    featured: true,
    tags: ['Git', '版本控制', '团队协作', '开发工具']
  }
]

export default function BlogShowcase() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {language === 'zh-CN' ? '最新技术博客' : 'Latest Tech Blog'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'zh-CN' ? '探索最新的技术趋势、开发技巧和最佳实践' : 'Explore the latest technology trends, development tips and best practices'}
          </p>
        </div>

        {/* 博客文章网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredBlogPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group"
            >
              <div className="p-6">
                {/* 分类标签 */}
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    {post.category[language]}
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>

                {/* 标题 */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.id}`} className="hover:no-underline">
                    {post.title[language]}
                  </Link>
                </h3>

                {/* 摘要 */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt[language]}
                </p>

                {/* 标签和阅读时间 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{post.readTime[language]}</span>
                </div>

                {/* 阅读更多按钮 */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link 
                    href={`/blog/${post.id}`} 
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:translate-x-1 transition-transform"
                  >
                    {language === 'zh-CN' ? '阅读全文' : 'Read More'}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 查看全部博客按钮 */}
        <div className="text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            {language === 'zh-CN' ? '查看全部博客文章' : 
             language === 'zh-HK' ? '查看全部博客文章' : 'View All Blog Posts'}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}