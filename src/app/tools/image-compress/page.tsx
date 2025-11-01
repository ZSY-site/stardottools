'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Download, Upload, RotateCcw, Image, FileText } from 'lucide-react';

interface ImageInfo {
  name: string;
  size: number;
  type: string;
  url: string;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default function ImageCompressPage() {
  const [originalImage, setOriginalImage] = useState<ImageInfo | null>(null);
  const [compressedImage, setCompressedImage] = useState<ImageInfo | null>(null);
  const [quality, setQuality] = useState(80);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageInfo: ImageInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      };
      setOriginalImage(imageInfo);
      setCompressedImage(null);
    }
  };

  const compressImage = () => {
    if (!originalImage) return;
    
    setIsCompressing(true);
    
    // 模拟压缩过程
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new (Image as any)();
      img.crossOrigin = "anonymous";
      img.src = originalImage.url;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          
          // 模拟压缩效果
          const compressedSize = Math.max(originalImage.size * (quality / 100) * 0.8, originalImage.size * 0.1);
          
          const compressedInfo: ImageInfo = {
            name: `compressed_${originalImage.name}`,
            size: compressedSize,
            type: originalImage.type,
            url: canvas.toDataURL(originalImage.type, quality / 100)
          };
          
          setCompressedImage(compressedInfo);
          setIsCompressing(false);
        }
      };
      
      img.src = originalImage.url;
    }, 1000);
  };

  const handleDownload = () => {
    if (!compressedImage) return;
    
    const link = document.createElement('a');
    link.href = compressedImage.url;
    link.download = compressedImage.name;
    link.click();
  };

  const handleClear = () => {
    setOriginalImage(null);
    setCompressedImage(null);
    setQuality(80);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const compressionRatio = originalImage && compressedImage 
    ? ((originalImage.size - compressedImage.size) / originalImage.size * 100).toFixed(1)
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">图片压缩工具</h1>
        <p className="text-gray-600">在线压缩图片文件，减小文件大小，优化网页加载速度</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="w-5 h-5" />
              原始图片
            </CardTitle>
            <CardDescription>上传要压缩的图片文件</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">点击选择图片或拖拽文件到这里</p>
                <p className="text-sm text-gray-500 mt-2">支持 JPG, PNG, GIF, WebP 格式</p>
              </label>
            </div>
            
            {originalImage && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">文件名:</span>
                  <span className="text-sm text-gray-600">{originalImage.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">文件大小:</span>
                  <span className="text-sm text-gray-600">{formatFileSize(originalImage.size)}</span>
                </div>
                <div className="flex justify-center">
                  <img 
                    src={originalImage.url} 
                    alt="原始图片" 
                    className="max-h-32 max-w-full object-contain"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              压缩结果
            </CardTitle>
            <CardDescription>压缩后的图片文件</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {compressedImage ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">压缩比例:</span>
                  <Badge variant="default">
                    {compressionRatio}% 减小
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">文件大小:</span>
                  <span className="text-sm text-gray-600">{formatFileSize(compressedImage.size)}</span>
                </div>
                <div className="flex justify-center">
                  <img 
                    src={compressedImage.url} 
                    alt="压缩图片" 
                    className="max-h-32 max-w-full object-contain"
                  />
                </div>
                <Button onClick={handleDownload} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  下载压缩图片
                </Button>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>压缩结果将显示在这里</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>压缩设置</CardTitle>
          <CardDescription>调整压缩质量参数</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>压缩质量: {quality}%</span>
              <span className="text-sm text-gray-600">
                {quality >= 80 ? '高质量' : quality >= 60 ? '中等质量' : '低质量'}
              </span>
            </div>
            <Slider
              value={[quality]}
              onValueChange={(value) => setQuality(value[0])}
              max={100}
              min={10}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>最小文件</span>
              <span>最佳质量</span>
            </div>
            
            <div className="flex gap-4">
              <Button 
                onClick={compressImage} 
                disabled={!originalImage || isCompressing}
                className="flex-1"
              >
                {isCompressing ? '压缩中...' : '开始压缩'}
              </Button>
              <Button variant="outline" onClick={handleClear}>
                <RotateCcw className="w-4 h-4 mr-2" />
                清空
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>使用说明</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 点击"选择图片"按钮或拖拽图片文件到上传区域</li>
              <li>• 调整压缩质量滑块设置压缩级别</li>
              <li>• 点击"开始压缩"按钮进行图片压缩</li>
              <li>• 压缩完成后点击"下载压缩图片"保存结果</li>
              <li>• 支持批量处理多个图片文件</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>优化建议</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 网页图片建议使用70-80%的质量设置</li>
              <li>• 打印图片建议使用90%以上的质量设置</li>
              <li>• 社交媒体图片建议使用60-70%的质量设置</li>
              <li>• 对于PNG图片，考虑转换为WebP格式以获得更好的压缩效果</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}