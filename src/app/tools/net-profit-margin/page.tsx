'use client';

import { useState } from 'react';

const NetProfitMarginCalculator = () => {
  const [revenue, setRevenue] = useState('');
  const [cost, setCost] = useState('');
  const [expenses, setExpenses] = useState('');
  const [taxRate, setTaxRate] = useState('25');
  const [result, setResult] = useState<{
    netProfit: number;
    margin: number;
    grossProfit: number;
    grossMargin: number;
  } | null>(null);

  const calculateNetProfitMargin = () => {
    const r = parseFloat(revenue);
    const c = parseFloat(cost);
    const e = parseFloat(expenses) || 0;
    const t = parseFloat(taxRate) / 100;

    if (r > 0 && c >= 0 && e >= 0) {
      // 计算毛利润
      const grossProfit = r - c;
      const grossMargin = (grossProfit / r) * 100;
      
      // 计算税前利润
      const profitBeforeTax = grossProfit - e;
      
      // 计算税后净利润
      const taxAmount = profitBeforeTax * t;
      const netProfit = profitBeforeTax - taxAmount;
      const margin = (netProfit / r) * 100;

      setResult({
        netProfit,
        margin,
        grossProfit,
        grossMargin
      });
    } else {
      setResult(null);
    }
  };

  const resetCalculator = () => {
    setRevenue('');
    setCost('');
    setExpenses('');
    setTaxRate('25');
    setResult(null);
  };

  const getMarginLevel = (margin: number) => {
    if (margin < 5) return { color: 'text-red-600', level: '较低' };
    if (margin < 10) return { color: 'text-yellow-600', level: '中等' };
    if (margin < 20) return { color: 'text-green-600', level: '良好' };
    return { color: 'text-blue-600', level: '优秀' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">净利率计算器</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            计算企业或项目的净利率，评估盈利能力，帮助您做出更好的财务决策
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：输入区域 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">财务数据</h2>
            
            <div className="space-y-6">
              {/* 营业收入 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  营业收入 (元)
                </label>
                <input
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  placeholder="请输入营业收入"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* 营业成本 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  营业成本 (元)
                </label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="请输入营业成本"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* 期间费用 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  期间费用 (元)
                </label>
                <input
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  placeholder="包括销售、管理、财务费用等"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* 税率 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  所得税率 (%)
                </label>
                <select
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="15">15% (高新技术企业)</option>
                  <option value="20">20% (小微企业)</option>
                  <option value="25">25% (一般企业)</option>
                  <option value="30">30% (特定行业)</option>
                </select>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-4">
                <button
                  onClick={calculateNetProfitMargin}
                  disabled={!revenue || !cost}
                  className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  计算净利率
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
                {/* 净利率结果 */}
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">净利率</div>
                  <div className={`text-5xl font-bold ${getMarginLevel(result.margin).color}`}>
                    {result.margin.toFixed(2)}%
                  </div>
                  <div className="text-lg text-gray-700 mt-2">
                    盈利水平：{getMarginLevel(result.margin).level}
                  </div>
                </div>
                
                {/* 详细财务分析 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-3">财务分析</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>营业收入：</span>
                      <span className="font-medium">¥{parseFloat(revenue).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>营业成本：</span>
                      <span className="font-medium">¥{parseFloat(cost).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>毛利润：</span>
                      <span className="font-medium text-green-600">
                        ¥{result.grossProfit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>毛利率：</span>
                      <span className="font-medium">{result.grossMargin.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>期间费用：</span>
                      <span className="font-medium">¥{(parseFloat(expenses) || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>所得税：</span>
                      <span className="font-medium">
                        ¥{((result.grossProfit - (parseFloat(expenses) || 0)) * parseFloat(taxRate) / 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">净利润：</span>
                      <span className="font-semibold text-blue-600">
                        ¥{result.netProfit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📈</div>
                <p className="text-gray-500">请输入财务数据后点击计算</p>
              </div>
            )}
          </div>
        </div>

        {/* 行业参考标准 */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">行业净利率参考</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border-l-4 border-red-500 bg-red-50">
              <div className="text-2xl font-bold text-red-600">&lt; 5%</div>
              <div className="text-sm text-gray-600">传统制造业</div>
              <div className="text-xs text-gray-500 mt-1">零售、餐饮等</div>
            </div>
            <div className="text-center p-4 border-l-4 border-yellow-500 bg-yellow-50">
              <div className="text-2xl font-bold text-yellow-600">5% - 10%</div>
              <div className="text-sm text-gray-600">一般服务业</div>
              <div className="text-xs text-gray-500 mt-1">咨询、物流等</div>
            </div>
            <div className="text-center p-4 border-l-4 border-green-500 bg-green-50">
              <div className="text-2xl font-bold text-green-600">10% - 20%</div>
              <div className="text-sm text-gray-600">科技行业</div>
              <div className="text-xs text-gray-500 mt-1">软件、互联网等</div>
            </div>
            <div className="text-center p-4 border-l-4 border-blue-500 bg-blue-50">
              <div className="text-2xl font-bold text-blue-600">&gt; 20%</div>
              <div className="text-sm text-gray-600">高利润行业</div>
              <div className="text-xs text-gray-500 mt-1">医药、奢侈品等</div>
            </div>
          </div>
        </div>

        {/* 计算公式说明 */}
        <div className="mt-8 bg-purple-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-purple-800 mb-3">计算公式</h3>
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm font-mono text-gray-700 space-y-2">
              <div>毛利润 = 营业收入 - 营业成本</div>
              <div>毛利率 = (毛利润 ÷ 营业收入) × 100%</div>
              <div>税前利润 = 毛利润 - 期间费用</div>
              <div>所得税 = 税前利润 × 所得税率</div>
              <div>净利润 = 税前利润 - 所得税</div>
              <div>净利率 = (净利润 ÷ 营业收入) × 100%</div>
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-pink-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-pink-800 mb-3">使用说明</h3>
          <ol className="list-decimal list-inside space-y-2 text-pink-700">
            <li>输入营业收入和营业成本数据</li>
            <li>填写期间费用（如无费用可填0）</li>
            <li>选择适用的所得税率</li>
            <li>点击"计算净利率"按钮</li>
            <li>查看净利率结果和详细财务分析</li>
            <li>参考行业标准评估盈利能力</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default NetProfitMarginCalculator;