# @lint-md/eslint-plugin

:sunglasses: 基于 @lint-md，提供 eslint-plugin，让 lint-md 玩家得到愉悦的文档编写体验。

![](http://cdn.yuzzl.top/blog/20210309172714.png)

## 安装

```shell
# use npm
npm install eslint @lint-md/eslint-plugin

# use yarn
yarn add eslint @lint-md/eslint-plugin
```

## 使用

为你的 `.eslintrc.js`
追加以下配置，关于规则的详细信息请参考 [lint-md](https://github.com/lint-md/lint-md#%E6%A3%80%E6%9F%A5%E7%B1%BB%E5%9E%8B)

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
        '@lint-md/no-long-code': [2, {
          "length": 100,
          "exclude": []
        }]
      }
    }
  ],
}
```

执行下面的命令尝试 lint，具体参数请根据项目实际情况进行调整：

```shell
eslint --ext .md ./
```

效果如下：

![](http://cdn.yuzzl.top/blog/20210309114543.png)

## IDE 支持

### 在 vscode 中使用

#### 安装 eslint 插件

在 vscode 插件商店中搜索 `eslint`，安装之：

![](http://cdn.yuzzl.top/blog/20210309102904.png)

#### 追加配置

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

#### 查看效果

最终效果如图所示：

![](http://cdn.yuzzl.top/blog/20210309103609.png)

### 在 webstorm 中使用

#### 设置 .md 后缀支持

- 进入 `file > settings > languages & frameworks > JavaScript > Code Quality Tools > ESLint` 设置项
- 在 `Run for files` 一栏中添加 `.md` 后缀。
- 点击 ok 保存设置

![](http://cdn.yuzzl.top/blog/20210309104303.png)

#### 查看效果

最终效果如图所示：

![](http://cdn.yuzzl.top/blog/20210309104035.png)

> TIP: webstorm 2021.1 及以上版本的 eslint 插件支持自定义检测文件后缀名

## 其它案例

更多案例及配置文件请移步仓库 `examples` 目录。 
