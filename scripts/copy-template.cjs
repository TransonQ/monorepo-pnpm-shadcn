// 引入 fs-extra 模块，用于文件操作
const fs = require("fs-extra")
const path = require("path")

// 从命令行参数中获取模板名称
const args = process.argv.slice(2)
const templateArg = args.find((arg) => arg.startsWith("--template="))
if (!templateArg) {
  console.error(
    "Error: Please provide a template name using --template=<template-name>"
  )
  process.exit(1)
}
const templateName = templateArg.split("=")[1]

// 定义模板目录和目标目录
const templatesDir = path.join(__dirname, "../templates")
const targetDir = path.join(__dirname, "../apps", templateName)

// 检查模板是否存在
const templatePath = path.join(templatesDir, templateName)
if (!fs.existsSync(templatePath)) {
  console.error(
    `Error: Template "${templateName}" not found in templates directory.`
  )
  process.exit(1)
}

// 将模板文件夹复制到 apps 目录下
fs.copy(templatePath, targetDir)
  .then(() => {
    console.log(
      `Template "${templateName}" successfully copied to ${targetDir}`
    )
  })
  .catch((err) => {
    console.error("Error copying template:", err)
  })
