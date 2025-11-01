'use client';

import { useState } from 'react';

const AnnualYieldCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [dailyEarnings, setDailyEarnings] = useState('');
  const [days, setDays] = useState('7');
  const [result, setResult] = useState<number | null>(null);

  const calculateAnnualYield = () => {
    const p = parseFloat(principal);
    const e = parseFloat(dailyEarnings);
    const d = parseFloat(days);

    if (p > 0 && e > 0 && d > 0) {
      // 七日年化收益率 = (七日总收益 / 本金) * (365 / 7) * 100%
      const totalEarnings = e * d;
      const yieldRate = (totalEarnings / p) * (365 / d) * 100;
      setResult(yieldRate);
    } else {
      setResult(null);
    }
  };

  const resetCalculator = () => {
    setPrincipal('');
    setDailyEarnings('');
    setDays('7');
    setResult(null);
  };

  const getYieldLevel = (yieldRate: number) => {
    if (yieldRate < 2) return { color: 'text-red-600', level: '较低' };
    if (yieldRate < 4) return { color: 'text-yellow-600', level: '中等' };
    if (yieldRate < 6) return { color: 'text-green-600', level: '良好' };
    return { color: 'text-blue-600', level: '优秀' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">七日年化收益率计算器</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            快速计算理财产品的七日年化收益率，帮助您评估投资回报率
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：输入区域 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">计算参数</h2>
            
            <div className="space-y-6">
              {/* 本金输入 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  投资本金 (元)
                </label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  placeholder="请输入投资金额"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* 每日收益输入 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  每日收益 (元)
                </label>
                <input
                  type="number"
                  value={dailyEarnings}
                  onChange={(e) => setDailyEarnings(e.target.value)}
                  placeholder="请输入每日收益金额"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* 天数选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  计算天数
                </label>
                <select
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="7">7天（标准七日年化）</option>
                  <option value="30">30天</option>
                  <option value="90">90天</option>
                  <option value="180">180天</option>
                  <option value="365">365天</option>
                </select>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-4">
                <button
                  onClick={calculateAnnualYield}
                  disabled={!principal || !dailyEarnings}
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  计算收益率
                </button>
                <button
                  onClick={resetCalculator}
                  className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  重置
                </button>
              </div>
            </div>
          </div>

          {/* 右侧：结果展示区域 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">计算结果</h2>
            
            {result !== null ? (
              <div className="text-center">
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-2">七日年化收益率</div>
                  <div className={`text-5xl font-bold ${getYieldLevel(result).color}`}>
                    {result.toFixed(2)}%
                  </div>
                  <div className="text-lg text-gray-700 mt-2">
                    收益水平：{getYieldLevel(result).level}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-3">详细分析</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>投资本金：</span>
                      <span className="font-medium">¥{parseFloat(principal).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>每日收益：</span>
                      <span className="font-medium">¥{parseFloat(dailyEarnings).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>计算天数：</span>
                      <span className="font-medium">{days}天</span>
                    </div>
                    <div className="flex justify-between">
                      <span>总收益：</span>
                      <span className="font-medium">
                        ¥{(parseFloat(dailyEarnings) * parseFloat(days)).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>年化收益：</span>
                      <span className="font-medium">
                        ¥{(parseFloat(principal) * result / 100).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📊</div>
                <p className="text-gray-500">请输入投资本金和每日收益后点击计算</p>
              </div>
            )}
          </div>
        </div>

        {/* 收益率参考标准 */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">收益率参考标准</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border-l-4 border-red-500 bg-red-50">
              <div className="text-2xl font-bold text-red-600">&lt; 2%</div>
              <div className="text-sm text-gray-600">较低收益</div>
              <div className="text-xs text-gray-500 mt-1">货币基金水平</div>
            </div>
            <div className="text-center p-4 border-l-4 border-yellow-500 bg-yellow-50">
              <div className="text-2xl font-bold text-yellow-600">2% - 4%</div>
              <div className="text-sm text-gray-600">中等收益</div>
              <div className="text-xs text-gray-500 mt-1">银行理财水平</div>
            </div>
            <div className="text-center p-4 border-l-4 border-green-500 bg-green-50">
              <div className="text-2xl font-bold text-green-600">4% - 6%</div>
              <div className="text-sm text-gray-600">良好收益</div>
              <div className="text-xs text-gray-500 mt-1">优质基金水平</div>
            </div>
            <div className="text-center p-4 border-l-4 border-blue-500 bg-blue-50">
              <div className="text-2xl font-bold text-blue-600">&gt; 6%</div>
              <div className="text-sm text-gray-600">优秀收益</div>
              <div className="text-xs text-gray-500 mt-1">高风险投资水平</div>
            </div>
          </div>
        </div>

        {/* 计算公式说明 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">计算公式</h3>
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm font-mono text-gray-700">
              七日年化收益率 = (七日总收益 ÷ 本金) × (365 ÷ 7) × 100%
            </div>
            <div className="text-xs text-gray-500 mt-2">
              注：此公式将短期收益折算为年化收益率，便于比较不同期限的投资产品
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-green-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3">使用说明</h3>
          <ol className="list-decimal list-inside space-y-2 text-green-700">
            <li>输入您的投资本金金额</li>
            <li>输入每日获得的收益金额</li>
            <li>选择计算天数（默认为7天）</li>
            <li>点击"计算收益率"按钮</li>
            <li>查看七日年化收益率结果</li>
            <li>根据收益率水平评估投资产品</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AnnualYieldCalculator;