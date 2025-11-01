'use client';

import { useState } from 'react';

const MidAutumnDiceGame = () => {
  const [diceValues, setDiceValues] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);

  const diceRules = {
    '状元插金花': [4, 4, 4, 4, 1, 1], // 四个4，两个1
    '六勃红': [4, 4, 4, 4, 4, 4],     // 六个4
    '六勃黑': [1, 1, 1, 1, 1, 1],     // 六个1
    '五子登科': [4, 4, 4, 4, 4, 2],   // 五个4
    '状元': [4, 4, 4, 4, 1, 2],       // 四个4
    '对堂': [1, 2, 3, 4, 5, 6],       // 顺子
    '三红': [4, 4, 4, 1, 2, 3],       // 三个4
    '四进': [1, 1, 1, 1, 2, 3],       // 四个相同的非4点数
    '二举': [4, 4, 1, 2, 3, 5],       // 两个4
    '一秀': [4, 1, 2, 3, 5, 6],       // 一个4
    '无奖': [1, 2, 3, 5, 6, 6]        // 没有4
  };

  const rollDice = () => {
    setIsRolling(true);
    setResult('');
    
    // 模拟骰子滚动动画
    setTimeout(() => {
      const newDiceValues = Array(6).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
      setDiceValues(newDiceValues);
      
      // 判断结果
      const result = judgeResult(newDiceValues);
      setResult(result);
      setHistory(prev => [result, ...prev.slice(0, 9)]); // 保留最近10条记录
      setIsRolling(false);
    }, 1000);
  };

  const judgeResult = (values: number[]) => {
    const sortedValues = [...values].sort((a, b) => a - b);
    const counts = new Map<number, number>();
    
    values.forEach(value => {
      counts.set(value, (counts.get(value) || 0) + 1);
    });

    const fourCount = counts.get(4) || 0;
    
    // 检查状元插金花
    if (fourCount === 4 && counts.get(1) === 2) return '🎉 状元插金花 - 最大奖！';
    
    // 检查六勃红
    if (fourCount === 6) return '🔥 六勃红 - 超级大奖！';
    
    // 检查六勃黑
    if (counts.get(1) === 6) return '⚫ 六勃黑 - 超级大奖！';
    
    // 检查五子登科
    if (fourCount === 5) return '⭐ 五子登科 - 特大奖！';
    
    // 检查状元
    if (fourCount === 4) return '🏆 状元 - 大奖！';
    
    // 检查对堂（顺子）
    if (JSON.stringify(sortedValues) === JSON.stringify([1, 2, 3, 4, 5, 6])) {
      return '🎯 对堂 - 二等奖！';
    }
    
    // 检查三红
    if (fourCount === 3) return '🔴 三红 - 三等奖！';
    
    // 检查四进
    for (const [value, count] of counts) {
      if (value !== 4 && count === 4) return '📈 四进 - 四等奖！';
    }
    
    // 检查二举
    if (fourCount === 2) return '👍 二举 - 五等奖！';
    
    // 检查一秀
    if (fourCount === 1) return '👏 一秀 - 六等奖！';
    
    return '😢 无奖 - 再接再厉！';
  };

  const getDiceEmoji = (value: number) => {
    const emojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return emojis[value - 1] || '⚀';
  };

  const resetGame = () => {
    setDiceValues([]);
    setResult('');
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">中秋博饼小工具</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            体验传统中秋博饼游戏，掷骰子赢大奖，感受节日氛围
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：游戏区域 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">博饼游戏</h2>
            
            <div className="text-center">
              {/* 骰子展示区域 */}
              <div className="mb-8">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {diceValues.length > 0 ? (
                    diceValues.map((value, index) => (
                      <div 
                        key={index} 
                        className={`text-6xl ${isRolling ? 'animate-bounce' : ''}`}
                      >
                        {getDiceEmoji(value)}
                      </div>
                    ))
                  ) : (
                    Array(6).fill(0).map((_, index) => (
                      <div key={index} className="text-6xl text-gray-300">⚀</div>
                    ))
                  )}
                </div>
                
                {/* 结果展示 */}
                {result && (
                  <div className={`text-2xl font-bold mb-4 ${
                    result.includes('最大奖') ? 'text-yellow-600' :
                    result.includes('超级大奖') ? 'text-red-600' :
                    result.includes('特大奖') ? 'text-purple-600' :
                    result.includes('大奖') ? 'text-blue-600' :
                    result.includes('二等奖') ? 'text-green-600' :
                    'text-gray-600'
                  }`}>
                    {result}
                  </div>
                )}
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={rollDice}
                  disabled={isRolling}
                  className="bg-orange-600 text-white py-3 px-8 rounded-full hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-lg font-semibold"
                >
                  {isRolling ? '🎲 掷骰子中...' : '🎲 开始博饼'}
                </button>
                <button
                  onClick={resetGame}
                  className="bg-gray-600 text-white py-3 px-6 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 text-lg font-semibold"
                >
                  重新开始
                </button>
              </div>
            </div>
          </div>

          {/* 右侧：规则和历史记录 */}
          <div className="space-y-6">
            {/* 游戏规则 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">博饼规则</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                  <span className="font-medium">状元插金花</span>
                  <span className="text-yellow-600 font-bold">最大奖</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <span className="font-medium">六勃红/六勃黑</span>
                  <span className="text-red-600 font-bold">超级大奖</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                  <span className="font-medium">五子登科</span>
                  <span className="text-purple-600 font-bold">特大奖</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <span className="font-medium">状元</span>
                  <span className="text-blue-600 font-bold">大奖</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span className="font-medium">对堂</span>
                  <span className="text-green-600 font-bold">二等奖</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-teal-50 rounded">
                  <span className="font-medium">三红</span>
                  <span className="text-teal-600 font-bold">三等奖</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-indigo-50 rounded">
                  <span className="font-medium">四进</span>
                  <span className="text-indigo-600 font-bold">四等奖</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-pink-50 rounded">
                  <span className="font-medium">二举</span>
                  <span className="text-pink-600 font-bold">五等奖</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">一秀</span>
                  <span className="text-gray-600 font-bold">六等奖</span>
                </div>
              </div>
            </div>

            {/* 历史记录 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">历史记录</h2>
              {history.length > 0 ? (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {history.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">第{history.length - index}次</span>
                      <span className="font-medium">{record}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  暂无记录，开始博饼吧！
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 中秋文化介绍 */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">中秋博饼文化</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-orange-600 mb-2">🎑 起源传说</h3>
              <p className="text-gray-600 text-sm">
                中秋博饼起源于厦门，相传是郑成功屯兵时为解士兵思乡之情而发明的游戏，
                后逐渐成为闽南地区中秋节的特色民俗活动。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-orange-600 mb-2">🎯 游戏意义</h3>
              <p className="text-gray-600 text-sm">
                博饼不仅是娱乐活动，更蕴含着人们对美好生活的向往和祝福，
                象征着团圆、吉祥和丰收的寓意。
              </p>
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 bg-orange-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-orange-800 mb-3">使用说明</h3>
          <ol className="list-decimal list-inside space-y-2 text-orange-700">
            <li>点击"开始博饼"按钮掷出六个骰子</li>
            <li>系统会根据骰子点数自动判断博饼结果</li>
            <li>查看右侧的历史记录了解您的博饼成绩</li>
            <li>点击"重新开始"可以清空记录重新游戏</li>
            <li>了解不同奖项对应的骰子组合规则</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default MidAutumnDiceGame;