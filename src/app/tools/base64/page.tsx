'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, RotateCcw, FileText, Code } from 'lucide-react';

export default function Base64Page() {
  const [inputText, setInputText] = useState('');
  const [base64Text, setBase64Text] = useState('');
  const [operation, setOperation] = useState<'encode' | 'decode'>('encode');

  const handleEncode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(inputText)));
      setBase64Text(encoded);
    } catch (error) {
      alert('编码失败，请检查输入内容');
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(inputText)));
      setBase64Text(decoded);
    } catch (error) {
      alert('解码失败，请检查输入是否为有效的Base64编码');
    }
  };

  const handleProcess = () => {
    if (operation === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const handleClear = () => {
    setInputText('');
    setBase64Text('');
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('已复制到剪贴板');
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const handleSwap = () => {
    setInputText(base64Text);
    setBase64Text(inputText);
    setOperation(operation === 'encode' ? 'decode' : 'encode');
  };

  const isBase64 = (str: string) => {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  };

  const detectOperation = (text: string) => {
    if (text.trim() === '') return 'encode';
    return isBase64(text) ? 'decode' : 'encode';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Base64编码解码</h1>
        <p className="text-gray-600">在线进行Base64编码和解码操作，支持文本和数据的转换</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>输入内容</span>
              <div className="flex items-center gap-2">
                <Badge variant={operation === 'encode' ? 'default' : 'secondary'}>
                  {operation === 'encode' ? '文本' : 'Base64'}
                </Badge>
                <Button variant="outline" size="sm" onClick={() => handleCopy(inputText)}>
                  <Copy className="w-4 h-4 mr-1" />
                  复制
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              {operation === 'encode' ? '输入要编码的文本内容' : '输入要解码的Base64编码'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setOperation(detectOperation(e.target.value));
              }}
              placeholder={operation === 'encode' ? '请输入要编码的文本...' : '请输入Base64编码...'}
              className="min-h-[200px] font-mono"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>输出结果</span>
              <div className="flex items-center gap-2">
                <Badge variant={operation === 'encode' ? 'secondary' : 'default'}>
                  {operation === 'encode' ? 'Base64' : '文本'}
                </Badge>
                <Button variant="outline" size="sm" onClick={() => handleCopy(base64Text)}>
                  <Copy className="w-4 h-4 mr-1" />
                  复制
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              {operation === 'encode' ? 'Base64编码结果' : '解码后的文本内容'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={base64Text}
              readOnly
              placeholder="结果将显示在这里..."
              className="min-h-[200px] font-mono bg-gray-50"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mb-6">
        <Button onClick={handleProcess} className="flex-1">
          {operation === 'encode' ? '编码' : '解码'}
        </Button>
        <Button variant="outline" onClick={handleSwap}>
          <RotateCcw className="w-4 h-4 mr-2" />
          交换
        </Button>
        <Button variant="outline" onClick={handleClear}>
          清空
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              使用说明
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 在左侧输入框中输入要编码或解码的内容</li>
              <li>• 系统会自动检测输入类型并选择相应操作</li>
              <li>• 点击"编码"或"解码"按钮进行转换</li>
              <li>• 使用"交换"按钮可以快速切换输入和输出内容</li>
              <li>• 支持复制输入和输出内容到剪贴板</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              应用场景
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 数据加密和传输</li>
              <li>• 图片和文件编码</li>
              <li>• API数据传输</li>
              <li>• 配置文件编码</li>
              <li>• 邮件附件编码</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Base64编码说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 space-y-2">
            <p>Base64是一种基于64个可打印字符来表示二进制数据的编码方式。</p>
            <p>它常用于在需要处理文本数据的场合，表示、传输、存储一些二进制数据。</p>
            <p>Base64编码后的数据长度会增加约33%，但具有良好的可读性和兼容性。</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}