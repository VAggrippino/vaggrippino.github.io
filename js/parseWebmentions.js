const parseWebmentions = async function(webmentions) {
    // const endpoint = 'https://webmention.io/api/mentions.jf2'
    // let url = endpoint

    // // Retrieve webmentions for a specific target
    // if (target !== null) {
    //     url += `?target=${target}` + (since ? `&since=${since}` : '')

    // // Retrieve webmentions for a domain
    // } else if (domain !== null && token !== null) {
    //     url += `?domain=${domain}&token=${token}`
    // } else {
    //     return false
    // }

    // const response = await fetch(url)
    // const json = await response.json()

    if (webmentions.children.length < 1) return []

    return webmentions.children.map((webmention) => {
        const source_url_parts = webmention.url.split('/')
        const source_domain = source_url_parts[2]
        const source_action = (source_domain === 'brid.gy' ? source_url_parts[3] : 'webmention')
        const source_site = (source_domain === 'brid.gy' ? source_url_parts[4] : source_domain)

        const source_icon_class = (() => {
            if (source_domain !== 'brid.gy') return 'fa-webmention'
            const classes = ['fa-brands']
            switch (source_site) {
                case 'facebook':
                    classes.push('fa-square-facebook')
                    break
                case 'flickr':
                    classes.push('fa-flickr')
                    break
                case 'github':
                    classes.push('fa-square-github')
                    break
                case 'instagram':
                    classes.push('fa-square-instagram')
                    break
                case 'mastodon':
                    classes.push('fa-mastodon')
                    break
                case 'bluesky':
                    classes.push('fa-square-bluesky')
                    break
            }
            return classes.join(' ')
        })()

        const property_type = {
            'in-reply-to': 'reply',
            'like-of': 'like',
            'repost-of': 'repost',
            'bookmark-of': 'bookmark',
            'mention-of': 'mention',
            'rsvp': 'rsvp',
        }
        const type = property_type[webmention['wm-property']]

        const type_icon_class = (() => {
            switch (type) {
                case 'reply':
                    return 'fa-brands fa-replyd'
                    break
                case 'like':
                    return 'fa-solid fa-thumbs-up'
                    break
                case 'repost':
                    return 'fa-solid fa-clone'
                    break
                case 'bookmark':
                    return 'fa-solid fa-bookmark'
                    break
                case 'mention':
                    return 'fa-solid fa-comment-dots'
                    break
                case 'rsvp':
                    return 'fa-solid fa-calendar-check'
                    break
            }
        })()

        return {
            id: webmention['wm-id'],
            author_photo: webmention.author?.photo ?? '',
            author_name: webmention.author.name,
            author_url: webmention.author.url,
            published: webmention?.published ?? webmention['wm-received'],
            received: webmention['wm-received'],
            content: webmention?.content?.text ?? '',
            source_url: webmention.url,
            source_domain: source_domain,
            source_action: source_action,
            source_site: source_site,
            source_icon_class: source_icon_class,
            target_url: webmention['wm-target'],
            type: type,
            type_icon_class: type_icon_class,
        }
    })
}

module.exports = parseWebmentions