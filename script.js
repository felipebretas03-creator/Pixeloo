document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5,5,5,0.95)';
            navbar.style.padding = '16px 0';
        } else {
            navbar.style.background = 'rgba(5,5,5,0.8)';
            navbar.style.padding = '24px 0';
        }
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for glows
    const glows = document.querySelectorAll('.glow');
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        glows.forEach((glow, index) => {
            const speed = (index + 1) * 30;
            const moveX = (x * speed) - (speed / 2);
            const moveY = (y * speed) - (speed / 2);
            glow.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Work Slider Interaction
    const workSlides = document.querySelectorAll('.work-slide');
    const workDots = document.querySelectorAll('.slider-dots .dot');
    
    workSlides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            workSlides.forEach(s => s.classList.remove('active'));
            slide.classList.add('active');
            
            if (workDots.length > 0) {
                workDots.forEach(d => d.classList.remove('active'));
                if (workDots[index]) {
                    workDots[index].classList.add('active');
                }
            }
        });
    });

    // Make dots clickable to change slides
    if (workDots.length > 0) {
        workDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (workSlides[index]) {
                    workSlides[index].click();
                }
            });
        });
    }

    // Phones Showcase Interactive Carousel
    const phones = document.querySelectorAll('.phones-showcase .phone-mockup');
    const phonePrevBtn = document.querySelector('.phones-showcase .prev-btn');
    const phoneNextBtn = document.querySelector('.phones-showcase .next-btn');

    if (phones.length === 3 && phonePrevBtn && phoneNextBtn) {
        let classes = ['phone-left', 'phone-center', 'phone-right'];

        const updatePhones = () => {
            phones.forEach((phone, index) => {
                phone.className = 'phone-mockup ' + classes[index];
            });
        };

        const moveNext = () => {
            classes.unshift(classes.pop());
            updatePhones();
        };

        const movePrev = () => {
            classes.push(classes.shift());
            updatePhones();
        };

        phoneNextBtn.addEventListener('click', moveNext);
        phonePrevBtn.addEventListener('click', movePrev);

        phones.forEach((phone) => {
            phone.addEventListener('click', function() {
                if (this.classList.contains('phone-right')) {
                    moveNext();
                } else if (this.classList.contains('phone-left')) {
                    movePrev();
                }
            });
            phone.style.cursor = 'pointer';
        });
    }

    // Hero Pills Interaction
    const heroPills = document.querySelectorAll('.pill-card');
    heroPills.forEach(pill => {
        pill.addEventListener('click', () => {
            heroPills.forEach(p => p.classList.remove('active-pill'));
            pill.classList.add('active-pill');
        });
        pill.style.cursor = 'pointer';
    });

    // Filter Pills Interaction
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
    });

    // Intersection Observer for generic scroll animations (.fade-up)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up, .sol-card, .impact-card, .team-card, .compare-card');
    fadeElements.forEach(el => {
        if (!el.classList.contains('fade-up')) {
            el.classList.add('fade-up');
        }
        observer.observe(el);
    });

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items (Single open mode)
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                otherItem.classList.remove('active');
                if(otherAnswer) otherAnswer.style.maxHeight = null;
            });
            
            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                // Set max-height dynamic to inner scroll height for smooth transition
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
    // Baunfire Sticky Scroll & Mobile Auto-Carousel Engine
    const bfSliderTrack = document.getElementById('bfSlider');
    if (bfSliderTrack) {
        const textSlides = bfSliderTrack.querySelectorAll('.bf-massive-text.bf-slide');
        const imgSlides = bfSliderTrack.querySelectorAll('img.bf-slide');
        const totalSlides = textSlides.length;
        
        let mobileInterval = null;
        let isMobile = window.innerWidth <= 992;
        
        function swapSlides(activeIndex) {
            textSlides.forEach((el, index) => {
                if(index === activeIndex) el.classList.add('is-active');
                else el.classList.remove('is-active');
            });
            imgSlides.forEach((el, index) => {
                if(index === activeIndex) el.classList.add('is-active');
                else el.classList.remove('is-active');
            });
        }
        
        function handleDesktopScroll() {
            if (window.innerWidth <= 992) return;
            const trackRect = bfSliderTrack.getBoundingClientRect();
            
            if (trackRect.top <= window.innerHeight && trackRect.bottom >= 0) {
                const scrollableDistance = trackRect.height - window.innerHeight;
                
                if(scrollableDistance > 50) {
                    let scrolledDistance = -trackRect.top; 
                    let scrollPercentage = scrolledDistance / scrollableDistance;
                    scrollPercentage = Math.max(0, Math.min(0.999, scrollPercentage));
                    const activeIndex = Math.floor(scrollPercentage * totalSlides);
                    
                    swapSlides(activeIndex);
                }
            }
        }
        
        function initSliderMode() {
            if (isMobile) {
                // Mobile Mode: 1.5s Auto-Carousel
                let autoIndex = 0;
                if (!mobileInterval) {
                    mobileInterval = setInterval(() => {
                        autoIndex = (autoIndex + 1) % totalSlides;
                        swapSlides(autoIndex);
                    }, 1500);
                }
            } else {
                // Desktop Mode: Scroll Native
                if (mobileInterval) {
                    clearInterval(mobileInterval);
                    mobileInterval = null;
                }
                window.addEventListener('scroll', handleDesktopScroll);
            }
        }
        
        initSliderMode();
        
        window.addEventListener('resize', () => {
            const newIsMobile = window.innerWidth <= 992;
            if (newIsMobile !== isMobile) {
                isMobile = newIsMobile;
                if(!isMobile) window.removeEventListener('scroll', handleDesktopScroll);
                initSliderMode();
            }
        });
    }
});
