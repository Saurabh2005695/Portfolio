const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const backToTopButton = document.getElementById('back-to-top');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const applyTheme = (theme) => {
  document.documentElement.classList.toggle('light-mode', theme === 'light');
  document.body.classList.toggle('light-mode', theme === 'light');

  if (themeIcon) {
    themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
  }

  if (themeToggle) {
    themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  }

  localStorage.setItem('theme', theme);
};

const savedTheme = localStorage.getItem('theme');
const preferredTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
applyTheme(savedTheme || preferredTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(nextTheme);
  });
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (event) {
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (!targetElement) {
      return;
    }

    event.preventDefault();
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth',
    });

    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }

    document.querySelectorAll('.nav-link').forEach((link) => link.classList.remove('active'));
    this.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  document.querySelectorAll('section').forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  if (backToTopButton) {
    if (scrollPosition > 300) {
      backToTopButton.classList.remove('hidden');
    } else {
      backToTopButton.classList.add('hidden');
    }
  }
});

if (backToTopButton) {
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillsSection = document.getElementById('skills');

  if (!skillsSection || skillBars.length === 0) {
    return;
  }

  const skillsSectionTop = skillsSection.offsetTop;
  const windowHeight = window.innerHeight;

  if (window.scrollY > skillsSectionTop - windowHeight + 200) {
    skillBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });

    window.removeEventListener('scroll', animateSkillBars);
  }
};

window.addEventListener('scroll', animateSkillBars);
