# 页面私有文件目录（约定）

本目录 `_` 用于存放**非页面**的页面级文件，如：

- `translation.ts` - 页面多语言配置
- `useBeSurrogateV2Storage.ts` - 页面专用 composable

**规范**：凡需放在页面下、但不作为路由的文件，统一放在 `_` 目录内。
prerender 会自动忽略所有包含 `/_/` 的路径，无需在 nuxt.config 中逐个配置。

其他页面可参考此结构，例如：

```
pages/
  some-page/
    index.vue      # 页面
    _/
      translation.ts
      useSomeComposable.ts
```
