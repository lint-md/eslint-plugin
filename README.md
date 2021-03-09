# eslint-plugin-lint-md

依靠各个 IDE 对 eslint 不错的支持，让 lint-md 玩家也能得到愉悦的文档编写体验。

![](https://user-images.githubusercontent.com/56540811/110348136-48bb7480-806c-11eb-89ec-ad9ee2ab42f1.png)

## 安装

```shell
# use npm
npm install eslint eslint-plugin-lint-md

# use yarn
yarn add eslint eslint-plugin-lint-md
```

## 使用

为你的 `.eslintrc.js`
追加以下配置，关于规则的详细信息请参考 [lint-md](https://github.com/lint-md/lint-md#%E6%A3%80%E6%9F%A5%E7%B1%BB%E5%9E%8B)

```javascript
module.exports = {
  extends: ['plugin:lint-md/recommend']
}
```

执行下面的命令尝试 lint，具体参数请根据项目实际情况进行调整：

```shell
eslint --ext .md ./
```

效果如下：

![](http://cdn.yuzzl.top/blog/20210309114543.png)

## IDE 支持

### 在 vscode 中使用 eslint-plugin-lint-md

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

### 在 webstorm 中使用 eslint-plugin-lint-md

#### 设置 .md 后缀支持

- 进入 `file -> settings -> languages & frameworks -> JavaScript -> Code Quality Tools -> ESLint` 设置项
- 在 `Run for files` 一栏中添加 `.md` 后缀。
- 点击 ok 保存设置

![](http://cdn.yuzzl.top/blog/20210309104303.png)

#### 查看效果

最终效果如图所示：

![](http://cdn.yuzzl.top/blog/20210309104035.png)