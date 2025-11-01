# Vercel 部署指南

## 项目概述
星点工具箱 (StarDot Tools) 是一个基于 Next.js 的多语言在线工具平台，支持简体中文、粤语和英文。

## 部署到 Vercel

### 方法一：通过 Vercel CLI 部署

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel
   ```

4. **部署到生产环境**
   ```bash
   vercel --prod
   ```

### 方法二：通过 GitHub 集成部署

1. **将代码推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **在 Vercel 中导入项目**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - 配置部署设置（Vercel 会自动检测 Next.js 项目）
   - 点击 "Deploy"

## 项目配置

### Vercel 配置 (vercel.json)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "functions": {
    "app/blog/[id]/page": {
      "maxDuration": 30
    }
  },
  "env": {
    "NODE_ENV": "production"
  },
  "build": {
    "env": {
      "NEXT_PUBLIC_VERCEL_ENV": "production"
    }
  }
}
```

### Next.js 配置 (next.config.ts)
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "dist",
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
```

## 环境变量

如果需要配置环境变量，可以在 Vercel 项目设置的 "Environment Variables" 部分添加：

- `NODE_ENV`: production
- `NEXT_PUBLIC_VERCEL_ENV`: production

## 部署注意事项

1. **构建产物**：项目配置为将构建产物输出到 `dist/` 目录
2. **动态路由**：`/blog/[id]` 路由使用服务端渲染，已配置适当的函数超时时间
3. **图片优化**：配置为不优化图片以兼容静态导出
4. **多语言支持**：项目支持简体中文、粤语和英文三种语言

## 自定义域名

部署完成后，可以在 Vercel 项目设置的 "Domains" 部分添加自定义域名。

## 监控和日志

- **性能监控**：Vercel 提供内置的性能监控
- **访问日志**：可以在 Vercel 仪表板查看访问日志
- **错误追踪**：集成错误追踪功能

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 `package.json` 中的依赖是否正确
   - 确保 TypeScript 配置正确

2. **路由问题**
   - 检查 `vercel.json` 中的路由配置
   - 验证动态路由是否正确配置

3. **环境变量问题**
   - 确保所有必要的环境变量已在 Vercel 中设置

### 本地测试

在部署前，建议先在本地测试：

```bash
# 开发模式
npm run dev

# 生产构建测试
npm run build
npm start
```

## 技术支持

如有部署问题，请参考：
- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署指南](https://nextjs.org/docs/deployment)

---

*最后更新: 2024年*