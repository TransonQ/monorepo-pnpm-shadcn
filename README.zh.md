# pnpm monorepo shadcn/ui

## 工作区

```yaml
# pnpm-workspace.yaml
packages:
  - apps/*
  - examples/*
  - packages/*
  - templates/*
```

## 项目结构

```bash
├───...
├───📁 apps/
├───📁 examples/
├───📁 packages/
│   ├───📁 config-taiwind/
│   ├───📁 config-ts/
│   ├───📁 libs/
│   └───📁 ui-shadcn/
├───📁 scripts/
├───📁 templates/
│   └───📁 vite-app/
├───📄 ...
└───📄 pnpm-workspace.yaml
```

## 脚本

在根目录执行如下命令用于创建新项目,可以根据需求在`templates/*`中定制自己的模板.

```bash
# 根据模板 vite-app 在 apps/* 工作去创建一个新项目
pnpm run new-app
```

案例:

```bash
pnpm run new-app
---
✔ Please select a template: vite-app # will list your tempaltes in `templates/*`
✔ Please enter the project name: my-app # input project name
✔ Please select the target workspace: examples
# This step will create a new project in the `examples/*` folder based on your template
```
