'use client';

import { useState } from 'react';

type TaxType = 'personal-income' | 'vat' | 'business-tax' | 'property-tax';
type IncomeLevel = 'low' | 'medium' | 'high' | 'very-high';

const taxRates = {
  'personal-income': [
    { level: 'low', range: '0-5000', rate: 0.03 },
    { level: 'medium', range: '5001-8000', rate: 0.1 },
    { level: 'high', range: '8001-17000', rate: 0.2 },
    { level: 'very-high', range: '17001-30000', rate: 0.25 },
  ],
  'vat': [
    { level: 'low', range: '标准税率', rate: 0.13 },
    { level: 'medium', range: '低税率', rate: 0.09 },
    { level: 'high', range: '零税率', rate: 0 },
  ],
  'business-tax': [
    { level: 'low', range: '小规模纳税人', rate: 0.03 },
    { level: 'medium', range: '一般纳税人', rate: 0.06 },
  ],
  'property-tax': [
    { level: 'low', range: '首套房', rate: 0.01 },
    { level: 'medium', range: '二套房', rate: 0.02 },
    { level: 'high', range: '三套及以上', rate: 0.03 },
  ],
};

export default function TaxCalculator() {
  const [taxType, setTaxType] = useState<TaxType>('personal-income');
  const [amount, setAmount] = useState<number>(0);
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [netAmount, setNetAmount] = useState<number>(0);

  const calculateTax = () => {
    let tax = 0;
    
    switch (taxType) {
      case 'personal-income':
        if (amount <= 5000) tax = amount * 0.03;
        else if (amount <= 8000) tax = amount * 0.1;
        else if (amount <= 17000) tax = amount * 0.2;
        else tax = amount * 0.25;
        break;
      case 'vat':
        tax = amount * 0.13; // 标准增值税率
        break;
      case 'business-tax':
        tax = amount * 0.06; // 一般纳税人营业税率
        break;
      case 'property-tax':
        tax = amount * 0.01; // 首套房房产税率
        break;
    }
    
    setTaxAmount(parseFloat(tax.toFixed(2)));
    setNetAmount(parseFloat((amount - tax).toFixed(2)));
  };

  const getTaxDescription = () => {
    const descriptions = {
      'personal-income': '个人所得税计算，适用于工资薪金所得',
      'vat': '增值税计算，适用于商品销售和服务提供',
      'business-tax': '营业税计算，适用于企业经营活动',
      'property-tax': '房产税计算，适用于房产交易和持有',
    };
    return descriptions[taxType];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">税率计算器</h1>
          <p className="text-lg text-gray-600">快速计算个人所得税、增值税、营业税、房产税等多种税种的应纳税额</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 输入区域 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">计算设置</h2>
            
            <div className="space-y-4">
              {/* 税种选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">选择税种</label>
                <select 
                  value={taxType}
                  onChange={(e) => setTaxType(e.target.value as TaxType)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="personal-income">个人所得税</option>
                  <option value="vat">增值税</option>
                  <option value="business-tax">营业税</option>
                  <option value="property-tax">房产税</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">{getTaxDescription()}</p>
              </div>

              {/* 金额输入 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {taxType === 'personal-income' ? '月收入金额 (元)' : 
                   taxType === 'property-tax' ? '房产价值 (元)' : '应税金额 (元)'}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入金额"
                />
              </div>

              {/* 计算按钮 */}
              <button
                onClick={calculateTax}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
              >
                计算税额
              </button>
            </div>

            {/* 税率参考表 */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">税率参考表</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2">
                  {taxRates[taxType].map((rate, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{rate.range}</span>
                      <span className="font-medium text-blue-600">{(rate.rate * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 结果展示区域 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">计算结果</h2>
            
            {taxAmount > 0 ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">应税金额</span>
                    <span className="text-lg font-bold text-green-600">¥{amount.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">应纳税额</span>
                    <span className="text-lg font-bold text-red-600">¥{taxAmount.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">税后金额</span>
                    <span className="text-lg font-bold text-blue-600">¥{netAmount.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="text-center">
                    <span className="text-sm text-gray-600">实际税率</span>
                    <div className="text-2xl font-bold text-yellow-600">
                      {((taxAmount / amount) * 100).toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 text-6xl mb-4">🧮</div>
                <p className="text-gray-500">请输入金额并点击计算按钮查看结果</p>
              </div>
            )}
          </div>
        </div>

        {/* 功能特性 */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-800 mb-2">多种税种</h3>
            <p className="text-gray-600 text-sm">支持个人所得税、增值税、营业税、房产税等常见税种计算</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">快速计算</h3>
            <p className="text-gray-600 text-sm">实时计算税额，立即显示应纳税额和税后金额</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="font-semibold text-gray-800 mb-2">税率参考</h3>
            <p className="text-gray-600 text-sm">提供详细的税率参考表，帮助您了解不同收入区间的税率</p>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">使用说明</h2>
          <div className="space-y-3 text-gray-600">
            <p>1. 选择您需要计算的税种类型</p>
            <p>2. 输入相应的金额（月收入、应税金额或房产价值）</p>
            <p>3. 点击"计算税额"按钮获取计算结果</p>
            <p>4. 查看应纳税额、税后金额和实际税率</p>
            <p className="text-sm text-gray-500 mt-4">注意：本计算器提供的税率仅供参考，实际纳税请以当地税务部门的规定为准。</p>
          </div>
        </div>
      </div>
    </div>
  );
}