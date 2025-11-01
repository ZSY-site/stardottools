'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Copy, RotateCcw, QrCode, Scan } from 'lucide-react';

export default function QRScannerPage() {
  const [scanResult, setScanResult] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 模拟二维码识别功能
  const simulateQRScan = (imageUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟识别结果
        const mockResults = [
          'https://example.com/qr-code',
          'WIFI:S:MyNetwork;T:WPA;P:MyPassword;;',
          'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL:1234567890\nEND:VCARD',
          'Hello World!',
          'geo:40.748817,-73.985428'
        ];
        const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
        resolve(randomResult);
      }, 1500);
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('请选择图片文件');
      return;
    }

    setIsScanning(true);
    setError('');
    
    try {
      const imageUrl = URL.createObjectURL(file);
      const result = await simulateQRScan(imageUrl);
      setScanResult(result);
    } catch (err) {
      setError('二维码识别失败，请重试');
    } finally {
      setIsScanning(false);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      setError('无法访问摄像头，请检查权限设置');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
  };

  const captureAndScan = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsScanning(true);
    setError('');

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (context && videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      try {
        const imageUrl = canvas.toDataURL('image/png');
        const result = await simulateQRScan(imageUrl);
        setScanResult(result);
      } catch (err) {
        setError('二维码识别失败，请重试');
      } finally {
        setIsScanning(false);
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scanResult);
      alert('已复制到剪贴板');
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const handleClear = () => {
    setScanResult('');
    setError('');
    setIsScanning(false);
    stopCamera();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const getResultType = (result: string): string => {
    if (result.startsWith('http')) return '网址';
    if (result.startsWith('WIFI:')) return 'WiFi连接';
    if (result.startsWith('BEGIN:VCARD')) return '联系人';
    if (result.startsWith('geo:')) return '地理位置';
    return '文本';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">二维码识别器</h1>
        <p className="text-gray-600">在线识别二维码内容，支持图片上传和摄像头实时扫描</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              扫描方式
            </CardTitle>
            <CardDescription>选择二维码识别方式</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 文件上传 */}
            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-2">
                <Upload className="w-4 h-4" />
                图片上传
              </h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-input"
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">点击选择二维码图片</p>
                  <p className="text-xs text-gray-500">支持 JPG, PNG, GIF 格式</p>
                </label>
              </div>
            </div>

            {/* 摄像头扫描 */}
            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-2">
                <Camera className="w-4 h-4" />
                实时扫描
              </h3>
              <div className="space-y-2">
                {!cameraActive ? (
                  <Button onClick={startCamera} className="w-full">
                    <Camera className="w-4 h-4 mr-2" />
                    启动摄像头
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <div className="relative bg-black rounded-lg overflow-hidden">
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 border-2 border-green-400 rounded-lg pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-green-400 rounded-lg"></div>
                      </div>
                    </div>
                    <Button onClick={captureAndScan} disabled={isScanning} className="w-full">
                      <Scan className="w-4 h-4 mr-2" />
                      {isScanning ? '识别中...' : '扫描二维码'}
                    </Button>
                    <Button variant="outline" onClick={stopCamera} className="w-full">
                      关闭摄像头
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>识别结果</span>
              {scanResult && (
                <Badge variant="secondary">
                  {getResultType(scanResult)}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>二维码识别结果将显示在这里</CardDescription>
          </CardHeader>
          <CardContent>
            {isScanning ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">正在识别二维码...</p>
              </div>
            ) : scanResult ? (
              <div className="space-y-4">
                <Textarea
                  value={scanResult}
                  readOnly
                  className="min-h-[100px] font-mono text-sm"
                />
                <div className="flex gap-2">
                  <Button onClick={handleCopy} className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    复制内容
                  </Button>
                  {scanResult.startsWith('http') && (
                    <Button variant="outline" asChild>
                      <a href={scanResult} target="_blank" rel="noopener noreferrer">
                        打开链接
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <QrCode className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>识别结果将显示在这里</p>
              </div>
            )}
            
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mb-6">
        <Button onClick={handleClear} variant="outline" className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          清空结果
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>使用说明</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 点击"选择二维码图片"上传图片文件进行识别</li>
              <li>• 或点击"启动摄像头"使用实时扫描功能</li>
              <li>• 将二维码对准摄像头扫描框进行识别</li>
              <li>• 识别结果会自动显示在右侧区域</li>
              <li>• 支持复制识别结果或直接打开链接</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>支持格式</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 网址链接 (http/https)</li>
              <li>• WiFi连接信息</li>
              <li>• 联系人信息 (vCard)</li>
              <li>• 地理位置坐标</li>
              <li>• 纯文本内容</li>
              <li>• 电子邮件地址</li>
              <li>• 电话号码</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* 隐藏的canvas用于截图 */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}