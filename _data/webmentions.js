require('dotenv').config()
const eleventyFetch = require('@11ty/eleventy-fetch')

module.exports = async function () {
    const api = 'https://webmention.io/api/mentions.jf2'
    const target = 'aggrippino.com'
    const token = process.env.WEBMENTION_IO_TOKEN
    const url = `${api}?domain=${target}&token=${token}`

    try {
        const json = await eleventyFetch(url, {
            duration: '1d',
            type: 'json',
            verbose: true,
        })

        return json.children
    } catch (error) {
        console.error('Fetch failed to get data from webmention.io', error)
    }
}