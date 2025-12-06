document.addEventListener('DOMContentLoaded', () => {
    // Abrir modal al hacer click en la tarjeta o botón
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevenir si se hizo click en el enlace de GitHub
            if (e.target.closest('a')) return;

            const slug = card.dataset.projectSlug;
            const modal = document.getElementById(`modal-${slug}`);
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Cerrar modal al hacer click fuera del contenido
    const modals = document.querySelectorAll('.project-modal');

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    const closeButtons = document.querySelectorAll('.close-modal-btn');

    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const modal = button.closest('.project-modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.project-modal[style*="display: flex"]');
            if (openModal) {
                openModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
});
