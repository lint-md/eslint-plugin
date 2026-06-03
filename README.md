# @lint-md/eslint-plugin

:sunglasses: 基于 @lint-md 的 ESLint 插件，提供更顺滑的 Markdown 文档校验体验。

![](http://cdn.yuzzl.top/blog/20210309172714.png)

## 安装

```shell
# use npm
npm install eslint @lint-md/eslint-plugin

# use yarn
yarn add eslint @lint-md/eslint-plugin
```

## 快速开始

在 `.eslintrc.js` 中追加以下配置。  
规则说明请参考 [lint-md 检查类型](https://github.com/lint-md/lint-md#%E6%A3%80%E6%9F%A5%E7%B1%BB%E5%9E%8B)。

```javascript
module.exports = {
  extends: ['plugin:@lint-md/recommend'],
  overrides: [
    {
      files: ['*.md'],
      // 0.0.x 版本为 '@lint-md/eslint-plugin/src/parser'
      parser: '@lint-md/eslint-plugin/lib/parser',
      rules: {
        // 在这里覆盖已有的 rules
        '@lint-md/no-long-code': [
          2,
          {
            length: 100,
            exclude: [],
          },
        ],
      },
    },
  ],
}
```

执行 lint（参数可按项目实际调整）：

```shell
eslint --ext .md ./
```

命令行效果：

![](http://cdn.yuzzl.top/blog/20210309114543.png)

## IDE 支持

### VS Code

1. 在插件市场搜索并安装 `eslint` 插件。

   ![](http://cdn.yuzzl.top/blog/20210309102904.png)

2. 在项目根目录新建（或复用）`.vscode/settings.json`，追加：

   ```json
   {
     "eslint.validate": ["markdown"]
   }
   ```

   ![](http://cdn.yuzzl.top/blog/20210309103150.png)

3. 预览效果：

   ![](http://cdn.yuzzl.top/blog/20210309103609.png)

### WebStorm

1. 进入 `File > Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint`。
2. 在 `Run for files` 中添加 `.md` 后缀。
3. 点击 `OK` 保存。

![](http://cdn.yuzzl.top/blog/20210309104303.png)

效果如下：

![](http://cdn.yuzzl.top/blog/20210309104035.png)

> TIP: WebStorm 2021.1 及以上版本的 ESLint 插件支持自定义检测文件后缀名。

## 更多示例

更多案例与配置请查看仓库 `examples` 目录。
