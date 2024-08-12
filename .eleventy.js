const webc = require('@11ty/eleventy-plugin-webc')

module.exports = (Config) => {
    Config.addPlugin(webc)

    return {
        dir: {
            input: '_input',
            output: '_output',
            includes: '../_include',
            layouts: '../_include/layout'
        }
    }
}