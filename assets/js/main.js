document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // MOBILE NAVIGATION DRAWER
    // ==========================================================================
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menuClose = document.querySelector('.mobile-menu-close');
    const mobileNav = document.querySelector('.mobile-nav');
    const navOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    const openMenu = () => {
        mobileNav.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evita rolagem de fundo
    };

    const closeMenu = () => {
        mobileNav.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (menuToggle) menuToggle.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    // ==========================================================================
    // DINAMIC CURRENT YEAR
    // ==========================================================================
    const yearSpan = document.getElementById('js-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    // ==========================================================================
    // CONTACT FORM HANDLING
    // ==========================================================================
    const contactForm = document.getElementById('js-contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede recarregamento padrão
            
            // Pega os dados dos campos
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Mostra estado de "Enviando..."
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Simula uma requisição AJAX de 1.5 segundos
            setTimeout(() => {
                // Sucesso na simulação
                formFeedback.className = 'form-feedback success';
                formFeedback.textContent = `Obrigado, ${name}! Sua mensagem sobre "${subject}" foi simulada com sucesso. Redirecionando para atendimento instantâneo no WhatsApp...`;
                
                // Limpa o formulário
                contactForm.reset();
                
                // Restaura o botão
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;

                // Cria o link do WhatsApp dinamicamente baseado nos campos preenchidos
                const textWhatsApp = `Olá Dra. Gabriela. Meu nome é *${name}*.\nE-mail: ${email}\nTelefone: ${phone}\nAssunto: *${subject}*\n\nMensagem: ${message}`;
                const encodedText = encodeURIComponent(textWhatsApp);
                const whatsappUrl = `https://wa.me/5531991580403?text=${encodedText}`;

                // Abre o WhatsApp em nova aba após 2 segundos
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                    formFeedback.style.display = 'none';
                }, 2000);

            }, 1500);
        });
    }

    // ==========================================================================
    // HYBRID NAVIGATION (Smooth Scroll on same page, redirect on others)
    // ==========================================================================
    document.querySelectorAll('nav a, .footer-links a, .logo-link, .btn-outline').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.includes('#')) {
                const parts = href.split('#');
                const targetPage = parts[0];
                const targetId = parts[1] || 'home';
                
                const pathName = window.location.pathname;
                const pageName = pathName.substring(pathName.lastIndexOf('/') + 1);
                
                const isHomePage = pageName === '' || pageName === 'index.html' || pageName === 'index.htm';
                const isTargetHome = targetPage === '' || targetPage === 'index.html';
                
                if (isHomePage && isTargetHome) {
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) {
                        e.preventDefault();
                        targetEl.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });

    // ==========================================================================
    // SCROLL ANIMATIONS / HEADER TRANSPARENCY
    // ==========================================================================
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '5px 0'; // Compacta um pouco
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.padding = '';
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    });

});

