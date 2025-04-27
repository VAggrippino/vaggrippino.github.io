const webc = require('@11ty/eleventy-plugin-webc')
const navigation = require('@11ty/eleventy-navigation')
const syntax_highlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const eleventyFetch = require('@11ty/eleventy-fetch')

const dayjs = require('dayjs')
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

getWebmentions()

module.exports = (Config) => {
    Config.addPlugin(webc)
    Config.addPlugin(navigation)
    Config.addPlugin(syntax_highlight)

    Config.addShortcode('formatted_date', (d) => dayjs(d).format('Do MMMM YYYY - dddd'))
    Config.addShortcode('formatted_datetime', (d) => dayjs(d).format('D MMM YYYY, h:mma'))
    Config.addShortcode('iso_date', (d) => dayjs(d).toISOString())

    Config.addFilter('webmentionsForUrl', (wm, url) => wm.filter(item => item.target_url.endsWith(url)))

    Config.addFilter('escapeHtml', (html) => {
        return html
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
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

async function getWebmentions() {
    require('dotenv').config()

    const fs = require('fs')
    const parseWebmentions = require('./js/parseWebmentions')

    const api = 'https://webmention.io/api/mentions.jf2'
    const domain = 'aggrippino.com'
    const token = process.env.WEBMENTION_IO_TOKEN
    const url = `${api}?domain=${domain}&token=${token}`

    try {
        const json = await eleventyFetch(url, {
            duration: '60m',
            type: 'json',
            verbose: true,
            directory: '.cache',
        })

        const parsed = await parseWebmentions(json)
        const parsed_string = JSON.stringify(parsed, null, 2)

        fs.writeFile('_data/webmentions_data.json', parsed_string, (err) => {
            if (err) {
                console.error('Error writing Webmentions data to file', err)
            } else {
                console.log('Webmention data written to _data/webmentions.json')
            }
        })
    } catch (error) {
        console.error('Fetch failed to get data from webmention.io', error)
    }
}