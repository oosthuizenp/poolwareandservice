$(document).on("scroll", function () {
    if ($(document).scrollTop() > 86) {
        $("#navigation").addClass("fixed-top");
    }
    else {
        $("#navigation").removeClass("fixed-top");
    }
});