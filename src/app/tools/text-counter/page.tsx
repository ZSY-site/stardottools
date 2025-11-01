'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

export default function TextCounter() {
  const [inputText, setInputText] = useState('');
  const [includeSpaces, setIncludeSpaces] = useState(true);
  const [includePunctuation, setIncludePunctuation] = useState(true);
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    lines: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0
  });

  useEffect(() => {
    calculateStats();
  }, [inputText, includeSpaces, includePunctuation]);

  const calculateStats = () => {
    if (!inputText.trim()) {
      setStats({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        lines: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0
      });
      return;
    }

    // 基本统计
    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;
    
    // 行数统计
    const lines = inputText.split(/\r?\n/).length;
    
    // 段落统计（连续的非空行）
    const paragraphs = inputText.split(/\r?\n\s*\r?\n/).filter(p => p.trim()).length;
    
    // 句子统计（简化版）
    const sentences = inputText.split(/[.!?。！？]+/).filter(s => s.trim()).length;
    
    // 字数统计（中文按字符，英文按单词）
    const wordCount = countWords(inputText);
    
    // 阅读时间估算（中文约500字/分钟，英文约200词/分钟）
    const chineseChars = inputText.replace(/[^\u4e00-\u9fa5]/g, '').length;
    const englishWords = countEnglishWords(inputText);
    const readingTime = Math.ceil((chineseChars / 500 + englishWords / 200) * 60); // 秒
    
    // 演讲时间估算（中文约180字/分钟，英文约130词/分钟）
    const speakingTime = Math.ceil((chineseChars / 180 + englishWords / 130) * 60); // 秒

    setStats({
      characters: includeSpaces ? characters : charactersNoSpaces,
      charactersNoSpaces,
      words: wordCount,
      lines,
      sentences,
      paragraphs,
      readingTime,
      speakingTime
    });
  };

  const countWords = (text: string): number => {
    // 中文按字符计数
    const chineseChars = text.replace(/[^\u4e00-\u9fa5]/g, '').length;
    
    // 英文按单词计数
    const englishWords = countEnglishWords(text);
    
    return chineseChars + englishWords;
  };

  const countEnglishWords = (text: string): number => {
    // 移除中文和标点，只保留英文单词
    const englishText = text.replace(/[\u4e00-\u9fa5]/g, ' ').replace(/[^a-zA-Z\s]/g, ' ');
    return englishText.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const formatTime = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds}秒`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return remainingSeconds > 0 ? `${minutes}分${remainingSeconds}秒` : `${minutes}分钟`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return minutes > 0 ? `${hours}小时${minutes}分钟` : `${hours}小时`;
    }
  };

  const clearText = () => {
    setInputText('');
  };

  const copyStats = async () => {
    const statsText = `文本统计结果：
字符数：${stats.characters}（不含空格：${stats.charactersNoSpaces}）
字数：${stats.words}
行数：${stats.lines}
段落数：${stats.paragraphs}
句子数：${stats.sentences}
阅读时间：约${formatTime(stats.readingTime)}
演讲时间：约${formatTime(stats.speakingTime)}`;
    
    try {
      await navigator.clipboard.writeText(statsText);
      alert('统计结果已复制到剪贴板！');
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const examples = [
    '这是一个测试文本，包含中文和English words。',
    '第一行文本。\n第二行文本。\n第三行文本。',
    'Hello world! 你好世界！This is a mixed text. 这是混合文本。',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  ];

  const setExample = (example: string) => {
    setInputText(example);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">文本计数器</h1>
        <p className="text-muted-foreground">
          统计文本的各种信息，包括字符数、字数、行数、阅读时间等
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>输入文本</CardTitle>
            <CardDescription>请输入需要统计的文本</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="input-text">原始文本</Label>
                <Textarea
                  id="input-text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="请输入需要统计的文本..."
                  rows={12}
                  className="mt-2"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={includeSpaces}
                    onCheckedChange={setIncludeSpaces}
                  />
                  <Label htmlFor="include-spaces">包含空格</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={includePunctuation}
                    onCheckedChange={setIncludePunctuation}
                  />
                  <Label htmlFor="include-punctuation">包含标点</Label>
                </div>
                
                <Button onClick={clearText} variant="outline" size="sm">
                  清空
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>统计结果</CardTitle>
            <CardDescription>实时统计信息</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded">
                  <div className="text-2xl font-bold text-primary">{stats.characters}</div>
                  <div className="text-sm text-muted-foreground">字符数</div>
                  {!includeSpaces && (
                    <Badge variant="secondary" className="mt-1 text-xs">不含空格</Badge>
                  )}
                </div>
                
                <div className="text-center p-3 bg-muted rounded">
                  <div className="text-2xl font-bold text-primary">{stats.words}</div>
                  <div className="text-sm text-muted-foreground">字数</div>
                </div>
                
                <div className="text-center p-3 bg-muted rounded">
                  <div className="text-2xl font-bold text-primary">{stats.lines}</div>
                  <div className="text-sm text-muted-foreground">行数</div>
                </div>
                
                <div className="text-center p-3 bg-muted rounded">
                  <div className="text-2xl font-bold text-primary">{stats.paragraphs}</div>
                  <div className="text-sm text-muted-foreground">段落数</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">句子数</span>
                  <span className="font-semibold">{stats.sentences}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">不含空格字符</span>
                  <span className="font-semibold">{stats.charactersNoSpaces}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">阅读时间</span>
                  <span className="font-semibold">{formatTime(stats.readingTime)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">演讲时间</span>
                  <span className="font-semibold">{formatTime(stats.speakingTime)}</span>
                </div>
              </div>
              
              <Button onClick={copyStats} disabled={!inputText.trim()} className="w-full">
                复制统计结果
              </Button>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {examples.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setExample(example)}
                className="text-xs h-auto py-2"
              >
                {example.length > 20 ? example.substring(0, 20) + '...' : example}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>统计说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-semibold mb-2">统计规则</h4>
              <ul className="space-y-1">
                <li>• <strong>字符数</strong>：统计所有字符，可选择是否包含空格</li>
                <li>• <strong>字数</strong>：中文按字符计数，英文按单词计数</li>
                <li>• <strong>行数</strong>：按换行符分隔的行数</li>
                <li>• <strong>段落数</strong>：连续的非空行组成的段落</li>
                <li>• <strong>句子数</strong>：按句号、问号、感叹号分隔的句子</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">时间估算标准</h4>
              <ul className="space-y-1">
                <li>• <strong>阅读时间</strong>：中文约500字/分钟，英文约200词/分钟</li>
                <li>• <strong>演讲时间</strong>：中文约180字/分钟，英文约130词/分钟</li>
                <li>• 混合文本按比例计算总时间</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">应用场景</h4>
              <ul className="space-y-1">
                <li>• 文章字数统计和编辑</li>
                <li>• 演讲稿时间控制</li>
                <li>• 代码行数统计</li>
                <li>• 文档格式检查</li>
                <li>• 内容长度限制检查</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>字符类型分布</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">
                {inputText.replace(/[^\u4e00-\u9fa5]/g, '').length}
              </div>
              <div className="text-muted-foreground">中文字符</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">
                {inputText.replace(/[^a-zA-Z]/g, '').length}
              </div>
              <div className="text-muted-foreground">英文字母</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-purple-600">
                {inputText.replace(/[^0-9]/g, '').length}
              </div>
              <div className="text-muted-foreground">数字</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-orange-600">
                {inputText.replace(/[\w\s\u4e00-\u9fa5]/g, '').length}
              </div>
              <div className="text-muted-foreground">标点符号</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}