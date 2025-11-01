'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'

// 以色列地址生成器详情页面
export default function IsraelAddressGeneratorPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const [generationCount, setGenerationCount] = useState(10)
  const [genderOption, setGenderOption] = useState<'random' | 'male' | 'female'>('random')
  const [generatedData, setGeneratedData] = useState<any[]>([])
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json')

  // 以色列城市数据
  const israelCities = [
    { name: '特拉维夫', hebrew: 'תל אביב', zipCode: '61000' },
    { name: '耶路撒冷', hebrew: 'ירושלים', zipCode: '91000' },
    { name: '海法', hebrew: 'חיפה', zipCode: '31000' },
    { name: '里雄莱锡安', hebrew: 'ראשון לציון', zipCode: '75000' },
    { name: '佩塔提克瓦', hebrew: 'פתח תקווה', zipCode: '49000' },
    { name: '贝尔谢巴', hebrew: 'באר שבע', zipCode: '84000' },
    { name: '内坦亚', hebrew: 'נתניה', zipCode: '42000' },
    { name: '霍隆', hebrew: 'חולון', zipCode: '58000' },
    { name: '贝特谢梅什', hebrew: 'בית שמש', zipCode: '99000' },
    { name: '阿什杜德', hebrew: 'אשדוד', zipCode: '77000' }
  ]

  // 以色列姓氏和名字
  const israeliNames = {
    male: {
      firstNames: ['David', 'Moshe', 'Yosef', 'Yakov', 'Avraham', 'Daniel', 'Itzhak', 'Shlomo', 'Ariel', 'Eliyahu'],
      lastNames: ['Cohen', 'Levi', 'Mizrahi', 'Peretz', 'Friedman', 'Katz', 'Shapiro', 'Goldberg', 'Weiss', 'Stein']
    },
    female: {
      firstNames: ['Sarah', 'Rachel', 'Leah', 'Miriam', 'Rivka', 'Esther', 'Tamar', 'Naomi', 'Hannah', 'Yael'],
      lastNames: ['Cohen', 'Levi', 'Mizrahi', 'Peretz', 'Friedman', 'Katz', 'Shapiro', 'Goldberg', 'Weiss', 'Stein']
    }
  }

  // 以色列街道名称
  const israeliStreets = [
    'Dizengoff Street', 'Rothschild Boulevard', 'Allenby Street', 'King George Street',
    'Ben Yehuda Street', 'Herzl Street', 'Jabotinsky Street', 'Haifa Road',
    'Yafo Street', 'Sderot Chen', 'HaShalom Road', 'HaNeviim Street'
  ]

  // 生成随机以色列手机号
  const generateIsraeliPhone = () => {
    const prefixes = ['050', '052', '053', '054', '055', '058']
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    const number = Math.floor(1000000 + Math.random() * 9000000)
    return `+972 ${prefix} ${number.toString().slice(0, 3)} ${number.toString().slice(3)}`
  }

  // 生成随机邮箱
  const generateEmail = (firstName: string, lastName: string) => {
    const domains = ['gmail.com', 'walla.co.il', '012.net.il', 'bezeqint.net', 'netvision.net.il']
    const domain = domains[Math.floor(Math.random() * domains.length)]
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`
  }

  // 生成随机出生日期
  const generateBirthDate = () => {
    const start = new Date(1970, 0, 1)
    const end = new Date(2000, 0, 1)
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    return date.toLocaleDateString('he-IL')
  }

  // 生成随机以色列地址
  const generateIsraeliAddress = () => {
    const city = israelCities[Math.floor(Math.random() * israelCities.length)]
    const street = israeliStreets[Math.floor(Math.random() * israeliStreets.length)]
    const building = Math.floor(Math.random() * 200) + 1
    const apartment = Math.floor(Math.random() * 50) + 1
    
    return {
      street: `${street} ${building}`,
      apartment: `Apartment ${apartment}`,
      city: city.name,
      hebrewCity: city.hebrew,
      zipCode: city.zipCode,
      country: 'Israel'
    }
  }

  // 生成以色列身份数据
  const generateIsraeliIdentity = () => {
    const gender = genderOption === 'random' 
      ? (Math.random() > 0.5 ? 'male' : 'female')
      : genderOption
    
    const names = israeliNames[gender]
    const firstName = names.firstNames[Math.floor(Math.random() * names.firstNames.length)]
    const lastName = names.lastNames[Math.floor(Math.random() * names.lastNames.length)]
    
    const address = generateIsraeliAddress()
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      gender: gender === 'male' ? 'Male' : 'Female',
      birthDate: generateBirthDate(),
      phone: generateIsraeliPhone(),
      email: generateEmail(firstName, lastName),
      address: `${address.street}, ${address.apartment}`,
      city: address.city,
      hebrewCity: address.hebrewCity,
      zipCode: address.zipCode,
      country: address.country,
      fullAddress: `${address.street}, ${address.apartment}, ${address.city}, ${address.zipCode}, ${address.country}`
    }
  }

  // 生成数据
  const generateData = () => {
    const data = []
    for (let i = 0; i < generationCount; i++) {
      data.push(generateIsraeliIdentity())
    }
    setGeneratedData(data)
  }

  // 导出数据
  const exportData = () => {
    if (exportFormat === 'json') {
      const dataStr = JSON.stringify(generatedData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'israel_addresses.json'
      link.click()
    } else {
      // CSV导出
      const headers = ['Name', 'Gender', 'Birth Date', 'Phone', 'Email', 'Full Address']
      const csvData = generatedData.map(item => [
        item.name,
        item.gender,
        item.birthDate,
        item.phone,
        item.email,
        item.fullAddress
      ])
      
      const csvContent = [headers, ...csvData]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n')
      
      const dataBlob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'israel_addresses.csv'
      link.click()
    }
  }

  // 清空数据
  const clearData = () => {
    setGeneratedData([])
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            以色列地址生成器
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            快速生成符合以色列本地格式的真实地址数据，包含完整街道、城市、邮编信息，同时支持生成配套的虚拟身份数据。
          </p>
        </div>

        {/* 生成设置 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">生成设置</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">生成数量</label>
              <select
                value={generationCount}
                onChange={(e) => setGenerationCount(parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[1, 5, 10, 20, 50, 100].map(num => (
                  <option key={num} value={num}>最多{num}条</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">性别选项</label>
              <select
                value={genderOption}
                onChange={(e) => setGenderOption(e.target.value as 'random' | 'male' | 'female')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="random">随机性别</option>
                <option value="male">男性</option>
                <option value="female">女性</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">导出格式</label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as 'json' | 'csv')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-4 mt-6">
            <button
              onClick={generateData}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              生成数据
            </button>
            {generatedData.length > 0 && (
              <button
                onClick={exportData}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                导出数据
              </button>
            )}
            {generatedData.length > 0 && (
              <button
                onClick={clearData}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                清空数据
              </button>
            )}
          </div>
        </div>

        {/* 生成结果 */}
        {generatedData.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">生成结果</h2>
              <span className="text-sm text-gray-500">共 {generatedData.length} 条数据</span>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {generatedData.map((item, index) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">姓名</span>
                      <p className="text-gray-900">{item.name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">性别</span>
                      <p className="text-gray-900">{item.gender}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">出生日期</span>
                      <p className="text-gray-900">{item.birthDate}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">手机</span>
                      <p className="text-gray-900">{item.phone}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">邮箱</span>
                      <p className="text-gray-900">{item.email}</p>
                    </div>
                    <div className="md:col-span-2 lg:col-span-3">
                      <span className="text-sm font-medium text-gray-500">地址</span>
                      <p className="text-gray-900">{item.fullAddress}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 功能特性 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🇮🇱</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">以色列本地化</h3>
            <p className="text-gray-600 text-sm">生成符合以色列格式的身份信息，包括姓名、地址、手机号等</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔢</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">批量生成</h3>
            <p className="text-gray-600 text-sm">一次性最多可生成100个身份数据，满足测试需求</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">性别选择</h3>
            <p className="text-gray-600 text-sm">支持选择生成男性、女性或随机性别的身份数据</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📄</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">多种导出格式</h3>
            <p className="text-gray-600 text-sm">支持导出为 JSON 和 CSV 文件，兼容各种应用场景</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">隐私优先</h3>
            <p className="text-gray-600 text-sm">所有数据生成均在浏览器本地完成，不向服务器发送任何信息</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">移动端友好</h3>
            <p className="text-gray-600 text-sm">在所有设备上完美运行，包括桌面、平板和手机</p>
          </div>
        </div>

        {/* 适用场景 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">适用场景</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍💻</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">开发者和测试人员</h4>
              <p className="text-gray-600 text-sm">在开发和测试阶段，快速生成大量符合以色列格式的身份数据</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌍</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">国际化应用</h4>
              <p className="text-gray-600 text-sm">为需要支持以色列本地化的应用提供符合当地格式的测试数据</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎓</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">教育和培训</h4>
              <p className="text-gray-600 text-sm">在教学或演示需要以色列身份数据的场景时，提供安全、虚构的数据样本</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">注重隐私的用户</h4>
              <p className="text-gray-600 text-sm">在需要以色列身份信息的场景中，使用随机生成的数据，避免泄露真实个人信息</p>
            </div>
          </div>
        </div>

        {/* 常见问题 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">常见问题</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">这个工具生成的数据是真实的吗？</h4>
              <p className="text-gray-600 text-sm">
                不是，所有生成的数据都是完全虚拟的，仅用于测试和演示目的。这些数据符合以色列本地格式，但都是随机生成的，与真实个人无关。
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">可以用于哪些场景？</h4>
              <p className="text-gray-600 text-sm">
                适用于：表单测试、数据库填充、API测试、UI设计演示、教育培训、软件开发等场景。特别适合需要以色列本地化数据的开发者。
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">数据会存储吗？</h4>
              <p className="text-gray-600 text-sm">
                不会，所有数据都在您的浏览器中生成，不会上传到服务器。您可以使用导出功能将数据保存到本地。
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">地址格式准确吗？</h4>
              <p className="text-gray-600 text-sm">
                是的，地址格式严格按照以色列标准：街道地址 + 城市 + 邮政编码 + 以色列。包含以色列主要城市的真实数据。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}