const dayjs = require('dayjs')

// Generate a date-based path for posts that don't have a defined permalink
const date_path = (data)  => {
    const date = dayjs(data.page.date).format('YYYY/MM')
    const slug = data.page.fileSlug
    return `/${date}/${slug}/`
}

module.exports = () => ({
    layout: 'base.webc',
    tags: 'post',
    page_class: 'post',

    permalink: date_path,

    eleventyComputed: {
        eleventyExcludeFromCollections: data => !data.published,
        image_alt: (data) => {
            if (data.image_alt.length > 0) {
                return data.image_alt
            } else {
                return data?.title ?? data.page.fileSlug
            }
        }
    },
})
