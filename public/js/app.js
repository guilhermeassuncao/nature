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
    $('.logo').click(function(e){
        e.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, 500)
        
    })
});
