# claude-code-source

这个仓库用于研究 `@anthropic-ai/claude-code` 的恢复源码、请求链路、提示词结构和路由策略。

## 目录
- [`recovered/claude-code-original/`](./recovered/claude-code-original/)：从 `cli.js + cli.js.map` 恢复出的源码。
- [`claude-code-routing-research/`](./claude-code-routing-research/)：研究文档（按 `日期 + topic` 命名）。
- [`study-sessions/`](./study-sessions/)：学习用会话记录（jsonl）。

## recovered/claude-code-original 结构说明

```text
recovered/claude-code-original/
├── src/                      # 恢复出的主源码（业务逻辑、CLI、工具、服务）
│   ├── entrypoints/          # 入口
│   │   ├── cli.tsx
│   │   ├── mcp.ts
│   │   └── init.ts
│   ├── main.tsx              # 主流程入口
│   ├── constants/            # 提示词、常量配置
│   ├── services/             # API、会话、压缩、分析等服务
│   └── utils/                # 通用工具函数
├── dist/                     # 原始 bundle 产物复制
│   ├── cli.js
│   └── cli.js.map
├── vendor/                   # 内置 vendor 源码
├── node_modules/             # sourcemap 中包含的依赖源码
├── MANIFEST.json             # 恢复汇总（文件数统计等）
├── MANIFEST.files.json       # 恢复出的完整文件清单
└── RECOVERY_NOTES.md         # 恢复说明与限制
```

关键入口跳转：
- [`recovered/claude-code-original/src/main.tsx`](./recovered/claude-code-original/src/main.tsx)
- [`recovered/claude-code-original/src/entrypoints/cli.tsx`](./recovered/claude-code-original/src/entrypoints/cli.tsx)
- [`recovered/claude-code-original/src/constants/prompts.ts`](./recovered/claude-code-original/src/constants/prompts.ts)
- [`recovered/claude-code-original/RECOVERY_NOTES.md`](./recovered/claude-code-original/RECOVERY_NOTES.md)

## 调研索引
- [2026-03-31 · Source Recovery](./claude-code-routing-research/2026-03-31-source-recovery.md)
- [2026-03-31 · Request Minimization And Routing](./claude-code-routing-research/2026-03-31-request-minimization-and-routing.md)（含 `claude()`：保登录态 + 隐藏 email + 请求瘦身）
- [2026-03-31 · System Prompt Analysis (CN)](./claude-code-routing-research/2026-03-31-system-prompt-analysis-cn.md)

## 相关文件
- [Session jsonl (2026-03-31)](./study-sessions/rollout-2026-03-31T18-24-06-019d436c-05dd-7822-89bd-ddd9c70c0fd7.jsonl)
