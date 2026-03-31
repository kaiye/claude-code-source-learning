# Claude Code 请求优化与路由调研（2026-03-31）

## 背景
当前项目依赖仅有 `@anthropic-ai/claude-code`，并基于以下文件恢复源码后进行分析：
- `node_modules/@anthropic-ai/claude-code/cli.js`
- `node_modules/@anthropic-ai/claude-code/cli.js.map`

恢复结果目录：
- `recovered/claude-code-original/`

## 1. 已确认的请求主链路
- `src/query.ts` -> `deps.callModel`
- `src/query/deps.ts` -> `queryModelWithStreaming`
- `src/services/api/claude.ts` -> 组装 `messages/system/tools/thinking/max_tokens` 后发起 `anthropic.beta.messages.create(..., stream: true)`

这意味着：主请求体大小主要受 `system + messages + tools + thinking` 影响，请求次数主要受循环轮次、工具调用链、自动压缩/补偿路径影响。

## 2. 仅配置方式：少发请求 + 缩小请求体

### 2.1 少发请求（建议默认）
- `--bare` / `CLAUDE_CODE_SIMPLE=1`
- `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=0`
- `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`
- `DISABLE_AUTO_COMPACT=1`
- `CLAUDE_CODE_DISABLE_THINKING=1` 或 `--thinking disabled`

### 2.2 极限瘦身（可选）
- `CLAUDE_CODE_DISABLE_CLAUDE_MDS=1`
- `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=1`
- `--system-prompt "<短提示词>"`
- `--tools ""`（会显著影响可执行能力，仅在你明确不需要工具时启用）

## 3. zsh 覆盖 `claude` 的推荐函数

> 说明：同名 alias 易递归，建议同名函数。

```zsh
claude(){ CLAUDE_CODE_SIMPLE=1 CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=0 CLAUDE_CODE_DISABLE_AUTO_MEMORY=1 DISABLE_AUTO_COMPACT=1 CLAUDE_CODE_DISABLE_CLAUDE_MDS=1 CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=1 CLAUDE_CODE_DISABLE_THINKING=1 command claude --bare --thinking disabled --system-prompt 'You are a concise coding assistant. Keep context and output minimal.' "$@"; }
```

可选极限模式：

```zsh
alias claude-tight='CLAUDE_CODE_SIMPLE=1 CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=0 CLAUDE_CODE_DISABLE_AUTO_MEMORY=1 DISABLE_AUTO_COMPACT=1 CLAUDE_CODE_DISABLE_CLAUDE_MDS=1 CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=1 CLAUDE_CODE_DISABLE_THINKING=1 command claude --bare --thinking disabled --tools "" --system-prompt "You are a concise coding assistant. Keep context and output minimal."'
```

## 4. 关于 `/model opusplan` 与“复杂度路由”

### 4.1 结论
`opusplan` 不是复杂度路由；它只是“plan 模式用 Opus，其他模式用 Sonnet”。

### 4.2 证据
- `src/utils/model/model.ts`：`opusplan` 在 `permissionMode === 'plan'` 时切到 Opus
- `src/utils/model/modelOptions.ts`：`Opus Plan Mode` 描述为 `Use Opus 4.6 in plan mode, Sonnet 4.6 otherwise`

## 5. 关于 `/btw` 是否能做旁路复杂度识别

### 5.1 结论
不建议：`/btw` 自身就是 forked LLM 调用，会增加请求，而不是本地零成本分类。

### 5.2 证据
- `src/commands/btw/btw.tsx` 调用 `runSideQuestion`
- `src/utils/sideQuestion.ts` 中 `runSideQuestion` -> `runForkedAgent`，`maxTurns: 1`

## 6. 推荐的端云协同架构（你提出的 3）

1. 在 shell wrapper 先做复杂度分类（本地 llama 或自定义云模型）。
2. 复杂度低于阈值：走自定义模型。
3. 高于阈值：走 `claude`（可叠加第 2 节的最小化参数）。
4. 建议先做非交互 `-p` 场景，再扩展交互会话。

伪代码：

```bash
score = classifier(prompt)
if score >= THRESHOLD:
  run claude (minimized config)
else:
  run custom-model
```

## 7. 关键源码路径索引
- `recovered/claude-code-original/src/query.ts`
- `recovered/claude-code-original/src/query/deps.ts`
- `recovered/claude-code-original/src/services/api/claude.ts`
- `recovered/claude-code-original/src/services/api/client.ts`
- `recovered/claude-code-original/src/services/api/dumpPrompts.ts`
- `recovered/claude-code-original/src/constants/prompts.ts`
- `recovered/claude-code-original/src/setup.ts`
- `recovered/claude-code-original/src/utils/hooks.ts`
- `recovered/claude-code-original/src/query/stopHooks.ts`
- `recovered/claude-code-original/src/context.ts`

---

如需下一步，我可以在这个仓库里再补两份可执行脚本：
- `scripts/claude-min.zsh`（最小请求体包装）
- `scripts/claude-router.zsh`（复杂度阈值路由）
