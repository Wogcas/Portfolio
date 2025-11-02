const aboutImage = document.querySelector(".about-image")

if (aboutImage) {
    const defaultSrc = aboutImage.getAttribute("src")
    const hoverSrc = "/images/me/me-but-close.jpeg"

    aboutImage.addEventListener("mouseenter", () => {
        aboutImage.setAttribute("src", hoverSrc)
    })

    aboutImage.addEventListener("mouseleave", () => {
        aboutImage.setAttribute("src", defaultSrc)
    })
}
