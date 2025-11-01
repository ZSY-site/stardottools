'use client';

import { useState, useRef } from 'react';

const PhotoWatermarkGenerator = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [watermarkedImage, setWatermarkedImage] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [location, setLocation] = useState('');
  const [fontSize, setFontSize] = useState(24);
  const [opacity, setOpacity] = useState(0.7);
  const [position, setPosition] = useState('bottom-right');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateWatermark = () => {
    if (!originalImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // 绘制原图
      ctx.drawImage(img, 0, 0);
      
      // 设置水印样式
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // 构建水印文本
      let watermarkContent = watermarkText;
      if (dateTime) watermarkContent += ` ${dateTime}`;
      if (location) watermarkContent += ` ${location}`;
      
      // 根据位置设置水印坐标
      let x = 0, y = 0;
      switch (position) {
        case 'top-left':
          x = fontSize * 2;
          y = fontSize * 2;
          ctx.textAlign = 'left';
          break;
        case 'top-right':
          x = img.width - fontSize * 2;
          y = fontSize * 2;
          ctx.textAlign = 'right';
          break;
        case 'bottom-left':
          x = fontSize * 2;
          y = img.height - fontSize * 2;
          ctx.textAlign = 'left';
          break;
        case 'bottom-right':
          x = img.width - fontSize * 2;
          y = img.height - fontSize * 2;
          ctx.textAlign = 'right';
          break;
        case 'center':
          x = img.width / 2;
          y = img.height / 2;
          break;
      }
      
      // 添加文字阴影增强可读性
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 3;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      // 绘制水印
      ctx.fillText(watermarkContent, x, y);
      
      // 重置阴影
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      setWatermarkedImage(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.src = originalImage;
  };

  const downloadImage = () => {
    if (watermarkedImage) {
      const link = document.createElement('a');
      link.download = 'watermarked-photo.jpg';
      link.href = watermarkedImage;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">照片时间地点水印生成器</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            为您的照片添加自定义的时间、地点水印，保护版权并记录重要信息
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：设置区域 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">水印设置</h2>
            
            <div className="space-y-6">
              {/* 图片上传 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  上传照片
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">支持 JPEG、PNG、WebP 格式，最大 10MB</p>
              </div>

              {/* 水印文本 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  水印文本
                </label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="例如：拍摄者姓名"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 时间设置 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  时间信息
                </label>
                <input
                  type="text"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  placeholder="例如：2024-01-01 12:00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 地点设置 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  地点信息
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="例如：北京故宫"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 字体大小 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  字体大小: {fontSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="48"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* 透明度 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  透明度: {Math.round(opacity * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* 位置选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  水印位置
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="top-left">左上角</option>
                  <option value="top-right">右上角</option>
                  <option value="bottom-left">左下角</option>
                  <option value="bottom-right">右下角</option>
                  <option value="center">中心</option>
                </select>
              </div>

              {/* 生成按钮 */}
              <button
                onClick={generateWatermark}
                disabled={!originalImage}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                生成水印图片
              </button>
            </div>
          </div>

          {/* 右侧：结果展示区域 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">预览结果</h2>
            
            <div className="space-y-6">
              {/* 原图预览 */}
              {originalImage && (
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">原图预览</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <img 
                      src={originalImage} 
                      alt="原图" 
                      className="max-w-full max-h-64 mx-auto"
                    />
                  </div>
                </div>
              )}

              {/* 水印图片预览 */}
              {watermarkedImage ? (
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">水印图片</h3>
                  <div className="border-2 border-dashed border-green-300 rounded-lg p-4">
                    <img 
                      src={watermarkedImage} 
                      alt="水印图片" 
                      className="max-w-full max-h-64 mx-auto"
                    />
                  </div>
                  <button
                    onClick={downloadImage}
                    className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    下载水印图片
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📷</div>
                  <p className="text-gray-500">上传照片并设置水印后，这里将显示生成的结果</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 隐藏的Canvas用于处理图片 */}
        <canvas ref={canvasRef} className="hidden" />

        {/* 功能特性说明 */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">功能特性</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl text-blue-600 mb-2">🖼️</div>
              <h3 className="font-semibold text-gray-700">多格式支持</h3>
              <p className="text-sm text-gray-600">支持 JPEG、PNG、WebP 等多种图片格式</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl text-green-600 mb-2">⚙️</div>
              <h3 className="font-semibold text-gray-700">自定义设置</h3>
              <p className="text-sm text-gray-600">可调节字体大小、透明度、位置等参数</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl text-purple-600 mb-2">💾</div>
              <h3 className="font-semibold text-gray-700">高质量输出</h3>
              <p className="text-sm text-gray-600">保持原图质量，水印清晰可见</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl text-orange-600 mb-2">🔒</div>
              <h3 className="font-semibold text-gray-700">版权保护</h3>
              <p className="text-sm text-gray-600">有效保护您的照片版权和归属信息</p>
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">使用说明</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-700">
            <li>上传您要添加水印的照片</li>
            <li>设置水印文本、时间、地点等信息</li>
            <li>调整字体大小、透明度和位置参数</li>
            <li>点击"生成水印图片"按钮</li>
            <li>预览效果并下载处理后的图片</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PhotoWatermarkGenerator;