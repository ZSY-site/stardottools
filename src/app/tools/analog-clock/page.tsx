'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, Pause, RotateCcw, Settings, Palette } from 'lucide-react';

interface ClockConfig {
  size: number;
  hourColor: string;
  minuteColor: string;
  secondColor: string;
  backgroundColor: string;
  borderColor: string;
  showNumbers: boolean;
  showSecondHand: boolean;
}

const AnalogClock: React.FC<{ config: ClockConfig }> = ({ config }) => {
  const [time, setTime] = useState(new Date());
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = (hours * 30) + (minutes * 0.5);
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  const clockStyle = {
    width: config.size,
    height: config.size,
    backgroundColor: config.backgroundColor,
    border: `4px solid ${config.borderColor}`,
  };

  return (
    <div className="relative flex flex-col items-center">
      <div 
        className="rounded-full relative"
        style={clockStyle}
      >
        {/* 时钟刻度 */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = i * 30;
          const isHour = i % 3 === 0;
          const length = isHour ? 12 : 6;
          const width = isHour ? 3 : 2;
          
          return (
            <div
              key={i}
              className="absolute bg-gray-600"
              style={{
                width: `${width}px`,
                height: `${length}px`,
                left: '50%',
                top: '8px',
                transform: `translateX(-50%) rotate(${angle}deg)`,
                transformOrigin: 'center bottom',
              }}
            />
          );
        })}

        {/* 数字 */}
        {config.showNumbers && Array.from({ length: 12 }).map((_, i) => {
          const angle = i * 30;
          const number = i === 0 ? 12 : i;
          const radius = config.size / 2 - 30;
          const x = Math.sin(angle * Math.PI / 180) * radius;
          const y = -Math.cos(angle * Math.PI / 180) * radius;
          
          return (
            <div
              key={i}
              className="absolute text-lg font-bold text-gray-700"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {number}
            </div>
          );
        })}

        {/* 时针 */}
        <div
          className="absolute left-1/2 top-1/2 origin-bottom"
          style={{
            width: '4px',
            height: `${config.size * 0.25}px`,
            backgroundColor: config.hourColor,
            transform: `translateX(-50%) translateY(-100%) rotate(${hourAngle}deg)`,
            borderRadius: '2px',
          }}
        />

        {/* 分针 */}
        <div
          className="absolute left-1/2 top-1/2 origin-bottom"
          style={{
            width: '3px',
            height: `${config.size * 0.35}px`,
            backgroundColor: config.minuteColor,
            transform: `translateX(-50%) translateY(-100%) rotate(${minuteAngle}deg)`,
            borderRadius: '2px',
          }}
        />

        {/* 秒针 */}
        {config.showSecondHand && (
          <div
            className="absolute left-1/2 top-1/2 origin-bottom"
            style={{
              width: '2px',
              height: `${config.size * 0.4}px`,
              backgroundColor: config.secondColor,
              transform: `translateX(-50%) translateY(-100%) rotate(${secondAngle}deg)`,
              borderRadius: '1px',
            }}
          />
        )}

        {/* 中心点 */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-800"
          style={{
            width: '12px',
            height: '12px',
          }}
        />
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-2xl font-mono font-bold mb-2">
          {time.toLocaleTimeString()}
        </div>
        <div className="text-gray-600">
          {time.toLocaleDateString('zh-CN', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
      
      <div className="mt-4 flex gap-2">
        <Button
          variant={isRunning ? "default" : "outline"}
          size="sm"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
          {isRunning ? '暂停' : '继续'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTime(new Date())}
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          同步时间
        </Button>
      </div>
    </div>
  );
};

export default function AnalogClockPage() {
  const [config, setConfig] = useState<ClockConfig>({
    size: 300,
    hourColor: '#000000',
    minuteColor: '#000000',
    secondColor: '#ff0000',
    backgroundColor: '#ffffff',
    borderColor: '#333333',
    showNumbers: true,
    showSecondHand: true,
  });

  const [showSettings, setShowSettings] = useState(false);

  const presetConfigs = [
    {
      name: '经典',
      config: {
        size: 300,
        hourColor: '#000000',
        minuteColor: '#000000',
        secondColor: '#ff0000',
        backgroundColor: '#ffffff',
        borderColor: '#333333',
        showNumbers: true,
        showSecondHand: true,
      }
    },
    {
      name: '现代',
      config: {
        size: 280,
        hourColor: '#3b82f6',
        minuteColor: '#10b981',
        secondColor: '#ef4444',
        backgroundColor: '#f8fafc',
        borderColor: '#e2e8f0',
        showNumbers: false,
        showSecondHand: true,
      }
    },
    {
      name: '简约',
      config: {
        size: 250,
        hourColor: '#6b7280',
        minuteColor: '#6b7280',
        secondColor: '#6b7280',
        backgroundColor: 'transparent',
        borderColor: '#d1d5db',
        showNumbers: false,
        showSecondHand: false,
      }
    }
  ];

  const applyPreset = (presetConfig: ClockConfig) => {
    setConfig(presetConfig);
  };

  const resetToDefault = () => {
    setConfig(presetConfigs[0].config);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">模拟时钟小组件</h1>
        <p className="text-gray-600">可自定义的模拟时钟，支持多种样式和配置选项</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 时钟显示区域 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                时钟预览
              </CardTitle>
              <CardDescription>实时显示的模拟时钟</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <AnalogClock config={config} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 控制面板 */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  快速预设
                </span>
                <Button variant="outline" size="sm" onClick={resetToDefault}>
                  重置
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {presetConfigs.map((preset, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => applyPreset(preset.config as ClockConfig)}
                >
                  {preset.name}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  自定义设置
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowSettings(!showSettings)}
                >
                  {showSettings ? '隐藏' : '显示'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showSettings && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">时钟尺寸: {config.size}px</label>
                    <Slider
                      value={[config.size]}
                      onValueChange={(value) => setConfig({...config, size: value[0]})}
                      max={400}
                      min={200}
                      step={10}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-sm font-medium">显示数字</label>
                      <Button
                        variant={config.showNumbers ? "default" : "outline"}
                        size="sm"
                        className="w-full"
                        onClick={() => setConfig({...config, showNumbers: !config.showNumbers})}
                      >
                        {config.showNumbers ? '显示' : '隐藏'}
                      </Button>
                    </div>
                    <div>
                      <label className="text-sm font-medium">秒针显示</label>
                      <Button
                        variant={config.showSecondHand ? "default" : "outline"}
                        size="sm"
                        className="w-full"
                        onClick={() => setConfig({...config, showSecondHand: !config.showSecondHand})}
                      >
                        {config.showSecondHand ? '显示' : '隐藏'}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">背景颜色</label>
                    <input
                      type="color"
                      value={config.backgroundColor}
                      onChange={(e) => setConfig({...config, backgroundColor: e.target.value})}
                      className="w-full h-8 rounded border"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">边框颜色</label>
                    <input
                      type="color"
                      value={config.borderColor}
                      onChange={(e) => setConfig({...config, borderColor: e.target.value})}
                      className="w-full h-8 rounded border"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>功能特性</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 实时显示当前时间</li>
                <li>• 支持暂停/继续功能</li>
                <li>• 多种预设样式选择</li>
                <li>• 完全自定义颜色和尺寸</li>
                <li>• 响应式设计</li>
                <li>• 高精度时间显示</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium mb-2">基本操作</h4>
              <ul className="space-y-1">
                <li>• 点击"暂停"可以停止时钟运行</li>
                <li>• 点击"同步时间"可以校准当前时间</li>
                <li>• 选择预设样式快速切换外观</li>
                <li>• 使用自定义设置进行个性化配置</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">自定义选项</h4>
              <ul className="space-y-1">
                <li>• 调整时钟尺寸适应不同场景</li>
                <li>• 自定义背景和边框颜色</li>
                <li>• 控制数字和秒针的显示状态</li>
                <li>• 实时预览所有更改效果</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}