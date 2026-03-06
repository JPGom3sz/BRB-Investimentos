// ============================================
// BRB Investimentos - Script.js
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // Menu Mobile
    // ============================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Criar overlay
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    body.appendChild(menuOverlay);

    const closeMenu = () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = '';
    };

    if (mobileMenuToggle) {


        // Toggle do Menu


        mobileMenuToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            body.style.overflow = isActive ? 'hidden' : '';
        });

        // Fechar ao clicar no overlay
        menuOverlay.addEventListener('click', closeMenu);


        // Fechar ao clicar em qualquer link
        const navLinksItems = document.querySelectorAll('.nav-links a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }



    // ============================================
    // Navegação com rolagem suave
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start' 
                    });
                }
            }
        });
    });


    // ============================================
    // Efeito de esconder o cabeçalho na rolagem
    // ============================================
    
    let recebeUltimoValorScroll = window.pageYOffset;

    window.onscroll = function () {
        let recebeNovoValorScroll = window.pageYOffset;
        if (recebeUltimoValorScroll > recebeNovoValorScroll) {
            document.querySelector("header").classList.remove("header-hidden");
        } else {
            document.querySelector("header").classList.add("header-hidden");
        }
        recebeUltimoValorScroll = recebeNovoValorScroll;
    }


    // ============================================
    // Observador de animações ao rolar a página
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elementos observados para animação
    const elementsToAnimate = document.querySelectorAll(
        '.feature-card, .stat-card, .partnership-card'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // ============================================
    // Manipulador do botão do WhatsApp
    // ============================================
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const phoneNumber = '5561999999999';
            const message = encodeURIComponent('Olá! Gostaria de saber mais sobre investimentos BRB.');
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        });
    }

    // ============================================
    // Efeito interativo na lista de portfólio
    // ============================================
    const portfolioItems = document.querySelectorAll('.portfolio-list li');
    
    portfolioItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });


    // ============================================
    // Animação dos contadores estatísticos
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserverOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const text = entry.target.textContent;
                
                // Extrai número do texto (ex: "+100k" -> 100)
                const match = text.match(/\d+/);
                if (match) {
                    const targetNumber = parseInt(match[0]);
                    const originalText = text;
                    
                    // Anima o número
                    let current = 0;
                    const duration = 2000;
                    const increment = targetNumber / (duration / 16);
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= targetNumber) {
                            entry.target.textContent = originalText;
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = originalText.replace(/\d+/, Math.floor(current));
                        }
                    }, 16);
                }
            }
        });
    }, counterObserverOptions);

    statNumbers.forEach(stat => counterObserver.observe(stat));

  

    // ============================================
    // PORTFÓLIO DIVERSIFICADO - Efeito de clique para mostrar detalhes
    // ============================================
    function mudarConteudoComClick(id) {
        const conteudo = document.getElementById('content-portifolio');

        const dados = {
            1: {
                titulo: 'Renda Variável', 
                descrição: 'A renda variável oferece acesso a ativos com maior potencial de valorização no longo prazo. No portfólio do BRB, essa classe é utilizada de forma estratégica, considerando cenários econômicos, fundamentos das empresas e diversificação, com foco em crescimento consistente e controle de riscos.'
            },
            2: {
                titulo: 'Ações', 
                descrição: 'Os investimentos em ações permitem participação direta no desempenho de empresas listadas em bolsa. O BRB prioriza uma seleção criteriosa, baseada em análise técnica e fundamentalista, buscando companhias sólidas, com boa governança e perspectivas sustentáveis de crescimento.'
            },
            3: {
                titulo: 'FIIs', 
                descrição: 'Os Fundos Imobiliários (FIIs) possibilitam investir no mercado imobiliário de forma prática e diversificada. O portfólio do BRB contempla fundos com diferentes estratégias, como renda, desenvolvimento e logística, visando geração de renda recorrente e valorização patrimonial.'
            },
            4: {
                titulo: 'Renda Fixa', 
                descrição: 'A renda fixa é a base de estabilidade do portfólio, oferecendo previsibilidade e segurança. O BRB trabalha com títulos que buscam preservar o capital, gerar rentabilidade consistente e atuar como elemento de equilíbrio frente às oscilações do mercado.'
            },
        };
        
        if (dados[id]) {
            conteudo.innerHTML = `
                <h2>${dados[id].titulo}</h2>
                <p>${dados[id].descrição}</p>
            `;
        }
    }

    document.querySelectorAll('.portfolio-list li').forEach(li => {
        li.addEventListener("click", () => {
            mudarConteudoComClick(li.dataset.id);
        });
    });

    // ============================================
    // Logo - Voltar para Home
    // ============================================
    const logoLink = document.querySelector('.logo a');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    console.log('os Scripts rodaram com sucesso!');
});


// ============================================
// Logo - Recarregar a página ao clicar.
// ============================================

    document.querySelector('.logo a').addEventListener('click', function(e) {
            location.reload();
    });




// ============================================
// Funções utilitárias
// ============================================

// Função debounce para eventos de scroll
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Função acelerar para eventos de scroll
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Verifica se o elemento está dentro da área visível da tela
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


// ======================================================

//redirecionamento do Acesse sua conta para o link do internet banking do BRB

document.querySelector('.account-link').addEventListener('click', function(e) {
    e.preventDefault();
    window.open('https://brb.genialinvestimentos.com.br/auth/login', '_blank');
});                               


// =============================
// Carrossel retangular (Home)
// =============================
(function () {
  const carousel = document.querySelector('.hero-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.hero-carousel__track');
  const slides = Array.from(carousel.querySelectorAll('.hero-carousel__slide'));
  const prev = carousel.querySelector('.hero-carousel__btn--prev');
  const next = carousel.querySelector('.hero-carousel__btn--next');
  const dots = Array.from(carousel.querySelectorAll('.hero-carousel__dot'));

  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
  }

  prev?.addEventListener('click', () => goTo(index - 1));
  next?.addEventListener('click', () => goTo(index + 1));

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // swipe (mobile)
  let startX = 0;

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 40) {
      if (diff < 0) goTo(index + 1);
      else goTo(index - 1);
    }
  });

  update();
})();


// =============================
// Carrossel retangular (Home)
// =============================
(function () {
  const carousel = document.querySelector('.hero-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.hero-carousel__track');
  const slides = Array.from(carousel.querySelectorAll('.hero-carousel__slide'));
  const prev = carousel.querySelector('.hero-carousel__btn--prev');
  const next = carousel.querySelector('.hero-carousel__btn--next');
  const dots = Array.from(carousel.querySelectorAll('.hero-carousel__dot'));

  let index = 0;
  let autoplay;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
  }

  prev?.addEventListener('click', () => goTo(index - 1));
  next?.addEventListener('click', () => goTo(index + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  // =============================
  // AUTOPLAY 8s
  // =============================
  function startAutoplay() {
    autoplay = setInterval(() => {
      goTo(index + 1);
    }, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplay);
  }

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  // Swipe mobile
  let startX = 0;

  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 40) {
      if (diff < 0) goTo(index + 1);
      else goTo(index - 1);
    }
  });

  update();
  startAutoplay();
})();


