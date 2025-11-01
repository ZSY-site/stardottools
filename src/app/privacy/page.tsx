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
            {language === 'zh-CN' ? '隐私政策' : 
             language === 'zh-HK' ? '隱私政策' : 'Privacy Policy'}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            {/* 概述 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '1. 概述' : 
                 language === 'zh-HK' ? '1. 概述' : '1. Overview'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '欢迎使用星点工具箱（"我们"、"我们的"或"本服务"）。我们非常重视您的隐私，并致力于保护您的个人信息。本隐私政策说明了我们如何收集、使用、存储和保护您在使用我们服务时的信息。' : 
                  language === 'zh-HK' ? '歡迎使用星點工具箱（"我哋"、"我哋嘅"或"本服務"）。我哋非常重視您嘅隱私，並致力於保護您嘅個人信息。本隱私政策說明咗我哋如何收集、使用、存儲同保護您在使用我哋服務時嘅信息。' : 
                 'Welcome to StarDot Tools ("we", "our" or "the Service"). We take your privacy seriously and are committed to protecting your personal information. This privacy policy explains how we collect, use, store and protect your information when you use our services.'}
              </p>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '通过使用我们的服务，您同意本隐私政策中描述的信息收集和使用方式。' : 
                 language === 'zh-HK' ? '通過使用我哋嘅服務，您同意本隱私政策中描述嘅信息收集同使用方式。' : 
                 'By using our services, you agree to the information collection and usage practices described in this privacy policy.'}
              </p>
            </section>

            {/* 收集的信息 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '2. 我们收集的信息' : 
                 language === 'zh-HK' ? '2. 我哋收集嘅信息' : '2. Information We Collect'}
              </h2>
              
              <h3 className="text-xl font-medium text-gray-700 mb-3">
                {language === 'zh-CN' ? '2.1 自动收集的信息' : 
                 language === 'zh-HK' ? '2.1 自動收集嘅信息' : '2.1 Automatically Collected Information'}
              </h3>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• {language === 'zh-CN' ? '设备信息（浏览器类型、操作系统、设备型号）' : 
                    language === 'zh-HK' ? '設備信息（瀏覽器類型、操作系統、設備型號）' : 
                    'Device information (browser type, operating system, device model)'}</li>
                <li>• {language === 'zh-CN' ? '使用数据（访问时间、页面浏览、功能使用情况）' : 
                    language === 'zh-HK' ? '使用數據（訪問時間、頁面瀏覽、功能使用情況）' : 
                    'Usage data (access time, page views, feature usage)'}</li>
                <li>• {language === 'zh-CN' ? '技术信息（IP地址、Cookie、本地存储）' : 
                    language === 'zh-HK' ? '技術信息（IP地址、Cookie、本地存儲）' : 
                    'Technical information (IP address, cookies, local storage)'}</li>
                <li>• {language === 'zh-CN' ? '性能数据（页面加载时间、错误日志）' : 
                    language === 'zh-HK' ? '性能數據（頁面加載時間、錯誤日誌）' : 
                    'Performance data (page load time, error logs)'}</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3">
                {language === 'zh-CN' ? '2.2 您主动提供的信息' : 
                 language === 'zh-HK' ? '2.2 您主動提供嘅信息' : '2.2 Information You Provide'}
              </h3>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• {language === 'zh-CN' ? '反馈和建议' : 
                    language === 'zh-HK' ? '反饋同建議' : 'Feedback and suggestions'}</li>
                <li>• {language === 'zh-CN' ? '错误报告' : 
                    language === 'zh-HK' ? '錯誤報告' : 'Error reports'}</li>
                <li>• {language === 'zh-CN' ? '联系信息（如果您选择联系我们）' : 
                    language === 'zh-HK' ? '聯繫信息（如果您選擇聯繫我哋）' : 
                    'Contact information (if you choose to contact us)'}</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-700 mb-3">
                {language === 'zh-CN' ? '2.3 工具使用数据' : 
                 language === 'zh-HK' ? '2.3 工具使用數據' : '2.3 Tool Usage Data'}
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 font-medium">
                  {language === 'zh-CN' ? '重要说明：我们的所有工具都在您的浏览器本地运行。您输入到工具中的数据（如文本、图片、文件等）不会被发送到我们的服务器，也不会被存储或收集。所有处理都在您的设备上完成，确保您的数据隐私。' : 
                   language === 'zh-HK' ? '重要說明：我哋嘅所有工具都在您嘅瀏覽器本地運行。您輸入到工具中嘅數據（如文本、圖片、文件等）唔會被發送到我哋嘅服務器，亦唔會被存儲或收集。所有處理都在您嘅設備上完成，確保您嘅數據隱私。' : 
                   'Important: All our tools run locally in your browser. The data you input into the tools (such as text, images, files, etc.) is not sent to our servers, stored or collected. All processing is done on your device, ensuring your data privacy.'}
                </p>
              </div>
            </section>

            {/* 信息使用方式 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '3. 信息使用方式' : 
                 language === 'zh-HK' ? '3. 信息使用方式' : '3. How We Use Information'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '我们使用收集的信息用于：' : 
                 language === 'zh-HK' ? '我哋使用收集嘅信息用於：' : 
                 'We use the collected information for:'}
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• {language === 'zh-CN' ? '提供和维护我们的服务' : 
                    language === 'zh-HK' ? '提供同維護我哋嘅服務' : 
                    'Providing and maintaining our services'}</li>
                <li>• {language === 'zh-CN' ? '改进用户体验和服务质量' : 
                    language === 'zh-HK' ? '改進用戶體驗同服務質量' : 
                    'Improving user experience and service quality'}</li>
                <li>• {language === 'zh-CN' ? '分析使用模式和趋势' : 
                    language === 'zh-HK' ? '分析使用模式同趨勢' : 
                    'Analyzing usage patterns and trends'}</li>
                <li>• {language === 'zh-CN' ? '检测和防止技术问题' : 
                    language === 'zh-HK' ? '檢測同防止技術問題' : 
                    'Detecting and preventing technical issues'}</li>
                <li>• {language === 'zh-CN' ? '回应用户询问和提供支持' : 
                    language === 'zh-HK' ? '回應用戶詢問同提供支持' : 
                    'Responding to user inquiries and providing support'}</li>
                <li>• {language === 'zh-CN' ? '发送重要的服务通知' : 
                    language === 'zh-HK' ? '發送重要嘅服務通知' : 
                    'Sending important service notifications'}</li>
              </ul>
            </section>

            {/* Cookie和跟踪技术 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '4. Cookie和跟踪技术' : 
                 language === 'zh-HK' ? '4. Cookie同跟踪技術' : '4. Cookies and Tracking Technologies'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '我们使用Cookie和类似技术来：' : 
                 language === 'zh-HK' ? '我哋使用Cookie同類似技術來：' : 
                 'We use cookies and similar technologies to:'}
              </p>
              <ul className="text-gray-600 mb-4 space-y-2">
                <li>• {language === 'zh-CN' ? '记住您的偏好设置（如主题、语言）' : 
                    language === 'zh-HK' ? '記住您嘅偏好設置（如主題、語言）' : 
                    'Remember your preferences (such as theme, language)'}</li>
                <li>• {language === 'zh-CN' ? '分析网站使用情况' : 
                    language === 'zh-HK' ? '分析網站使用情況' : 
                    'Analyze website usage'}</li>
                <li>• {language === 'zh-CN' ? '提供个性化体验' : 
                    language === 'zh-HK' ? '提供個性化體驗' : 
                    'Provide personalized experience'}</li>
                <li>• {language === 'zh-CN' ? '确保网站安全性' : 
                    language === 'zh-HK' ? '確保網站安全性' : 
                    'Ensure website security'}</li>
              </ul>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '您可以通过浏览器设置控制Cookie的使用，但这可能会影响某些功能的正常使用。' : 
                 language === 'zh-HK' ? '您可以通過瀏覽器設置控制Cookie嘅使用，但這可能會影響某些功能嘅正常使用。' : 
                 'You can control cookie usage through browser settings, but this may affect the normal use of certain features.'}
              </p>
            </section>

            {/* 信息共享 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '5. 信息共享' : 
                 language === 'zh-HK' ? '5. 信息共享' : '5. Information Sharing'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '我们不会出售、交易或租赁您的个人信息给第三方。我们可能在以下情况下共享信息：' : 
                 language === 'zh-HK' ? '我哋唔會出售、交易或租賃您嘅個人信息俾第三方。我哋可能在以下情況下共享信息：' : 
                 'We do not sell, trade or rent your personal information to third parties. We may share information in the following situations:'}
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• {language === 'zh-CN' ? '获得您的明确同意' : 
                    language === 'zh-HK' ? '獲得您嘅明確同意' : 
                    'With your explicit consent'}</li>
                <li>• {language === 'zh-CN' ? '遵守法律要求或法院命令' : 
                    language === 'zh-HK' ? '遵守法律要求或法院命令' : 
                    'To comply with legal requirements or court orders'}</li>
                <li>• {language === 'zh-CN' ? '保护我们的权利、财产或安全' : 
                    language === 'zh-HK' ? '保護我哋嘅權利、財產或安全' : 
                    'To protect our rights, property or safety'}</li>
                <li>• {language === 'zh-CN' ? '与可信的服务提供商合作（如分析服务）' : 
                    language === 'zh-HK' ? '與可信嘅服務提供商合作（如分析服務）' : 
                    'Working with trusted service providers (such as analytics services)'}</li>
              </ul>
            </section>

            {/* 数据安全 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '6. 数据安全' : 
                 language === 'zh-HK' ? '6. 數據安全' : '6. Data Security'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '我们采取合理的技术和组织措施来保护您的信息：' : 
                 language === 'zh-HK' ? '我哋採取合理嘅技術同組織措施來保護您嘅信息：' : 
                 'We take reasonable technical and organizational measures to protect your information:'}
              </p>
              <ul className="text-gray-600 mb-4 space-y-2">
                <li>• {language === 'zh-CN' ? '使用HTTPS加密传输' : 
                    language === 'zh-HK' ? '使用HTTPS加密傳輸' : 
                    'Using HTTPS encryption for transmission'}</li>
                <li>• {language === 'zh-CN' ? '定期安全审查和更新' : 
                    language === 'zh-HK' ? '定期安全審查同更新' : 
                    'Regular security reviews and updates'}</li>
                <li>• {language === 'zh-CN' ? '限制员工访问权限' : 
                    language === 'zh-HK' ? '限制員工訪問權限' : 
                    'Restricting employee access rights'}</li>
                <li>• {language === 'zh-CN' ? '安全的数据存储和处理' : 
                    language === 'zh-HK' ? '安全嘅數據存儲同處理' : 
                    'Secure data storage and processing'}</li>
              </ul>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '虽然我们努力保护您的信息，但请注意，没有任何互联网传输或存储方法是100%安全的。' : 
                 language === 'zh-HK' ? '雖然我哋努力保護您嘅信息，但請注意，冇任何互聯網傳輸或存儲方法係100%安全嘅。' : 
                 'While we strive to protect your information, please note that no method of internet transmission or storage is 100% secure.'}
              </p>
            </section>

            {/* 您的权利 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '7. 您的权利' : 
                 language === 'zh-HK' ? '7. 您嘅權利' : '7. Your Rights'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '您有权：' : 
                 language === 'zh-HK' ? '您有權：' : 'You have the right to:'}
              </p>
              <ul className="text-gray-600 mb-4 space-y-2">
                <li>• {language === 'zh-CN' ? '访问我们持有的关于您的信息' : 
                    language === 'zh-HK' ? '訪問我哋持有嘅關於您嘅信息' : 
                    'Access information we hold about you'}</li>
                <li>• {language === 'zh-CN' ? '要求更正不准确的信息' : 
                    language === 'zh-HK' ? '要求更正唔準確嘅信息' : 
                    'Request correction of inaccurate information'}</li>
                <li>• {language === 'zh-CN' ? '要求删除您的个人信息' : 
                    language === 'zh-HK' ? '要求刪除您嘅個人信息' : 
                    'Request deletion of your personal information'}</li>
                <li>• {language === 'zh-CN' ? '反对或限制信息处理' : 
                    language === 'zh-HK' ? '反對或限制信息處理' : 
                    'Object to or restrict information processing'}</li>
                <li>• {language === 'zh-CN' ? '数据可携带性' : 
                    language === 'zh-HK' ? '數據可攜帶性' : 
                    'Data portability'}</li>
                <li>• {language === 'zh-CN' ? '撤回同意' : 
                    language === 'zh-HK' ? '撤回同意' : 
                    'Withdraw consent'}</li>
              </ul>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '如需行使这些权利，请通过下方联系方式与我们联系。' : 
                 language === 'zh-HK' ? '如需行使這些權利，請通過下方聯繫方式與我哋聯繫。' : 
                 'To exercise these rights, please contact us using the contact information below.'}
              </p>
            </section>

            {/* 联系我们 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '8. 联系我们' : 
                 language === 'zh-HK' ? '8. 聯繫我哋' : '8. Contact Us'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '如果您对本隐私政策有任何问题或疑虑，请通过以下方式联系我们：' : 
                 language === 'zh-HK' ? '如果您對本隱私政策有任何問題或疑慮，請通過以下方式聯繫我哋：' : 
                 'If you have any questions or concerns about this privacy policy, please contact us at:'}
              </p>
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>{language === 'zh-CN' ? '邮箱：' : 
                           language === 'zh-HK' ? '郵箱：' : 'Email: '}</strong>
                  privacy@stardottools.top
                </p>
                <p className="text-gray-700">
                  <strong>{language === 'zh-CN' ? '网站：' : 
                           language === 'zh-HK' ? '網站：' : 'Website: '}</strong>
                  https://stardottools.top
                </p>
              </div>
            </section>

            {/* 政策更新 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '9. 政策更新' : 
                 language === 'zh-HK' ? '9. 政策更新' : '9. Policy Updates'}
              </h2>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '我们可能会不时更新本隐私政策。重大变更将通过在网站上发布新的隐私政策来通知您。建议您定期查看本页面以了解任何变更。' : 
                 language === 'zh-HK' ? '我哋可能會不時更新本隱私政策。重大變更將通過在網站上發佈新嘅隱私政策來通知您。建議您定期查看本頁面以了解任何變更。' : 
                 'We may update this privacy policy from time to time. Significant changes will be notified by posting a new privacy policy on the website. We recommend that you check this page regularly for any changes.'}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}