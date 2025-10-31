const contactCards = document.querySelectorAll(".contact-card")

contactCards.forEach((card) => {
    const icon = card.querySelector(".contact-icon")
    if (icon) {
        const defaultSrc = icon.getAttribute("src")
        const coloredSrc = defaultSrc.replace(".svg", "-colors.svg")

        card.addEventListener("mouseenter", () => {
            icon.setAttribute("src", coloredSrc)
        })

        card.addEventListener("mouseleave", () => {
            icon.setAttribute("src", defaultSrc)
        })
    }
})