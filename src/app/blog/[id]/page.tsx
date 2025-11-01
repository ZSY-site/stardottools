'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/locales'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// 模拟博客文章数据（与博客列表页面相同）
const blogPosts = [
  {
    id: 1,
    title: { 
      'zh-CN': 'ChatGPT Atlas浏览器官网下载 - OpenAI推出的AI智能浏览器', 
      'zh-HK': 'ChatGPT Atlas瀏覽器官網下載 - OpenAI推出嘅AI智能瀏覽器', 
      'en': 'ChatGPT Atlas Browser Official Download - AI Smart Browser by OpenAI' 
    },
    excerpt: {
      'zh-CN': 'OpenAI推出的革命性AI浏览器，集成ChatGPT智能助手，支持侧边栏聊天、智能记忆、自动化操作等创新功能。',
      'zh-HK': 'OpenAI推出嘅革命性AI瀏覽器，集成ChatGPT智能助手，支持側邊欄聊天、智能記憶、自動化操作等創新功能。',
      'en': 'Revolutionary AI browser by OpenAI, integrating ChatGPT smart assistant, supporting sidebar chat, intelligent memory, automation and other innovative features.'
    },
    content: {
      'zh-CN': `# ChatGPT Atlas浏览器简介

还在用传统浏览器一个标签页一个标签页地切换查找信息吗？还在为复制粘贴各种内容到ChatGPT而烦恼吗？

OpenAI刚刚发布了一款革命性的产品——ChatGPT Atlas浏览器，直接把AI助手集成到浏览器里，让你的网页浏览体验彻底升级。

## ChatGPT Atlas浏览器是什么？

ChatGPT Atlas是OpenAI推出的全新AI智能浏览器，将ChatGPT的强大能力直接嵌入到浏览体验中。

简单来说，它就像是给你的浏览器装上了一个超级智能的助手，可以随时随地帮你分析网页内容、回答问题、执行任务，而且完全不需要切换到其他应用。

## 核心功能亮点

### 侧边栏智能聊天
在任何网页上都能打开ChatGPT侧边栏，直接对当前页面内容进行分析、总结或提问。

### 智能记忆功能
浏览器会记住你的偏好和历史对话，提供更个性化的建议和帮助。

### 自动化操作
AI可以帮你执行复杂的网页操作，比如填写表单、搜索信息、比较产品等。

### 隐私保护优先
你可以完全控制哪些网站可以被AI访问，保护个人隐私。

## 为什么Atlas浏览器值得期待？

### 彻底改变信息获取方式
传统浏览器的使用流程通常是这样的：打开网页 → 阅读内容 → 复制关键信息 → 切换到ChatGPT → 粘贴提问 → 获得答案。

而Atlas浏览器把这个流程简化为：打开网页 → 直接在侧边栏提问 → 立即获得基于当前页面的智能回答。

我觉得这种体验提升是质的飞跃，特别是对于需要大量信息处理的工作场景。

### 真正的智能化浏览
Atlas不只是简单地把ChatGPT嵌入浏览器，而是深度整合了AI能力：

- **内容理解**：AI能理解你正在浏览的内容，提供相关的建议和补充信息
- **上下文连续性**：在不同网页间切换时，AI能保持对话的连续性，记住之前的讨论内容
- **主动协助**：AI会主动识别你可能需要帮助的场景，比如复杂的表格数据、长篇文章总结等

### 工作效率的革命性提升
对于经常需要处理大量网页信息的用户来说，Atlas简直是效率神器：

- **研究工作者**：快速总结论文、对比不同观点
- **内容创作者**：分析竞品内容、获取创作灵感
- **商务人员**：快速了解市场信息、分析竞争对手
- **学生群体**：理解复杂概念、整理学习资料

## ChatGPT Atlas浏览器官网下载

**官方下载地址**：https://openai.com/atlas

目前Atlas浏览器还处于预览阶段，需要ChatGPT Plus、Pro或Business账户才能体验完整功能。

### 系统要求

**支持平台**：
- Windows 10/11
- macOS 10.15及以上版本
- 暂不支持移动端（预计后续会推出）

**硬件要求**：
- 内存：至少8GB RAM
- 存储：500MB可用空间
- 网络：稳定的互联网连接

## 详细功能解析

### 侧边栏聊天功能
这是Atlas最核心的功能。在任何网页上，你都可以通过快捷键或点击按钮打开ChatGPT侧边栏。

**使用场景举例**：
- 阅读新闻时，询问"这篇文章的主要观点是什么？"
- 浏览产品页面时，问"这个产品的优缺点分析"
- 看技术文档时，请求"用简单的话解释这个概念"

侧边栏会基于当前页面内容给出精准回答，不需要你手动复制粘贴任何内容。

### 智能记忆系统
Atlas的记忆功能让它能够：
- 记住你的偏好：比如你喜欢什么样的信息呈现方式、关注哪些领域的内容
- 保持对话连续性：即使切换到不同网页，AI也能记住之前的对话内容
- 个性化建议：基于你的浏览历史和偏好，主动推荐相关内容或提供有用建议

当然，所有这些记忆都是可控的，你可以随时查看、编辑或删除。

### 自动化操作功能
这可能是最令人兴奋的功能了。AI可以帮你执行复杂的网页操作：
- **购物助手**：帮你比较不同网站的产品价格和评价，甚至协助完成购买流程
- **研究助手**：自动收集多个网站的相关信息，整理成结构化的报告
- **表单填写**：智能填写各种在线表单，节省大量重复性工作

需要注意的是，所有自动化操作都在你的完全控制下进行，AI不会未经允许执行任何操作。

### 文本协作功能
Atlas还有一个很实用的功能：把光标变成协作伙伴。

选中任何网页上的文本，就能直接获得AI的帮助：
- 重写邮件内容
- 总结长篇文章
- 翻译外语内容
- 解释专业术语

这个功能在处理邮件、文档编辑时特别有用。

## 隐私保护与安全性

OpenAI在Atlas的隐私保护方面做得很用心：

### 用户完全控制
- **网站访问权限**：你可以精确控制哪些网站允许AI访问，哪些不允许
- **浏览历史管理**：可以随时清除浏览历史，使用无痕模式浏览
- **记忆管理**：AI的所有记忆内容都可以查看、编辑和删除

### 数据安全保障
- **本地处理优先**：尽可能在本地处理数据，减少向服务器传输的信息
- **加密传输**：所有网络传输都采用端到端加密
- **透明度报告**：OpenAI承诺定期发布透明度报告，说明数据使用情况

## 总结

ChatGPT Atlas浏览器代表了AI与浏览器融合的未来方向。它不仅仅是工具升级，更是工作方式的革命性改变。

如果你经常需要处理大量网页信息，或者希望提升工作效率，Atlas绝对值得一试。虽然目前还处于预览阶段，但已经展现出巨大的潜力。

**立即体验**：https://openai.com/atlas

---

*本文由星点工具箱团队原创，转载请注明出处*`,
      'zh-HK': `# ChatGPT Atlas瀏覽器簡介

仲用緊傳統瀏覽器一個標籤頁一個標籤頁咁切換查找信息嗎？仲為咗複製粘貼各種內容到ChatGPT而煩惱嗎？

OpenAI啱啱發佈咗一款革命性嘅產品——ChatGPT Atlas瀏覽器，直接將AI助手集成到瀏覽器裏面，讓你嘅網頁瀏覽體驗徹底升級。

## ChatGPT Atlas瀏覽器係咩？

ChatGPT Atlas係OpenAI推出嘅全新AI智能瀏覽器，將ChatGPT嘅強大能力直接嵌入到瀏覽體驗中。

簡單嚟講，佢就好似俾你嘅瀏覽器裝上咗一個超級智能嘅助手，可以隨時隨地幫你分析網頁內容、回答問題、執行任務，而且完全唔需要切換到其他應用。

## 核心功能亮點

### 側邊欄智能聊天
喺任何網頁上都能打開ChatGPT側邊欄，直接對當前頁面內容進行分析、總結或提問。

### 智能記憶功能
瀏覽器會記住你嘅偏好同歷史對話，提供更個性化嘅建議同幫助。

### 自動化操作
AI可以幫你執行複雜嘅網頁操作，比如填寫表單、搜索信息、比較產品等。

### 隱私保護優先
你可以完全控制邊啲網站可以被AI訪問，保護個人隱私。

## 點解Atlas瀏覽器值得期待？

### 徹底改變信息獲取方式
傳統瀏覽器嘅使用流程通常係咁樣：打開網頁 → 閱讀內容 → 複製關鍵信息 → 切換到ChatGPT → 粘貼提問 → 獲得答案。

而Atlas瀏覽器將呢個流程簡化為：打開網頁 → 直接喺側邊欄提問 → 立即獲得基於當前頁面嘅智能回答。

我覺得呢種體驗提升係質嘅飛躍，特別係對於需要大量信息處理嘅工作場景。

### 真正嘅智能化瀏覽
Atlas唔只係簡單咁將ChatGPT嵌入瀏覽器，而係深度整合咗AI能力：

- **內容理解**：AI能理解你正在瀏覽嘅內容，提供相關嘅建議同補充信息
- **上下文連續性**：喺唔同網頁間切換時，AI能保持對話嘅連續性，記住之前嘅討論內容
- **主動協助**：AI會主動識別你可能需要幫助嘅場景，比如複雜嘅表格數據、長篇文章總結等

### 工作效率嘅革命性提升
對於經常需要處理大量網頁信息嘅用戶嚟講，Atlas簡直係效率神器：

- **研究工作者**：快速總結論文、對比唔同觀點
- **內容創作者**：分析競品內容、獲取創作靈感
- **商務人員**：快速了解市場信息、分析競爭對手
- **學生群體**：理解複雜概念、整理學習資料

## ChatGPT Atlas瀏覽器官網下載

**官方下載地址**：https://openai.com/atlas

目前Atlas瀏覽器仲處於預覽階段，需要ChatGPT Plus、Pro或Business賬戶才能體驗完整功能。

### 系統要求

**支持平台**：
- Windows 10/11
- macOS 10.15及以上版本
- 暫不支持移動端（預計後續會推出）

**硬件要求**：
- 內存：至少8GB RAM
- 存儲：500MB可用空間
- 網絡：穩定嘅互聯網連接

## 詳細功能解析

### 側邊欄聊天功能
呢個係Atlas最核心嘅功能。喺任何網頁上，你都可以通過快捷鍵或點擊按鈕打開ChatGPT側邊欄。

**使用場景舉例**：
- 閱讀新聞時，詢問"呢篇文章嘅主要觀點係咩？"
- 瀏覽產品頁面時，問"呢個產品嘅優缺點分析"
- 睇技術文檔時，請求"用簡單嘅話解釋呢個概念"

側邊欄會基於當前頁面內容俾出精準回答，唔需要你手動複製粘貼任何內容。

### 智能記憶系統
Atlas嘅記憶功能讓佢能夠：
- 記住你嘅偏好：比如你鍾意咩樣嘅信息呈現方式、關注邊啲領域嘅內容
- 保持對話連續性：即使切換到唔同網頁，AI都能記住之前嘅對話內容
- 個性化建議：基於你嘅瀏覽歷史同偏好，主動推薦相關內容或提供有用建議

當然，所有呢啲記憶都係可控嘅，你可以隨時查看、編輯或刪除。

### 自動化操作功能
呢個可能係最令人興奮嘅功能喇。AI可以幫你執行複雜嘅網頁操作：
- **購物助手**：幫你比較唔同網站嘅產品價格同評價，甚至協助完成購買流程
- **研究助手**：自動收集多個網站嘅相關信息，整理成結構化嘅報告
- **表單填寫**：智能填寫各種在線表單，節省大量重複性工作

需要注意嘅係，所有自動化操作都喺你嘅完全控制下進行，AI唔會未經允許執行任何操作。

### 文本協作功能
Atlas仲有一個好實用嘅功能：將光標變成協作夥伴。

選中任何網頁上嘅文本，就能直接獲得AI嘅幫助：
- 重寫郵件內容
- 總結長篇文章
- 翻譯外語內容
- 解釋專業術語

呢個功能喺處理郵件、文檔編輯時特別有用。

## 隱私保護與安全性

OpenAI喺Atlas嘅隱私保護方面做得好用心：

### 用戶完全控制
- **網站訪問權限**：你可以精確控制邊啲網站允許AI訪問，邊啲唔允許
- **瀏覽歷史管理**：可以隨時清除瀏覽歷史，使用無痕模式瀏覽
- **記憶管理**：AI嘅所有記憶內容都可以查看、編輯同刪除

### 數據安全保障
- **本地處理優先**：盡可能喺本地處理數據，減少向服務器傳輸嘅信息
- **加密傳輸**：所有網絡傳輸都採用端到端加密
- **透明度報告**：OpenAI承諾定期發佈透明度報告，說明數據使用情況

## 總結

ChatGPT Atlas瀏覽器代表咗AI與瀏覽器融合嘅未來方向。佢唔只係工具升級，更係工作方式嘅革命性改變。

如果你經常需要處理大量網頁信息，或者希望提升工作效率，Atlas絕對值得一試。雖然目前仲處於預覽階段，但已經展現出巨大嘅潛力。

**立即體驗**：https://openai.com/atlas

---

*本文由星點工具箱團隊原創，轉載請註明出處*`,
      'en': `# ChatGPT Atlas Browser Introduction

Still using traditional browsers to switch between tabs one by one to find information? Still troubled by copying and pasting various content to ChatGPT?

OpenAI just released a revolutionary product - ChatGPT Atlas browser, directly integrating AI assistant into the browser, completely upgrading your web browsing experience.

## What is ChatGPT Atlas Browser?

ChatGPT Atlas is a new AI smart browser launched by OpenAI, embedding ChatGPT's powerful capabilities directly into the browsing experience.

Simply put, it's like installing a super intelligent assistant for your browser that can help you analyze web content, answer questions, and perform tasks anytime, anywhere, without needing to switch to other applications.

## Core Feature Highlights

### Sidebar Smart Chat
Open ChatGPT sidebar on any webpage to analyze, summarize, or ask questions about current page content.

### Smart Memory Function
The browser remembers your preferences and conversation history, providing more personalized suggestions and help.

### Automation Operations
AI can help you perform complex web operations like filling forms, searching information, comparing products, etc.

### Privacy Protection Priority
You have full control over which websites AI can access, protecting personal privacy.

## Why is Atlas Browser Worth Anticipating?

### Completely Changing Information Access
Traditional browser workflow: Open webpage → Read content → Copy key information → Switch to ChatGPT → Paste question → Get answer.

Atlas browser simplifies this to: Open webpage → Ask directly in sidebar → Get intelligent answers based on current page immediately.

I believe this experience improvement is a qualitative leap, especially for work scenarios requiring large amounts of information processing.

### True Intelligent Browsing
Atlas doesn't just simply embed ChatGPT into the browser, but deeply integrates AI capabilities:

- **Content Understanding**: AI can understand the content you're browsing and provide relevant suggestions and supplementary information
- **Context Continuity**: When switching between different webpages, AI maintains conversation continuity and remembers previous discussion content
- **Proactive Assistance**: AI actively identifies scenarios where you might need help, such as complex table data, long article summaries, etc.

### Revolutionary Productivity Improvement
For users who frequently need to process large amounts of web information, Atlas is simply an efficiency miracle:

- **Researchers**: Quickly summarize papers, compare different viewpoints
- **Content Creators**: Analyze competitor content, gain creative inspiration
- **Business Professionals**: Quickly understand market information, analyze competitors
- **Student Groups**: Understand complex concepts, organize learning materials

## ChatGPT Atlas Browser Official Download

**Official Download Address**: https://openai.com/atlas

Currently, Atlas browser is still in preview stage, requiring ChatGPT Plus, Pro or Business account to experience full functionality.

### System Requirements

**Supported Platforms**:
- Windows 10/11
- macOS 10.15 and above
- Mobile not supported yet (expected to be launched later)

**Hardware Requirements**:
- Memory: At least 8GB RAM
- Storage: 500MB available space
- Network: Stable internet connection

## Detailed Feature Analysis

### Sidebar Chat Function
This is Atlas's most core function. On any webpage, you can open ChatGPT sidebar through shortcuts or button clicks.

**Usage Scenario Examples**:
- When reading news, ask "What are the main points of this article?"
- When browsing product pages, ask "Analysis of this product's advantages and disadvantages"
- When viewing technical documentation, request "Explain this concept in simple terms"

The sidebar provides accurate answers based on current page content, without requiring you to manually copy and paste any content.

### Smart Memory System
Atlas's memory function enables it to:
- Remember your preferences: such as what kind of information presentation style you like, what fields you focus on
- Maintain conversation continuity: Even when switching to different webpages, AI can remember previous conversation content
- Personalized suggestions: Based on your browsing history and preferences, actively recommend relevant content or provide useful suggestions

Of course, all these memories are controllable, and you can view, edit, or delete them at any time.

### Automation Operation Function
This might be the most exciting function. AI can help you perform complex web operations:
- **Shopping Assistant**: Help you compare product prices and reviews across different websites, even assist in completing purchase processes
- **Research Assistant**: Automatically collect relevant information from multiple websites and organize it into structured reports
- **Form Filling**: Intelligently fill various online forms, saving a lot of repetitive work

It's important to note that all automation operations are under your complete control, and AI won't perform any operations without permission.

### Text Collaboration Function
Atlas also has a very practical function: turning the cursor into a collaboration partner.

Select any text on a webpage to directly get AI's help:
- Rewrite email content
- Summarize long articles
- Translate foreign language content
- Explain professional terms

This function is particularly useful when handling emails and document editing.

## Privacy Protection and Security

OpenAI has been very careful about privacy protection in Atlas:

### User Complete Control
- **Website Access Permissions**: You can precisely control which websites AI can access and which cannot
- **Browsing History Management**: Can clear browsing history at any time, use incognito mode browsing
- **Memory Management**: All memory content of AI can be viewed, edited, and deleted

### Data Security Guarantee
- **Local Processing Priority**: Process data locally as much as possible, reducing information transmitted to servers
- **Encrypted Transmission**: All network transmissions use end-to-end encryption
- **Transparency Reports**: OpenAI promises to regularly publish transparency reports explaining data usage

## Summary

ChatGPT Atlas browser represents the future direction of AI and browser integration. It's not just a tool upgrade, but a revolutionary change in work methods.

If you frequently need to process large amounts of web information or want to improve work efficiency, Atlas is definitely worth trying. Although it's still in preview stage, it has already shown great potential.

**Experience Now**: https://openai.com/atlas

---

*This article is originally created by StarDot Tools Team, please indicate the source when reprinting*`
    },
    category: { 'zh-CN': 'AI工具', 'zh-HK': 'AI工具', 'en': 'AI Tools' },
    date: '2025-10-23',
    readTime: { 'zh-CN': '5分钟阅读', 'zh-HK': '5分鐘閱讀', 'en': '5 min read' },
    featured: true,
    tags: ['ChatGPT浏览器', 'AI浏览器', 'OpenAI', 'Atlas浏览器', '智能浏览器', 'AI助手']
  },
  {
    id: 2,
    title: { 
      'zh-CN': 'Perplexity Comet浏览器官网下载 - AI驱动的智能浏览器', 
      'zh-HK': 'Perplexity Comet瀏覽器官網下載 - AI驅動嘅智能瀏覽器', 
      'en': 'Perplexity Comet Browser Official Download - AI-Powered Smart Browser' 
    },
    excerpt: {
      'zh-CN': 'Comet是由Perplexity推出的AI智能浏览器，集成强大的AI助手功能，支持智能搜索、内容理解、标签管理等创新功能。',
      'zh-HK': 'Comet係由Perplexity推出嘅AI智能瀏覽器，集成強大嘅AI助手功能，支持智能搜索、內容理解、標籤管理等創新功能。',
      'en': 'Comet is an AI smart browser launched by Perplexity, integrating powerful AI assistant features, supporting intelligent search, content understanding, tag management and other innovative functions.'
    },
    content: {
      'zh-CN': `
        <h2 id="intro">Perplexity Comet浏览器概述</h2>
        <p>Perplexity Comet是一款基于AI技术的智能浏览器，由知名AI公司Perplexity开发。这款浏览器专注于提升用户的搜索和内容理解体验。</p>
        
        <h3 id="features">核心功能</h3>
        <ul>
          <li><strong>智能搜索</strong>：能够理解用户的搜索意图，提供更精准的结果</li>
          <li><strong>内容理解</strong>：自动分析网页内容，提取关键信息</li>
          <li><strong>标签管理</strong>：智能分类和整理浏览历史</li>
          <li><strong>多语言支持</strong>：支持多种语言的实时翻译</li>
        </ul>
        
        <h3 id="advantages">技术优势</h3>
        <p>Comet浏览器采用了最新的自然语言处理技术，能够更好地理解用户需求。</p>
      `,
      'zh-HK': `
        <h2 id="intro">Perplexity Comet瀏覽器概述</h2>
        <p>Perplexity Comet係一款基於AI技術嘅智能瀏覽器，由知名AI公司Perplexity開發。呢款瀏覽器專注於提升用戶嘅搜索同內容理解體驗。</p>
        
        <h3 id="features">核心功能</h3>
        <ul>
          <li><strong>智能搜索</strong>：能夠理解用戶嘅搜索意圖，提供更精準嘅結果</li>
          <li><strong>內容理解</strong>：自動分析網頁內容，提取關鍵信息</li>
          <li><strong>標籤管理</strong>：智能分類同整理瀏覽歷史</li>
          <li><strong>多語言支持</strong>：支持多種語言嘅實時翻譯</li>
        </ul>
        
        <h3 id="advantages">技術優勢</h3>
        <p>Comet瀏覽器採用咗最新嘅自然語言處理技術，能夠更好地理解用戶需求。</p>
      `,
      'en': `
        <h2 id="intro">Perplexity Comet Browser Overview</h2>
        <p>Perplexity Comet is an AI-powered smart browser developed by the well-known AI company Perplexity. This browser focuses on enhancing users' search and content understanding experience.</p>
        
        <h3 id="features">Core Features</h3>
        <ul>
          <li><strong>Intelligent Search</strong>: Understands user search intent and provides more accurate results</li>
          <li><strong>Content Understanding</strong>: Automatically analyzes webpage content and extracts key information</li>
          <li><strong>Tag Management</strong>: Intelligently categorizes and organizes browsing history</li>
          <li><strong>Multi-language Support</strong>: Supports real-time translation in multiple languages</li>
        </ul>
        
        <h3 id="advantages">Technical Advantages</h3>
        <p>Comet browser adopts the latest natural language processing technology to better understand user needs.</p>
      `
    },
    category: { 'zh-CN': 'AI工具', 'zh-HK': 'AI工具', 'en': 'AI Tools' },
    date: '2025-10-23',
    readTime: { 'zh-CN': '4分钟阅读', 'zh-HK': '4分鐘閱讀', 'en': '4 min read' },
    featured: true,
    tags: ['AI浏览器', 'Perplexity', 'Comet', '智能浏览器', 'AI助手', 'Comet浏览器下载']
  }
]

