'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Copy, RotateCcw } from 'lucide-react';

interface DiffResult {
  type: 'added' | 'removed' | 'unchanged';
  value: string;
}

function computeDiff(text1: string, text2: string): DiffResult[] {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  const result: DiffResult[] = [];
  
  const maxLength = Math.max(lines1.length, lines2.length);
  
  for (let i = 0; i < maxLength; i++) {
    const line1 = lines1[i] || '';
    const line2 = lines2[i] || '';
    
    if (line1 === line2) {
      result.push({ type: 'unchanged', value: line1 });
    } else {
      if (line1) {
        result.push({ type: 'removed', value: `- ${line1}` });
      }
      if (line2) {
        result.push({ type: 'added', value: `+ ${line2}` });
      }
    }
  }
  
  return result;
}

export default function TextDiffPage() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diffResult, setDiffResult] = useState<DiffResult[]>([]);

  const handleCompare = () => {
    const result = computeDiff(text1, text2);
    setDiffResult(result);
  };

  const handleClear = () => {
    setText1('');
    setText2('');
    setDiffResult([]);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('已复制到剪贴板');
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const getDiffColor = (type: string) => {
    switch (type) {
      case 'added': return 'bg-green-100 text-green-800 border-green-200';
      case 'removed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">文本差异比较</h1>
        <p className="text-gray-600">比较两个文本之间的差异，高亮显示新增、删除和未更改的内容</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>原始文本</span>
              <Button variant="outline" size="sm" onClick={() => handleCopy(text1)}>
                <Copy className="w-4 h-4 mr-1" />
                复制
              </Button>
            </CardTitle>
            <CardDescription>输入第一个文本内容</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="请输入原始文本..."
              className="min-h-[200px] font-mono"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>修改后文本</span>
              <Button variant="outline" size="sm" onClick={() => handleCopy(text2)}>
                <Copy className="w-4 h-4 mr-1" />
                复制
              </Button>
            </CardTitle>
            <CardDescription>输入第二个文本内容</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="请输入修改后的文本..."
              className="min-h-[200px] font-mono"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mb-6">
        <Button onClick={handleCompare} className="flex-1">
          比较差异
        </Button>
        <Button variant="outline" onClick={handleClear}>
          <RotateCcw className="w-4 h-4 mr-2" />
          清空
        </Button>
      </div>

      {diffResult.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>差异结果</CardTitle>
            <CardDescription>
              <span className="text-green-600">绿色</span>表示新增内容，
              <span className="text-red-600">红色</span>表示删除内容，
              <span className="text-gray-600">灰色</span>表示未更改内容
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg font-mono whitespace-pre-wrap">
              {diffResult.map((item, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`mb-1 mr-1 ${getDiffColor(item.type)}`}
                >
                  {item.value}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• 在左右两个文本框中分别输入要比较的文本内容</li>
            <li>• 点击"比较差异"按钮查看文本差异</li>
            <li>• 绿色标记表示新增的内容</li>
            <li>• 红色标记表示删除的内容</li>
            <li>• 灰色标记表示未更改的内容</li>
            <li>• 支持代码、文档、配置文件的差异比较</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}