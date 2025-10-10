class TopNavbarHandler {
    constructor() {
        this.navbar = document.getElementById('topNavbar');
        this.hamburgerIcon = null;
        this.lastScrollTop = 0;
        this.scrollThreshold = 100;
        this.hideThreshold = 200;
        this.isCollapsed = false;
        this.isHidden = false;
        this.isManuallyExpanded = false; 
        this.ticking = false;
        
        if (this.navbar) {
            this.init();
        } else {
            console.warn('TopNavbar element not found');
        }
    }

    init() {
        this.hamburgerIcon = document.getElementById('hamburgerIcon');
        
        window.addEventListener('scroll', this.throttleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        
        if (this.hamburgerIcon) {
            this.hamburgerIcon.addEventListener('click', this.toggleNavbar.bind(this));
        }
        
        this.handleScroll();
    }

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
        
        if (scrollDifference < 5) return;
        
        // Manejar el collapse solo si NO está expandido manualmente
        if (!this.isManuallyExpanded) {
            this.handleNavbarCollapse(scrollTop);
        }
        
        // Al llegar arriba, resetear todo
        if (scrollTop <= this.scrollThreshold) {
            this.resetToTop();
        }
        
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

    toggleNavbar() {
        if (this.isCollapsed) {
            // Expandir manualmente
            this.expandNavbar();
            this.isManuallyExpanded = true;
            this.changeIconToX();
            this.navbar.classList.add('navbar-manual-expanded');
        } else {
            // El usuario presionó la X para cerrar
            this.isManuallyExpanded = false;
            this.changeIconToHamburger();
            this.navbar.classList.remove('navbar-manual-expanded');
            
            // Volver al comportamiento automático basado en scroll
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > this.scrollThreshold) {
                this.collapseNavbar();
            }
        }
    }

    resetToTop() {
        // Al llegar arriba, resetear todo al estado inicial
        if (this.isManuallyExpanded || this.isCollapsed) {
            this.expandNavbar();
            this.isManuallyExpanded = false;
            this.changeIconToHamburger();
            this.navbar.classList.remove('navbar-manual-expanded');
        }
    }

    changeIconToX() {
        if (this.hamburgerIcon) {
            const icon = this.hamburgerIcon.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-times text-gray-700 text-xl hover:text-black';
            }
        }
    }

    changeIconToHamburger() {
        if (this.hamburgerIcon) {
            this.hamburgerIcon.style.transition = 'none';
            
            const icon = this.hamburgerIcon.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars text-gray-700 text-xl hover:text-black';
            }
            
            requestAnimationFrame(() => {
                this.hamburgerIcon.style.transition = '';
            });
        }
    }

    handleNavbarVisibility(scrollTop, scrollDirection) {
        // Mantener el navbar siempre visible
        if (this.isHidden) {
            this.showNavbar();
        }
    }

    handleResize() {
        if (window.innerWidth < 768) {
            this.isManuallyExpanded = false;
            this.expandNavbar();
            this.showNavbar();
            this.changeIconToHamburger();
            this.navbar.classList.remove('navbar-manual-expanded');
        }
    }

    collapseNavbar() {
        if (!this.navbar) return;
        
        this.navbar.classList.add('navbar-collapsed');
        this.isCollapsed = true;
        this.dispatchNavbarEvent('navbar:collapsed');
    }

    expandNavbar() {
        if (!this.navbar) return;
        
        this.navbar.classList.remove('navbar-collapsed');
        this.isCollapsed = false;
        this.dispatchNavbarEvent('navbar:expanded');
    }

    hideNavbar() {
        if (!this.navbar) return;
        
        this.navbar.classList.add('navbar-hidden');
        this.navbar.classList.remove('navbar-visible');
        this.isHidden = true;
        this.dispatchNavbarEvent('navbar:hidden');
    }

    showNavbar() {
        if (!this.navbar) return;
        
        this.navbar.classList.remove('navbar-hidden');
        this.navbar.classList.add('navbar-visible');
        this.isHidden = false;
        this.dispatchNavbarEvent('navbar:visible');
    }

    dispatchNavbarEvent(eventName) {
        const event = new CustomEvent(eventName, {
            detail: {
                isCollapsed: this.isCollapsed,
                isHidden: this.isHidden,
                isManuallyExpanded: this.isManuallyExpanded,
                scrollTop: this.lastScrollTop
            }
        });
        document.dispatchEvent(event);
    }

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

    resetManualToggle() {
        this.isManuallyExpanded = false;
        this.changeIconToHamburger();
        this.navbar.classList.remove('navbar-manual-expanded');
    }

    get state() {
        return {
            isCollapsed: this.isCollapsed,
            isHidden: this.isHidden,
            isManuallyExpanded: this.isManuallyExpanded,
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTopNavbar);
} else {
    initTopNavbar();
}

window.TopNavbarHandler = TopNavbarHandler;
window.topNavbar = topNavbarInstance;