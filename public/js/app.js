$(document).ready(function () {
    //Debounce
    debounce = function (func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    //Adicionar active ao clique
    $("[data-tab]").each(function () {
        var $allTarget = $(this).find("[data-target]"),
            $allClick = $(this).find("[data-click]"),
            activeClass = "active";

        $allTarget.first().addClass(activeClass);
        $allClick.first().addClass(activeClass);

        $allClick.click(function (e) {
            e.preventDefault();

            var idData = $(this).data("click"),
                $target = $('[data-target="' + idData + '"]');

            $allClick.removeClass("active");
            $allTarget.removeClass("active");

            $(this).addClass("active");
            $target.addClass("active");
        });
    });

    //Scroll Suave link interno
    $('.menu-nav a[href^="#"]').click(function (e) {
        e.preventDefault();

        var id = $(this).attr("href"),
            menuHeight = $(".menu").innerHeight(),
            targetOffset = $(id).offset().top;

        $("html, body").animate(
            {
                scrollTop: targetOffset - menuHeight,
            },
            500
        );
    });

    //Scroll Suave para o topo
    $(".logo").click(function (e) {
        e.preventDefault();

        $("html, body").animate(
            {
                scrollTop: 0,
            },
            500
        );
    });

    //Animar menu ao scroll
    $("section").each(function () {
        var height = $(this).height(),
            offSetTop = $(this).offset().top,
            menuHeight = $(".menu").innerHeight(),
            id = $(this).attr("id"),
            $itemMenu = $('a[href="#' + id + '"]'),
            activeClass = "active";

        $(window).scroll(
            debounce(function () {
                var scrollTop = $(window).scrollTop();
                if (offSetTop - menuHeight < scrollTop && offSetTop + height - menuHeight > scrollTop) {
                    $itemMenu.addClass(activeClass);
                } else {
                    $itemMenu.removeClass(activeClass);
                }
            }, 200)
        );
    });

    //Ativar e desativar btn mobile
    $(".mobile-btn").click(function () {
        activeClass = "active";
        $(this).toggleClass(activeClass);
        $(".mobile-menu").toggleClass(activeClass);
    });

    //Slider
    (function () {
        function slider(sliderName, velocidade) {
            var sliderClass = "." + sliderName,
                activeClass = "active",
                rotate = setInterval(rotateSlide, velocidade);

            $(sliderClass + " > :first").addClass(activeClass);

            $(sliderClass).hover(
                function () {
                    clearInterval(rotate);
                },
                function () {
                    rotate = setInterval(rotateSlide, velocidade);
                }
            );

            function rotateSlide() {
                var activeSlide = $(sliderClass + " > ." + activeClass),
                    nextSlide = activeSlide.next();

                if (nextSlide.length == 0) {
                    nextSlide = $(sliderClass + ".slide > :first");
                }

                activeSlide.removeClass(activeClass);
                nextSlide.addClass(activeClass);
            }
        }

        slider("introducao", 2000);
    })();

    // Animação ao Scroll
    (function () {
        var $target = $('[data-anime="scroll"]'),
            animationClass = "animate",
            offSet = ($(window).height() * 3) / 4;

        function animeScroll() {
            var documentTop = $(window).scrollTop();

            $target.each(function () {
                var itemTop = $(this).offset().top;

                if (documentTop > itemTop - offSet) {
                    $(this).addClass(animationClass);
                } else {
                    $(this).removeClass(animationClass);
                }
            });
        }

        animeScroll();

        $(document).scroll(
            debounce(function () {
                animeScroll();
            }, 200)
        );
    })();
});
