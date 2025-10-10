/**
 * TopNavbar Handler - Maneja el comportamiento del navbar superior
 * Incluye funcionalidades de contraer/expandir y ocultar/mostrar basado en scroll
 */
class TopNavbarHandler {
    constructor() {
        this.navbar = document.getElementById('topNavbar');
        this.lastScrollTop = 0;
        this.scrollThreshold = 100; // Punto donde se contrae el navbar
        this.hideThreshold = 200; // Punto donde se puede ocultar el navbar
        this.isCollapsed = false;
        this.isHidden = false;
        this.ticking = false; // Para throttling del scroll
        
        if (this.navbar) {
            this.init();
        } else {
            console.warn('TopNavbar element not found');
        }
    }

    init() {
        // Event listeners con throttling
        window.addEventListener('scroll', this.throttleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Check inicial del estado
        this.handleScroll();
    }

    // Throttling para mejorar performance en el scroll
    throttleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(this.handleScroll.bind(this));
            this.ticking = true;
        }
    }

    handleScroll() {
        this.ticking = false;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = scrollTop > this.lastScrollTop ? 'down' : 'up';
        const scrollDifference = Math.abs(scrollTop - this.lastScrollTop);
        
        // Solo actuar si hay un scroll significativo
        if (scrollDifference < 5) return;
        
        // Contraer navbar al hacer scroll hacia abajo
        this.handleNavbarCollapse(scrollTop);
        
        // Ocultar navbar en scroll rápido hacia abajo (solo si está contraído)
        this.handleNavbarVisibility(scrollTop, scrollDirection);

        this.lastScrollTop = scrollTop;
    }

    handleNavbarCollapse(scrollTop) {
        if (scrollTop > this.scrollThreshold && !this.isCollapsed) {
            this.collapseNavbar();
        } else if (scrollTop <= this.scrollThreshold && this.isCollapsed) {
            this.expandNavbar();
        }
    }

    handleNavbarVisibility(scrollTop, scrollDirection) {
        // Comentado: No ocultar el navbar cuando está colapsado, mantenerlo siempre visible
        // if (scrollTop > this.hideThreshold && this.isCollapsed) {
        //     if (scrollDirection === 'down' && !this.isHidden) {
        //         this.hideNavbar();
        //     } else if (scrollDirection === 'up' && this.isHidden) {
        //         this.showNavbar();
        //     }
        // } else if (scrollTop <= this.hideThreshold && this.isHidden) {
        //     this.showNavbar();
        // }
        
        // Mantener el navbar siempre visible cuando está colapsado
        if (this.isHidden) {
            this.showNavbar();
        }
    }

    handleResize() {
        // Resetear estado en dispositivos móviles
        if (window.innerWidth < 768) {
            this.expandNavbar();
            this.showNavbar();
        }
    }

    collapseNavbar() {
        if (!this.navbar) return;
        
        this.navbar.classList.add('navbar-collapsed');
        this.isCollapsed = true;
        
        // Dispatch custom event
        this.dispatchNavbarEvent('navbar:collapsed');
    }

    expandNavbar() {
        if (!this.navbar) return;
        
        this.navbar.classList.remove('navbar-collapsed');
        this.isCollapsed = false;
        
        // Dispatch custom event
        this.dispatchNavbarEvent('navbar:expanded');
    }

    hideNavbar() {
        if (!this.navbar) return;
        
        this.navbar.classList.add('navbar-hidden');
        this.navbar.classList.remove('navbar-visible');
        this.isHidden = true;
        
        // Dispatch custom event
        this.dispatchNavbarEvent('navbar:hidden');
    }

    showNavbar() {
        if (!this.navbar) return;
        
        this.navbar.classList.remove('navbar-hidden');
        this.navbar.classList.add('navbar-visible');
        this.isHidden = false;
        
        // Dispatch custom event
        this.dispatchNavbarEvent('navbar:visible');
    }

    // Método para disparar eventos customizados
    dispatchNavbarEvent(eventName) {
        const event = new CustomEvent(eventName, {
            detail: {
                isCollapsed: this.isCollapsed,
                isHidden: this.isHidden,
                scrollTop: this.lastScrollTop
            }
        });
        document.dispatchEvent(event);
    }

    // Método público para forzar estados
    forceCollapse() {
        this.collapseNavbar();
    }

    forceExpand() {
        this.expandNavbar();
    }

    forceHide() {
        this.hideNavbar();
    }

    forceShow() {
        this.showNavbar();
    }

    // Getter para el estado actual
    get state() {
        return {
            isCollapsed: this.isCollapsed,
            isHidden: this.isHidden,
            scrollTop: this.lastScrollTop
        };
    }
}

// Auto-inicialización y exportación global
let topNavbarInstance = null;

function initTopNavbar() {
    if (!topNavbarInstance) {
        topNavbarInstance = new TopNavbarHandler();
    }
    return topNavbarInstance;
}

// Inicializar cuando el DOM esté cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTopNavbar);
} else {
    initTopNavbar();
}

// Exportar para uso global
window.TopNavbarHandler = TopNavbarHandler;
window.topNavbar = topNavbarInstance;