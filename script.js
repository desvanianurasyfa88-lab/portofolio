/**
 * DESVANIA NUR ASYIFA - PERSONAL PROFILE WEBSITE
 * Interactive JavaScript Animations & Mini Applications
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initBackgroundCanvas();
  initTypewriter();
  initScrollAnimations();
  initNavbarScrollSpy();
  initMobileMenu();
  initCardTilt();
  initMathQuiz();
  initBMICalculator();
  initQuoteGenerator();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. BACKGROUND CANVAS - SUBTLE TECH & MEDICAL NODES ANIMATION
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 28), 45);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 2 + 1.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(2, 132, 199, 0.35)'; // Sky blue node
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Connect close particles with faint lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(2, 132, 199, ${0.12 * (1 - dist / 130)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

/* ==========================================================================
   2. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter');
  if (!target) return;

  const phrases = [
    'Calon Dokter Masa Depan 🩺',
    'Penggemar Matematika & Logika 📐',
    'Eksplorasi Coding & Web 💻',
    'Pencinta Buku & Riset Medis 📖',
    'Siswa SMAN 1 Cimalaka 🏫'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 45;
    } else {
      target.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 1800; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400; // Pause before typing next phrase
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   3. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Unobserve after reveal to keep performance high
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    reveals.forEach(el => el.classList.add('active'));
  }
}

/* ==========================================================================
   4. NAVBAR SCROLL SPY & SCROLL EFFECT
   ========================================================================== */
function initNavbarScrollSpy() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar shadow & compact styling
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy active link indicator
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   5. MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

/* ==========================================================================
   6. 3D TILT EFFECT ON HOBBY CARDS
   ========================================================================== */
function initCardTilt() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   7. INTERACTIVE TABS & MINI WIDGETS
   ========================================================================== */
// Tab Switching
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const targetTab = document.getElementById(btn.getAttribute('data-tab'));
    if (targetTab) {
      targetTab.classList.add('active');
    }
  });
});

/* --- Math Quiz Logic --- */
let mathScore = 0;
let currentCorrectAnswer = null;

const mathQuestionsBank = [
  { q: 'Jika 3x + 12 = 45, berapakah nilai x?', ans: 11, options: [9, 11, 13, 15] },
  { q: 'Berapa hasil dari √144 + 5² - 10?', ans: 27, options: [25, 27, 29, 31] },
  { q: 'Dua dadu dilempar bersama. Berapa banyak ruang sampelnya?', ans: 36, options: [12, 24, 36, 48] },
  { q: 'Suku ke-7 dari barisan aritmatika 4, 9, 14, 19, ... adalah?', ans: 34, options: [29, 34, 39, 44] },
  { q: 'Berapakah nilai dari (2³ × 2⁴) ÷ 2⁵?', ans: 4, options: [2, 4, 8, 16] },
  { q: 'Luas lingkaran dengan jari-jari r = 7 cm adalah? (π ≈ 22/7)', ans: 154, options: [144, 154, 164, 174] },
  { q: 'Jika f(x) = 2x² - 3x + 5, berapakah nilai f(3)?', ans: 14, options: [12, 14, 16, 18] },
  { q: 'Hasil dari 15% dari 400 adalah?', ans: 60, options: [50, 55, 60, 65] }
];

function initMathQuiz() {
  const questionEl = document.getElementById('math-question');
  const optionsEl = document.getElementById('math-options');
  const feedbackEl = document.getElementById('math-feedback');
  const scoreEl = document.getElementById('math-score');
  const btnNext = document.getElementById('btn-next-question');
  const btnReset = document.getElementById('btn-reset-math');

  if (!questionEl || !optionsEl) return;

  function loadQuestion() {
    feedbackEl.textContent = '';
    feedbackEl.className = 'quiz-feedback';

    const randomIndex = Math.floor(Math.random() * mathQuestionsBank.length);
    const item = mathQuestionsBank[randomIndex];

    questionEl.textContent = item.q;
    currentCorrectAnswer = item.ans;

    optionsEl.innerHTML = '';
    item.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleAnswer(btn, opt));
      optionsEl.appendChild(btn);
    });
  }

  function handleAnswer(selectedBtn, selectedVal) {
    const allBtns = optionsEl.querySelectorAll('.option-btn');
    allBtns.forEach(b => (b.disabled = true));

    if (selectedVal === currentCorrectAnswer) {
      selectedBtn.classList.add('correct');
      feedbackEl.textContent = '✨ Jawaban Tepat! Logika matematika Anda hebat!';
      feedbackEl.style.color = '#059669';
      mathScore += 10;
      scoreEl.textContent = mathScore;
    } else {
      selectedBtn.classList.add('wrong');
      allBtns.forEach(b => {
        if (Number(b.textContent) === currentCorrectAnswer) {
          b.classList.add('correct');
        }
      });
      feedbackEl.textContent = `❌ Kurang tepat. Jawaban yang benar adalah ${currentCorrectAnswer}.`;
      feedbackEl.style.color = '#dc2626';
    }
  }

  btnNext.addEventListener('click', loadQuestion);
  btnReset.addEventListener('click', () => {
    mathScore = 0;
    scoreEl.textContent = '0';
    loadQuestion();
  });

  loadQuestion();
}

