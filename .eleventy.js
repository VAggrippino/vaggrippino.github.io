const webc = require('@11ty/eleventy-plugin-webc')
const navigation = require('@11ty/eleventy-navigation')
const syntax_highlight = require('@11ty/eleventy-plugin-syntaxhighlight')

const dayjs = require('dayjs')
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

module.exports = (Config) => {
    Config.addPlugin(webc)
    Config.addPlugin(navigation)
    Config.addPlugin(syntax_highlight)

    Config.addShortcode('formatted_date', (d) => dayjs(d).format('Do MMMM YYYY - dddd'))
    Config.addShortcode('formatted_datetime', (d) => dayjs(d).format('D MMM YYYY, h:mma'))
    Config.addShortcode('iso_date', (d) => dayjs(d).toISOString())

    Config.addFilter('webmentionsForUrl', (wm, url) => {
        return wm.filter(entry => entry['wm-target'].endsWith(url))
    })

    Config.addLayoutAlias('post', 'base.webc')

    Config.addPassthroughCopy('wp-content')
    Config.addPassthroughCopy('images')
    Config.addPassthroughCopy('css')
    Config.addPassthroughCopy('js')
    Config.addPassthroughCopy('CNAME')

    return {
        dir: {
            input: '_input',
            output: 'docs',
            data: '../_data',
            includes: '../_includes',
            layouts: '../_includes/layouts',
            components: '_components',
        }
    }
}