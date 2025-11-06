'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'

export default function PrivacyPolicy() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {language === 'zh-CN' ? '隐私政策' : 'Privacy Policy'}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            {/* 概述 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '1. 概述' : '1. Overview'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '欢迎使用星点工具箱（"我们"、"我们的"或"本服务"）。我们非常重视您的隐私，并致力于保护您的个人信息。本隐私政策说明了我们如何收集、使用、存储和保护您在使用我们服务时的信息。' : 
                 'Welcome to StarDot Tools ("we", "our" or "the Service"). We take your privacy seriously and are committed to protecting your personal information. This privacy policy explains how we collect, use, store and protect your information when you use our services.'}
              </p>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '通过使用我们的服务，您同意本隐私政策中描述的信息收集和使用方式。' : 
                 'By using our services, you agree to the information collection and usage practices described in this privacy policy.'}
              </p>
            </section>

            {/* 收集的信息 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '2. 我们收集的信息' : '2. Information We Collect'}
              </h2>
              
              <h3 className="text-xl font-medium text-gray-700 mb-3">
                {language === 'zh-CN' ? '2.1 自动收集的信息' : '2.1 Automatically Collected Information'}
              </h3>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• {language === 'zh-CN' ? '设备信息（浏览器类型、操作系统、设备型号）' : 
                    'Device information (browser type, operating system, device model)'}</li>
                <li>• {language === 'zh-CN' ? '使用数据（访问时间、页面浏览、功能使用情况）' : 
                    'Usage data (access time, page views, feature usage)'}</li>
                <li>• {language === 'zh-CN' ? '技术信息（IP地址、Cookie、本地存储）' : 
                    'Technical information (IP address, cookies, local storage)'}</li>
                <li>• {language === 'zh-CN' ? '性能数据（页面加载时间、错误日志）' : 
                    'Performance data (page load time, error logs)'}</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3">
                {language === 'zh-CN' ? '2.2 您主动提供的信息' : '2.2 Information You Provide'}
              </h3>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• {language === 'zh-CN' ? '反馈和建议' : 
                    'Feedback and suggestions'}</li>
                <li>• {language === 'zh-CN' ? '错误报告' : 
                    'Error reports'}</li>
                <li>• {language === 'zh-CN' ? '联系信息（如果您选择联系我们）' : 
                    'Contact information (if you choose to contact us)'}</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3">
                {language === 'zh-CN' ? '2.3 工具使用数据' : '2.3 Tool Usage Data'}
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 font-medium">
                  {language === 'zh-CN' ? '重要说明：我们的所有工具都在您的浏览器本地运行。您输入到工具中的数据（如文本、图片、文件等）不会被发送到我们的服务器，也不会被存储或收集。所有处理都在您的设备上完成，确保您的数据隐私。' : 
                   'Important: All our tools run locally in your browser. The data you input into the tools (such as text, images, files, etc.) is not sent to our servers, stored or collected. All processing is done on your device, ensuring your data privacy.'}
                </p>
              </div>
            </section>

            {/* 信息使用方式 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '3. 信息使用方式' : '3. How We Use Information'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '我们使用收集的信息用于：' : 
                 'We use the collected information for:'}
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• {language === 'zh-CN' ? '提供和维护我们的服务' : 
                    'Providing and maintaining our services'}</li>
                <li>• {language === 'zh-CN' ? '改进用户体验和服务质量' : 
                    'Improving user experience and service quality'}</li>
                <li>• {language === 'zh-CN' ? '分析使用模式和趋势' : 
                    'Analyzing usage patterns and trends'}</li>
                <li>• {language === 'zh-CN' ? '检测和防止技术问题' : 
                    'Detecting and preventing technical issues'}</li>
                <li>• {language === 'zh-CN' ? '回应用户询问和提供支持' : 
                    'Responding to user inquiries and providing support'}</li>
                <li>• {language === 'zh-CN' ? '发送重要的服务通知' : 
                    'Sending important service notifications'}</li>
              </ul>
            </section>

            {/* Cookie和跟踪技术 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '4. Cookie和跟踪技术' : '4. Cookies and Tracking Technologies'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '我们使用Cookie和类似技术来：' : 
                 'We use cookies and similar technologies to:'}
              </p>
              <ul className="text-gray-600 mb-4 space-y-2">
                <li>• {language === 'zh-CN' ? '记住您的偏好设置（如主题、语言）' : 
                    'Remember your preferences (such as theme, language)'}</li>
                <li>• {language === 'zh-CN' ? '分析网站使用情况' : 
                    'Analyze website usage'}</li>
                <li>• {language === 'zh-CN' ? '提供个性化体验' : 
                    'Provide personalized experience'}</li>
                <li>• {language === 'zh-CN' ? '确保网站安全性' : 
                    'Ensure website security'}</li>
              </ul>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '您可以通过浏览器设置控制Cookie的使用，但这可能会影响某些功能的正常使用。' : 
                 'You can control cookie usage through browser settings, but this may affect the normal use of certain features.'}
              </p>
            </section>

            {/* 信息共享 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '5. 信息共享' : '5. Information Sharing'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '我们不会出售、交易或租赁您的个人信息给第三方。我们可能在以下情况下共享信息：' : 
                 'We do not sell, trade or rent your personal information to third parties. We may share information in the following situations:'}
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• {language === 'zh-CN' ? '获得您的明确同意' : 
                    'With your explicit consent'}</li>
                <li>• {language === 'zh-CN' ? '遵守法律要求或法院命令' : 
                    'To comply with legal requirements or court orders'}</li>
                <li>• {language === 'zh-CN' ? '保护我们的权利、财产或安全' : 
                    'To protect our rights, property or safety'}</li>
                <li>• {language === 'zh-CN' ? '与可信的服务提供商合作（如分析服务）' : 
                    'Working with trusted service providers (such as analytics services)'}</li>
              </ul>
            </section>

            {/* 数据安全 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '6. 数据安全' : '6. Data Security'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '我们采取合理的技术和组织措施来保护您的信息：' : 
                 'We take reasonable technical and organizational measures to protect your information:'}
              </p>
              <ul className="text-gray-600 mb-4 space-y-2">
                <li>• {language === 'zh-CN' ? '使用HTTPS加密传输' : 
                    'Using HTTPS encryption for transmission'}</li>
                <li>• {language === 'zh-CN' ? '定期安全审查和更新' : 
                    'Regular security reviews and updates'}</li>
                <li>• {language === 'zh-CN' ? '限制员工访问权限' : 
                    'Restricting employee access rights'}</li>
                <li>• {language === 'zh-CN' ? '安全的数据存储和处理' : 
                    'Secure data storage and processing'}</li>
              </ul>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '虽然我们努力保护您的信息，但请注意，没有任何互联网传输或存储方法是100%安全的。' : 
                 'While we strive to protect your information, please note that no method of internet transmission or storage is 100% secure.'}
              </p>
            </section>

            {/* 您的权利 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '7. 您的权利' : '7. Your Rights'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '您有权：' : 'You have the right to:'}
              </p>
              <ul className="text-gray-600 mb-4 space-y-2">
                <li>• {language === 'zh-CN' ? '访问我们持有的关于您的信息' : 
                    'Access information we hold about you'}</li>
                <li>• {language === 'zh-CN' ? '要求更正不准确的信息' : 
                    'Request correction of inaccurate information'}</li>
                <li>• {language === 'zh-CN' ? '要求删除您的个人信息' : 
                    'Request deletion of your personal information'}</li>
                <li>• {language === 'zh-CN' ? '反对或限制信息处理' : 
                    'Object to or restrict information processing'}</li>
                <li>• {language === 'zh-CN' ? '数据可携带性' : 
                    'Data portability'}</li>
                <li>• {language === 'zh-CN' ? '撤回同意' : 
                    'Withdraw consent'}</li>
              </ul>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '如需行使这些权利，请通过下方联系方式与我们联系。' : 
                 'To exercise these rights, please contact us using the contact information below.'}
              </p>
            </section>

            {/* 联系我们 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '8. 联系我们' : '8. Contact Us'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '如果您对本隐私政策有任何问题或疑虑，请通过以下方式联系我们：' : 
                 'If you have any questions or concerns about this privacy policy, please contact us at:'}
              </p>
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-gray-700">
                   <strong>{language === 'zh-CN' ? '邮箱：' : 'Email: '}</strong>
                   privacy@stardottools.top
                 </p>
                 <p className="text-gray-700">
                   <strong>{language === 'zh-CN' ? '网站：' : 'Website: '}</strong>
                   https://stardottools.top
                 </p>
              </div>
            </section>

            {/* 政策更新 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '9. 政策更新' : '9. Policy Updates'}
              </h2>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '我们可能会不时更新本隐私政策。重大变更将通过在网站上发布新的隐私政策来通知您。建议您定期查看本页面以了解任何变更。' : 
                 'We may update this privacy policy from time to time. Significant changes will be notified by posting a new privacy policy on the website. We recommend that you check this page regularly for any changes.'}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}