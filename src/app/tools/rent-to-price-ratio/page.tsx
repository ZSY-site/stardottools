'use client';

import { useState } from 'react';

const RentToPriceRatioCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [result, setResult] = useState<{
    ratio: number;
    yearsToRecover: number;
    annualYield: number;
  } | null>(null);

  const calculateRatio = () => {
    const price = parseFloat(propertyPrice);
    const rent = parseFloat(monthlyRent);

    if (price > 0 && rent > 0) {
      // 计算租售比
      const ratio = price / (rent * 12);
      
      // 计算回本年限
      const yearsToRecover = ratio;
      
      // 计算年化收益率
      const annualYield = (rent * 12 / price) * 100;

      setResult({
        ratio,
        yearsToRecover,
        annualYield
      });
    } else {
      setResult(null);
    }
  };

  const resetCalculator = () => {
    setPropertyPrice('');
    setMonthlyRent('');
    setResult(null);
  };

  const getRatioLevel = (ratio: number) => {
    if (ratio < 200) return { color: 'text-red-600', level: '投资价值高' };
    if (ratio < 300) return { color: 'text-yellow-600', level: '投资价值中等' };
    if (ratio < 400) return { color: 'text-green-600', level: '投资价值一般' };
    return { color: 'text-blue-600', level: '投资价值较低' };
  };

  const getYieldLevel = (yieldRate: number) => {
    if (yieldRate > 6) return { color: 'text-green-600', level: '收益率优秀' };
    if (yieldRate > 4) return { color: 'text-yellow-600', level: '收益率良好' };
    if (yieldRate > 2) return { color: 'text-orange-600', level: '收益率一般' };
    return { color: 'text-red-600', level: '收益率较低' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">租售比计算器</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            计算房产租售比，评估投资回报率，帮助您做出明智的房产投资决策
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：输入区域 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">房产信息</h2>
            
            <div className="space-y-6">
              {/* 房产总价 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  房产总价 (万元)
                </label>
                <input
                  type="number"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(e.target.value)}
                  placeholder="请输入房产总价"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* 月租金 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  月租金 (元)
                </label>
                <input
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                  placeholder="请输入月租金"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-4">
                <button
                  onClick={calculateRatio}
                  disabled={!propertyPrice || !monthlyRent}
                  className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  计算租售比
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
            
            {result ? (
              <div className="space-y-6">
                {/* 租售比结果 */}
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">租售比</div>
                  <div className={`text-5xl font-bold ${getRatioLevel(result.ratio).color}`}>
                    1:{result.ratio.toFixed(0)}
                  </div>
                  <div className="text-lg text-gray-700 mt-2">
                    {getRatioLevel(result.ratio).level}
                  </div>
                </div>
                
                {/* 详细分析 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-3">投资分析</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>房产总价：</span>
                      <span className="font-medium">{parseFloat(propertyPrice).toLocaleString()}万元</span>
                    </div>
                    <div className="flex justify-between">
                      <span>月租金：</span>
                      <span className="font-medium">¥{parseFloat(monthlyRent).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>年租金收入：</span>
                      <span className="font-medium text-green-600">
                        ¥{(parseFloat(monthlyRent) * 12).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>回本年限：</span>
                      <span className="font-medium">{result.yearsToRecover.toFixed(1)}年</span>
                    </div>
                    <div className="flex justify-between">
                      <span>年化收益率：</span>
                      <span className={`font-medium ${getYieldLevel(result.annualYield).color}`}>
                        {result.annualYield.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">投资建议：</span>
                      <span className="font-semibold text-blue-600">
                        {result.ratio < 300 ? '可以考虑投资' : '需谨慎考虑'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🏠</div>
                <p className="text-gray-500">请输入房产信息后点击计算</p>
              </div>
            )}
          </div>
        </div>

        {/* 租售比参考标准 */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">租售比参考标准</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border-l-4 border-red-500 bg-red-50">
              <div className="text-2xl font-bold text-red-600">1:200以内</div>
              <div className="text-sm text-gray-600">投资价值高</div>
              <div className="text-xs text-gray-500 mt-1">回本年限短</div>
            </div>
            <div className="text-center p-4 border-l-4 border-yellow-500 bg-yellow-50">
              <div className="text-2xl font-bold text-yellow-600">1:200-300</div>
              <div className="text-sm text-gray-600">投资价值中等</div>
              <div className="text-xs text-gray-500 mt-1">合理范围</div>
            </div>
            <div className="text-center p-4 border-l-4 border-green-500 bg-green-50">
              <div className="text-2xl font-bold text-green-600">1:300-400</div>
              <div className="text-sm text-gray-600">投资价值一般</div>
              <div className="text-xs text-gray-500 mt-1">需谨慎考虑</div>
            </div>
            <div className="text-center p-4 border-l-4 border-blue-500 bg-blue-50">
              <div className="text-2xl font-bold text-blue-600">1:400以上</div>
              <div className="text-sm text-gray-600">投资价值较低</div>
              <div className="text-xs text-gray-500 mt-1">回本年限长</div>
            </div>
          </div>
        </div>

        {/* 计算公式说明 */}
        <div className="mt-8 bg-teal-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-teal-800 mb-3">计算公式</h3>
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm font-mono text-gray-700 space-y-2">
              <div>租售比 = 房产总价 ÷ 年租金收入</div>
              <div>年租金收入 = 月租金 × 12</div>
              <div>回本年限 = 租售比</div>
              <div>年化收益率 = (年租金收入 ÷ 房产总价) × 100%</div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              注：租售比1:300表示房产总价是年租金的300倍，即需要300个月（25年）收回投资成本
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-cyan-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-cyan-800 mb-3">使用说明</h3>
          <ol className="list-decimal list-inside space-y-2 text-cyan-700">
            <li>输入房产总价（单位：万元）</li>
            <li>输入月租金金额（单位：元）</li>
            <li>点击"计算租售比"按钮</li>
            <li>查看租售比结果和投资分析</li>
            <li>参考标准评估房产投资价值</li>
            <li>结合其他因素做出投资决策</li>
          </ol>
        </div>

        {/* 投资建议 */}
        <div className="mt-8 bg-yellow-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">💡 投资建议</h3>
          <ul className="space-y-2 text-yellow-700 text-sm">
            <li>• 租售比1:200以内：投资价值较高，可考虑入手</li>
            <li>• 租售比1:200-300：投资价值合理，需综合评估</li>
            <li>• 租售比1:300以上：投资价值较低，建议谨慎</li>
            <li>• 除租售比外，还需考虑地段、升值潜力等因素</li>
            <li>• 建议结合个人财务状况和投资目标决策</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RentToPriceRatioCalculator;