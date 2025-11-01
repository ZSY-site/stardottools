'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'

export default function TermsOfService() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {language === 'zh-CN' ? '服务条款' : 
             language === 'zh-HK' ? '服務條款' : 'Terms of Service'}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            {/* 接受条款 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '1. 接受条款' : 
                 language === 'zh-HK' ? '1. 接受條款' : '1. Acceptance of Terms'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '欢迎使用星点工具箱（"我们"、"我们的"或"本服务"）。通过访问或使用我们的网站和服务，您同意遵守本服务条款。如果您不同意这些条款，请不要使用我们的服务。' : 
                  language === 'zh-HK' ? '歡迎使用星點工具箱（"我哋"、"我哋嘅"或"本服務"）。通過訪問或使用我哋嘅網站同服務，您同意遵守本服務條款。如果您唔同意這些條款，請唔好使用我哋嘅服務。' : 
                 'Welcome to StarDot Tools ("we", "our" or "the Service"). By accessing or using our website and services, you agree to comply with these Terms of Service. If you do not agree to these terms, please do not use our services.'}
              </p>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '我们保留随时修改这些条款的权利。重大变更将在网站上公布，继续使用服务即表示您接受修改后的条款。' : 
                 language === 'zh-HK' ? '我哋保留隨時修改這些條款嘅權利。重大變更將在網站上公佈，繼續使用服務即表示您接受修改後嘅條款。' : 
                 'We reserve the right to modify these terms at any time. Significant changes will be announced on the website, and continued use of the service indicates your acceptance of the modified terms.'}
              </p>
            </section>

            {/* 服务描述 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '2. 服务描述' : 
                 language === 'zh-HK' ? '2. 服務描述' : '2. Service Description'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '星点工具箱提供各种在线工具，包括但不限于：' : 
                  language === 'zh-HK' ? '星點工具箱提供各種在線工具，包括但不限於：' : 
                 'StarDot Tools provides various online tools, including but not limited to:'}
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• {language === 'zh-CN' ? '开发工具（代码格式化、JSON处理等）' : 
                    language === 'zh-HK' ? '開發工具（代碼格式化、JSON處理等）' : 
                    'Development tools (code formatting, JSON processing, etc.)'}</li>
                <li>• {language === 'zh-CN' ? '文本处理工具（文本转换、编码解码等）' : 
                    language === 'zh-HK' ? '文本處理工具（文本轉換、編碼解碼等）' : 
                    'Text processing tools (text conversion, encoding/decoding, etc.)'}</li>
                <li>• {language === 'zh-CN' ? '数据生成工具（随机数据、测试数据等）' : 
                    language === 'zh-HK' ? '數據生成工具（隨機數據、測試數據等）' : 
                    'Data generation tools (random data, test data, etc.)'}</li>
                <li>• {language === 'zh-CN' ? '加密解密工具（哈希计算、加密算法等）' : 
                    language === 'zh-HK' ? '加密解密工具（哈希計算、加密算法等）' : 
                    'Encryption/decryption tools (hash calculation, encryption algorithms, etc.)'}</li>
              </ul>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 font-medium">
                  {language === 'zh-CN' ? '重要说明：我们的所有工具都在您的浏览器本地运行。您输入到工具中的数据（如文本、图片、文件等）不会被发送到我们的服务器，也不会被存储或收集。所有处理都在您的设备上完成。' : 
                   language === 'zh-HK' ? '重要說明：我哋嘅所有工具都在您嘅瀏覽器本地運行。您輸入到工具中嘅數據（如文本、圖片、文件等）唔會被發送到我哋嘅服務器，亦唔會被存儲或收集。所有處理都在您嘅設備上完成。' : 
                   'Important: All our tools run locally in your browser. The data you input into the tools (such as text, images, files, etc.) is not sent to our servers, stored or collected. All processing is done on your device.'}
                </p>
              </div>
            </section>

            {/* 用户责任 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '3. 用户责任' : 
                 language === 'zh-HK' ? '3. 用戶責任' : '3. User Responsibilities'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '使用我们的服务时，您同意：' : 
                 language === 'zh-HK' ? '使用我哋嘅服務時，您同意：' : 
                 'When using our services, you agree to:'}
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• {language === 'zh-CN' ? '遵守所有适用的法律法规' : 
                    language === 'zh-HK' ? '遵守所有適用嘅法律法規' : 
                    'Comply with all applicable laws and regulations'}</li>
                <li>• {language === 'zh-CN' ? '不将服务用于非法目的' : 
                    language === 'zh-HK' ? '唔將服務用於非法目的' : 
                    'Not use the service for illegal purposes'}</li>
                <li>• {language === 'zh-CN' ? '不干扰或破坏服务的正常运行' : 
                    language === 'zh-HK' ? '唔干擾或破壞服務嘅正常運行' : 
                    'Not interfere with or disrupt the normal operation of the service'}</li>
                <li>• {language === 'zh-CN' ? '不尝试未经授权访问我们的系统' : 
                    language === 'zh-HK' ? '唔嘗試未經授權訪問我哋嘅系統' : 
                    'Not attempt to access our systems without authorization'}</li>
                <li>• {language === 'zh-CN' ? '不传播恶意软件或病毒' : 
                    language === 'zh-HK' ? '唔傳播惡意軟件或病毒' : 
                    'Not spread malware or viruses'}</li>
                <li>• {language === 'zh-CN' ? '对使用服务产生的后果负责' : 
                    language === 'zh-HK' ? '對使用服務產生嘅後果負責' : 
                    'Be responsible for the consequences of using the service'}</li>
              </ul>
            </section>

            {/* 知识产权 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '4. 知识产权' : 
                 language === 'zh-HK' ? '4. 知識產權' : '4. Intellectual Property'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '星点工具箱网站及其内容（包括但不限于文本、图形、徽标、图标、图像、音频剪辑、数字下载、数据编译和软件）是我们的财产或我们的内容提供商的财产，受版权和其他知识产权法保护。' : 
                  language === 'zh-HK' ? '星點工具箱網站及其內容（包括但不限於文本、圖形、徽標、圖標、圖像、音頻剪輯、數字下載、數據編譯同軟件）係我哋嘅財產或我哋嘅內容提供商嘅財產，受版權同其他知識產權法保護。' : 
                 'The StarDot Tools website and its content (including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations and software) are our property or the property of our content providers, protected by copyright and other intellectual property laws.'}
              </p>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '您可以使用我们的服务，但不得复制、修改、分发、传输、展示、执行、复制、发布、许可、创建衍生作品、转让或出售任何信息、软件、产品或从服务中获得的任何内容。' : 
                 language === 'zh-HK' ? '您可以使用我哋嘅服務，但唔得複製、修改、分發、傳輸、顯示、執行、複製、發佈、許可、創建衍生作品、轉讓或出售任何信息、軟件、產品或從服務中獲得嘅任何內容。' : 
                 'You may use our services, but you may not copy, modify, distribute, transmit, display, perform, reproduce, publish, license, create derivative works, transfer or sell any information, software, products or any content obtained from the service.'}
              </p>
            </section>

            {/* 免责声明 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '5. 免责声明' : 
                 language === 'zh-HK' ? '5. 免責聲明' : '5. Disclaimer'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '我们的服务按"原样"和"可用"的基础提供。我们不保证：' : 
                 language === 'zh-HK' ? '我哋嘅服務按"原樣"同"可用"嘅基礎提供。我哋唔保證：' : 
                 'Our services are provided on an "as is" and "as available" basis. We do not guarantee:'}
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• {language === 'zh-CN' ? '服务将不间断、及时、安全或无错误' : 
                    language === 'zh-HK' ? '服務將唔間斷、及時、安全或冇錯誤' : 
                    'The service will be uninterrupted, timely, secure or error-free'}</li>
                <li>• {language === 'zh-CN' ? '工具结果将准确或可靠' : 
                    language === 'zh-HK' ? '工具結果將準確或可靠' : 
                    'Tool results will be accurate or reliable'}</li>
                <li>• {language === 'zh-CN' ? '服务将满足您的特定要求' : 
                    language === 'zh-HK' ? '服務將滿足您嘅特定要求' : 
                    'The service will meet your specific requirements'}</li>
                <li>• {language === 'zh-CN' ? '服务将免费或永久提供' : 
                    language === 'zh-HK' ? '服務將免費或永久提供' : 
                    'The service will be free or permanently available'}</li>
              </ul>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '您对使用我们的服务承担全部风险。对于因使用或无法使用服务而造成的任何直接、间接、附带、特殊、后果性或惩罚性损害，我们不承担任何责任。' : 
                 language === 'zh-HK' ? '您對使用我哋嘅服務承擔全部風險。對於因使用或無法使用服務而造成嘅任何直接、間接、附帶、特殊、後果性或懲罰性損害，我哋唔承擔任何責任。' : 
                 'You assume all risks associated with using our services. We are not liable for any direct, indirect, incidental, special, consequential or punitive damages resulting from the use or inability to use the service.'}
              </p>
            </section>

            {/* 责任限制 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '6. 责任限制' : 
                 language === 'zh-HK' ? '6. 責任限制' : '6. Limitation of Liability'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '在适用法律允许的最大范围内，我们不对以下情况承担责任：' : 
                 language === 'zh-HK' ? '在適用法律允許嘅最大範圍內，我哋唔對以下情況承擔責任：' : 
                 'To the maximum extent permitted by applicable law, we are not liable for:'}
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• {language === 'zh-CN' ? '任何间接、附带、特殊、后果性或惩罚性损害' : 
                    language === 'zh-HK' ? '任何間接、附帶、特殊、後果性或懲罰性損害' : 
                    'Any indirect, incidental, special, consequential or punitive damages'}</li>
                <li>• {language === 'zh-CN' ? '数据丢失或损坏' : 
                    language === 'zh-HK' ? '數據丟失或損壞' : 
                    'Data loss or corruption'}</li>
                <li>• {language === 'zh-CN' ? '业务中断' : 
                    language === 'zh-HK' ? '業務中斷' : 
                    'Business interruption'}</li>
                <li>• {language === 'zh-CN' ? '第三方行为或内容' : 
                    language === 'zh-HK' ? '第三方行為或內容' : 
                    'Third-party actions or content'}</li>
                <li>• {language === 'zh-CN' ? '安全漏洞或数据泄露' : 
                    language === 'zh-HK' ? '安全漏洞或數據泄露' : 
                    'Security breaches or data leaks'}</li>
                <li>• {language === 'zh-CN' ? '工具使用产生的任何后果' : 
                    language === 'zh-HK' ? '工具使用產生嘅任何後果' : 
                    'Any consequences resulting from tool usage'}</li>
              </ul>
            </section>

            {/* 服务变更和终止 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '7. 服务变更和终止' : 
                 language === 'zh-HK' ? '7. 服務變更同終止' : '7. Service Changes and Termination'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '我们保留以下权利：' : 
                 language === 'zh-HK' ? '我哋保留以下權利：' : 
                 'We reserve the right to:'}
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• {language === 'zh-CN' ? '随时修改或终止服务（或其任何部分）' : 
                    language === 'zh-HK' ? '隨時修改或終止服務（或其任何部分）' : 
                    'Modify or terminate the service (or any part thereof) at any time'}</li>
                <li>• {language === 'zh-CN' ? '添加、更改或删除功能' : 
                    language === 'zh-HK' ? '添加、更改或刪除功能' : 
                    'Add, change or remove features'}</li>
                <li>• {language === 'zh-CN' ? '限制或终止用户访问' : 
                    language === 'zh-HK' ? '限制或終止用戶訪問' : 
                    'Restrict or terminate user access'}</li>
                <li>• {language === 'zh-CN' ? '暂停服务进行维护或升级' : 
                    language === 'zh-HK' ? '暫停服務進行維護或升級' : 
                    'Suspend service for maintenance or upgrades'}</li>
              </ul>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '我们不对任何服务修改、价格变更、暂停或终止对您或任何第三方承担责任。' : 
                 language === 'zh-HK' ? '我哋唔對任何服務修改、價格變更、暫停或終止對您或任何第三方承擔責任。' : 
                 'We are not liable to you or any third party for any modification, price change, suspension or discontinuance of the service.'}
              </p>
            </section>

            {/* 第三方链接 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '8. 第三方链接' : 
                 language === 'zh-HK' ? '8. 第三方鏈接' : '8. Third-Party Links'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '我们的服务可能包含指向第三方网站或服务的链接。这些链接仅为您提供便利，我们不控制这些网站或服务，也不对其内容、隐私政策或做法负责。' : 
                 language === 'zh-HK' ? '我哋嘅服務可能包含指向第三方網站或服務嘅鏈接。這些鏈接僅為您提供便利，我哋唔控制這些網站或服務，亦唔對其內容、隱私政策或做法負責。' : 
                 'Our service may contain links to third-party websites or services. These links are provided for your convenience only, and we do not control these websites or services, nor are we responsible for their content, privacy policies or practices.'}
              </p>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '访问任何第三方网站或服务时，您应查看其条款和隐私政策。' : 
                 language === 'zh-HK' ? '訪問任何第三方網站或服務時，您應查看其條款同隱私政策。' : 
                 'When accessing any third-party website or service, you should review their terms and privacy policies.'}
              </p>
            </section>

            {/* 适用法律 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '9. 适用法律' : 
                 language === 'zh-HK' ? '9. 適用法律' : '9. Governing Law'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '本服务条款受中华人民共和国法律管辖并据其解释。任何由本服务条款引起或与其相关的争议应提交有管辖权的中华人民共和国法院解决。' : 
                 language === 'zh-HK' ? '本服務條款受中華人民共和國法律管轄並據其解釋。任何由本服務條款引起或與其相關嘅爭議應提交有管轄權嘅中華人民共和國法院解決。' : 
                 'These Terms of Service are governed by and construed in accordance with the laws of the People\'s Republic of China. Any dispute arising from or in connection with these Terms of Service shall be submitted to the competent court of the People\'s Republic of China.'}
              </p>
            </section>

            {/* 完整协议 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '10. 完整协议' : 
                 language === 'zh-HK' ? '10. 完整協議' : '10. Entire Agreement'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '本服务条款构成您与我们之间关于使用服务的完整协议，取代任何先前的口头或书面协议。' : 
                 language === 'zh-HK' ? '本服務條款構成您與我哋之間關於使用服務嘅完整協議，取代任何先前嘅口頭或書面協議。' : 
                 'These Terms of Service constitute the entire agreement between you and us regarding the use of the service, superseding any prior oral or written agreements.'}
              </p>
            </section>

            {/* 联系我们 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '11. 联系我们' : 
                 language === 'zh-HK' ? '11. 聯繫我哋' : '11. Contact Us'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '如果您对本服务条款有任何问题，请通过以下方式联系我们：' : 
                 language === 'zh-HK' ? '如果您對本服務條款有任何問題，請通過以下方式聯繫我哋：' : 
                 'If you have any questions about these Terms of Service, please contact us at:'}
              </p>
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>{language === 'zh-CN' ? '邮箱：' : 
                           language === 'zh-HK' ? '郵箱：' : 'Email: '}</strong>
                  support@stardottools.top
                </p>
                <p className="text-gray-700">
                  <strong>{language === 'zh-CN' ? '网站：' : 
                           language === 'zh-HK' ? '網站：' : 'Website: '}</strong>
                  https://stardottools.top
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}