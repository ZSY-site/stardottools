'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // 监听滚动事件
  useEffect(() => {
    const toggleVisibility = () => {
      // 当页面滚动超过300px时显示小火箭
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // 滚动到顶部的函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 transition-all duration-300 ease-in-out">
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="
            w-14 h-14 rounded-full 
            bg-gradient-to-r from-blue-500 to-purple-600 
            hover:from-blue-600 hover:to-purple-700
            shadow-lg hover:shadow-xl
            transform hover:scale-110
            transition-all duration-300
            border-0
          "
          aria-label="回到顶部"
        >
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </Button>
      )}
    </div>
  )
}

export default BackToTop