'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

// 默认食物列表
const defaultFoods = [
  '中餐', '西餐', '日料', '韩餐', '火锅', '烧烤', '快餐', '自助餐',
  '面食', '米饭', '沙拉', '寿司', '披萨', '汉堡', '炸鸡', '牛排',
  '麻辣烫', '米线', '饺子', '包子', '粥', '汤', '炒菜', '炖菜'
]

export default function FoodRoulette() {
  const [foods, setFoods] = useState<string[]>(defaultFoods)
  const [inputText, setInputText] = useState('')
  const [selectedFood, setSelectedFood] = useState<string>('')
  const [isSpinning, setIsSpinning] = useState(false)
  const [spinCount, setSpinCount] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)

  // 处理文本输入
  const handleInputChange = (text: string) => {
    setInputText(text)
    const newFoods = text.split('\n').filter(food => food.trim() !== '')
    if (newFoods.length > 0) {
      setFoods(newFoods)
    } else {
      setFoods(defaultFoods)
    }
  }

  // 开始旋转
  const startSpin = () => {
    if (foods.length === 0) return
    
    setIsSpinning(true)
    setSpinCount(prev => prev + 1)
    
    const spinDuration = 3000 + Math.random() * 2000 // 3-5秒
    const startTime = Date.now()
    
    const spin = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / spinDuration, 1)
      
      // 缓动函数，先快后慢
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      // 随机选择一个食物，随着时间推移选择更稳定
      const randomIndex = Math.floor(
        Math.random() * foods.length * (1 - easeOut * 0.9)
      )
      setSelectedFood(foods[randomIndex % foods.length])
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(spin)
      } else {
        // 最终选择
        const finalIndex = Math.floor(Math.random() * foods.length)
        setSelectedFood(foods[finalIndex])
        setIsSpinning(false)
      }
    }
    
    animationRef.current = requestAnimationFrame(spin)
  }

  // 绘制转盘
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const drawWheel = () => {
      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.min(width, height) / 2 - 10
      
      ctx.clearRect(0, 0, width, height)
      
      // 绘制转盘背景
      if (foods.length > 0) {
        const sliceAngle = (2 * Math.PI) / foods.length
        
        foods.forEach((food, index) => {
          const startAngle = index * sliceAngle
          const endAngle = (index + 1) * sliceAngle
          
          // 交替颜色
          ctx.fillStyle = index % 2 === 0 ? '#3b82f6' : '#60a5fa'
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.arc(centerX, centerY, radius, startAngle, endAngle)
          ctx.closePath()
          ctx.fill()
          
          // 绘制文字
          ctx.save()
          ctx.translate(centerX, centerY)
          ctx.rotate(startAngle + sliceAngle / 2)
          ctx.textAlign = 'right'
          ctx.fillStyle = 'white'
          ctx.font = '12px Arial'
          ctx.fillText(food, radius - 10, 4)
          ctx.restore()
        })
      }
      
      // 绘制中心圆和指针
      ctx.fillStyle = '#ef4444'
      ctx.beginPath()
      ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI)
      ctx.fill()
      
      // 绘制指针
      ctx.fillStyle = '#ef4444'
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - 15)
      ctx.lineTo(centerX - 10, centerY)
      ctx.lineTo(centerX + 10, centerY)
      ctx.closePath()
      ctx.fill()
    }
    
    drawWheel()
  }, [foods])

  // 清理动画
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">吃什么转盘</h1>
          <p className="text-lg text-gray-600">
            输入你的食物选项，让转盘帮你决定今天吃什么！
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 输入区域 */}
          <Card>
            <CardHeader>
              <CardTitle>食物选项</CardTitle>
              <CardDescription>
                每行输入一个食物选项，或者使用默认选项
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={inputText}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="每行输入一个食物选项，例如：\n中餐\n西餐\n日料\n..."
                rows={8}
                className="resize-none"
              />
              
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  {foods.length} 个选项
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleInputChange(defaultFoods.join('\n'))}
                >
                  使用默认选项
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 转盘区域 */}
          <Card>
            <CardHeader>
              <CardTitle>转盘</CardTitle>
              <CardDescription>
                点击旋转按钮开始选择
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={300}
                  className="border-2 border-gray-200 rounded-full shadow-lg"
                />
              </div>
              
              <div className="text-center space-y-4">
                <Button
                  onClick={startSpin}
                  disabled={isSpinning || foods.length === 0}
                  className="w-full"
                  size="lg"
                >
                  {isSpinning ? '旋转中...' : '开始旋转'}
                </Button>
                
                {selectedFood && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-600 mb-1">今天吃：</p>
                    <p className="text-2xl font-bold text-green-800">{selectedFood}</p>
                    <p className="text-xs text-green-500 mt-1">
                      已旋转 {spinCount} 次
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 使用说明 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>使用说明</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 在左侧文本框中输入你的食物选项，每行一个</li>
              <li>• 点击"使用默认选项"可以快速使用常见食物选项</li>
              <li>• 点击"开始旋转"按钮，转盘会随机选择一个食物</li>
              <li>• 转盘停止后显示的结果就是今天推荐的食物</li>
              <li>• 如果不满意结果，可以再次旋转重新选择</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}