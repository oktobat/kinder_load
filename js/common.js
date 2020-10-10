(function ($) {
  var deviceSize = 767;
  function scrollOX(status) {
    $("html").css({
      overflowY: status,
    });
    var htmlWidth = $("html").width();
    return htmlWidth;
  }
  var swh = scrollOX("hidden"),
    sws = scrollOX("scroll"),
    swd = swh - sws;
  if (swd > 0) {
    deviceSize = deviceSize - swd;
  }

  init();
  function init() {
    var ww = $(window).width();
    if (ww > deviceSize && !$("html").hasClass("pc")) {
      $("html").addClass("pc").removeClass("mobile");
      $(".logoNav .nav").show();
      $(".depth1 > li").removeClass("on");
      $(".open_nav, .close_nav, .depth2").hide();
    } else if (ww <= deviceSize && !$("html").hasClass("mobile")) {
      $("html").addClass("mobile").removeClass("pc");
      $(".open_nav").show();
      $(".logoNav .nav, .depth2").hide();
    }
  }

  $(window).on("resize", function () {
    init();
  });

  $("#containerBox").load("main.html");

  // 모바일화면에서 1단계메뉴 클릭했을때 2단계메뉴 보이게 하고,
  // 2단계 메뉴가 없으면 1단계메뉴 페이지 로드시키기
  $(".depth1 > li > a").on("click", function (e) {
    e.preventDefault();
    if ($("html").hasClass("mobile")) {
      if ($(this).next().is(".depth2")) {
        $(this).parent().toggleClass("on");
        $(this).parent().find(".depth2").stop().slideToggle(300);
        $(this)
          .parent()
          .siblings()
          .each(function () {
            if ($(this).find(".depth2").css("display") === "block") {
              $(this).find(".depth2").slideUp(300);
              $(this).removeClass("on");
            }
          });
      } else if (!$(this).next().is(".depth2")) {
        var url = $(this).attr("href");
        $("#container").remove();
        $("#containerBox").load(url);
        $(".open_nav").show();
        $(".logoNav .nav, .close_nav").hide();
        $(".depth1 > li").removeClass("on");
      }
    } else if ($("html").hasClass("pc")) {
      var url = $(this).attr("href");
      $("#container").remove();
      $("#containerBox").load(url);
    }
  });

  // pc화면에서 1단계메뉴에 호버했을때 2단계메뉴 보이게 하기
  $(".depth1 > li").hover(
    function () {
      if ($("html").hasClass("pc")) {
        $(this).find(".depth2").stop().slideDown(300);
      }
    },
    function () {
      if ($("html").hasClass("pc")) {
        $(this).find(".depth2").stop().slideUp(300);
      }
    }
  );

  // 2단계 메뉴 클릭하면 모든 화면에서 페이지 로드시킨 후, 모바일화면에서는 햄버거 버튼만 보이게 하기
  $(".nav .depth2 > li > a").on("click", function (e) {
    e.preventDefault();
    var url = $(this).attr("href");
    $("#container").remove();
    $("#containerBox").load(url);
    if ($("html").hasClass("mobile")) {
      $(".open_nav").show();
      $(".logoNav .nav, .depth2, .close_nav").hide();
      $(".depth1 > li").removeClass("on");
    }
  });

  $(".login a, h1 a").on("click", function (e) {
    e.preventDefault();
    var url = $(this).attr("href");
    $("#container").remove();
    $("#containerBox").load(url);
  });

  // 햄버거버튼 클릭시 네비박스 나타나기
  $(".logoNav .open_nav").on("click", function () {
    $(this).next().stop().slideDown(300);
    $(this).hide();
    $(this).nextAll(".close_nav").css({ display: "block" });
  });

  // 닫기버튼 클릭시 네비박스 사라지기
  $(".logoNav .close_nav").on("click", function () {
    $(this).prev().stop().slideUp(300);
    $(this).hide();
    $(this).prevAll(".open_nav").css({ display: "block" });
    $(".depth2").hide();
    $(".logoNav .nav .depth1 > li").removeClass("on");
  });
})(jQuery);
