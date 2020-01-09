module.exports = {
    publicPath: './', // 使用相对路径，防止在 tomcat 服务器下，静态资源加载不出来
    configureWebpack: {
        performance: {
            hints: 'warning', // 入口起点的最大体积 整数类型（以字节为单位）
            maxEntrypointSize: 50000000, // 生成文件的最大体积 整数类型（以字节为单位 3000k）
            maxAssetSize: 300000000, // 给出 js css 文件的性能提示
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
            }
        }
    }
}
