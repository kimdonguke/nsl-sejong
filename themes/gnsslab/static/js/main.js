/* ================================================================
   Navigation System Lab - Main JavaScript
   ================================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------------
     1. NAVBAR: Scroll effect + Mobile toggle
     ---------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  // Scroll effect
  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Run on load

  // Mobile toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  /* ----------------------------------------------------------------
     2. SMOOTH SCROLL for anchor links
     ---------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ----------------------------------------------------------------
     3. INTERSECTION OBSERVER: Reveal animations
     ---------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          // Stagger delay for sibling elements
          const siblings = entry.target.parentElement
            ? Array.from(entry.target.parentElement.children).filter(function (el) {
                return el.classList.contains('reveal');
              })
            : [];

          const siblingIndex = siblings.indexOf(entry.target);
          const delay = siblingIndex >= 0 ? siblingIndex * 80 : 0;

          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    }, revealOptions);

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ----------------------------------------------------------------
     4. PUBLICATION TABS (Publications page)
     ---------------------------------------------------------------- */
  const pubTabs = document.querySelectorAll('.pub-tab');
  const pubSections = document.querySelectorAll('.pub-section');

  if (pubTabs.length > 0) {
    pubTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        pubTabs.forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        var target = this.getAttribute('data-target');
        pubSections.forEach(function (sec) {
          if (sec.id === target) {
            sec.classList.add('active');
            // Reveal elements inside a previously hidden section never trigger
            // the IntersectionObserver fast enough on tab switch. Force the
            // first one visible so the section isn't blank; later ones keep
            // their reveal state and fade in as the user scrolls.
            var firstReveal = sec.querySelector('.reveal');
            if (firstReveal) {
              firstReveal.classList.add('visible');
            }
          } else {
            sec.classList.remove('active');
          }
        });
      });
    });
  }

  /* ----------------------------------------------------------------
     4b. ALUMNI DETAIL TOGGLE (Members > Alumni)
     ---------------------------------------------------------------- */
  document.querySelectorAll('.alumni-detail-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
    });
  });

  /* ----------------------------------------------------------------
     4c. RESEARCH CAROUSEL (Home) — 원통형 무한 순환 peek 트랙.
     양끝에 클론을 심고, 클론에 멈추면 같은 내용의 진짜 카드로 무음 순간이동한다.
     ---------------------------------------------------------------- */
  var carousel = document.getElementById('researchCarousel');
  if (carousel) {
    var track = carousel.querySelector('.research-track');
    var real = Array.prototype.slice.call(track.querySelectorAll('.research-slide'));
    var n = real.length;
    var K = Math.min(2, n);           // 양쪽 클론 수 (엿보임 커버)
    var dots = carousel.querySelectorAll('.research-dot');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var timer = null, raf = null, settleTimer = null, teleporting = false;

    // 클론 심기: 앞에 [n-K..n-1], 뒤에 [0..K-1]
    for (var i = 0; i < K; i++) {
      var head = real[n - K + i].cloneNode(true);
      var tail = real[i].cloneNode(true);
      head.classList.add('clone');
      tail.classList.add('clone');
      head.setAttribute('aria-hidden', 'true');
      tail.setAttribute('aria-hidden', 'true');
      track.insertBefore(head, track.children[i]);
      track.appendChild(tail);
    }
    var slides = track.querySelectorAll('.research-slide');   // n + 2K
    var domIdx = K;                                           // 진짜 첫 카드

    function centerOf(el) { return el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2; }

    /* 브라우저 기본 smooth 대신 rAF + easeInOutCubic — 길이·곡선을 직접 제어 */
    var animId = null;
    function cancelAnim() {
      if (animId) { cancelAnimationFrame(animId); animId = null; }
      track.style.scrollSnapType = '';
    }
    function animateTo(target) {
      cancelAnim();
      track.style.scrollSnapType = 'none';   /* 애니메이션 중 스냅 개입 방지 */
      var from = track.scrollLeft;
      var dist = target - from;
      var dur = 650;
      var t0 = null;
      function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
      function step(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        track.scrollLeft = from + dist * ease(p);
        if (p < 1) {
          animId = requestAnimationFrame(step);
        } else {
          animId = null;
          track.style.scrollSnapType = '';
        }
      }
      animId = requestAnimationFrame(step);
    }

    function goToDom(d, instant) {
      domIdx = Math.max(0, Math.min(slides.length - 1, d));
      var target = centerOf(slides[domIdx]);
      if (instant || reduced) {
        cancelAnim();
        track.scrollTo({ left: target, behavior: 'auto' });
      } else {
        animateTo(target);
      }
    }

    function nearestDom() {
      var center = track.scrollLeft + track.clientWidth / 2;
      var best = 0, bestDist = Infinity;
      slides.forEach(function (sl, i) {
        var d = Math.abs(sl.offsetLeft + sl.offsetWidth / 2 - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      return best;
    }

    function markActive() {
      var d = nearestDom();
      domIdx = d;
      var logical = parseInt(slides[d].dataset.index, 10);
      slides.forEach(function (sl, i) { sl.classList.toggle('active', i === d); });
      dots.forEach(function (dot, i) { dot.classList.toggle('active', i === logical); });
    }

    function settle() {
      var d = nearestDom();
      if (slides[d].classList.contains('clone')) {
        // 클론 위 -> 같은 내용의 진짜 카드로 무음 이동.
        // 점프 "전에" active 상태를 옮기고 그 프레임만 전환을 꺼서
        // 진짜 카드가 흐림에서 되살아나는 이음새를 없앤다.
        teleporting = true;
        var logical = parseInt(slides[d].dataset.index, 10);
        var target = K + logical;
        track.classList.add('no-anim');
        slides.forEach(function (sl, i) { sl.classList.toggle('active', i === target); });
        dots.forEach(function (dot, i) { dot.classList.toggle('active', i === logical); });
        goToDom(target, true);
        void track.offsetWidth;   // 리플로우 강제 — no-anim 상태로 그리게
        requestAnimationFrame(function () {
          track.classList.remove('no-anim');
          teleporting = false;
        });
      }
    }

    track.addEventListener('scroll', function () {
      if (!raf) {
        raf = requestAnimationFrame(function () { raf = null; markActive(); });
      }
      if (teleporting) return;
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 120);
    }, { passive: true });

    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function start() {
      if (reduced || n < 2 || timer) return;
      timer = setInterval(function () { goToDom(domIdx + 1); }, 6000);
    }
    function restart() { stop(); start(); }

    carousel.querySelectorAll('.research-nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        goToDom(domIdx + parseInt(this.dataset.dir, 10));
        restart();
      });
    });
    dots.forEach(function (d) {
      d.addEventListener('click', function () {
        goToDom(K + parseInt(this.dataset.index, 10));
        restart();
      });
    });
    track.addEventListener('pointerdown', function () { cancelAnim(); stop(); });
    track.addEventListener('wheel', cancelAnim, { passive: true });
    track.addEventListener('touchstart', cancelAnim, { passive: true });
    track.addEventListener('pointerup', function () { restart(); });
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);
    window.addEventListener('resize', function () { goToDom(domIdx, true); });

    goToDom(K, true);
    markActive();
    start();
  }

  /* ----------------------------------------------------------------
     5. ACTIVE NAV LINK highlighting based on current URL
     ---------------------------------------------------------------- */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === '/' && currentPath === '/') {
      link.classList.add('active');
    } else if (href !== '/' && currentPath.startsWith(href)) {
      link.classList.add('active');
    }
  });

  /* ----------------------------------------------------------------
     6. CONTACT FORM: Validate and open user's mail client via mailto:
     ---------------------------------------------------------------- */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = this.querySelector('#name');
      const email = this.querySelector('#email');
      const subject = this.querySelector('#subject');
      const message = this.querySelector('#message');
      let isValid = true;

      [name, email, message].forEach(function (field) {
        if (field) field.style.borderColor = '';
      });

      if (name && !name.value.trim()) {
        name.style.borderColor = '#e74c3c';
        isValid = false;
      }
      if (email && !validateEmail(email.value)) {
        email.style.borderColor = '#e74c3c';
        isValid = false;
      }
      if (message && !message.value.trim()) {
        message.style.borderColor = '#e74c3c';
        isValid = false;
      }

      if (!isValid) return;

      const recipient = this.dataset.recipient || '';
      const subjectText = (subject && subject.value) ? subject.value : 'NSL Website Inquiry';
      const bodyLines = [
        'Name: ' + name.value,
        'Email: ' + email.value,
        '',
        message.value
      ];
      const mailtoUrl = 'mailto:' + recipient
        + '?subject=' + encodeURIComponent('[NSL] ' + subjectText)
        + '&body=' + encodeURIComponent(bodyLines.join('\n'));

      window.location.href = mailtoUrl;
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ----------------------------------------------------------------
     7. HERO PARALLAX (subtle, performance-friendly)
     ---------------------------------------------------------------- */
  const hero = document.querySelector('.hero-bg');
  if (hero) {
    let ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          const scrolled = window.scrollY;
          if (scrolled < window.innerHeight) {
            hero.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ----------------------------------------------------------------
     8. KEYBOARD ACCESSIBILITY
     ---------------------------------------------------------------- */
  // Add focus-visible polyfill behavior
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      document.body.classList.add('using-keyboard');
    }
  });

  document.addEventListener('mousedown', function () {
    document.body.classList.remove('using-keyboard');
  });

})();