/* --- Health BMI Calculator Logic --- */
function initBMICalculator() {
  const btnCalc = document.getElementById('btn-calc-bmi');
  const weightInput = document.getElementById('bmi-weight');
  const heightInput = document.getElementById('bmi-height');
  const resultCard = document.getElementById('bmi-result-card');
  const bmiNum = document.getElementById('bmi-number');
  const bmiCat = document.getElementById('bmi-category');
  const bmiAdvice = document.getElementById('bmi-advice');

  if (!btnCalc) return;

  btnCalc.addEventListener('click', () => {
    const weight = parseFloat(weightInput.value);
    const heightCm = parseFloat(heightInput.value);

    if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
      alert('Mohon masukkan berat badan dan tinggi badan yang valid.');
      return;
    }

    const heightM = heightCm / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);

    bmiNum.textContent = bmi;
    resultCard.style.display = 'block';

    if (bmi < 18.5) {
      bmiCat.textContent = 'Berat Badan Kurang (Underweight)';
      bmiCat.style.background = '#fef3c7';
      bmiCat.style.color = '#92400e';
      bmiAdvice.textContent = 'Saran Dokter: Tingkatkan asupan nutrisi seimbang, protein hewani/nabati, dan konsumsi kalori yang bergizi.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      bmiCat.textContent = 'Berat Badan Ideal (Normal)';
      bmiCat.style.background = '#d1fae5';
      bmiCat.style.color = '#065f46';
      bmiAdvice.textContent = 'Saran Dokter: Luar biasa! Pertahankan pola makan sehat, hidrasi cukup, dan olahraga teratur.';
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      bmiCat.textContent = 'Kelebihan Berat Badan (Overweight)';
      bmiCat.style.background = '#fed7aa';
      bmiCat.style.color = '#9a3412';
      bmiAdvice.textContent = 'Saran Dokter: Kurangi makanan tinggi gula/lemak jenuh, perbanyak konsumsi serat, dan aktif bergerak minimal 30 menit sehari.';
    } else {
      bmiCat.textContent = 'Obesitas';
      bmiCat.style.background = '#fee2e2';
      bmiCat.style.color = '#991b1b';
      bmiAdvice.textContent = 'Saran Dokter: Konsultasikan pola diet dan program latihan fisik terstruktur dengan dokter atau ahli gizi terdekat.';
    }
  });
}

/* --- Quote Generator Logic --- */
function initQuoteGenerator() {
  const quoteEl = document.getElementById('dynamic-quote');
  const authorEl = document.getElementById('dynamic-author');
  const btnQuote = document.getElementById('btn-new-quote');

  if (!btnQuote) return;

  const quotes = [
    {
      q: 'Di mana pun seni pengobatan dicintai, di situ juga ada cinta terhadap kemanusiaan.',
      a: '— Hippocrates (Bapak Kedokteran)'
    },
    {
      q: 'Matematika adalah bahasa yang digunakan Tuhan untuk menulis alam semesta.',
      a: '— Galileo Galilei'
    },
    {
      q: 'Buku adalah pengusung peradaban. Tanpa buku, sejarah akan hening, sastra akan bisu, dan sains akan lumpuh.',
      a: '— Barbara W. Tuchman'
    },
    {
      q: 'Ilmu tanpa budi pekerti adalah bahaya, budi pekerti tanpa ilmu adalah kerapuhan.',
      a: '— Pepatah Cendekiawan'
    },
    {
      q: 'Kesehatan bukan segalanya, tetapi tanpa kesehatan, segala sesuatu bukanlah apa-apa.',
      a: '— Arthur Schopenhauer'
    },
    {
      q: 'Logika akan membawa Anda dari A ke B. Imajinasi dan kegigihan akan membawa Anda ke mana pun.',
      a: '— Albert Einstein'
    }
  ];

  let quoteIdx = 0;

  btnQuote.addEventListener('click', () => {
    quoteIdx = (quoteIdx + 1) % quotes.length;
    quoteEl.style.opacity = '0';
    authorEl.style.opacity = '0';

    setTimeout(() => {
      quoteEl.textContent = `"${quotes[quoteIdx].q}"`;
      authorEl.textContent = quotes[quoteIdx].a;
      quoteEl.style.transition = 'opacity 0.4s ease';
      authorEl.style.transition = 'opacity 0.4s ease';
      quoteEl.style.opacity = '1';
      authorEl.style.opacity = '1';
    }, 200);
  });
}

/* ==========================================================================
   8. CONTACT FORM SUBMISSION FEEDBACK
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('form-toast');
  const submitBtn = document.getElementById('btn-submit-form');

  if (!form || !toast) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Mengirim Pesan...</span>';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      // Show toast
      toast.style.display = 'flex';
      form.reset();

      setTimeout(() => {
        toast.style.display = 'none';
      }, 5000);
    }, 800);
  });
}

/* ==========================================================================
   9. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

