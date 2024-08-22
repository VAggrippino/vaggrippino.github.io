window.addEventListener('load', () => {
    const root = document.querySelector(':root')
    const mainNavItems = document.querySelectorAll('.main-nav__item')
    root.style.setProperty('--nav-full-height',
        `calc(var(--finger-size) * ${mainNavItems.length} + var(--nav-spacing) * 2)`
    )
})