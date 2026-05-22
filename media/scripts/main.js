/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $("body");

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: ["361px", "480px"],
    xxsmall: [null, "360px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Touch?
  if (browser.mobile) $body.addClass("is-touch");

  // Forms.
  var $form = $("form");

  // Auto-resizing textareas.
  $form.find("textarea").each(function () {
    var $this = $(this),
      $wrapper = $('<div class="textarea-wrapper"></div>'),
      $submits = $this.find('input[type="submit"]');

    $this
      .wrap($wrapper)
      .attr("rows", 1)
      .css("overflow", "hidden")
      .css("resize", "none")
      .on("keydown", function (event) {
        if (event.keyCode == 13 && event.ctrlKey) {
          event.preventDefault();
          event.stopPropagation();

          $(this).blur();
        }
      })
      .on("blur focus", function () {
        $this.val($.trim($this.val()));
      })
      .on("input blur focus --init", function () {
        $wrapper.css("height", $this.height());

        $this
          .css("height", "auto")
          .css("height", $this.prop("scrollHeight") + "px");
      })
      .on("keyup", function (event) {
        if (event.keyCode == 9) $this.select();
      })
      .triggerHandler("--init");

    // Fix.
    if (browser.name == "ie" || browser.mobile)
      $this.css("max-height", "10em").css("overflow-y", "auto");
  });

})(jQuery);

function post_scroll() {
  let mainNavLinks = document.querySelectorAll(".markdownIt-TOC a");

  // This should probably be throttled.
  // Especially because it triggers during smooth scrolling.
  // https://lodash.com/docs/4.17.10#throttle
  // You could do like...
  // window.addEventListener("scroll", () => {
  //    _.throttle(doThatStuff, 100);
  // });
  // Only not doing it here to keep this Pen dependency-free.

  window.addEventListener("scroll", (event) => {
    let fromTop = window.scrollY;

    mainNavLinks.forEach((link, index) => {
      let section = document.getElementById(decodeURI(link.hash).substring(1));
      let nextSection = null;
      if (mainNavLinks[index + 1]) {
        nextSection = document.getElementById(
          decodeURI(mainNavLinks[index + 1].hash).substring(1)
        );
      }
      if (section.offsetTop <= fromTop) {
        if (nextSection) {
          if (nextSection.offsetTop > fromTop) {
            link.classList.add("current");
          } else {
            link.classList.remove("current");
          }
        } else {
          link.classList.add("current");
        }
      } else {
        link.classList.remove("current");
      }
    });
  });
}

function back_to_top() {
  //Get the button:
  mybutton = document.getElementById("BackToTop");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  mybutton.addEventListener("click", topFunction);

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
