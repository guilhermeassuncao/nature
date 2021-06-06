$(document).ready(function () {
    //Adicionar activer ao clique
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

    //Scroll Suave
    $('.menu-nav a[href^="#"]').click(function (e) {
        e.preventDefault();

        var id = $(this).attr("href"),
            menuHeight = $(".menu").innerHeight();
        targetOffset = $(id).offset().top;

        $("html, body").animate(
            {
                scrollTop: targetOffset - menuHeight,
            },
            500
        );
    });

    //Scroll Suave Logo
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
            offsetTop = $(this).offset().top,
            menuHeight = $(".menu").innerHeight(),
            id = $(this).attr("id"),
            $itemMenu = $('a[href="#' + id + '"]'),
            activeClass = 'active';

        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            if (offsetTop - menuHeight < scrollTop && offsetTop + height - menuHeight > scrollTop) {
                $itemMenu.addClass(activeClass);
            } else {
                $itemMenu.removeClass(activeClass);
            }
        });
    });

    //Ativar e desativar btn mobile
    $('.mobile-btn').click(function(){
        activeClass = 'active';
        $(this).toggleClass(activeClass);
        $('.mobile-menu').toggleClass(activeClass);
    })
});
