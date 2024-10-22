#!/usr/bin/env node

// 引入必要的模块
const fs = require("fs-extra")
const path = require("path")
const { Command } = require("commander")

// 初始化 commander
const program = new Command()

// 定义命令和选项
program
  .option("--template <templateName>", "specify the template name")
  .option("--name <projectName>", "specify the project name")
  .parse(process.argv)

// 获取命令行参数
const options = program.opts()

// 检查是否提供了 --template 和 --name 参数
if (!options.template) {
  console.error(
    "Error: Please provide a template name using --template <template-name>"
  )
  process.exit(1)
}

if (!options.name) {
  console.error(
    "Error: Please provide a project name using --name <project-name>"
  )
  process.exit(1)
}

// 获取模板名称和项目名称
const templateName = options.template
const projectName = options.name

// 定义模板目录
const templatesDir = path.join(__dirname, "../templates")
const templatePath = path.join(templatesDir, templateName)

// 检查模板是否存在
if (!fs.existsSync(templatePath)) {
  console.error(
    `Error: Template "${templateName}" not found in templates directory.`
  )
  process.exit(1)
}

// 定义目标目录，项目名称会作为文件夹名
const targetDir = path.join(__dirname, "../apps", projectName)

// 将模板文件夹复制到目标目录
fs.copy(templatePath, targetDir)
  .then(() => {
    console.log(
      `Template "${templateName}" successfully copied to ${targetDir}`
    )

    // 定位复制项目的 package.json
    const packageJsonPath = path.join(targetDir, "package.json")

    // 检查 package.json 是否存在
    if (fs.existsSync(packageJsonPath)) {
      // 读取 package.json 文件
      const packageJson = fs.readJsonSync(packageJsonPath)

      // 更新 name 字段为项目名称
      packageJson.name = projectName

      // 将更新后的内容写回 package.json 文件
      fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 })
      console.log(`Updated "name" field in package.json to "${projectName}"`)
    } else {
      console.warn("Warning: No package.json found in the template.")
    }
  })
  .catch((err) => {
    console.error("Error copying template:", err)
  })
