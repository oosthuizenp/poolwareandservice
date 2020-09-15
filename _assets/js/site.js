$(document).on("scroll", function () {
    const heroHeight = $('#hero').outerHeight();
    const navigationHeight = $('#navigation').outerHeight();

    if ($(document).scrollTop() > heroHeight) {
        $("#navigation").addClass("fixed-top");
        $('body').css('padding-top', navigationHeight + 'px');
        $('#hero').addClass("invisible");
    }
    else {
        $("#navigation").removeClass("fixed-top");
        $('body').css('padding-top', '0');
        $('#hero').removeClass("invisible");
    }
});

$(function() {
    $('thead').addClass('thead-pas');
});