require('dotenv').config()
const parseWebmentions = require('../js/parseWebmentions')
const eleventyFetch = require('@11ty/eleventy-fetch')

module.exports = async function () {
    const api = 'https://webmention.io/api/mentions.jf2'
    const domain = 'aggrippino.com'
    const token = process.env.WEBMENTION_IO_TOKEN
    const url = `${api}?domain=${domain}&token=${token}`

    try {
        const json = await eleventyFetch(url, {
            duration: '60m',
            type: 'json',
            verbose: true,
        })

        return parseWebmentions(json)
    } catch (error) {
        console.error('Fetch failed to get data from webmention.io', error)
    }
}