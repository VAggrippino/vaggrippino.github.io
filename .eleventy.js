const webc = require('@11ty/eleventy-plugin-webc')
const navigation = require('@11ty/eleventy-navigation')

const dayjs = require('dayjs')
const advancedFormat = require('dayjs/plugin/advancedFormat')

module.exports = (Config) => {
    Config.addPlugin(webc)
    Config.addPlugin(navigation)

    Config.addShortcode('formatted_date', (d) => dayjs(d).format('Do MMMM YYYY - dddd'))

    Config.addLayoutAlias('post', 'base.webc')

    Config.addPassthroughCopy('wp-content')
    Config.addPassthroughCopy('images')
    Config.addPassthroughCopy('css')
    Config.addPassthroughCopy('js')

    return {
        dir: {
            input: '_input',
            output: '_output',
            includes: '../_includes',
            layouts: '../_includes/layouts',
            components: '_components',
        }
    }
}