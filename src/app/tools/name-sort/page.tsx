'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// 常见姓氏笔画数据（简化版）
const surnameStrokes: Record<string, number> = {
  '赵': 9, '钱': 10, '孙': 6, '李': 7, '周': 8, '吴': 7, '郑': 8, '王': 4,
  '冯': 5, '陈': 7, '褚': 13, '卫': 3, '蒋': 12, '沈': 7, '韩': 12, '杨': 7,
  '朱': 6, '秦': 10, '尤': 4, '许': 6, '何': 7, '吕': 6, '施': 9, '张': 7,
  '孔': 4, '曹': 11, '严': 7, '华': 6, '金': 8, '魏': 17, '陶': 10, '姜': 9,
  '戚': 11, '谢': 12, '邹': 7, '喻': 12, '柏': 9, '水': 4, '窦': 13, '章': 11,
  '云': 4, '苏': 7, '潘': 15, '葛': 12, '奚': 10, '范': 8, '彭': 12, '郎': 8,
  '鲁': 12, '韦': 4, '昌': 8, '马': 3, '苗': 8, '凤': 4, '花': 7, '方': 4,
  '俞': 9, '任': 6, '袁': 10, '柳': 9, '酆': 20, '鲍': 13, '史': 5, '唐': 10,
  '费': 9, '廉': 13, '岑': 7, '薛': 16, '雷': 13, '贺': 9, '倪': 10, '汤': 6,
  '滕': 15, '殷': 10, '罗': 8, '毕': 6, '郝': 9, '邬': 6, '安': 6, '常': 11,
  '乐': 5, '于': 3, '时': 7, '傅': 12, '皮': 5, '卞': 4, '齐': 6, '康': 11,
  '伍': 6, '余': 7, '元': 4, '卜': 2, '顾': 10, '孟': 8, '平': 5, '黄': 12,
  '和': 8, '穆': 16, '萧': 11, '尹': 4, '姚': 9, '邵': 7, '湛': 12, '汪': 7,
  '祁': 6, '毛': 4, '禹': 9, '狄': 7, '米': 6, '贝': 4, '明': 8, '臧': 14,
  '计': 4, '伏': 6, '成': 6, '戴': 17, '谈': 10, '宋': 7, '茅': 8, '庞': 8,
  '熊': 14, '纪': 6, '舒': 12, '屈': 8, '项': 9, '祝': 9, '董': 12, '梁': 11,
  '杜': 7, '阮': 6, '蓝': 13, '闵': 7, '席': 10, '季': 8, '麻': 11, '强': 11,
  '贾': 10, '路': 13, '娄': 9, '危': 6, '江': 6, '童': 12, '颜': 15, '郭': 10,
  '梅': 11, '盛': 11, '林': 8, '刁': 2, '钟': 9, '徐': 10, '邱': 7, '骆': 9,
  '高': 10, '夏': 10, '蔡': 14, '田': 5, '樊': 15, '胡': 9, '凌': 10, '霍': 16,
  '虞': 13, '万': 3, '支': 4, '柯': 9, '昝': 9, '管': 14, '卢': 5, '莫': 10,
  '经': 8, '房': 8, '裘': 13, '缪': 14, '干': 3, '解': 13, '应': 7, '宗': 8,
  '丁': 2, '宣': 9, '贲': 9, '邓': 4, '郁': 8, '单': 8, '杭': 8, '洪': 9,
  '包': 5, '诸': 10, '左': 5, '石': 5, '崔': 11, '吉': 6, '钮': 9, '龚': 11,
  '程': 12, '嵇': 12, '邢': 6, '滑': 12, '裴': 14, '陆': 7, '荣': 9, '翁': 10,
  '荀': 9, '羊': 6, '於': 8, '惠': 12, '甄': 13, '曲': 6, '家': 10, '封': 9,
  '芮': 7, '羿': 9, '储': 12, '靳': 13, '汲': 6, '邴': 7, '糜': 17, '松': 8,
  '井': 4, '段': 9, '富': 12, '巫': 7, '乌': 4, '焦': 12, '巴': 4, '弓': 3,
  '牧': 8, '隗': 11, '山': 3, '谷': 7, '车': 4, '侯': 9, '宓': 8, '蓬': 13,
  '全': 6, '郗': 9, '班': 10, '仰': 6, '秋': 9, '仲': 6, '伊': 6, '宫': 9,
  '宁': 5, '仇': 4, '栾': 10, '暴': 15, '甘': 5, '钭': 9, '厉': 5, '戎': 6,
  '祖': 9, '武': 8, '符': 11, '刘': 6, '景': 12, '詹': 13, '束': 7, '龙': 5,
  '叶': 5, '幸': 8, '司': 5, '韶': 14, '郜': 9, '黎': 15, '蓟': 13, '薄': 16,
  '印': 6, '宿': 11, '白': 5, '怀': 7, '蒲': 13, '邰': 7, '从': 4, '鄂': 11,
  '索': 10, '咸': 9, '籍': 20, '赖': 13, '卓': 8, '蔺': 14, '屠': 11, '蒙': 13,
  '池': 6, '乔': 6, '阴': 6, '鬱': 29, '胥': 9, '能': 10, '苍': 7, '双': 4,
  '闻': 9, '莘': 10, '党': 10, '翟': 14, '谭': 14, '贡': 7, '劳': 7, '逄': 9,
  '姬': 10, '申': 5, '扶': 7, '堵': 11, '冉': 5, '宰': 10, '郦': 9, '雍': 13,
  '卻': 9, '璩': 17, '桑': 10, '桂': 10, '濮': 17, '牛': 4, '寿': 7, '通': 10,
  '边': 5, '扈': 11, '燕': 16, '冀': 16, '郏': 8, '浦': 10, '尚': 8, '农': 6,
  '温': 12, '别': 7, '庄': 6, '晏': 10, '柴': 10, '瞿': 18, '阎': 11, '充': 6,
  '慕': 14, '连': 7, '茹': 9, '习': 3, '宦': 9, '艾': 5, '鱼': 8, '容': 10,
  '向': 6, '古': 5, '易': 8, '慎': 13, '戈': 4, '廖': 14, '庾': 11, '终': 8,
  '暨': 14, '居': 8, '衡': 16, '步': 7, '都': 10, '耿': 10, '满': 13, '弘': 5,
  '匡': 6, '国': 8, '文': 4, '寇': 11, '广': 3, '禄': 12, '阙': 13, '东': 5,
  '欧': 8, '殳': 4, '沃': 7, '利': 7, '蔚': 14, '越': 12, '夔': 21, '隆': 11,
  '师': 6, '巩': 6, '厍': 6, '聂': 10, '晁': 10, '勾': 4, '敖': 10, '融': 16,
  '冷': 7, '訾': 13, '辛': 7, '阚': 14, '那': 6, '简': 13, '饶': 9, '空': 8,
  '曾': 12, '毋': 4, '沙': 7, '乜': 2, '养': 9, '鞠': 17, '须': 9, '丰': 4,
  '巢': 11, '关': 6, '蒯': 13, '相': 9, '查': 9, '后': 6, '荆': 9, '红': 6,
  '游': 12, '竺': 8, '权': 22, '逯': 11, '盖': 11, '益': 10, '桓': 10, '公': 4,
  '万俟': 12, '司马': 9, '上官': 9, '欧阳': 16, '夏侯': 19, '诸葛': 15, '闻人': 11, '东方': 8,
  '赫连': 22, '皇甫': 13, '尉迟': 21, '公羊': 10, '澹台': 17, '公冶': 11, '宗政': 14, '濮阳': 21,
  '淳于': 16, '单于': 11, '太叔': 11, '申屠': 15, '公孙': 10, '仲孙': 16, '轩辕': 17, '令狐': 11,
  '钟离': 21, '宇文': 10, '长孙': 15, '慕容': 21, '司徒': 13, '司空': 10
};