interface BlogDetailPageProps {
  params: {
    id: string
  }
}

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { language } = useLanguage()
  const t = translations[language]

  // 由于这是客户端组件，我们需要使用useEffect来处理异步参数
  const [post, setPost] = React.useState<any>(null)
  const [postId, setPostId] = React.useState<number | null>(null)

  React.useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      const id = parseInt(resolvedParams.id)
      setPostId(id)
      setPost(blogPosts.find(p => p.id === id))
    }
    resolveParams()
  }, [params])
  
  // 加载状态
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 00-3.41 19.4c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0112 6.84c.85.004 1.7.115 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">加载中...</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">正在加载博客文章内容，请稍候。</p>
        </div>
      </div>
    )
  }

  // 提取Markdown内容中的标题用于生成目录
  const extractHeadings = (content: string) => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm
    const headings: { level: number; text: string; id: string }[] = []
    let match
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      headings.push({ level, text, id })
    }
    
    return headings
  }

  const headings = extractHeadings(post.content[language])

  // 获取相关文章（同分类的其他文章）
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category[language] === post.category[language])
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 简洁的页面头部 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 面包屑导航 */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">首页</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">{t.blog.title}</Link>
            <span>›</span>
            <span className="text-gray-900">{post.title[language]}</span>
          </nav>
          
          {/* 文章标题和元信息 */}
          <div className="text-center">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
              {post.category[language]}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title[language]}
            </h1>
            <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {post.date}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime[language]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 文章内容区域 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
          {/* 文章内容 - 使用ReactMarkdown渲染 */}
          <article className="prose prose-lg max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => (
                  <h1 
                    id={props.children?.toString().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')} 
                    className="text-3xl font-bold text-gray-900 mt-12 mb-6 pb-2 border-b border-gray-200"
                    {...props} 
                  />
                ),
                h2: ({node, ...props}) => (
                  <h2 
                    id={props.children?.toString().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')} 
                    className="text-2xl font-semibold text-gray-800 mt-10 mb-4"
                    {...props} 
                  />
                ),
                h3: ({node, ...props}) => (
                  <h3 
                    id={props.children?.toString().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')} 
                    className="text-xl font-semibold text-gray-800 mt-8 mb-3"
                    {...props} 
                  />
                ),
                h4: ({node, ...props}) => (
                  <h4 
                    id={props.children?.toString().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')} 
                    className="text-lg font-medium text-gray-800 mt-6 mb-2"
                    {...props} 
                  />
                ),
                h5: ({node, ...props}) => (
                  <h5 
                    id={props.children?.toString().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')} 
                    className="text-base font-medium text-gray-800 mt-4 mb-2"
                    {...props} 
                  />
                ),
                h6: ({node, ...props}) => (
                  <h6 
                    id={props.children?.toString().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-')} 
                    className="text-sm font-medium text-gray-800 mt-3 mb-1"
                    {...props} 
                  />
                ),
                p: ({node, ...props}) => (
                  <p className="text-gray-700 leading-relaxed mb-6" {...props} />
                ),
                ul: ({node, ...props}) => (
                  <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2" {...props} />
                ),
                ol: ({node, ...props}) => (
                  <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2" {...props} />
                ),
                li: ({node, ...props}) => (
                  <li className="pl-2" {...props} />
                ),
                strong: ({node, ...props}) => (
                  <strong className="font-semibold text-gray-900" {...props} />
                ),
                em: ({node, ...props}) => (
                  <em className="italic text-gray-800" {...props} />
                ),
                a: ({node, ...props}) => (
                  <a className="text-blue-600 hover:text-blue-800 underline transition-colors" {...props} />
                ),
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6" {...props} />
                ),
                code: ({node, ...props}) => {
                  const { className, children, ...rest } = props as any
                  const isInline = className?.includes('inline')
                  
                  if (isInline) {
                    return <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono" {...rest}>{children}</code>
                  }
                  return <code className="block bg-gray-100 text-gray-800 p-4 rounded-lg text-sm font-mono my-4 overflow-x-auto" {...rest}>{children}</code>
                },
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto my-6">
                    <table className="min-w-full border-collapse border border-gray-300" {...props} />
                  </div>
                ),
                th: ({node, ...props}) => (
                  <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-gray-900" {...props} />
                ),
                td: ({node, ...props}) => (
                  <td className="border border-gray-300 px-4 py-2 text-gray-700" {...props} />
                ),
              }}
            >
              {post.content[language]}
            </ReactMarkdown>
          </article>
        </div>

        {/* 底部导航 */}
        <div className="mt-12 text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回博客列表
          </Link>
          
          <div className="mt-6 text-sm text-gray-500">
            <span>© 2024 星点工具箱 • 专注于优质工具和教程</span>
          </div>
        </div>
      </div>
    </div>
  )
}