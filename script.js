// Portfolio JavaScript
class Portfolio {
  constructor() {
    this.init();
    this.setupEventListeners();
    this.initAnimations();
    this.initParticles();
    this.initTypingAnimation();
    this.initSkillBars();
    this.initFormValidation();
  }

  init() {
    // Set initial theme
    const savedTheme = localStorage.getItem("theme") || "light";
    const savedColor = localStorage.getItem("primaryColor") || "#f59e0b";

    document.documentElement.setAttribute("data-theme", savedTheme);
    this.updatePrimaryColor(savedColor);
    this.setSelectedColor(savedColor);

    // Update theme toggle icon
    this.updateThemeIcon(savedTheme);

    // Update current year
    this.updateCurrentYear();

    // Initialize Local Email System
    this.initLocalEmail();
  }

  initLocalEmail() {
    // Local email system doesn't need initialization
    // Just make sure the PHP script is accessible
    console.log("Local email system initialized");
  }

  updateCurrentYear() {
    const currentYearElement = document.getElementById("currentYear");
    if (currentYearElement) {
      const currentYear = new Date().getFullYear();
      currentYearElement.textContent = currentYear;
      console.log("Updated year to:", currentYear);
    }
  }

  setupEventListeners() {
    // Navigation
    this.setupNavigation();

    // Theme toggle
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("click", () => this.toggleTheme());

    // Color picker
    this.setupColorPicker();

    // Smooth scrolling
    this.setupSmoothScrolling();

    // Form submission
    const contactForm = document.getElementById("contactForm");
    contactForm.addEventListener("submit", (e) => this.handleFormSubmit(e));

    // Scroll animations
    this.setupScrollAnimations();

    // Mobile menu
    this.setupMobileMenu();
  }

  setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    // Active navigation on scroll
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
  }

  setupMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    this.updateThemeIcon(newTheme);

    // Add transition effect
    document.body.style.transition = "all 0.3s ease";
    setTimeout(() => {
      document.body.style.transition = "";
    }, 300);
  }

  updateThemeIcon(theme) {
    const themeIcon = document.querySelector("#themeToggle i");
    themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }

  setupColorPicker() {
    const colorPickerBtn = document.getElementById("colorPickerBtn");
    const colorPickerModal = document.getElementById("colorPickerModal");
    const colorOptions = document.querySelectorAll(".color-option");
    const closeBtn = document.querySelector(".close-color-picker");

    colorPickerBtn.addEventListener("click", () => {
      colorPickerModal.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
      colorPickerModal.classList.remove("active");
    });

    colorPickerModal.addEventListener("click", (e) => {
      if (e.target === colorPickerModal) {
        colorPickerModal.classList.remove("active");
      }
    });

    colorOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const color = option.dataset.color;

        // Remove selected class from all options
        colorOptions.forEach((opt) => opt.classList.remove("selected"));

        // Add selected class to clicked option
        option.classList.add("selected");

        this.updatePrimaryColor(color);
        localStorage.setItem("primaryColor", color);
        colorPickerModal.classList.remove("active");
      });
    });
  }

  setSelectedColor(color) {
    const colorOptions = document.querySelectorAll(".color-option");
    colorOptions.forEach((option) => {
      option.classList.remove("selected");
      if (option.dataset.color === color) {
        option.classList.add("selected");
      }
    });
  }

  updatePrimaryColor(color) {
    document.documentElement.style.setProperty("--primary-color", color);

    // Update gradient
    const primaryDark = this.lightenColor(color, -20);
    const primaryLight = this.lightenColor(color, 20);

    document.documentElement.style.setProperty("--primary-dark", primaryDark);
    document.documentElement.style.setProperty("--primary-light", primaryLight);

    // Update gradient
    const gradient = `linear-gradient(135deg, ${color}, ${primaryDark})`;
    document.documentElement.style.setProperty("--gradient-primary", gradient);
  }

  lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }

  initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
      ".service-card, .project-card, .timeline-item, .stat, .skill-item"
    );
    animatedElements.forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });
  }

  initParticles() {
    const particlesContainer = document.getElementById("particles");
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      this.createParticle(particlesContainer);
    }
  }

  createParticle(container) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random position
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";

    // Random animation delay
    particle.style.animationDelay = Math.random() * 6 + "s";

    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    container.appendChild(particle);

    // Remove and recreate particle after animation
    setTimeout(() => {
      particle.remove();
      this.createParticle(container);
    }, 6000);
  }

  initTypingAnimation() {
    const typingElement = document.querySelector(".typing-text");
    const texts = [
      "Software Engineer",
      "Full Stack Developer",
      "Healthcare Technology Expert",
      "Problem Solver",
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    const type = () => {
      const currentText = texts[textIndex];

      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      // Update page title with current typing text
      const baseTitle = "Adil Bayraktar - ";
      document.title = baseTitle + typingElement.textContent;

      let speed = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentText.length) {
        speed = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        speed = 500;
      }

      setTimeout(type, speed);
    };

    type();
  }

  initSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");

    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const width = entry.target.dataset.width;
            entry.target.style.width = width;
          }
        });
      },
      { threshold: 0.5 }
    );

    skillBars.forEach((bar) => {
      skillObserver.observe(bar);
    });
  }

  setupScrollAnimations() {
    // Parallax effect for hero section
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll(
        ".hero-visual, .particles"
      );

      parallaxElements.forEach((element) => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }

  initFormValidation() {
    const form = document.getElementById("contactForm");
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => this.clearError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(fieldName + "Error");

    let isValid = true;
    let errorMessage = "";

    switch (fieldName) {
      case "name":
        if (value.length < 2) {
          isValid = false;
          errorMessage = "Name must be at least 2 characters long";
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = "Please enter a valid email address";
        }
        break;
      case "subject":
        if (value.length < 5) {
          isValid = false;
          errorMessage = "Subject must be at least 5 characters long";
        }
        break;
      case "message":
        if (value.length < 10) {
          isValid = false;
          errorMessage = "Message must be at least 10 characters long";
        }
        break;
    }

    if (isValid) {
      this.clearError(field);
    } else {
      this.showError(field, errorMessage);
    }

    return isValid;
  }

  showError(field, message) {
    const errorElement = document.getElementById(field.name + "Error");
    errorElement.textContent = message;
    errorElement.classList.add("show");
    field.style.borderColor = "#ef4444";
  }

  clearError(field) {
    const errorElement = document.getElementById(field.name + "Error");
    errorElement.classList.remove("show");
    field.style.borderColor = "";
  }

  async handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');

    // Validate all fields
    const inputs = form.querySelectorAll("input, textarea");
    let isFormValid = true;

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      return;
    }

    // Show loading state
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    try {
      // Send form data to local PHP script
      const response = await fetch("send-email.php", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let result;
      try {
        const responseText = await response.text();
        console.log("Raw response:", responseText); // Debug log

        if (!responseText.trim()) {
          throw new Error("Empty response from server");
        }

        result = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        throw new Error("Invalid response from server");
      }

      if (response.ok && result.success) {
        // Show success message
        this.showSuccessMessage();
        form.reset();
      } else {
        throw new Error(
          result.message || result.error || "Form submission failed"
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
      this.showErrorMessage();
    } finally {
      // Reset button state
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    }
  }

  showSuccessMessage() {
    this.showNotification(
      "Message sent successfully! I'll get back to you soon.",
      "success"
    );
  }

  showErrorMessage() {
    this.showNotification(
      "Sorry, there was an error sending your message. Please try again.",
      "error"
    );
  }

  showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === "success" ? "#10b981" : "#ef4444"};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }
}

