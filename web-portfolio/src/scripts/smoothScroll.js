// Smooth scroll con offset para compensar el navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // Obtener la altura del navbar
        const navbar = document.getElementById('topNavbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        
        // Calcular la posición con offset adicional
        const offsetPosition = targetElement.offsetTop - navbarHeight - 20;
        
        // Hacer scroll suave
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});
