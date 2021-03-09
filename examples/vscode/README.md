# 在 vscode 中使用 eslint-plugin-lint-md

## 安装 eslint 插件

在 vscode 插件商店中搜索 `eslint`，安装之：

![](http://cdn.yuzzl.top/blog/20210309102904.png)

## 追加配置

- 在项目根目录下新建 `.vscode` 目录，然后新建 `settings.json` 文件（如果已有，忽略此步骤）
- 追加如下配置，让 eslint 插件审查 markdown 文件：

```json
{
  "eslint.validate": [
    "markdown"
  ]
}
```

![](http://cdn.yuzzl.top/blog/20210309103150.png)

## 查看效果

最终效果如图所示：

![](http://cdn.yuzzl.top/blog/20210309103609.png)