// 3D Effects and Advanced Animations
class AdvancedEffects {
  constructor() {
    this.init3DEffects();
    this.initScrollEffects();
  }

  init3DEffects() {
    // 3D hover effects for cards
    const cards = document.querySelectorAll(".service-card, .project-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", (e) => {
        this.add3DEffect(card, e);
      });

      card.addEventListener("mousemove", (e) => {
        this.update3DEffect(card, e);
      });

      card.addEventListener("mouseleave", () => {
        this.remove3DEffect(card);
      });
    });
  }

  add3DEffect(card, e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    card.style.transition = "none";
  }

  update3DEffect(card, e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  }

  remove3DEffect(card) {
    card.style.transform = "";
    card.style.transition = "all 0.3s ease";
  }

  initScrollEffects() {
    // Reveal animation on scroll
    const revealElements = document.querySelectorAll(
      ".section-title, .section-subtitle"
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = "revealUp 0.8s ease forwards";
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  }
}

// Add reveal animation keyframes
const style = document.createElement("style");
style.textContent = `
    @keyframes revealUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Portfolio();
  new AdvancedEffects();

  // Update current year dynamically
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
    console.log("Updated year to:", currentYear); // Debug log
  } else {
    console.error("currentYear element not found!"); // Debug log
  }

  // Add loading animation
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// Handle page visibility change
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.title = "👋 Come back soon!";
  } else {
    // Title will be updated by typing animation
    const typingElement = document.querySelector(".typing-text");
    if (typingElement) {
      document.title = "Adil Bayraktar - " + typingElement.textContent;
    } else {
      document.title = "Adil Bayraktar - Software Engineer";
    }
  }
});

// Performance optimization
window.addEventListener("load", () => {
  // Lazy load images if any
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

// Service Worker registration for PWA capabilities
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
