'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const { language } = useLanguage()
  const t = translations[language]
  const router = useRouter()

  // 滚动到工具分类区域
  const scrollToTools = () => {
    const toolsSection = document.getElementById('tool-categories')
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // 跳转到博客页面
  const goToBlog = () => {
    router.push('/blog')
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 overflow-hidden">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-indigo-100/30"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/40 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200/40 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* 主标题 */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t.hero.title}
            </span>
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700">
              {t.hero.subtitle}
            </span>
          </h1>
          
          {/* 副标题 */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {language === 'zh-CN' ? '专业级在线工具集合，为开发者、设计师和办公人员提供' : 
             'Professional online tool collection for developers, designers and office workers'}
            <span className="text-blue-600 font-semibold">
              {language === 'zh-CN' ? '一站式解决方案' : 'one-stop solution'}
            </span>
          </p>
          
          {/* 行动按钮 */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={scrollToTools}
              className="group relative bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-500/25 cursor-pointer"
            >
              <span className="relative z-10">{t.hero.cta}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            <button 
              onClick={goToBlog}
              className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              {language === 'zh-CN' ? '查看教程文档' : 'View Tutorials'}
            </button>
          </div>
        </div>
        
        {/* 特色统计 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 shadow-xl">
          <div className="text-center group">
            <div className="text-4xl font-black text-blue-600 mb-2 group-hover:scale-110 transition-transform">
              1000+
            </div>
            <div className="text-gray-700 font-medium">{t.hero.featuredTools}</div>
<div className="text-sm text-gray-500 mt-1">{t.hero.continuouslyUpdated}</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-black text-green-600 mb-2 group-hover:scale-110 transition-transform">
              完全免费
            </div>
            <div className="text-gray-700 font-medium">{t.hero.zeroCost}</div>
<div className="text-sm text-gray-500 mt-1">{t.hero.noHiddenFees}</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-black text-indigo-600 mb-2 group-hover:scale-110 transition-transform">
              即开即用
            </div>
            <div className="text-gray-700 font-medium">{t.hero.noRegistration}</div>
<div className="text-sm text-gray-500 mt-1">{t.hero.startNow}</div>
          </div>
        </div>
        
        {/* 滚动提示 */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col items-center text-gray-500">
            <span className="text-sm mb-2">{t.hero.exploreMore}</span>
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}