# Module Rules

## 原则

vup 使用 module-first
architecture：所有业务功能都按业务域拆分模块。统一的是模块边界和注册方式，不是所有平台都使用同一个目录名。

## 现有风格优先

新增或修改模块前，先查看目标 app 中 1-2 个已有同类模块。已有目录、命名、注册方式明确时，沿用现有风格；只有没有先例时，才使用本文件默认结构。

## 模块定义

- 一个模块对应一个业务域或明确功能域。
- 模块内部高内聚：页面、组件、接口、类型、状态、文案优先跟随模块。
- 模块对外只暴露 public API。
- 其他模块禁止深引用模块内部实现文件。
- 模块接入应用必须通过显式注册点完成。
- 删除模块时，必须能列出所有注册点和影响面。

## 前端默认落点

Vue / Electron renderer / Capacitor / WXT 默认：

```
src/modules/<module>/
├── index.ts
├── views/
├── components/
├── api/
├── stores/
├── types/
└── locales/
```

只创建当前任务需要的目录，不为了完整性创建空目录。

## uni-app 落点

uni-app 使用薄页面入口 + 模块实现：

```
src/pages/<page>/index.vue
src/modules/<module>/
```

`src/pages` 负责路由入口，复杂业务放 `src/modules/<module>/`。

## Nest 落点

Nest 本身就是 module-first。业务模块直接放在
`src/<module>/`，不要为了和前端统一强行放进 `src/modules/`。

```
src/<module>/
├── <module>.module.ts
├── <resource>.controller.ts
├── <resource>.service.ts
├── dto/
└── entities/
```

共享能力放 `src/common/`，数据库相关放 `src/database/` 或项目既有目录。

## 注册点清单

新增、删除或移动模块时必须检查：

前端：

- route / page entry
- menu / permission code / button permission
- i18n aggregation
- store registration or composable export
- API / mock handler / type export
- module public export: `src/modules/<module>/index.ts`

Nest：

- `AppModule` or parent module imports
- feature module providers/controllers
- entity registry / migration / seed / fixture
- guard / decorator / permission metadata
- OpenAPI tag or controller prefix if the project uses it

## 命名

- 模块目录名使用 kebab-case 或项目既有风格。
- Nest feature module 使用 `<name>.module.ts`。
- Store 使用 `use<Name>Store`，除非项目已有 `store<Name>` 风格。
- 类型名使用业务名，不使用 `IData`、`IResult` 这类泛名。
