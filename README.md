## scripts

在根目录执行如下命令用于创建新项目,可以根据需求在`templates/*`中定制自己的模板.

```bash
# 根据模板 vite-app 在 apps/* 工作去创建一个新项目
pnpm run new-app --template <TEMPLATE_NAME> --name <PROJECT_NAME>
```

- `TEMPLATE_NAME`: 位于 `templates/*` 工作区内部的模板文件夹名称
- `PROJECT_NAME`: 新建的项目名称
  > 案例: `pnpm run new-app --template vite-app --name my-custom-app`
