var NioApp =(function (jQ, win, doc){
    "use strict";
    var NioApp = {AppInfo: {name: "GENOX", package: "1.3.0", version: "1.3.0", author: "Softnio"} },
        components = {docReady: [], docReadyDefer: [], winLoad: [], winLoadDefer: []};

    jQ(doc).ready(docReady);
    jQ(win).on("load", winLoad);

    function docReady(stmt){
        stmt = (typeof stmt === typeof undefined) ? jQ : stmt;
        components.docReady.concat(components.docReadyDefer).forEach(function(component){ component(stmt); });
    }

    function winLoad(stmt){
        stmt = (typeof stmt === "object") ? jQ : stmt;
        components.winLoad.concat(components.winLoadDefer).forEach(function(component){ component(stmt); });
    }
	
    NioApp.components   = components;
    NioApp.docReady 	= docReady;
    NioApp.winLoad    	= winLoad;

    return NioApp;
}(jQuery, window, document));

NioApp = function (NioApp, $, window, document) {
    "use strict";
	// Defined Variables
    var $win		= $(window), 
		$doc		= $(document),
		$body		= $('body'),
		$header		= $('.header-main'),
		$nav_creative = $('.header-navbar-creative');
 
	var _navBreak	= 992,
		_mobBreak	= 768,
		_mobMenu	= 'menu-mobile',
		_has_fixed	= 'has-fixed',
		_is_shrink	= 'is-shrink',
        _currentURL	= window.location.href,
        _headerHT	= ($header.innerHeight() - 2),
        _splitURL	= _currentURL.split("#");
    
      
	// is exists @v1.0
	$.fn.exists = function () {
        return this.length > 0;
    };

    if($nav_creative.exists()){
        _navBreak	= 576;
    }
	
	// Return Check @v1.0
	NioApp.Win = {};
	NioApp.Win.height = $(window).height();
	NioApp.Win.width = $(window).width();
	
	// getStatus @v1.1
	NioApp.getStatus = {};
	NioApp.getStatus.isRTL = ($body.hasClass('has-rtl') || $body.attr('dir') === 'rtl') ? true : false;
	NioApp.getStatus.isTouch = (("ontouchstart" in document.documentElement)) ? true : false;
	NioApp.getStatus.isMobile = (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|/i)) ? true : false;
	NioApp.getStatus.asMobile = (NioApp.Win.width < _mobBreak) ? true : false;
	
	// Update on Resize
	$win.on('resize',function(){
		NioApp.Win.height = $(window).height();
		NioApp.Win.width = $(window).width();
		NioApp.getStatus.asMobile = (NioApp.Win.width < _mobBreak) ? true : false;
    });
    
    //// Utilities ////
	///////////////////
	NioApp.Util = {};
	// ClassInit !Util @v1.0
	NioApp.Util.classInit = function() {
		var hastouch = function () {
				if (NioApp.getStatus.isTouch===true) { 
					$body.addClass("has-touch"); 
				} else { 
					$body.addClass("no-touch"); 
				}
			},
			mobileview = function () {
				if (NioApp.getStatus.asMobile===true) { 
					$body.addClass('as-mobile');
				} else {
					$body.removeClass('as-mobile');
				}
			},
            hasrtl = function () {
                if($body.attr('dir') === 'rtl') {
                    $body.addClass('has-rtl');
                    NioApp.getStatus.isRTL = true;
                }
            };
		hastouch(); mobileview(); hasrtl();
		$(window).on('resize', mobileview);
	};
    NioApp.components.docReady.push(NioApp.Util.classInit);
	
    // PreLoader !Util @v1.0
    NioApp.Util.preLoader = function () {
		var $preloader 	= $('.preloader'),
			$spinner 	= $('.spinner');
		
		if ($preloader.exists()) {
            $body.addClass("page-loaded");
            $spinner.addClass('load-done');
            $preloader.delay(600).fadeOut(300);
        }
	};
    NioApp.components.winLoad.push(NioApp.Util.preLoader);
    
	// BackTop !Util @v1.0
	NioApp.Util.backTop = function () {
		var $backtop = $('.backtop');
			
        if ($backtop.exists()) {
              var scrollOffsetFromTop = 800;
              if ($win.scrollTop() > scrollOffsetFromTop) {
                  $backtop.fadeIn("slow");
              } else {
                  $backtop.fadeOut("slow");
              }

              $backtop.on("click", function (e) {
                  $('body,html').stop().animate({
                      scrollTop: 0
                  }, 1500, 'easeInOutExpo');
                  e.preventDefault();
              });
          }
    };
    NioApp.components.docReady.push(NioApp.Util.backTop);
    
    // Search !Util @v1.0
	NioApp.Util.headerSearch = function () {

        var searcharea = $('.header-search'),
            searchTrigger = $('.search-trigger'),
            siteBody = $('body');

        searchTrigger.on('click', function(e) {
             e.preventDefault();
            siteBody.addClass('search-show');
        });
       
        searcharea.on('click',  function(e) {
            if( !$(e.target).is('.input-search') ) {
                if(siteBody.hasClass('search-show')){
                    siteBody.removeClass('search-show');
                }
            }
        });
    };
    NioApp.components.docReady.push(NioApp.Util.headerSearch);
    
    // Browser Check !Util @v1.0
    NioApp.Util.browser = function() {
        var isChrome = (navigator.userAgent.indexOf("Chrome") !== -1) ? 1 : 0, 
        isFirefox = (navigator.userAgent.indexOf("Firefox") !== -1) ? 1 : 0,
        isSafari = (navigator.userAgent.indexOf("Safari") !== -1) ? true : false,
        isIE = ((navigator.userAgent.indexOf("MSIE") !== -1 ) || (!!document.documentMode)) ? 1 : 0,
        isEdge = !isIE && !!window.StyleMedia, 
        isOpera = (navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) ? 1 : 0;
        
        if(isChrome) {
            $body.addClass('chrome');
        } else if (isFirefox){
            $body.addClass('firefox');
        } else if (isIE){
            $body.addClass('ie');
        } else if (isEdge){
            $body.addClass('edge');
        } else if (isOpera){
            $body.addClass('opera');
        } else if (isSafari){
            $body.addClass('safari');
        }
    };
	NioApp.components.winLoad.push(NioApp.Util.browser);
	
	// HeaderSticky !Util @v1.0
	NioApp.Util.headerSticky = function () {
		var $is_sticky = $('.is-sticky');
        
        var stickyInit = {};
        
        stickyInit.hasFixed = function () {
            if ($is_sticky.exists() ) {
                var navm = $is_sticky.offset();
                $win.on('scroll', function(){
                    var _top = $win.scrollTop();
                    if(_top > navm.top){
                        if(!$is_sticky.hasClass(_has_fixed)) {
                            $is_sticky.addClass(_has_fixed);
                        }
                    }
                     else {
                       
                        if($is_sticky.hasClass(_has_fixed)) {
                            $is_sticky.removeClass(_has_fixed);
                        }
                    }
                });
            }
        };
        stickyInit.hasShrink = function () {
            if($is_sticky.hasClass(_is_shrink)) {
                _headerHT = ($header.height() + 16 - 2);
            }
        };
        stickyInit.hasFixed(); stickyInit.hasShrink();
        $win.on('resize', function() {
            _headerHT = ($is_sticky.hasClass(_is_shrink)) ? ($header.height() + 16 - 2) : ($header.innerHeight() - 2);
        });
        
	};
	NioApp.components.docReady.push(NioApp.Util.headerSticky);
	
	// imageBG !Util @v1.0
	NioApp.Util.imageBG = function () {
		var $imagebg = $(".bg-image");
		
		if($imagebg.exists()) {
			$imagebg.each(function(){
				var $this = $(this), $that = $this.parent(), overlay = $this.data('overlay'), opacity = $this.data('opacity'), image = $this.children('img').attr('src');
				var overlay_type = (typeof overlay!=='undefined' && overlay) ? overlay : false;
				var opacity_value = (typeof opacity!=='undefined' && opacity) ? opacity : false;

				// If image found
				if (typeof image!=='undefined' && image !==''){
					if (!$that.hasClass('has-bg-image')) {
						$that.addClass('has-bg-image');
					}
					if ( overlay_type ) {
						if (!$this.hasClass('overlay-'+overlay_type)) {
							$this.addClass('overlay');
							$this.addClass('overlay-'+overlay_type);
						}
					} else {
						if (!$this.hasClass('overlay-fall')) {
							$this.addClass('overlay-fall');
						}
					}
					if ( opacity_value ) {
						$this.addClass('overlay-opacity-'+opacity_value);
					}
					$this.css("background-image", 'url("'+ image +'")').addClass('bg-image-loaded');
				}
			});
		}
	};
    NioApp.components.docReady.push(NioApp.Util.imageBG);
    
    NioApp.Util.Ovm = function () {
		var $elm_ovm = $('.nk-ovm'), $elm_ovm_mask = $('.nk-ovm[class*=mask]');
		if($elm_ovm.exists()) {
			$elm_ovm.each(function(){
				if (!$(this).parent().hasClass('has-ovm')) { $(this).parent().addClass('has-ovm');}
			});
		}
        if($elm_ovm_mask.exists()) {
			$elm_ovm_mask.each(function(){
				if (!$(this).parent().hasClass('has-mask')) { $(this).parent().addClass('has-mask');}
			});
		}
	};
	
	NioApp.components.docReady.push(NioApp.Util.Ovm);
	
    // Dropdown @v1.0
    NioApp.Util.toggler = function(){
		var _trigger = '.toggle-tigger', _toggle = '.toggle-class';
		
        if ($(_trigger).exists()) {
            $doc.on('click', _trigger, function(e){
                var $self = $(this);
                $(_trigger).not($self).removeClass('active');
                $(_toggle).not($self.parent().children()).removeClass('active');
                $self.toggleClass('active').parent().find(_toggle).toggleClass('active');
                e.preventDefault();
            });
        }
        
        $doc.on('click', 'body', function(e){
        var $elm_tig = $(_trigger), $elm_tog = $(_toggle);
            if (!$elm_tog.is(e.target) && $elm_tog.has(e.target).length===0 && 
                !$elm_tig.is(e.target) && $elm_tig.has(e.target).length===0) {
                    $elm_tog.removeClass('active');
                    $elm_tig.removeClass('active');
            }
        });
    };
	NioApp.components.docReady.push(NioApp.Util.toggler);
	
	// accordionActive @v1.0
    NioApp.Util.accordionActive = function() {
        var $accordion_item = $('.accordion-item'),
            $accordion_title = $('.accordion-title');
        
        if($accordion_item.exists()){
            $accordion_item.each(function() {
                var $self = $(this), $that = $self.find('.accordion-title');
                if(!$that.hasClass('collapsed')){
                    $self.addClass('current');
                } else {
                     $self.removeClass('current');
                }
            });
        }
        
        if($accordion_title.exists()){
            $accordion_title.on('click',function() {
                var $self = $(this);
                $self.parent().siblings().removeClass('current');
                $self.parent().addClass('current');
            });
        }
	};
	NioApp.components.docReady.push(NioApp.Util.accordionActive);
	
	// scrollAnimation !Util @v1.0
    NioApp.Util.scrollAnimation = function () {
		var $animated = $('.animated');
		
        if($().waypoint && $animated.exists()){
			$animated.each(function(){
				var aniWay = $(this), typ = aniWay.data("animate"), dur = aniWay.data("duration"), dly = aniWay.data("delay");
				aniWay.waypoint(function(){
					aniWay.addClass("animated "+typ).css("visibility", "visible");
					if(dur){ 
						aniWay.css('animation-duration', dur+'s'); 
					}
					if(dly){ 
						aniWay.css('animation-delay', dly+'s'); 
					}
				}, { offset: '93%' });
			});
        }
    };
	NioApp.components.winLoad.push(NioApp.Util.scrollAnimation);

	//Counter !Util @v1.0
    NioApp.Util.Counter = function () {
        var $count = $('.count');
        var countTo = $('.count').attr('data-count');
        if($().waypoint && $count.exists()){
			$count.each(function(){
                $count.waypoint(function(){
                    $count.counter({
                            duration: 2000,
                            countFrom: 0,  
                            countTo: countTo
                        });
                }, { offset: '93%' });
            });
            
        }
    };
	NioApp.components.winLoad.push(NioApp.Util.Counter);
   
	// SliderAnimation !Util @v1.0
    NioApp.Util.sliderAnimation = function () {
		var $animate = $('.animate');
		
        if($animate.exists()){
			$animate.each(function(){
				var $self = $(this), typ = $self.data("animate"), dur = $self.data("duration"), dly = $self.data("delay");
                $self.addClass(typ);
                $self.css({'visibility': 'visible','transition-duration': dur+'s','transition-delay': dly+'s'});
			});
        }
    };
	NioApp.components.winLoad.push(NioApp.Util.sliderAnimation);
    
	// Mainmenu/Nav @v1.0
	NioApp.MainMenu = function() {
		var $navbar_toggle       = $('.navbar-toggle'),  
			$main_navbar         = $('.header-navbar'),
			$main_navbar_classic = $('.header-navbar-classic'),
			$menu_toggle         = $('.menu-toggle'),
			$menu_link           = $('.menu-link'),
			_main_menu           = '.header-menu',
			_menu_drop           = '.menu-drop',
			_open_nav            = 'open-nav',
			_nav_overlay         = '.header-navbar-overlay',
			_menu_toggle_alt     = 'menu-toggle-alt',
			_open_menu           = 'menu-shown';
		
		var MenuInit = {};
        
		// navToggle @v1.0
		MenuInit.Overlay = function () {
			if($main_navbar.exists() ){
                $main_navbar.append('<div class="header-navbar-overlay"></div>');
            }
        };
		MenuInit.navToggle = function () {
			if($navbar_toggle.exists() ){
				$navbar_toggle.on('click', function(e){
                    var $self = $(this), _self_toggle = ($self.data('menu-toggle'));
                        $self.toggleClass('active');
                    if($main_navbar_classic.exists()) {
                       $('#' + _self_toggle).slideToggle().toggleClass(_open_menu);
                    }else{
                       $('#' + _self_toggle).parent().toggleClass(_open_menu);
                    }
					e.preventDefault();
				});
			}
		};
		// navClose @v1.0
		MenuInit.navClose = function () {
            $(_nav_overlay).on('click', function(){
                $navbar_toggle.removeClass('');
                $main_navbar.removeClass(_open_menu);
            });
			$doc.on('click', 'body', function(e){
				if (!$menu_toggle.is(e.target) && $menu_toggle.has(e.target).length===0 && !$header.is(e.target) && $header.has(e.target).length===0 && $win.width() < _navBreak)  {
					$navbar_toggle.removeClass('active');
					$main_navbar_classic.find(_main_menu).slideUp();
                    $main_navbar.removeClass(_open_menu);
				}
			});
		};
        
		// menuToggle @v1.0
		MenuInit.menuToggle = function () {
			if ($menu_toggle.exists()) {
				$menu_toggle.on("click",function(e){
					var self = $(this), $parent = self.parent();
					if ($win.width() < _navBreak || self.hasClass(_menu_toggle_alt)) {
						$parent.children(_menu_drop).slideToggle(400);
						$parent.siblings().children(_menu_drop).slideUp(400);
						$parent.toggleClass(_open_nav);
						$parent.siblings().removeClass(_open_nav);
					}
					e.preventDefault();
				});
			}
		};
		// mobileNav @v1.0
		MenuInit.mobileNav = function() {

			if($win.width() < _navBreak){
				$main_navbar.delay(500).addClass(_mobMenu);
			}else{
				$main_navbar.delay(500).removeClass(_mobMenu);
                $navbar_toggle.removeClass('active');
				$main_navbar.removeClass(_open_menu);
			}
		};
		// currentPage @v1.0
		MenuInit.currentPage = function() {
            var url = window.location.href;
			if ($menu_link.exists()) {
				$menu_link.each(function() {
                    if (url === (this.href)) {
                        $(this).closest("li").addClass("active").parent().closest("li").addClass("active");
                    }
				});
            }
		};
		// Initialing
		MenuInit.Overlay(); MenuInit.navToggle(); MenuInit.navClose(); 
        MenuInit.menuToggle(); MenuInit.mobileNav(); MenuInit.currentPage();
        $win.on('resize', function(){
            MenuInit.mobileNav();
        });
	};
	NioApp.components.docReady.push(NioApp.MainMenu);

    // OnePageScroll @v1.0
    NioApp.OnePageScroll = function() {
        var _scroll_tigger = '.menu-link';
        $('a'+ _scroll_tigger +'[href*="#"]:not([href="#"])').on("click", function() {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var toHash = this.hash, toHashN = (this.hash.slice(1)) ? $('[name=' + this.hash.slice(1) + ']') : false;
                var $toHash = toHash.length ? $(toHash) : toHashN;
                if ($toHash.length) {
                    $('.navbar-toggle').removeClass('active');
                    $('.header-navbar').removeClass('menu-shown');
                    $('html, body').delay(150).animate({
                        scrollTop: ($toHash.offset().top - _headerHT)
                    }, 1000, "easeInOutExpo"); 
                    return false;
                }
            }
        });
    };
	NioApp.components.docReady.push(NioApp.OnePageScroll);

    //scrollAct @v1.0
    NioApp.scrollAct = function() {
        $body.scrollspy({ 
            target: '#header-menu',
            offset: (_headerHT + 2),
        });
    };
    NioApp.components.docReady.push(NioApp.scrollAct);

	//// Plugins ////
	/////////////////
	NioApp.Plugins = {};
	
    // Carousel !Plugin @v1.1 @owl->slick 
    NioApp.Plugins.carousel = function () {

		// Carousel
        var $carousel = $('.has-carousel');

		if ($carousel.exists()) {
			$carousel.each(function () {
                var $self = $(this);
                var c_item = ($self.data('items')) ? $self.data('items') : 4;
                var c_item_t_l = ($self.data('items-tab-l')) ? $self.data('items-tab-l') : (c_item - 1);
                var c_item_t_p = ($self.data('items-tab-p')) ? $self.data('items-tab-p') : (c_item_t_l - 1);
                var c_item_m = ($self.data('items-mobile')) ? $self.data('items-mobile') : 1;
                var c_scroll = ($self.data('scroll')) ? $self.data('scroll') : 1;
                var c_delay =($self.data('delay')) ? $self.data('delay') : 6000;
                var c_speed =($self.data('speed')) ? $self.data('speed') : 500;
                var c_ease =($self.data('ease')) ? $self.data('ease') : 'linear';
                var c_auto =($self.data('auto')) ? $self.data('auto') : false;
                var c_loop =($self.data('loop')) ? $self.data('loop') : false;
                var c_dots = ($self.data('dots')) ? $self.data('dots') : false;
                var c_navs = ($self.data('navs')) ? $self.data('navs') : false;
                var c_ctr = ($self.data('center')) ? $self.data('center') : false;
                var c_eft = ($self.data('effect')) ? $self.data('effect') : false;
                var c_varW = ($self.data('varwidth')) ? $self.data('varwidth') : false;
				var arrow_n = $(".slick-next"),arrow_p = $(".slick-prev");
                if(c_item===1){
                    c_item_t_l = c_item_t_p = c_item_m = 1;
                };

                if( c_navs === true) {
                    $(".tes-arrow").addClass('active');
                }
                
                $self.slick({
                    autoplay: c_auto,
                    autoplaySpeed: c_delay,
                    speed: c_speed,
                    centerMode: c_ctr,
                    infinite : c_loop,
                    dots: c_dots,
                    swipeToSlide: true,
                    arrows: c_navs,
                    slidesToScroll: c_scroll,
                    cssEase: c_ease,
                    variableWidth: c_varW,
                    touchThreshold:30,
                    mobileFirst: true,
                    fade: c_eft,
                    nextArrow : arrow_n,
                    prevArrow : arrow_p,
                    rtl: NioApp.getStatus.isRTL,
                    // Responsive Settings
                    responsive: [{
                        breakpoint: 1200,settings:{slidesToShow: c_item}
                    },{
                        breakpoint: 992,settings:{slidesToShow: c_item_t_l}
                    },{
                        breakpoint: 767,settings:{slidesToShow: c_item_t_l}
                    },{
                        breakpoint: 575,settings:{slidesToShow: c_item_m}
                    }]
                });
			});
        };
        
		
	};
    NioApp.components.winLoad.push(NioApp.Plugins.carousel);
    
	// Select2 !Plugin @v1.0
	NioApp.Plugins.select2 = function () {
		var $select = $(".select");
		if ($select.exists()) {
			$select.each(function(){
				var $self = $(this),
                    _theme = ($self.data('select2-theme')) ? $self.data('select2-theme') : 'bordered',
                    _place = ($self.data('select2-placehold')) ? $self.data('select2-placehold') : 'Select an option';
				$self.select2({ placeholder: _place, theme: "default select-" + _theme });
			});
        }
	};
	NioApp.components.docReady.push(NioApp.Plugins.select2);
    
    // Validator !Plugin @v1.0
	NioApp.Plugins.validform = function () {
		var $form = $(".form-validate");
        if( !$().validate ) {
            console.log('jQuery Form Validate not Defined.');
            return true;
        }
		if ($form.exists()) {
			$form.each(function(){
                var $self = $(this);
				$self.validate();
                $self.find('.select').on('change', function() { $(this).valid(); });
			});
        }
	};
	NioApp.components.docReady.push(NioApp.Plugins.validform);

	// Form Validation !Plugin @v1.0
	NioApp.Plugins.submitform = function () {
		var $form = $('.genox-form');
        
        if( !$().validate && !$().ajaxSubmit ) {
            console.log('jQuery Form and Form Validate not Defined.');
            return true;
        }
        
        if ($form.exists()) {
            $form.each(function(){
                var $self = $(this), _result = $self.find('.form-results');
                $self.validate({
                    ignore: [],
                    invalidHandler: function () { _result.slideUp(400); },
                    submitHandler: function(form) {
                    _result.slideUp(400);
                    $(form).ajaxSubmit({
                        target: _result, dataType: 'json',
                        success: function(data) {
                            var type = (data.result==='error') ? 'alert-danger' : 'alert-success';
                            _result.removeClass( 'alert-danger alert-success' ).addClass( 'alert ' + type ).html(data.message).slideDown(400);
                            if (data.result !== 'error') { $(form).clearForm().find('input').removeClass('input-focused'); }
                        }
                    });
                    }
                });
                $self.find('.select').on('change', function() { $(this).valid(); });
            });
        }
	};
	NioApp.components.docReady.push(NioApp.Plugins.submitform);

    // Popup !Plugin @v1.0
	NioApp.Plugins.popup = function () {
		var $content_popup = $('.content-popup'),
			$video_popup     = $('.video-popup'),
			$image_popup     = $('.image-popup');
		
		var popupInit = {};
		popupInit.content_popup = function () {
			if ($content_popup.exists()) {
				$content_popup.each(function(){
					$(this).magnificPopup({
						type: 'inline',
						preloader: true,
						removalDelay: 400,
						mainClass: 'mfp-fade content-popup'
					});
				});
			}
		};
		popupInit.video_popup = function () {
			if ($video_popup.exists()) {
				$video_popup.each(function(){
					$(this).magnificPopup({
						type: 'iframe',
						removalDelay: 160,
						preloader: true,
						fixedContentPos: false,
						callbacks: {
							beforeOpen: function() {
								this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
								this.st.mainClass = this.st.el.attr('data-effect');
							}
						},
					});
				});
			}
		};
        popupInit.image_popup = function () {
			if ($image_popup.exists()) {
				$image_popup.each(function(){
					$(this).magnificPopup({
						type: 'image',
						mainClass: 'mfp-fade image-popup'
					});
				});
			}
		};
		popupInit.content_popup(); 
		popupInit.video_popup();
		popupInit.image_popup();
	};
    NioApp.components.docReady.push(NioApp.Plugins.popup);

    // Twitter feed 
    NioApp.Plugins.twitterfeed = function () {
        var _tweets_feed = 'tweets_feed';
        if($('#'+_tweets_feed).exists()){
            var twitterConfig = {
                "profile": {
                  "screenName": 'envato'
                },
                "domId": _tweets_feed,
                "maxTweets": 3,
                "enableLinks": true,
                "showUser": false,
                "showRetweet": true,
                "showInteraction": false,
                "showTime": true
              };
            twitterFetcher.fetch(twitterConfig);
        }
     };
    NioApp.components.winLoad.push(NioApp.Plugins.twitterfeed);

    // datepicker 
    NioApp.Plugins.datepicker = function () {
        $('.datepicker').datepicker()
    };
    NioApp.components.winLoad.push(NioApp.Plugins.datepicker);

    // lineanimate  
    NioApp.Plugins.lineanimate = function () {
        $('.line-animate').addClass('active');
    };
    NioApp.components.winLoad.push(NioApp.Plugins.lineanimate);

    // Filter
    NioApp.Plugins.filterz = function () {

        var $filter_project = $('.project');
        var $filter_tiger = $('.project-filter li');
        
        $filter_project.each(function(){
            var $self = $(this),
                f_layout =($self.data('layout')) ? $self.data('layout') : 'packed';
            $(this).filterizr({
                layout: f_layout,
            });
        })
        
        $filter_tiger.on('click',function() { 
            $filter_tiger.removeClass('active');
            $(this).addClass('active');
        });
	};
    NioApp.components.winLoad.push(NioApp.Plugins.filterz);
    
    NioApp.Plugins.videoBG = function () {
		var $videobg = $(".bg-video");
		
		if($videobg.exists()) {
			$videobg.each(function(){
				var $this = $(this), $that = $this.parent(), overlay = $this.data('overlay'), opacity = $this.data('opacity'),  video = $this.data('video'), cover = $this.data('cover'), 
                    overlay_type = (typeof overlay!=='undefined' && overlay) ? overlay : false, opacity_value = (typeof opacity!=='undefined' && opacity) ? opacity : false, cover_value = (typeof cover!=='undefined' && cover) ? cover : false;
                
                if (!$that.hasClass('has-bg-video')) {
                    $that.addClass('has-bg-video');
                }
                
                if ( overlay_type ) {
                    if (!$this.hasClass('overlay-'+overlay_type)) {
                        $this.addClass('overlay');
                        $this.addClass('overlay-'+overlay_type);
                    }
                } else {
                    if (!$this.hasClass('overlay-fall')) {
                        $this.addClass('overlay-fall');
                    }
                }
                if ( opacity_value ) {
                    $this.addClass('overlay-opacity-'+opacity_value);
                }
                
                if ( cover_value && NioApp.getStatus.isTouch && NioApp.getStatus.isMobile) {
                    $this.addClass('cover-enabled')
                    $this.append('<div class="bg-video-cover" style="background-image:url('+ cover_value +')"></div>');
                }
                
                if ($this.hasClass('bg-video-youtube') && !$this.hasClass('cover-enabled')){
                    $this.YTPlayer({
                        fitToBackground: true,
                        videoId: video,
                        callback: function() {
                            console.clear();
                        }
                    });
                }
			});
		}
	};
	NioApp.components.docReady.push(NioApp.Plugins.videoBG);
    $win.on('resize', function(){
        NioApp.components.docReady.push(NioApp.Plugins.videoBG);
    });
    
    

}(NioApp, jQuery, window, document);

