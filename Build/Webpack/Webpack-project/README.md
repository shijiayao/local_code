
# Webpack 参考配置

为项目提供 Webpack 配置参考，多页面参考百度设置；

## 如何运行

> node 版本 `>=8.11.3`

```Shell
# 安装依赖
npm install

# 开发
npm start
npm run dev

# 预发布（上测试）打包
# npm run pre

# 发布（上线）打包
npm run build
```

【其他说明】

## 项目维护

| 角色     | 人员           |
| -------- | -------------- |
| 前端开发 | 【xxx】【yyy】 |
| 后端开发 | 【xxx】        |
| 产品经理 | 【xxx】        |
| 交互设计 | 【xxx】        |

### 需求文档说明

- 【[需求文档](https://xxx)】
- 【[数据接口](https://xxx)】
- 【[设计稿](https://xxx)】

## 业务介绍

【业务描述】

### 页面信息

| 页面目录  | 页面描述     | 页面链接                                 | 参数描述 |
| --------- | ------------ | ---------------------------------------- | -------- |
| 【index】 | 【首页】     | 【[https://xxx.com](https://xxx.com/)】  | 【...】  |
| 【index】 | 【测试地址】 | 【[https://xxx.com/](https://xxx.com/)】 | 【...】  |
| 【index】 | 【线上地址】 | 【[https://xxx.com](https://xxx.com/)】  | 【...】  |

## 项目结构说明

> 以下是举例说明，请根据实际情况修改，请删除此行。

- `/www-root`：根目录
- `/www-root/src`：源代码目录
- 【其他】

```Shell
.
├─ .editorconfig # 编码规范
├─ .eslintignore # ESLint 忽略检查配置
├─ .eslintrc.js # ESLint 检查规则
├─ .gitignore # 忽略提交规则
├─ .prettierrc.js # 代码格式配置，自动修复依据
├─ package-lock.json # 依赖版本控制
├─ package.json # 依赖
├─ README.md
├─ webpack.config.js # Webpack 配置文件
└─ www-root # 根目录
    └─src # 源代码目录
        │  index.html # 静态模板
        ├─css
        ├─images
        └─javascript
                main.js # 入口文件
```

## 其他事项

补充说明

> 【项目备注】
