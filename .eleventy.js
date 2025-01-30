require('dotenv').config()
const webc = require('@11ty/eleventy-plugin-webc')
const navigation = require('@11ty/eleventy-navigation')

const dayjs = require('dayjs')
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

module.exports = (Config) => {
    Config.addPlugin(webc)
    Config.addPlugin(navigation)

    Config.addShortcode('formatted_date', (d) => dayjs(d).format('Do MMMM YYYY - dddd'))
    Config.addShortcode('iso_date', (d) => dayjs(d).toISOString())

    Config.addFilter('webmentionsForUrl', (wm, url) => {
        return wm.filter(entry => entry['wm-target'] === url)
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

function getWebmentionsForUrl(webmentions, url) {
    return webmentions.filter(entry => entry['wm-target'] === url)
}