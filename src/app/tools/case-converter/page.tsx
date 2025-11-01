'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CaseConverter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const convertToUpperCase = () => {
    setOutputText(inputText.toUpperCase());
  };

  const convertToLowerCase = () => {
    setOutputText(inputText.toLowerCase());
  };

  const convertToTitleCase = () => {
    setOutputText(
      inputText
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    );
  };

  const convertToSentenceCase = () => {
    setOutputText(
      inputText
        .toLowerCase()
        .split('. ')
        .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1))
        .join('. ')
    );
  };

  const convertToCamelCase = () => {
    setOutputText(
      inputText
        .toLowerCase()
        .split(/\s+/)
        .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    );
  };

  const convertToSnakeCase = () => {
    setOutputText(inputText.toLowerCase().replace(/\s+/g, '_'));
  };

  const convertToKebabCase = () => {
    setOutputText(inputText.toLowerCase().replace(/\s+/g, '-'));
  };

  const clearText = () => {
    setInputText('');
    setOutputText('');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      alert('文本已复制到剪贴板！');
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">大小写转换器</h1>
        <p className="text-muted-foreground">
          将文本转换为不同的大小写格式，包括大写、小写、首字母大写等
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>输入文本</CardTitle>
            <CardDescription>请输入需要转换的文本</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="input-text">原始文本</Label>
                <Textarea
                  id="input-text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="请输入需要转换的文本..."
                  rows={8}
                  className="mt-2"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={clearText} variant="outline">
                  清空
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>转换结果</CardTitle>
            <CardDescription>转换后的文本将显示在这里</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="output-text">转换结果</Label>
                <Textarea
                  id="output-text"
                  value={outputText}
                  readOnly
                  rows={8}
                  className="mt-2 bg-muted"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} disabled={!outputText}>
                  复制结果
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>转换选项</CardTitle>
          <CardDescription>选择不同的转换方式</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="basic">基础转换</TabsTrigger>
              <TabsTrigger value="advanced">高级转换</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                <Button onClick={convertToUpperCase} disabled={!inputText} variant="outline">
                  大写
                </Button>
                <Button onClick={convertToLowerCase} disabled={!inputText} variant="outline">
                  小写
                </Button>
                <Button onClick={convertToTitleCase} disabled={!inputText} variant="outline">
                  首字母大写
                </Button>
                <Button onClick={convertToSentenceCase} disabled={!inputText} variant="outline">
                  句子格式
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                <Button onClick={convertToCamelCase} disabled={!inputText} variant="outline">
                  驼峰命名
                </Button>
                <Button onClick={convertToSnakeCase} disabled={!inputText} variant="outline">
                  蛇形命名
                </Button>
                <Button onClick={convertToKebabCase} disabled={!inputText} variant="outline">
                  短横线命名
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong>大写</strong>：将所有字母转换为大写</p>
            <p>• <strong>小写</strong>：将所有字母转换为小写</p>
            <p>• <strong>首字母大写</strong>：每个单词的首字母大写</p>
            <p>• <strong>句子格式</strong>：每个句子的首字母大写</p>
            <p>• <strong>驼峰命名</strong>：转换为驼峰命名格式（camelCase）</p>
            <p>• <strong>蛇形命名</strong>：转换为蛇形命名格式（snake_case）</p>
            <p>• <strong>短横线命名</strong>：转换为短横线命名格式（kebab-case）</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}