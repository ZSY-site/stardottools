'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export default function TextSplitter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [splitMethod, setSplitMethod] = useState<'line' | 'custom' | 'length'>('line');
  const [customDelimiter, setCustomDelimiter] = useState(',');
  const [maxLength, setMaxLength] = useState(50);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [addNumbering, setAddNumbering] = useState(false);

  const splitText = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    let lines: string[] = [];

    switch (splitMethod) {
      case 'line':
        lines = inputText.split(/\r?\n/);
        break;
      case 'custom':
        lines = inputText.split(new RegExp(customDelimiter, 'g'));
        break;
      case 'length':
        const text = inputText.replace(/\r?\n/g, ' ');
        for (let i = 0; i < text.length; i += maxLength) {
          lines.push(text.substring(i, i + maxLength));
        }
        break;
    }

    // 处理选项
    let processedLines = lines.map(line => {
      if (trimLines) line = line.trim();
      return line;
    });

    if (removeEmpty) {
      processedLines = processedLines.filter(line => line.length > 0);
    }

    if (addNumbering) {
      processedLines = processedLines.map((line, index) => {
        return `${index + 1}. ${line}`;
      });
    }

    setOutputText(processedLines.join('\n'));
  };

  const clearText = () => {
    setInputText('');
    setOutputText('');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      alert('分隔结果已复制到剪贴板！');
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const getStats = () => {
    if (!outputText) return null;
    
    const lines = outputText.split('\n').filter(line => line.trim());
    const totalChars = lines.reduce((sum, line) => sum + line.length, 0);
    
    return {
      lines: lines.length,
      totalChars,
      avgCharsPerLine: lines.length > 0 ? Math.round(totalChars / lines.length) : 0
    };
  };

  const stats = getStats();

  const examples = [
    '苹果,香蕉,橙子,葡萄,西瓜',
    '第一行\n第二行\n第三行\n第四行',
    '这是一个很长的文本需要按固定长度进行分隔处理',
    '张三 李四 王五 赵六 钱七'
  ];

  const setExample = (example: string) => {
    setInputText(example);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">文本按行分隔工具</h1>
        <p className="text-muted-foreground">
          将文本按不同方式进行分隔处理，支持按行、自定义分隔符、固定长度等
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>输入文本</CardTitle>
            <CardDescription>请输入需要分隔的文本</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="input-text">原始文本</Label>
                <Textarea
                  id="input-text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="请输入需要分隔的文本..."
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
            <CardTitle>分隔结果</CardTitle>
            <CardDescription>分隔后的文本将显示在这里</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="output-text">分隔结果</Label>
                <Textarea
                  id="output-text"
                  value={outputText}
                  readOnly
                  rows={8}
                  className="mt-2 bg-muted font-mono text-sm"
                />
              </div>
              
              {stats && (
                <div className="text-sm text-muted-foreground p-2 bg-muted/50 rounded">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="font-semibold">行数</div>
                      <div>{stats.lines}</div>
                    </div>
                    <div>
                      <div className="font-semibold">总字符</div>
                      <div>{stats.totalChars}</div>
                    </div>
                    <div>
                      <div className="font-semibold">平均每行</div>
                      <div>{stats.avgCharsPerLine} 字符</div>
                    </div>
                  </div>
                </div>
              )}
              
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
          <CardTitle>分隔设置</CardTitle>
          <CardDescription>选择分隔方式和处理选项</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label htmlFor="split-method">分隔方式</Label>
              <Select value={splitMethod} onValueChange={(value: 'line' | 'custom' | 'length') => setSplitMethod(value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="选择分隔方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">按行分隔（换行符）</SelectItem>
                  <SelectItem value="custom">自定义分隔符</SelectItem>
                  <SelectItem value="length">按固定长度</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {splitMethod === 'custom' && (
              <div>
                <Label htmlFor="custom-delimiter">自定义分隔符</Label>
                <Input
                  id="custom-delimiter"
                  value={customDelimiter}
                  onChange={(e) => setCustomDelimiter(e.target.value)}
                  placeholder="输入分隔符，如：, ; | 等"
                  className="mt-2"
                />
              </div>
            )}

            {splitMethod === 'length' && (
              <div>
                <Label htmlFor="max-length">每行最大长度</Label>
                <Input
                  id="max-length"
                  type="number"
                  value={maxLength}
                  onChange={(e) => setMaxLength(parseInt(e.target.value) || 50)}
                  min={1}
                  max={1000}
                  className="mt-2"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={trimLines}
                  onCheckedChange={setTrimLines}
                />
                <Label htmlFor="trim-lines">去除每行首尾空格</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={removeEmpty}
                  onCheckedChange={setRemoveEmpty}
                />
                <Label htmlFor="remove-empty">移除空行</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={addNumbering}
                  onCheckedChange={setAddNumbering}
                />
                <Label htmlFor="add-numbering">添加行号</Label>
              </div>
            </div>

            <div>
              <Button onClick={splitText} disabled={!inputText.trim()}>
                开始分隔
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
                {example.length > 15 ? example.substring(0, 15) + '...' : example}
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
            <p>• <strong>按行分隔</strong>：根据换行符将文本分隔成多行</p>
            <p>• <strong>自定义分隔符</strong>：使用指定的字符（如逗号、分号等）进行分隔</p>
            <p>• <strong>按固定长度</strong>：将文本按指定长度进行分隔，适合长文本处理</p>
            <p>• <strong>去除每行首尾空格</strong>：自动清理每行开头和结尾的空格</p>
            <p>• <strong>移除空行</strong>：自动过滤掉空白的行</p>
            <p>• <strong>添加行号</strong>：在每行前面添加序号，便于统计和引用</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>常见应用场景</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">数据处理</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>CSV数据分隔</li>
                <li>列表项提取</li>
                <li>批量处理文本</li>
                <li>数据清洗</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">文本处理</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>长文本分段</li>
                <li>代码格式化</li>
                <li>日志文件分析</li>
                <li>文本统计</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}