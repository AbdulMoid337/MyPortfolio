$(document).ready(function(){
    $(window).scroll(function(){
        // Sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }
        
        // Scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // Slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0}, function() {
            // Resetting smooth scroll after click
            $('html').css("scrollBehavior", "smooth");
        });
        // Removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // Applying smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // Toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // Typing text animation script
    const typingOptions = {
        strings: ["MERN - Stack developer", "Student", "Freelancer"],
        typeSpeed: 80,
        backSpeed: 60,
        loop: true
    };
    
    new Typed(".typing", typingOptions);
    new Typed(".typing-2", typingOptions);
    new Typed(".typing-3", {
        strings: ["Connect with me on :)"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });

    // Initialize Swiper
    var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Smooth scrolling
    gsap.utils.toArray('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            gsap.to(window, {duration: 1, scrollTo: {y: target, autoKill: false}, ease: "power2.inOut"});
        });
    });

    // Parallax effect for home section
    gsap.to(".home", {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
            trigger: ".home",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Animate sections on scroll
    gsap.utils.toArray('section').forEach((section) => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate skills bars
    gsap.utils.toArray('.skills-content .right .bars').forEach((bar) => {
        let line = bar.querySelector('.line');
        let percent = bar.querySelector('.info span:nth-child(2)').innerText;
        gsap.to(line, {
            width: percent,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: bar,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate services cards
    gsap.from('.services .serv-content .card', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
            trigger: '.services',
            start: "top 60%",
            toggleActions: "play none none reverse"
        }
    });

    // Text reveal animation for titles
    gsap.utils.toArray('.title').forEach((title) => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
        tl.from(title, {
            opacity: 0,
            y: 50,
            duration: 0.5
        }).to(title, {
            backgroundSize: "100% 100%",
            duration: 0.5,
            ease: "power2.out"
        });
    });

    // Animate Swiper slides
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".swiper-container",
            start: "top 60%",
            toggleActions: "play none none reverse"
        }
    });
    tl.from(".swiper-slide", {
        opacity: 0,
        scale: 0.8,
        y: 100,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)"
    });

    // Contact form submission
    $('#contact-form').on('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const name = $('#name').val();
        const email = $('#email').val();
        const message = $('#message').val();

        // Send data to server
        $.ajax({
            type: 'POST',
            url: '/api/contact', // Make sure this matches your server endpoint
            data: JSON.stringify({ name, email, message }),
            contentType: 'application/json',
            success: function(response) {
                $('#response').text('Message sent successfully!').css('color', 'green');
                $('#contact-form')[0].reset(); // Reset form
            },
            error: function(error) {
                $('#response').text('Failed to send message.').css('color', 'red');
            }
        });
    });
});
