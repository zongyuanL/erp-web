const Timestamp = new Date().getTime();

module.exports = {
    configureWebpack: { // webpack 配置
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
          filename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
          chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
        },
    },
    publicPath: './',
    outputDir: undefined,
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined,
    chainWebpack: config => {
        // remove the prefetch plugin
        config.plugins.delete('prefetch')

    }
}
