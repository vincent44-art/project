
// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Set current year in the footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const menuIcon = document.getElementById('menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if(menuIcon) {
        menuIcon.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            if (mobileMenu.classList.contains('active')) {
                menuIcon.setAttribute('name', 'x');
            } else {
                menuIcon.setAttribute('name', 'menu');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuIcon.setAttribute('name', 'menu');
        });
    });
    
    // Testimonial slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if(testimonialTrack && testimonials.length > 0) {
        let currentIndex = 0;
        const testimonialWidth = testimonials[0].clientWidth + 
                               parseInt(getComputedStyle(testimonials[0]).marginLeft) + 
                               parseInt(getComputedStyle(testimonials[0]).marginRight);
        
        // Responsive settings
        const getVisibleCount = () => {
            if (window.innerWidth < 768) return 1;
            return 2;
        };
        
        const updateSliderPosition = () => {
            testimonialTrack.style.transform = `translateX(${-currentIndex * testimonialWidth}px)`;
        };
        
        // Initialize slider
        testimonialTrack.style.width = `${testimonialWidth * testimonials.length}px`;
        
        // Event listeners for slider controls
        if(prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = Math.max(currentIndex - 1, 0);
                updateSliderPosition();
            });
            
            nextBtn.addEventListener('click', () => {
                const visibleCount = getVisibleCount();
                currentIndex = Math.min(currentIndex + 1, testimonials.length - visibleCount);
                updateSliderPosition();
            });
        }
        
        // Auto slide
        const autoSlide = setInterval(() => {
            const visibleCount = getVisibleCount();
            currentIndex = (currentIndex + 1) % (testimonials.length - visibleCount + 1);
            updateSliderPosition();
        }, 5000);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            const visibleCount = getVisibleCount();
            currentIndex = Math.min(currentIndex, testimonials.length - visibleCount);
            updateSliderPosition();
        });
    }
    
    // Form submissions
    const bookingForm = document.getElementById('booking-form');
    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your booking request! We will contact you shortly to confirm your appointment.');
            bookingForm.reset();
        });
    }
    
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you as soon as possible.');
            contactForm.reset();
        });
    }
});
