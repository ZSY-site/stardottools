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
            {language === 'zh-CN' ? '服务条款' : 'Terms of Service'}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            {/* 接受条款 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '1. 接受条款' : '1. Acceptance of Terms'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '欢迎使用星点工具箱（"我们"、"我们的"或"本服务"）。通过访问或使用我们的网站和服务，您同意遵守本服务条款。如果您不同意这些条款，请不要使用我们的服务。' : 'Welcome to StarDot Tools ("we", "our" or "the Service"). By accessing or using our website and services, you agree to comply with these Terms of Service. If you do not agree to these terms, please do not use our services.'}
              </p>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '我们保留随时修改这些条款的权利。重大变更将在网站上公布，继续使用服务即表示您接受修改后的条款。' : 'We reserve the right to modify these terms at any time. Significant changes will be announced on the website, and continued use of the service indicates your acceptance of the modified terms.'}
              </p>
            </section>

            {/* 服务描述 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '2. 服务描述' : '2. Service Description'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '星点工具箱提供各种在线工具，包括但不限于：' : 'StarDot Tools provides various online tools, including but not limited to:'}
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• {language === 'zh-CN' ? '开发工具（代码格式化、JSON处理等）' : 'Development tools (code formatting, JSON processing, etc.)'}</li>
                <li>• {language === 'zh-CN' ? '文本处理工具（文本转换、编码解码等）' : 'Text processing tools (text conversion, encoding/decoding, etc.)'}</li>
                <li>• {language === 'zh-CN' ? '数据生成工具（随机数据、测试数据等）' : 'Data generation tools (random data, test data, etc.)'}</li>
                <li>• {language === 'zh-CN' ? '加密解密工具（哈希计算、加密算法等）' : 'Encryption/decryption tools (hash calculation, encryption algorithms, etc.)'}</li>
              </ul>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 font-medium">
                  {language === 'zh-CN' ? '重要说明：我们的所有工具都在您的浏览器本地运行。您输入到工具中的数据（如文本、图片、文件等）不会被发送到我们的服务器，也不会被存储或收集。所有处理都在您的设备上完成。' : 'Important: All our tools run locally in your browser. The data you input into the tools (such as text, images, files, etc.) is not sent to our servers, stored or collected. All processing is done on your device.'}
                </p>
              </div>
            </section>

            {/* 用户责任 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '3. 用户责任' : '3. User Responsibilities'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '使用我们的服务时，您同意：' : 'When using our services, you agree to:'}
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• {language === 'zh-CN' ? '遵守所有适用的法律法规' : 'Comply with all applicable laws and regulations'}</li>
                <li>• {language === 'zh-CN' ? '不将服务用于非法目的' : 'Not use the service for illegal purposes'}</li>
                <li>• {language === 'zh-CN' ? '不干扰或破坏服务的正常运行' : 'Not interfere with or disrupt the normal operation of the service'}</li>
                <li>• {language === 'zh-CN' ? '不尝试未经授权访问我们的系统' : 'Not attempt to access our systems without authorization'}</li>
                <li>• {language === 'zh-CN' ? '不传播恶意软件或病毒' : 'Not spread malware or viruses'}</li>
                <li>• {language === 'zh-CN' ? '对使用服务产生的后果负责' : 'Be responsible for the consequences of using the service'}</li>
              </ul>
            </section>

            {/* 知识产权 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '4. 知识产权' : '4. Intellectual Property'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '星点工具箱网站及其内容（包括但不限于文本、图形、徽标、图标、图像、音频剪辑、数字下载、数据编译和软件）是我们的财产或我们的内容提供商的财产，受版权和其他知识产权法保护。' : 'The StarDot Tools website and its content (including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations and software) are our property or the property of our content providers, protected by copyright and other intellectual property laws.'}
              </p>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '您可以使用我们的服务，但不得复制、修改、分发、传输、显示、执行、复制、发布、许可、创建衍生作品、转让或出售任何信息、软件、产品或从服务中获得的任何内容。' : 'You may use our services, but you may not copy, modify, distribute, transmit, display, perform, reproduce, publish, license, create derivative works, transfer or sell any information, software, products or any content obtained from the service.'}
              </p>
            </section>

            {/* 免责声明 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '5. 免责声明' : '5. Disclaimer'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '我们的服务按"原样"和"可用"的基础提供。我们不保证：' : 'Our services are provided on an "as is" and "as available" basis. We do not guarantee:'}
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• {language === 'zh-CN' ? '服务将不间断、及时、安全或无错误' : 'The service will be uninterrupted, timely, secure or error-free'}</li>
                <li>• {language === 'zh-CN' ? '工具结果将准确或可靠' : 'Tool results will be accurate or reliable'}</li>
                <li>• {language === 'zh-CN' ? '服务将满足您的特定要求' : 'The service will meet your specific requirements'}</li>
                <li>• {language === 'zh-CN' ? '服务将免费或永久提供' : 'The service will be free or permanently available'}</li>
              </ul>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '您对使用我们的服务承担全部风险。对于因使用或无法使用服务而造成的任何直接、间接、附带、特殊、后果性或惩罚性损害，我们不承担任何责任。' : 'You assume all risks associated with using our services. We are not liable for any direct, indirect, incidental, special, consequential or punitive damages resulting from the use or inability to use the service.'}
              </p>
            </section>

            {/* 责任限制 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '6. 责任限制' : '6. Limitation of Liability'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '在适用法律允许的最大范围内，我们不对以下情况承担责任：' : 'To the maximum extent permitted by applicable law, we are not liable for:'}
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• {language === 'zh-CN' ? '任何间接、附带、特殊、后果性或惩罚性损害' : 'Any indirect, incidental, special, consequential or punitive damages'}</li>
                <li>• {language === 'zh-CN' ? '数据丢失或损坏' : 'Data loss or corruption'}</li>
                <li>• {language === 'zh-CN' ? '业务中断' : 'Business interruption'}</li>
                <li>• {language === 'zh-CN' ? '第三方行为或内容' : 'Third-party actions or content'}</li>
                <li>• {language === 'zh-CN' ? '安全漏洞或数据泄露' : 'Security breaches or data leaks'}</li>
                <li>• {language === 'zh-CN' ? '工具使用产生的任何后果' : 'Any consequences resulting from tool usage'}</li>
              </ul>
            </section>

            {/* 服务变更和终止 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '7. 服务变更和终止' : '7. Service Changes and Termination'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '我们保留以下权利：' : 'We reserve the right to:'}
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• {language === 'zh-CN' ? '随时修改或终止服务（或其任何部分）' : 'Modify or terminate the service (or any part thereof) at any time'}</li>
                <li>• {language === 'zh-CN' ? '添加、更改或删除功能' : 'Add, change or remove features'}</li>
                <li>• {language === 'zh-CN' ? '限制或终止用户访问' : 'Restrict or terminate user access'}</li>
                <li>• {language === 'zh-CN' ? '暂停服务进行维护或升级' : 'Suspend service for maintenance or upgrades'}</li>
              </ul>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '我们不对任何服务修改、价格变更、暂停或终止对您或任何第三方承担责任。' : 'We are not liable to you or any third party for any modification, price change, suspension or discontinuance of the service.'}
              </p>
            </section>

            {/* 第三方链接 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '8. 第三方链接' : '8. Third-Party Links'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '我们的服务可能包含指向第三方网站或服务的链接。这些链接仅为您提供便利，我们不控制这些网站或服务，也不对其内容、隐私政策或做法负责。' : 'Our service may contain links to third-party websites or services. These links are provided for your convenience only, and we do not control these websites or services, nor are we responsible for their content, privacy policies or practices.'}
              </p>
              <p className="text-gray-600">
                {language === 'zh-CN' ? '访问任何第三方网站或服务时，您应查看其条款和隐私政策。' : 'When accessing any third-party website or service, you should review their terms and privacy policies.'}
              </p>
            </section>

            {/* 适用法律 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '9. 适用法律' : '9. Governing Law'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '本服务条款受中华人民共和国法律管辖并据其解释。任何由本服务条款引起或与其相关的争议应提交有管辖权的中华人民共和国法院解决。' : 'These Terms of Service are governed by and construed in accordance with the laws of the People\'s Republic of China. Any dispute arising from or in connection with these Terms of Service shall be submitted to the competent court of the People\'s Republic of China.'}
              </p>
            </section>

            {/* 完整协议 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '10. 完整协议' : '10. Entire Agreement'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '本服务条款构成您与我们之间关于使用服务的完整协议，取代任何先前的口头或书面协议。' : 'These Terms of Service constitute the entire agreement between you and us regarding the use of the service, superseding any prior oral or written agreements.'}
              </p>
            </section>

            {/* 联系我们 */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {language === 'zh-CN' ? '11. 联系我们' : '11. Contact Us'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'zh-CN' ? '如果您对本服务条款有任何问题，请通过以下方式联系我们：' : 'If you have any questions about these Terms of Service, please contact us at:'}
              </p>
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>{language === 'zh-CN' ? '邮箱：' : 'Email: '}</strong>
                  support@stardottools.top
                </p>
                <p className="text-gray-700">
                  <strong>{language === 'zh-CN' ? '网站：' : 'Website: '}</strong>
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