// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].classList.toggle('rotate-45');
        spans[1].classList.toggle('opacity-0');
        spans[2].classList.toggle('rotate-negative-45');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !e.target.closest('.mobile-menu-btn') && 
        !e.target.closest('.nav-links')) {
        navLinks.classList.remove('active');
    }
});

// Header Scroll Behavior
const header = document.querySelector('.header');
let lastScroll = 0;
let scrollTimer = null;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Clear the existing timer
    if (scrollTimer !== null) {
        window.clearTimeout(scrollTimer);
    }
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        header.classList.remove('scroll-down');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scrolling down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }

    // Set a timer to remove the classes after scrolling stops
    scrollTimer = window.setTimeout(() => {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }, 150);
    
    lastScroll = currentScroll;
});

// Form Validation and Handling
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        let isValid = true;
        let errorMessage = '';

        // Required fields validation
        for (let [key, value] of formData.entries()) {
            const input = this.querySelector(`[name="${key}"]`);
            if (input.hasAttribute('required') && !value.trim()) {
                isValid = false;
                errorMessage = 'Please fill in all required fields';
                break;
            }
        }

        // Email validation if email field exists
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        if (!isValid) {
            showNotification(errorMessage, 'error');
            return;
        }

        try {
            // Simulate form submission
            await simulateFormSubmission(data);
            showNotification('Message sent successfully!', 'success');
            this.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        }
    });
});

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form submitted:', data);
            resolve();
        }, 1000);
    });
}

// Notification System
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger reflow
    notification.offsetHeight;
    
    // Add visible class for animation
    notification.classList.add('visible');
    
    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Smooth Scrolling for Hash Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            navLinks.classList.remove('active');
            
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Page Load Animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// Add page transition class before unload
document.querySelectorAll('a').forEach(link => {
    if (!link.getAttribute('href').startsWith('#')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.add('page-transition');
            setTimeout(() => {
                window.location.href = link.getAttribute('href');
            }, 300);
        });
    }
});
