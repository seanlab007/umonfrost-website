/* ============================================
   UMONFROST SALMON — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  
  function handleNavbarScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ===== MOBILE NAVIGATION =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      const spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
    
    // Close nav when link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== SCROLL ANIMATIONS =====
  function addScrollAnimations() {
    // Add fade-in classes to elements
    const animateSelectors = [
      '.section-header',
      '.origin-card',
      '.award-item',
      '.dish-card',
      '.event-item',
      '.contact-card',
      '.about-text',
      '.about-image',
      '.quality-image',
      '.quality-content',
      '.chef-image-wrap',
      '.chef-quote',
      '.water-image',
      '.water-content',
      '.strip-item'
    ];
    
    animateSelectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el, index) {
        el.classList.add('fade-in');
        el.style.transitionDelay = (index * 0.1) + 's';
      });
    });
  }
  
  addScrollAnimations();
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(function (el) {
    observer.observe(el);
  });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector('.nav-links a[href="#' + sectionId + '"]');
      
      if (navLink) {
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-links a').forEach(function (link) {
            link.style.color = '';
          });
          navLink.style.color = 'var(--color-gold)';
        }
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ===== PARALLAX EFFECT FOR HERO =====
  const heroBgImg = document.querySelector('.hero-bg-img');
  
  if (heroBgImg) {
    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        heroBgImg.style.transform = 'scale(1.05) translateY(' + (scrolled * 0.3) + 'px)';
      }
    }, { passive: true });
  }

  // ===== NUMBER COUNTER ANIMATION =====
  function animateCounter(el, target, duration) {
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * eased);
      el.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }
    
    requestAnimationFrame(update);
  }

  // ===== LOGO IMAGE FALLBACK =====
  const logoImg = document.querySelector('.logo-img');
  if (logoImg) {
    logoImg.addEventListener('error', function () {
      this.style.display = 'none';
    });
  }

  // ===== IMAGE LAZY LOADING =====
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(function (img) {
      imageObserver.observe(img);
    });
  }

  // ===== CURSOR EFFECT (DESKTOP ONLY) =====
  if (window.innerWidth > 900) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: rgba(201, 168, 76, 0.8);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    const cursorOuter = document.createElement('div');
    cursorOuter.style.cssText = `
      position: fixed;
      width: 36px;
      height: 36px;
      border: 1px solid rgba(201, 168, 76, 0.4);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: transform 0.15s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
    `;
    document.body.appendChild(cursorOuter);
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
      
      setTimeout(function () {
        cursorOuter.style.left = mouseX + 'px';
        cursorOuter.style.top = mouseY + 'px';
      }, 80);
    });
    
    document.querySelectorAll('a, button, .dish-card, .award-item, .origin-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursorOuter.style.width = '60px';
        cursorOuter.style.height = '60px';
        cursorOuter.style.borderColor = 'rgba(201, 168, 76, 0.7)';
      });
      el.addEventListener('mouseleave', function () {
        cursorOuter.style.width = '36px';
        cursorOuter.style.height = '36px';
        cursorOuter.style.borderColor = 'rgba(201, 168, 76, 0.4)';
      });
    });
  }

  // ===== INIT =====
  handleNavbarScroll();
  updateActiveNav();
  
  console.log('UMONFROST SALMON — Website Initialized');
});
