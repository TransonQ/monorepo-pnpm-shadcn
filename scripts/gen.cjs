// 引入必要的模块
const fs = require("fs-extra")
const path = require("path")
const inquirer = require("inquirer")
const prompt = inquirer.createPromptModule()

// 定义模板目录路径
const templatesDir = path.join(__dirname, "../templates")
const appsDir = path.join(__dirname, "../apps")
const examplesDir = path.join(__dirname, "../examples")

// 获取所有模板（templates 目录下的一级文件夹）
const getTemplates = () => {
  return fs
    .readdirSync(templatesDir)
    .filter((file) => fs.statSync(path.join(templatesDir, file)).isDirectory())
}

// 检查项目名称是否合法（目标目录中是否有相同名称的文件夹）
const isProjectNameValid = (projectName, targetDir) => {
  const projectPath = path.join(targetDir, projectName)
  return !fs.existsSync(projectPath)
}

// 主函数，使用 async/await 处理用户交互
;(async function () {
  // Step 1: 选择模板
  const templates = getTemplates()
  if (templates.length === 0) {
    console.error("Error: No templates found in the templates directory.")
    process.exit(1)
  }

  const { templateName } = await prompt([
    {
      type: "list",
      name: "templateName",
      message: "请选择模板:",
      choices: templates,
      default: templates[0],
    },
  ])

  // Step 2: 输入项目名称，且不能与已有文件夹名称冲突
  let projectName = ""
  while (true) {
    const { inputProjectName } = await prompt([
      {
        type: "input",
        name: "inputProjectName",
        message: "请输入项目名称:",
        validate: (input) => (input ? true : "项目名称不能为空"),
      },
    ])
    projectName = inputProjectName

    // 检查 apps 和 examples 中是否有重名的项目
    if (
      isProjectNameValid(projectName, appsDir) &&
      isProjectNameValid(projectName, examplesDir)
    ) {
      break
    } else {
      console.error(`Error: 项目名称 "${projectName}" 已存在，请重新输入.`)
    }
  }

  // Step 3: 选择目标工作区，默认是 apps 文件夹
  const { targetWorkspace } = await prompt([
    {
      type: "list",
      name: "targetWorkspace",
      message: "请选择目标工作区:",
      choices: ["apps", "examples"],
      default: "apps",
    },
  ])

  // 根据选择的工作区确定目标目录
  const targetDir = targetWorkspace === "apps" ? appsDir : examplesDir
  const targetPath = path.join(targetDir, projectName)

  // Step 4: 复制模板到目标目录并更新 package.json
  fs.copy(path.join(templatesDir, templateName), targetPath)
    .then(() => {
      console.log(
        `Template "${templateName}" successfully copied to ${targetPath}`
      )

      // 定位复制项目的 package.json
      const packageJsonPath = path.join(targetPath, "package.json")

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
})()
