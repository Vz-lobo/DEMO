/* ============================================
   AROMA PREMIUM - JavaScript Interactions
   Café Artesanal Colombiano
   ============================================ */

// ============================================
// DOM Elements
// ============================================
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const backToTop = document.getElementById("backToTop");
const navLinks = document.querySelectorAll(".nav-link");

// ============================================
// Navbar Scroll Effect
// ============================================
/**
 * Changes navbar background color when scrolling
 */
function handleNavbarScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

// ============================================
// Back to Top Button Visibility
// ============================================
/**
 * Shows/hides the back to top button based on scroll position
 */
function handleBackToTopVisibility() {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
}

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
/**
 * Implements smooth scrolling for anchor links
 * @param {Event} e - Click event
 */
function smoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute("href");

  if (targetId === "#") return;

  const targetSection = document.querySelector(targetId);

  if (targetSection) {
    const navbarHeight = navbar.offsetHeight;
    const targetPosition = targetSection.offsetTop - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // Close mobile menu if open
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
    }
  }
}

// ============================================
// Mobile Menu Toggle
// ============================================
/**
 * Toggles the mobile navigation menu
 */
function toggleMobileMenu() {
  navMenu.classList.toggle("active");

  // Animate hamburger icon
  const spans = hamburger.querySelectorAll("span");
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
}

// ============================================
// Close Mobile Menu on Outside Click
// ============================================
/**
 * Closes mobile menu when clicking outside
 * @param {Event} e - Click event
 */
function closeMenuOnOutsideClick(e) {
  if (
    !navMenu.contains(e.target) &&
    !hamburger.contains(e.target) &&
    navMenu.classList.contains("active")
  ) {
    navMenu.classList.remove("active");

    // Reset hamburger icon
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
}

// ============================================
// Back to Top Action
// ============================================
/**
 * Scrolls to the top of the page
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ============================================
// Button Hover Effects Enhancement
// ============================================
/**
 * Adds ripple effect to buttons on click
 * @param {Event} e - Click event
 */
function addRippleEffect(e) {
  const button = e.currentTarget;
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

  button.style.position = "relative";
  button.style.overflow = "hidden";
  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// ============================================
// Add Ripple Effect to All Buttons
// ============================================
function initializeRippleEffect() {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", addRippleEffect);
  });
}

// ============================================
// Intersection Observer for Animations
// ============================================
/**
 * Animates elements when they come into view
 */
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe product cards and benefit cards
  const cards = document.querySelectorAll(".producto-card, .beneficio-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
  });
}

// ============================================
// Event Listeners
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll effect
  window.addEventListener("scroll", handleNavbarScroll);
  handleNavbarScroll(); // Initial check

  // Back to top button
  window.addEventListener("scroll", handleBackToTopVisibility);
  backToTop.addEventListener("click", scrollToTop);

  // Smooth scroll for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });

  // Mobile menu toggle
  hamburger.addEventListener("click", toggleMobileMenu);

  // Close menu on outside click
  document.addEventListener("click", closeMenuOnOutsideClick);

  // Initialize ripple effect
  initializeRippleEffect();

  // Initialize scroll animations
  initializeScrollAnimations();
});

// ============================================
// Ripple Animation Keyframes
// ============================================
const style = document.createElement("style");
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
