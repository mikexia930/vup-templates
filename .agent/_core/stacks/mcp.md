# Stack: MCP

- 工具定义放 `src/tools/<tool-name>.ts` 或项目既有目录。
- 工具注册集中在 `src/tools/index.ts`。
- 输入输出 schema 要明确，错误信息要能被 AI 客户端理解。
- 不把业务密钥写进工具代码。
- 新增外部服务调用前确认鉴权、超时和错误处理。
