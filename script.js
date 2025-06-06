// Mobile Menu Toggle
const navLinks = document.getElementById('navLinks');
const showMenu = document.getElementById('showMenu');
const closeMenu = document.getElementById('closeMenu');

if (showMenu && closeMenu && navLinks) {
    showMenu.addEventListener('click', () => {
        navLinks.style.right = '0';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });

    closeMenu.addEventListener('click', () => {
        navLinks.style.right = '-250px';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.style.right = '-250px';
            document.body.style.overflow = 'auto';
        });
    });
}

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 0);
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
       
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
       
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
       
        const formStatus = document.getElementById('form-status');
        const formData = new FormData(this);
       
        // Simple validation
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();
       
        if (!name || !email || !message) {
            showFormStatus('Please fill in all required fields', 'error');
            return;
        }
       
        if (!validateEmail(email)) {
            showFormStatus('Please enter a valid email address', 'error');
            return;
        }
       
        // Simulate form submission (in a real app, you would send to a server)
        showFormStatus('Your message has been sent successfully! We will get back to you soon.', 'success');
        this.reset();
       
        // In a real implementation, you would use fetch() to send the data to your server
        /*
        fetch('your-server-endpoint', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            showFormStatus('Your message has been sent successfully! We will get back to you soon.', 'success');
            this.reset();
        })
        .catch(error => {
            showFormStatus('There was an error sending your message. Please try again later.', 'error');
        });
        */
    });
}

// Helper function to show form status messages
function showFormStatus(message, type) {
    const formStatus = document.getElementById('form-status');
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';
       
        // Hide the message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

// Email validation helper function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Image Gallery Lightbox (for portfolio items)
document.querySelectorAll('.portfolio-item, .gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        openLightbox(imgSrc);
    });
});

function openLightbox(imgSrc) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    lightbox.style.display = 'flex';
    lightbox.style.alignItems = 'center';
    lightbox.style.justifyContent = 'center';
    lightbox.style.zIndex = '1000';
    lightbox.style.cursor = 'zoom-out';
   
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.maxHeight = '90%';
    img.style.maxWidth = '90%';
    img.style.objectFit = 'contain';
   
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
   
    lightbox.addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });
   
    // Close on ESC key
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            document.body.removeChild(lightbox);
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

// Auto-scrolling testimonials/collaborations (if you want to add this feature)
function initAutoScroll() {
    const scrollContainers = document.querySelectorAll('.image-container');
   
    scrollContainers.forEach(container => {
        let scrollAmount = 0;
        const scrollStep = 1;
        const scrollDelay = 30;
       
        function scrollHorizontally() {
            scrollAmount += scrollStep;
           
            if (scrollAmount >= container.scrollWidth / 2) {
                scrollAmount = 0;
            }
           
            container.scrollLeft = scrollAmount;
        }
       
        let scrollInterval = setInterval(scrollHorizontally, scrollDelay);
       
        container.addEventListener('mouseenter', () => {
            clearInterval(scrollInterval);
        });
       
        container.addEventListener('mouseleave', () => {
            scrollInterval = setInterval(scrollHorizontally, scrollDelay);
        });
    });
}

// Initialize auto-scroll on page load
// window.addEventListener('load', initAutoScroll);

// Active link highlighting
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links ul li a');
   
    links.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize on page load
window.addEventListener('load', function() {
    setActiveLink();
   
    // Add animation class to hero content for fade-in effect
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('animate-fade-in');
    }
});

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
  
    // Add elements you want to animate when scrolled into view
    document.querySelectorAll('.service-card, .portfolio-item, .gallery-item').forEach(item => {
        observer.observe(item);
    });
}

// Initialize scroll animations
window.addEventListener('load', initScrollAnimations);