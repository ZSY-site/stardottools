'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'
import Link from 'next/link'

export default function AboutPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const aboutContent = {
    'zh-CN': {
      title: '关于我们',
      subtitle: '您的一站式免费在线工具平台，让生活更简单',
      welcome: '欢迎来到我们的工具箱！我们相信强大的工具应该人人都能使用。我们的使命是提供全面的免费在线工具集合，帮助您高效完成各种任务，无需安装软件或注册账户。',
      whatWeProvide: '我们提供什么',
      features: [
        { icon: '🛠️', text: '1000+免费工具：从文本处理到图像编辑' },
        { icon: '🚀', text: '无需注册：立即使用任何工具' },
        { icon: '📱', text: '移动友好：所有工具在任何设备上都完美运行' },
        { icon: '🔒', text: '隐私优先：您的数据保留在浏览器中' },
        { icon: '⚡', text: '快速可靠：针对速度和性能进行优化' }
      ],
      visionTitle: '我们的愿景',
      vision: '我们设想一个有用的工具对每个人都免费开放的世界，无论他们的技术背景或经济状况如何。通过免费提供这些工具，我们旨在让每个人都能使用提高生产力的实用程序。',
      contactTitle: '联系我们',
      contact: '如有任何问题，请联系我们 hi@example.com。'
    },
    'zh-HK': {
      title: '關於我們',
      subtitle: '您嘅一站式免費在線工具平台，讓生活更簡單',
      welcome: '歡迎來到我哋嘅工具箱！我哋相信強大嘅工具應該人人都能使用。我哋嘅使命係提供全面嘅免費在線工具集合，幫助您高效完成各種任務，無需安裝軟件或註冊賬戶。',
      whatWeProvide: '我哋提供乜嘢',
      features: [
        { icon: '🛠️', text: '1000+免費工具：從文本處理到圖像編輯' },
        { icon: '🚀', text: '無需註冊：立即使用任何工具' },
        { icon: '📱', text: '移動友好：所有工具在任何設備上都完美運行' },
        { icon: '🔒', text: '隱私優先：您嘅數據保留在瀏覽器中' },
        { icon: '⚡', text: '快速可靠：針對速度和性能進行優化' }
      ],
      visionTitle: '我哋嘅願景',
      vision: '我哋設想一個有用嘅工具對每個人都免費開放嘅世界，無論佢哋嘅技術背景或經濟狀況如何。通過免費提供呢啲工具，我哋旨在讓每個人都能使用提高生產力嘅實用程序。',
      contactTitle: '聯繫我哋',
      contact: '如有任何問題，請聯繫我哋 hi@example.com。'
    },
    'en': {
      title: 'About Us',
      subtitle: 'Your one-stop free online tools platform, making life easier',
      welcome: 'Welcome to our toolbox! We believe powerful tools should be accessible to everyone. Our mission is to provide a comprehensive collection of free online tools to help you efficiently complete various tasks without installing software or registering accounts.',
      whatWeProvide: 'What We Provide',
      features: [
        { icon: '🛠️', text: '1000+ Free Tools: From text processing to image editing' },
        { icon: '🚀', text: 'No Registration Required: Use any tool immediately' },
        { icon: '📱', text: 'Mobile Friendly: All tools work perfectly on any device' },
        { icon: '🔒', text: 'Privacy First: Your data stays in your browser' },
        { icon: '⚡', text: 'Fast & Reliable: Optimized for speed and performance' }
      ],
      visionTitle: 'Our Vision',
      vision: 'We envision a world where useful tools are freely available to everyone, regardless of their technical background or economic situation. By providing these tools for free, we aim to make productivity-enhancing utilities accessible to all.',
      contactTitle: 'Contact Us',
      contact: 'If you have any questions, please contact us at hi@example.com.'
    }
  }

  const content = aboutContent[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 页面头部 */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {/* 面包屑导航 */}
          <nav className="flex items-center space-x-2 text-sm text-white/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">{t.common.home}</Link>
            <span className="text-white/60">›</span>
            <span className="text-white">{content.title}</span>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {content.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {content.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* 欢迎部分 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">星点</span>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              {content.welcome}
            </p>
          </div>

          {/* 功能特性 */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {content.whatWeProvide}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.features.map((feature, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <p className="text-gray-700 font-medium">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 愿景部分 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 md:p-10 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              {content.visionTitle}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
              {content.vision}
            </p>
          </div>

          {/* 联系我们 */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {content.contactTitle}
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              {content.contact}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/tools" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {t.tools.title}
              </Link>
              <Link 
                href="/blog" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v12m0 0h6m-6 0v12" />
                </svg>
                {t.blog.title}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}