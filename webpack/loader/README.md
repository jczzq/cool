# Webpack Loader简析（一）：基本概念

## 准备工作
- 安装 [Node.js](https://nodejs.org/en/), 建议安装LTS长期支持版本
- `mkdir webpack` and `cd webpack` and `npm init -y`
- `npm i webpack webpack-cli --save-dev`

## webpack loader是做什么的
webpack loader对js代码、样式、图片等资源重新编译返回一个理想的结果，本质上说，loader是一些特殊的webpack插件，当然webpack本身有plugin的概念。

## webpack loader能干什么
创建文件如下：
```
-- a.css
-- index.html
-- index.js
-- webpack.config.js
```

> a.css
```
#app {
    background-color: #F5F5F5;
    color: blue;
}
```

> index.html
```
<div id="app">
    <h4>hello webpack!</h4>
    <p>hello loader!</p>
</div>
<script src="./main.js"></script>
```

> index.js
```
const a = require('./a.css');
console.log(a);
```

> webpack.config.js
```
module.exports = {
    entry: {
        main: './index.js'
    },
    output: {
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'css-loader'
            }
        ]
    }
}
```

上面的代码很常见，webpack帮助我们加载.css文件。当weback在构建的过程中会根据已有配置首先将a.css作为参数交给css-loader, css-loader将会进行一系列处理输出特定的数据。实际上`a.css`会作为`raw resource string`类型的参数，有一些loader只能接受raw作为参数，例如css-loader、handlebars-loader...
执行`npx webpack`
![clipboard.png](/img/bVbffP5)
可以看到，css-loader将样式代码处理成了js数组
修改`webpack.config.js`
```
...
module: {
    rules: [
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }
    ]
}
...
```
加上`style-loader`，再看看输出的啥：

![clipboard.png](/img/bVbffSn)

![clipboard.png](/img/bVbffSL)
如你所见，style-loader将css-loader返回的样式数组插入到html中去了，然后他自己返回了一个空对象
> loader特性之一就是：利用参数完成某个任务，不必有所输出。
显然style-loader就是符合这种特性的loader之一，它与css-loader搭配起来实现了我们需要的功能。并且他们各自独立，保持小而精的运行，方便与其他loader搭配合作，比如当我想把样式代码输出为js字符串时我就会选择`to-string-loader`，首先安装这个新的partner，`npm i to-string-loader`，然后
```
...
module: {
    rules: [
        {
            test: /\.css$/,
            use: [ 'to-string-loader', 'css-loader' ]
        }
    ]
}
...
```
重新构建后结果如下：

![clipboard.png](/img/bVbff17)

## 关于css-loader
[css-loader](https://github.com/webpack-contrib/css-loader#url)使用频率比较高，它有一些配置可以帮助我们实现特定需求。
```
...
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                'to-string-loader',
                {
                   loader: 'css-loader',
                   options: {
                       url: true,        // 是否启用url(), 类似于 url(image.png)` => `require('./image.png')
                       import: true,     // 是否启用@import()加载样式
                       modules: false,   // 是否启用CSS Modules
                       localIdentName: [hash:base64],	// Configure the generated ident
                       sourceMap: false,    // Enable/Disable Sourcemaps
                       camelCase: false,    // Export Classnames in CamelCase
                       importLoaders: 0    // Number of loaders applied before CSS loader
                   } 
                }
            ]
        }
    ]
}
...
```

## 参考链接
- [Webpack文档 - 加载器Loaders](http://webpack.css88.com/concepts/loaders.html)