$(function() {

    $('.slider').owlCarousel({
        loop:false,
        margin:0,
        nav:true,
        dots: true,
        items:1,
        mouseDrag: false,
        animateIn: 'fadeIn',
        animateOut: false
    })

    $("[data-paroller-factor]").paroller()

})