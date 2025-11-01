'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'

export default function Teleprompter() {
  const [text, setText] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(50) // 1-100
  const [fontSize, setFontSize] = useState(24) // px
  const [currentPosition, setCurrentPosition] = useState(0)
  const [textColor, setTextColor] = useState('#ffffff')
  const [backgroundColor, setBackgroundColor] = useState('#000000')
  const [mirrorMode, setMirrorMode] = useState(false)
  
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)

  // 默认示例文本
  const defaultText = `欢迎使用在线提词器！\n\n这是一个帮助演讲者、主持人或表演者显示提词内容的工具。\n\n使用方法：\n1. 在左侧输入您的演讲内容\n2. 调整滚动速度和字体大小\n3. 点击"开始"按钮开始滚动\n4. 使用空格键暂停/继续\n5. 使用方向键调整滚动速度\n\n祝您演讲顺利！`

  // 开始/暂停滚动
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    } else {
      setIsPlaying(true)
      startTimeRef.current = Date.now() - currentPosition * 1000
      animateScroll()
    }
  }

  // 滚动动画
  const animateScroll = () => {
    if (!isPlaying || !scrollRef.current) return
    
    const now = Date.now()
    const elapsed = now - startTimeRef.current
    const scrollPosition = (elapsed / 1000) * (scrollSpeed / 10)
    
    setCurrentPosition(scrollPosition)
    
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollPosition
    }
    
    animationRef.current = requestAnimationFrame(animateScroll)
  }

  // 重置到开始位置
  const resetToStart = () => {
    setCurrentPosition(0)
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
    if (isPlaying) {
      setIsPlaying(false)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }

  // 键盘快捷键
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Space':
          e.preventDefault()
          togglePlay()
          break
        case 'ArrowUp':
          e.preventDefault()
          setScrollSpeed(prev => Math.min(prev + 5, 100))
          break
        case 'ArrowDown':
          e.preventDefault()
          setScrollSpeed(prev => Math.max(prev - 5, 1))
          break
        case 'ArrowLeft':
          e.preventDefault()
          setFontSize(prev => Math.max(prev - 2, 12))
          break
        case 'ArrowRight':
          e.preventDefault()
          setFontSize(prev => Math.min(prev + 2, 48))
          break
        case 'KeyR':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault()
            resetToStart()
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, scrollSpeed, fontSize])

  // 清理动画
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">在线提词器</h1>
          <p className="text-lg text-gray-600">
            专业的演讲提词工具，支持自定义滚动速度和样式
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 控制面板 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>文本输入</CardTitle>
                <CardDescription>
                  输入您的演讲内容或使用示例文本
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="请输入您的演讲内容..."
                  rows={8}
                  className="resize-none"
                />
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setText(defaultText)}
                  >
                    使用示例
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setText('')}
                  >
                    清空文本
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>控制设置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 滚动速度 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">滚动速度</label>
                    <Badge variant="secondary">{scrollSpeed}</Badge>
                  </div>
                  <Slider
                    value={[scrollSpeed]}
                    onValueChange={(value) => setScrollSpeed(value[0])}
                    max={100}
                    min={1}
                    step={1}
                  />
                </div>

                {/* 字体大小 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">字体大小</label>
                    <Badge variant="secondary">{fontSize}px</Badge>
                  </div>
                  <Slider
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    max={48}
                    min={12}
                    step={2}
                  />
                </div>

                {/* 颜色设置 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">文字颜色</label>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full h-8 rounded border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">背景颜色</label>
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-full h-8 rounded border"
                    />
                  </div>
                </div>

                {/* 镜像模式 */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">镜像模式</label>
                  <Button
                    variant={mirrorMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMirrorMode(!mirrorMode)}
                  >
                    {mirrorMode ? '已开启' : '关闭'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 提词器显示区域 */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>提词器</CardTitle>
                <CardDescription>
                  当前状态: {isPlaying ? '滚动中' : '已暂停'}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[500px] flex flex-col">
                {/* 控制按钮 */}
                <div className="flex gap-2 mb-4">
                  <Button
                    onClick={togglePlay}
                    className="flex-1"
                    variant={isPlaying ? "outline" : "default"}
                  >
                    {isPlaying ? '暂停' : '开始'}
                  </Button>
                  <Button
                    onClick={resetToStart}
                    variant="outline"
                  >
                    重置
                  </Button>
                </div>

                {/* 提词器内容 */}
                <div
                  ref={scrollRef}
                  className="flex-1 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden relative"
                  style={{ 
                    backgroundColor,
                    transform: mirrorMode ? 'scaleX(-1)' : 'none'
                  }}
                >
                  <div
                    className="p-6 min-h-full"
                    style={{ 
                      color: textColor,
                      fontSize: `${fontSize}px`,
                      lineHeight: '1.6',
                      fontFamily: 'Arial, sans-serif',
                      fontWeight: '500'
                    }}
                  >
                    {text ? (
                      <div 
                        style={{ 
                          transform: mirrorMode ? 'scaleX(-1)' : 'none',
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        {text}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 h-full flex items-center justify-center">
                        <div>
                          <div className="text-4xl mb-2">📝</div>
                          <p>请在左侧输入文本内容</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 进度指示器 */}
                {text && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>进度</span>
                      <span>{Math.round(currentPosition)}s</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.min((currentPosition / (text.length / 10)) * 100, 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 快捷键说明 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>快捷键说明</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-mono bg-gray-200 px-2 py-1 rounded text-xs mb-1">空格键</div>
                <div>开始/暂停</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-mono bg-gray-200 px-2 py-1 rounded text-xs mb-1">↑ ↓</div>
                <div>调整速度</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-mono bg-gray-200 px-2 py-1 rounded text-xs mb-1">← →</div>
                <div>调整字体</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-mono bg-gray-200 px-2 py-1 rounded text-xs mb-1">Ctrl+R</div>
                <div>重置到开始</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}