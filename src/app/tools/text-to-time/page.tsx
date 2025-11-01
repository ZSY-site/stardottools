'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

export default function TextToTime() {
  const [inputText, setInputText] = useState('');
  const [baseTime, setBaseTime] = useState('');
  const [useCurrentTime, setUseCurrentTime] = useState(true);
  const [result, setResult] = useState('');

  // 时间单位转换表
  const timeUnits = {
    '秒': 1,
    '秒钟': 1,
    '分钟': 60,
    '分钟钟': 60,
    '小时': 3600,
    '小时时': 3600,
    '天': 86400,
    '天天': 86400,
    '周': 604800,
    '周周': 604800,
    '月': 2592000, // 近似值
    '月月': 2592000,
    '年': 31536000, // 近似值
    '年年': 31536000
  };

  // 数字转换表
  const numberWords = {
    '零': 0, '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9,
    '十': 10, '十一': 11, '十二': 12, '十三': 13, '十四': 14, '十五': 15, '十六': 16, '十七': 17, '十八': 18, '十九': 19,
    '二十': 20, '三十': 30, '四十': 40, '五十': 50, '六十': 60, '七十': 70, '八十': 80, '九十': 90,
    '百': 100, '千': 1000, '万': 10000, '亿': 100000000
  };

  const parseChineseNumber = (text: string): number => {
    let result = 0;
    let temp = 0;
    let lastUnit = 1;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char in numberWords) {
        const value = numberWords[char as keyof typeof numberWords];
        if (value >= 10) {
          if (temp === 0) temp = 1;
          result += temp * value;
          temp = 0;
        } else {
          temp = value;
        }
        lastUnit = value;
      }
    }
    result += temp;
    return result;
  };

  const extractTimeFromText = (text: string): { amount: number; unit: string } | null => {
    // 匹配数字+时间单位的模式
    const patterns = [
      /(\d+)\s*(秒|秒钟|分钟|分钟钟|小时|小时时|天|天天|周|周周|月|月月|年|年年)/g,
      /(零|一|二|三|四|五|六|七|八|九|十|十一|十二|十三|十四|十五|十六|十七|十八|十九|二十|三十|四十|五十|六十|七十|八十|九十|百|千|万|亿)+\s*(秒|秒钟|分钟|分钟钟|小时|小时时|天|天天|周|周周|月|月月|年|年年)/g
    ];

    for (const pattern of patterns) {
      const matches = [...text.matchAll(pattern)];
      if (matches.length > 0) {
        const match = matches[0];
        let amount: number;
        
        if (/\d+/.test(match[1])) {
          amount = parseInt(match[1]);
        } else {
          amount = parseChineseNumber(match[1]);
        }
        
        return { amount, unit: match[2] };
      }
    }
    
    return null;
  };

  const calculateTime = () => {
    if (!inputText.trim()) {
      setResult('请输入包含时间描述的文本');
      return;
    }

    const timeInfo = extractTimeFromText(inputText);
    if (!timeInfo) {
      setResult('未找到有效的时间描述');
      return;
    }

    const { amount, unit } = timeInfo;
    const seconds = amount * (timeUnits[unit as keyof typeof timeUnits] || 1);

    let baseDate: Date;
    if (useCurrentTime) {
      baseDate = new Date();
    } else {
      const timeMatch = baseTime.match(/(\d{1,2}):(\d{2})/);
      if (timeMatch) {
        baseDate = new Date();
        baseDate.setHours(parseInt(timeMatch[1]), parseInt(timeMatch[2]), 0, 0);
      } else {
        baseDate = new Date();
      }
    }

    const resultDate = new Date(baseDate.getTime() + seconds * 1000);
    
    const formatTime = (date: Date) => {
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    };

    const resultText = `
原始文本：${inputText}
识别结果：${amount} ${unit}
换算秒数：${seconds} 秒

${useCurrentTime ? '当前时间' : '基准时间'}：${formatTime(baseDate)}
计算结果：${formatTime(resultDate)}

时间差：
- ${Math.floor(seconds / 31536000)} 年 ${Math.floor((seconds % 31536000) / 2592000)} 月 ${Math.floor((seconds % 2592000) / 86400)} 天
- ${Math.floor(seconds / 86400)} 天 ${Math.floor((seconds % 86400) / 3600)} 小时 ${Math.floor((seconds % 3600) / 60)} 分钟 ${seconds % 60} 秒
    `.trim();

    setResult(resultText);
  };

  const clearAll = () => {
    setInputText('');
    setBaseTime('');
    setResult('');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      alert('计算结果已复制到剪贴板！');
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const examples = [
    '三十分钟后',
    '2小时之后',
    '十五分钟后开会',
    '三天后的下午三点',
    '一周之后提交报告',
    '一个月后的今天'
  ];

  const setExample = (example: string) => {
    setInputText(example);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">文字转时间计算器</h1>
        <p className="text-muted-foreground">
          将文字描述的时间转换为具体的时间值，支持中文数字和时间单位
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>输入设置</CardTitle>
            <CardDescription>输入包含时间描述的文本和基准时间</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="input-text">时间描述文本</Label>
                <Textarea
                  id="input-text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="请输入包含时间描述的文本，例如：三十分钟后、2小时之后、十五分钟后开会..."
                  rows={6}
                  className="mt-2"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={useCurrentTime}
                  onCheckedChange={setUseCurrentTime}
                />
                <Label htmlFor="use-current-time">使用当前时间作为基准</Label>
              </div>

              {!useCurrentTime && (
                <div>
                  <Label htmlFor="base-time">基准时间 (HH:mm)</Label>
                  <Input
                    id="base-time"
                    value={baseTime}
                    onChange={(e) => setBaseTime(e.target.value)}
                    placeholder="例如：14:30"
                    className="mt-2"
                  />
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={calculateTime} disabled={!inputText.trim()}>
                  计算时间
                </Button>
                <Button onClick={clearAll} variant="outline">
                  清空
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>计算结果</CardTitle>
            <CardDescription>转换后的时间计算结果</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="result">计算结果</Label>
                <Textarea
                  id="result"
                  value={result}
                  readOnly
                  rows={10}
                  className="mt-2 bg-muted font-mono text-sm"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} disabled={!result}>
                  复制结果
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>示例文本</CardTitle>
          <CardDescription>点击示例快速体验</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {examples.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setExample(example)}
                className="text-xs h-auto py-2"
              >
                {example}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• 支持阿拉伯数字和中文数字（一、二、三...）</p>
            <p>• 支持的时间单位：秒、分钟、小时、天、周、月、年</p>
            <p>• 可以设置使用当前时间或指定时间作为基准</p>
            <p>• 计算结果包含具体日期时间和时间差分解</p>
            <p>• 示例："三十分钟后" → 计算30分钟后的具体时间</p>
            <p>• 示例："2小时之后开会" → 计算2小时后的具体时间</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>支持的时间格式</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">数字格式</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>阿拉伯数字：1, 2, 3...</li>
                <li>中文数字：一、二、三...</li>
                <li>组合数字：十一、二十、一百</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">时间单位</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>秒、秒钟</li>
                <li>分钟、分钟钟</li>
                <li>小时、小时时</li>
                <li>天、天天</li>
                <li>周、周周</li>
                <li>月、月月</li>
                <li>年、年年</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}