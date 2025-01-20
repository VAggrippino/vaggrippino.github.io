window.addEventListener('DOMContentLoaded', async () => {
    // Font Awesome icons are always decorative
    const fa_icons = document.querySelectorAll('i:where(.fa-solid, .fa-regular, .fa-light, .fa-thin)')
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

    // Webmentions
    const webmentions_data = await getWebmentionsCount()
    const webmentions_count_field = document.querySelector('.footer__webmentions__count')
    webmentions_count_field.innerHTML = webmentions_data.count
    webmentions_count_field.classList.add('updated')
})

async function getWebmentionsCount() {
    const current_url = window.location.href
    const webmentions_url = `https://webmention.io/api/count?target=${current_url}`

    console.log(`Retrieving Webmentions count from ${webmentions_url}`)

    const response = await fetch(webmentions_url)
    if (response.ok) {
        const json = await response.json()

        console.log(`${response.status} : ${response.statusText}`)
        console.log(json)

        console.log(`json.count: `)
        console.log(json.count)

        return json
    } else {
        console.error(`${response.status} : ${response.statusText}`)
        return false
    }
}
