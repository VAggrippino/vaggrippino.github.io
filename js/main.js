window.addEventListener('DOMContentLoaded', async () => {
    // Font Awesome icons are always decorative
    const fa_icons = document.querySelectorAll('i:where(.fa-solid, .fa-regular, .fa-light, .fa-thin, fa-webmention)')
    fa_icons.forEach(icon => icon.ariaHidden = true)

    // Set the max height of the nav based on the actual number of items it contains
    const root = document.querySelector(':root')
    const mainNavItems = document.querySelectorAll('.main-nav__item')
    root.style.setProperty('--nav-max-height',
        `calc(var(--finger-size) * ${mainNavItems.length} + var(--spacing) * 2)`
    )

    // Toggle the menu opening and closing when clicking on the Main Menu button
    const toggleMenu = (event) => {
        const control = event.currentTarget
        if (control.ariaExpanded === 'false') {
            control.ariaExpanded = 'true'
        } else {
            control.ariaExpanded = 'false'
        }
    }

    const nav_control = document.querySelector('.main-nav__control')
    nav_control.addEventListener('click', toggleMenu)

    // Close the menu when none of its items are focused
    document.body.addEventListener('focusout', (event) => {
        // If the focusout element isn't in a nav, don't do anything
        const out_nav = event.target.closest('nav')
        if (out_nav === null) return

        // If the focusout element's nav doesn't have a control, don't do anything
        const out_control = out_nav.querySelector('[aria-expanded]')
        if (out_control === null) return

        // If there is no focusin element, collapse the focusout control
        if (event.relatedTarget === null) {
            out_control.ariaExpanded = 'false'
            return
        }

        // If the focusin and focusout are in the same nav, don't do anything
        const in_nav = event.relatedTarget.closest('nav')
        if (in_nav === out_nav) return

        // focusin is in a nav with a control but focusout isn't in the same
        //nav, or isn't in a nav at all; collapse the focusout control
        out_control.ariaExpanded = 'false'
    })

    const jump_page = document.querySelector('.blog-history-nav__jump__page')
    if (jump_page !== null) {
        jump_page.addEventListener('change', (event) => {
            const url = `/blog/history/${event.currentTarget.value}`
            const go_link = document.querySelector('.blog-history-nav__jump__go')
            console.log(go_link)
            console.log(url)
            go_link.setAttribute('href', url);
        })
    }

    /* Webmentions */
    // Get the Webmention.io count data for this page and use it to update an on-page counter.
    const webmentions_data = await getWebmentionsCount()
    const webmentions_count_field = document.querySelector('footer .webmentions__count__counter')
    webmentions_count_field.innerHTML = webmentions_data.count
    webmentions_count_field.classList.add('updated')

    logSendWebmentionLink()

    if (document.querySelector('.webmentions')) {
        const since = getLastWebmentionDate()
        addNewWebmentions(since)
    }
})

function getLastWebmentionDate() {
    const webmentions = Array.from(document.querySelectorAll('.webmentions > .webmention[data-id]'))

    if (webmentions.length < 1) return null

    const dates = webmentions
        .map(w => w.querySelector('.webmention__date').dataset.received)
        .toSorted((a, b) => (new Date(a) > new Date(b)) ? -1 : 1)
    return dates[0]
}

async function addNewWebmentions(since) {
    const current_url = window.location.href
    const webmention_endpoint = `https://webmention.io/api/mentions.jf2`

    const webmention_url = (() => {
        if (since !== null) {
            return `${webmention_endpoint}?target=${current_url}&since=${since}`
        } else {
            return `${webmention_endpoint}?target=${current_url}`
        }
    })()

    const response = await fetch(webmention_url)
    const json = await response.json()

    if (json.children.length < 1) return

    const new_webmentions_data = parseWebmentions(json)

    const wm_template = document.querySelector('#webmention_template')

    const new_webmentions = new_webmentions_data.map((webmention) => {
        const wm_obj = wm_template.content.cloneNode(true)
        
        // Author Photo
        if (webmention.author_photo) {
            const photo = wm_obj.querySelector('.webmention__author__photo')
            const anchor = document.createElement('a')
            const image = document.createElement('img')

            anchor.setAttribute('href', webmention.author_photo)
            image.setAttribute('alt', `${webmention.author_name} profile photo`)
            image.setAttribute('src', webmention.author_photo)

            anchor.appendChild(image)
            photo.appendChild(anchor)
        }


        // Author Name
        const author_name = wm_obj.querySelector('.webmention__author__name')
        author_name.appendChild(document.createTextNode(webmention.author_name))


        // Author Link
        const author_link = wm_obj.querySelector('.webmention__author__link')
        const anchor = document.createElement('a')

        anchor.setAttribute('href', webmention.author_url)
        anchor.appendChild(document.createTextNode(webmention.author_url))

        author_link.appendChild(anchor)


        // Webmention Date
        const date = wm_obj.querySelector('.webmention__date')
        const formatted_date = dayjs(webmention.published).format('D MMM YYYY, h:mma')

        date.setAttribute('datetime', webmention.published)
        date.setAttribute('data-received', webmention.received)

        date.appendChild(document.createTextNode(formatted_date))


        // Webmention Content
        const webmention_content = wm_obj.querySelector('.webmention__content')
        webmention_content.appendChild(document.createTextNode(webmention.content))


        // Webmention Source
        const source = wm_obj.querySelector('.webmention__source')
        const source_icon = source.querySelector('i')
        const source_tooltip = source.querySelector('[role="tooltip"')
        const source_tooltip_id = `webmention-source-${webmention.id}`

        source_icon.setAttribute('class', webmention.source_icon_class)
        source_icon.setAttribute('aria-describedby', source_tooltip_id)
        source_tooltip.setAttribute('id', source_tooltip_id)

        if (webmention.source_domain !== 'brid.gy') {
            const image = document.createElement('img')
            image.setAttribute('alt', 'Webmention icon')
            image.setAttribute('src', '/images/webmention-logo.svg')
            source_icon.appendChild(image)
        }


        // Webmention Type
        const type = wm_obj.querySelector('.webmention__type')
        const type_icon = type.querySelector('i')
        const type_tooltip = type.querySelector('[role=tooltip]')
        const type_tooltip_id = `webmention-type-${webmention.id}`

        type_icon.setAttribute('class', webmention.type_icon_class)
        type_icon.setAttribute('aria-describedby', type_tooltip_id)
        type_tooltip.setAttribute('id', type_tooltip_id)


        // Webmention Link
        const link = wm_obj.querySelector('.webmention__link')
        const domain = link.querySelector('.webmention__link__domain')
        link.setAttribute('href', webmention.url)
        domain.innerHTML = webmention.domain

        return wm_obj
    })


    const webmentions = document.querySelector('.webmentions')
    webmentions.prepend(...new_webmentions)
}

async function getWebmentionsCount() {
    const current_url = window.location.href
    const webmentions_url = `https://webmention.io/api/count?target=${current_url}`

    const response = await fetch(webmentions_url)
    if (response.ok) {
        return await response.json()
    } else {
        console.error(`${response.status} : ${response.statusText}`)
        return false
    }

}

function logSendWebmentionLink() {
    const current_url_encoded = encodeURI(window.location.href)
    const webmentions_url = `https://telegraph.p3k.io/dashboard/send?url=${current_url_encoded}`
    console.log(`Test and send webmentions for this page at ${webmentions_url} `)
}