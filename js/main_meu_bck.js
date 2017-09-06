(function () { 
	
	'use strict';

     // Defining a function to set size for #hero 
	function fullscreenHeroSection(){
		$('.homepage-hero-module').css({
            width: $(window).width() -30,
            height: $(window).height() - 30
        });
	}

    function fixedHeader() {
        var setHeader = function() {
            if ($(window).scrollTop() > 10) {
                $('#top-nav').addClass('fixed-header');
                $('.navbar-right .meniu-button.custom-button').removeClass('header');
            } else {
                $('#top-nav').removeClass('fixed-header');
                $('.navbar-right .meniu-button.custom-button').addClass('header');
            }
        }
        try {
            setHeader();
            $(window).scroll(setHeader).resize(setHeader);
        } catch (error) {
            console.log(error);
        }
    }

	function customWidth(formId, clickedElem, hiddenText){
		var formId = '#'+formId,
			formWidth = $(formId)[0].getBoundingClientRect().width,
			elemWidth = $(formId+' '+clickedElem)[0].getBoundingClientRect().width;

			$(formId+' '+clickedElem).click((function() {
				var i = 0;
				return function(e) {
						$(this).toggleClass('hide-button-text').animate({
							width: (++i % 2) ? formWidth - 10 : elemWidth
						}, 500,function(){
                            window.setTimeout(function() { 
                                console.log(clickedElem);
                                if($('.hide-button-text').length > 0){
                                    $('.hide-button-text').click();
                                }
                            }, 3000);
                        });
                        if($(hiddenText).hasClass('sign-text-show') == false){
								window.setTimeout(function() {
									$(hiddenText).addClass('sign-text-show');
									//$(formId+' '+clickedElem+":contains('Sign Up')").html("<span class='sign-text sign-text-show'>Thank you for subscribing!</span>");
								}, 1000);
							}else{
								$(hiddenText).removeClass('sign-text-show');
								//$(formId+' '+clickedElem).html("<span class='sign-text'>Thank you for subscribing!</span>Sign Up");
							}
						e.preventDefault();
					}
			})()); 
            if($(hiddenText).hasClass('sign-text-show') == true){

            }
	}

    var moveElementOnSmall = function(){
        var windowWidth = $( window ).width();
        if(windowWidth < 911){
            $('.img-order').addClass('services').append($('.move-on-small-services'));
        }else{
            if($('.img-order').hasClass('services') == true){
                $('.img-order').removeClass('services');
                $('.move-on-small').append($('.move-on-small-services'));
            }
        }
    }

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};

$(function(){
    contentWayPoint();
});


    $(function(){

        
        if(($('body').hasClass('about-us') || $('body').hasClass('contact') || $('body').hasClass('blog') || $('body').hasClass('article-page')) == false){
            fixedHeader();
            fullscreenHeroSection();
        } 
        customWidth("sign-up-form", "a", "span");
        moveElementOnSmall();

        // Run the function in case of window resize
        $(window).resize(function() {
            if(($('body').hasClass('about-us') || $('body').hasClass('contact') || $('body').hasClass('blog') || $('body').hasClass('article-page')) == false){
                fullscreenHeroSection();   
            }
                moveElementOnSmall(); 
        });

        /*jumbotron parallax */
        $(window).scroll(function () {   
                $('.jumbotron-description').css({
                    'bottom' : -($(this).scrollTop()/2)+"px" // increase # to make even slower
                });  
        }); 

        //$('.timer').countTo();

        $('.partners-logos').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 6,
            slidesToScroll: 1,
            responsive: [
                {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
                },      
                {
                breakpoint: 970,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
                },
                {
                breakpoint: 750,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
                }
            ]
        });


    });

function blogCategories(){
$('.blog-category-title').hide();
    $(".article-type").click(function() { 
        var posts = $('.blog-body .blog-article, .blog-category-title');
        var customType = $(this).data('filter'); 
        $('.blog-main-title').hide();
        posts
            .hide()
            .filter(function () {
                return $(this).data('cat') === customType;
            })
            .show();
    });

}
blogCategories();

function articleCategories(){
    var width = window.innerWidth;
    var posts = $(".second-about .details");
    posts.not(':eq(0)').hide();
    $(".second-about:eq(0)").show();
    $(".round-image.one").addClass('js-helper-round-image-shadow').append('<div class="js-helper-round-image-border"></div>');

    if(width < 768){
            var item = $('.second-about .details:eq(0)');
            var image = $('.round-image:eq(0)');
            image.siblings(":last").after(item);
            item.find('h3, h4').hide();
    }

    $(".round-image").click(function() { 
        var elem = $('.round-image');
        $.each(elem, function(){
            $(this).removeClass('js-helper-round-image-shadow');
            $(this).empty();
        });
        $(this).addClass('js-helper-round-image-shadow').append('<div class="js-helper-round-image-border"></div>');
        var customType = $(this).data('filter'); 
        
        posts
            .hide()
            .filter(function () {
                return $(this).data('cat') === customType;
            })
            .show();

        if(width < 768){
            var item = $('.second-about .details');
            var elem = posts.filter(function () {
                return $(this).data('cat') === customType;
            });
            elem.find(item);
                $(this).siblings(":last").after(elem);
                elem.find('h3, h4').hide();
        }
    });

}
articleCategories();

function opacityAtScroll() {

    $(window).scroll(function(){
        //$(".article-header").css("opacity", 1 - $(window).scrollTop() / $('.article-header').height()/2);
        var introSection = $('.article-header');
var introSectionHeight = introSection.height();
		var scaleSpeed = 0.1;
		//change opacitySpeed if you want to change the speed of opacity reduction effect
		var opacitySpeed = 1.1; 
        		var scrollPercentage = ($(window).scrollTop()/introSectionHeight).toFixed(5),
			scaleValue = 1 + scrollPercentage*scaleSpeed;
		//check if the introSection is still visible
		if( $(window).scrollTop() < introSectionHeight) {
			introSection.css({
			    '-moz-transform': 'scale(' + scaleValue + ') translateZ(0)',
			    '-webkit-transform': 'scale(' + scaleValue + ') translateZ(0)',
				'-ms-transform': 'scale(' + scaleValue + ') translateZ(0)',
				'-o-transform': 'scale(' + scaleValue + ') translateZ(0)',
				'transform': 'scale(' + scaleValue + ') translateZ(0)',
				'opacity': 1 - scrollPercentage*opacitySpeed
			});
		}
    });


    }
opacityAtScroll();

}());