export default function NameSort() {
  const [inputNames, setInputNames] = useState('');
  const [sortedNames, setSortedNames] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const getStrokeCount = (name: string): number => {
    // 如果是复姓，优先查找复姓的笔画
    if (name.length >= 2 && surnameStrokes[name]) {
      return surnameStrokes[name];
    }
    
    // 单姓，取第一个字的笔画
    const firstChar = name.charAt(0);
    return surnameStrokes[firstChar] || 0;
  };

  const sortNames = () => {
    const names = inputNames
      .split(/[\n,，;；\s]+/)
      .filter(name => name.trim())
      .map(name => name.trim());

    const sorted = names.sort((a, b) => {
      const strokesA = getStrokeCount(a);
      const strokesB = getStrokeCount(b);
      
      if (strokesA === strokesB) {
        // 笔画相同，按拼音排序
        return a.localeCompare(b, 'zh-CN');
      }
      
      return sortOrder === 'asc' ? strokesA - strokesB : strokesB - strokesA;
    });

    setSortedNames(sorted);
  };

  const clearNames = () => {
    setInputNames('');
    setSortedNames([]);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sortedNames.join('\n'));
      alert('排序结果已复制到剪贴板！');
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">按姓氏笔画排列顺序工具</h1>
        <p className="text-muted-foreground">
          根据姓氏的笔画数对姓名进行排序，支持单姓和复姓
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>输入姓名</CardTitle>
            <CardDescription>请输入需要排序的姓名，每行一个或用逗号分隔</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="input-names">姓名列表</Label>
                <Textarea
                  id="input-names"
                  value={inputNames}
                  onChange={(e) => setInputNames(e.target.value)}
                  placeholder="请输入姓名，每行一个或用逗号分隔...\n例如：\n张三\n李四\n王五"
                  rows={8}
                  className="mt-2"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={clearNames} variant="outline">
                  清空
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>排序结果</CardTitle>
            <CardDescription>按姓氏笔画排序后的结果</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="output-names">排序结果</Label>
                <Textarea
                  id="output-names"
                  value={sortedNames.join('\n')}
                  readOnly
                  rows={8}
                  className="mt-2 bg-muted"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} disabled={sortedNames.length === 0}>
                  复制结果
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>排序设置</CardTitle>
          <CardDescription>选择排序方式和顺序</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <Label htmlFor="sort-order">排序顺序</Label>
              <Select value={sortOrder} onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="选择排序顺序" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">笔画少到多（升序）</SelectItem>
                  <SelectItem value="desc">笔画多到少（降序）</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-6">
              <Button onClick={sortNames} disabled={!inputNames.trim()}>
                开始排序
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• 支持单姓和常见复姓的笔画排序</p>
            <p>• 输入格式：每行一个姓名，或用逗号、分号分隔</p>
            <p>• 排序规则：先按姓氏笔画数排序，笔画相同则按拼音排序</p>
            <p>• 支持升序（笔画少到多）和降序（笔画多到少）排序</p>
            <p>• 目前支持常见姓氏笔画数据，如需添加特殊姓氏请联系管理员</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>常见姓氏笔画参考</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">1-5画</h4>
              <div className="space-y-1 text-muted-foreground">
                <p>丁(2) 卜(2) 乜(2) 刁(2) 万(3) 卫(3) 马(3) 于(3)</p>
                <p>王(4) 尤(4) 孔(4) 方(4) 毛(4) 牛(4) 文(4)</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">6-8画</h4>
              <div className="space-y-1 text-muted-foreground">
                <p>朱(6) 刘(6) 孙(6) 许(6) 吕(6) 任(6) 江(6)</p>
                <p>李(7) 吴(7) 沈(7) 何(7) 张(7) 陈(7) 杨(7)</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">9-12画</h4>
              <div className="space-y-1 text-muted-foreground">
                <p>赵(9) 施(9) 姜(9) 姚(9) 胡(9) 钟(9) 徐(10)</p>
                <p>秦(10) 袁(10) 贾(10) 郭(10) 高(10) 黄(12)</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">13画以上</h4>
              <div className="space-y-1 text-muted-foreground">
                <p>褚(13) 窦(13) 雷(13) 熊(14) 蔡(14) 谭(14)</p>
                <p>薛(16) 戴(17) 魏(17) 庞(18) 瞿(18) 皇甫(13)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}