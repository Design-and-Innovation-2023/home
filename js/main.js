/*  ---------------------------------------------------
    Template Name: Dreams
    Description: Dreams wedding template
    Author: Colorib
    Author URI: https://colorlib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

"use strict";

(function ($) {
  /*------------------
        Preloader
    --------------------*/
  $(window).on("load", function () {
    $(".loader").fadeOut();
    $("#preloder").delay(200).fadeOut("slow");

    /*------------------
            Portfolio filter
        --------------------*/
    $(".portfolio__filter li").on("click", function () {
      $(".portfolio__filter li").removeClass("active");
      $(this).addClass("active");
    });
    if ($(".portfolio__gallery").length > 0) {
      var containerEl = document.querySelector(".portfolio__gallery");
      var mixer = mixitup(containerEl);
    }
  });

  /*------------------
        Background Set
    --------------------*/
  $(".set-bg").each(function () {
    var bg = $(this).data("setbg");
    $(this).css("background-image", "url(" + bg + ")");
  });

  //Masonary
  $(".work__gallery").masonry({
    itemSelector: ".work__item",
    columnWidth: ".grid-sizer",
    gutter: 10,
  });

  /*------------------
		Navigation
	--------------------*/
  $(".mobile-menu").slicknav({
    prependTo: "#mobile-menu-wrap",
    allowParentLinks: true,
  });

  /*------------------
		Hero Slider
	--------------------*/
  $(".hero__slider").owlCarousel({
    loop: true,
    dots: true,
    mouseDrag: false,
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    items: 1,
    margin: 0,
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
  });

  var dot = $(".hero__slider .owl-dot");
  dot.each(function () {
    var index = $(this).index() + 1;
    if (index < 10) {
      $(this).html("0").append(index);
    } else {
      $(this).html(index);
    }
  });

  /*------------------
        Testimonial Slider
    --------------------*/
  $(".testimonial__slider").owlCarousel({
    loop: true,
    margin: 0,
    items: 3,
    dots: true,
    dotsEach: 2,
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
    responsive: {
      992: {
        items: 3,
      },
      768: {
        items: 2,
      },
      320: {
        items: 1,
      },
    },
  });

  /*------------------
        Latest Slider
    --------------------*/
  $(".latest__slider").owlCarousel({
    loop: true,
    margin: 0,
    items: 3,
    dots: true,
    dotsEach: 2,
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
    responsive: {
      992: {
        items: 3,
      },
      768: {
        items: 2,
      },
      320: {
        items: 1,
      },
    },
  });

  /*------------------
        Logo Slider
    --------------------*/
  $(".logo__carousel").owlCarousel({
    loop: true,
    margin: 100,
    items: 6,
    dots: false,
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: true,
    responsive: {
      992: {
        items: 5,
      },
      768: {
        items: 4,
      },
      480: {
        items: 3,
      },
      320: {
        items: 2,
      },
    },
  });

  /*------------------
        Video Popup
    --------------------*/
  $(".video-popup").magnificPopup({
    type: "iframe",
  });

  /*------------------
        Counter
    --------------------*/
  $(".counter_num").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text(),
        },
        {
          duration: 4000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now));
          },
        }
      );
  });
})(jQuery);

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");

const carouselChildrens = [...carousel.children];
let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;
// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });
// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};
const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};
const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};
const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

const wrapper2 = document.querySelector(".wrapper-2"); // Changed to "wrapper-2"
const carousel2 = document.querySelector(".carousel-2"); // Changed to "carousel-2"
const firstCardWidth2 = carousel2.querySelector(".card-2").offsetWidth; // Changed to "card-2"
const arrowBtns2 = document.querySelectorAll(".wrapper-2 i"); // Changed to "wrapper-2"

const carouselChildrens2 = [...carousel2.children]; // Changed to "carousel2"
let isDragging2 = false,
  isAutoPlay2 = true,
  startX2,
  startScrollLeft2,
  timeoutId2;
let cardPerView2 = Math.round(carousel2.offsetWidth / firstCardWidth2); // Changed to "carousel2"

carouselChildrens2
  .slice(-cardPerView2)
  .reverse()
  .forEach((card) => {
    carousel2.insertAdjacentHTML("afterbegin", card.outerHTML); // Changed to "carousel2"
  });

carouselChildrens2.slice(0, cardPerView2).forEach((card) => {
  carousel2.insertAdjacentHTML("beforeend", card.outerHTML); // Changed to "carousel2"
});

carousel2.classList.add("no-transition");
carousel2.scrollLeft = carousel2.offsetWidth;
carousel2.classList.remove("no-transition");

arrowBtns2.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel2.scrollLeft +=
      btn.id == "left-2" ? -firstCardWidth2 : firstCardWidth2; // Changed to "left-2"
  });
});

const dragStart2 = (e) => {
  isDragging2 = true;
  carousel2.classList.add("dragging"); // Changed to "carousel2"
  startX2 = e.pageX;
  startScrollLeft2 = carousel2.scrollLeft; // Changed to "carousel2"
};

const dragging2 = (e) => {
  if (!isDragging2) return;
  carousel2.scrollLeft = startScrollLeft2 - (e.pageX - startX2); // Changed to "carousel2"
};

const dragStop2 = () => {
  isDragging2 = false;
  carousel2.classList.remove("dragging"); // Changed to "carousel2"
};

const infiniteScroll2 = () => {
  if (carousel2.scrollLeft === 0) {
    carousel2.classList.add("no-transition"); // Changed to "carousel2"
    carousel2.scrollLeft = carousel2.scrollWidth - 2 * carousel2.offsetWidth; // Changed to "carousel2"
    carousel2.classList.remove("no-transition"); // Changed to "carousel2"
  } else if (
    Math.ceil(carousel2.scrollLeft) ===
    carousel2.scrollWidth - carousel2.offsetWidth
  ) {
    carousel2.classList.add("no-transition"); // Changed to "carousel2"
    carousel2.scrollLeft = carousel2.offsetWidth; // Changed to "carousel2"
    carousel2.classList.remove("no-transition"); // Changed to "carousel2"
  }
  clearTimeout(timeoutId2);
  if (!wrapper2.matches(":hover")) autoPlay2();
};

const autoPlay2 = () => {
  if (window.innerWidth < 800 || !isAutoPlay2) return;
  timeoutId2 = setTimeout(
    () => (carousel2.scrollLeft += firstCardWidth2),
    2500
  ); // Changed to "carousel2"
};

autoPlay2();
carousel2.addEventListener("mousedown", dragStart2); // Changed to "carousel2"
carousel2.addEventListener("mousemove", dragging2); // Changed to "carousel2"
document.addEventListener("mouseup", dragStop2);
carousel2.addEventListener("scroll", infiniteScroll2); // Changed to "carousel2"
wrapper2.addEventListener("mouseenter", () => clearTimeout(timeoutId2));
wrapper2.addEventListener("mouseleave", autoPlay2);

const wrapper3 = document.querySelector(".wrapper-3"); // Changed to "wrapper-3"
const carousel3 = document.querySelector(".carousel-3"); // Changed to "carousel-3"
const firstCardWidth3 = carousel3.querySelector(".card-3").offsetWidth; // Changed to "card-3"
const arrowBtns3 = document.querySelectorAll(".wrapper-3 i"); // Changed to "wrapper-3"

const carouselChildrens3 = [...carousel3.children]; // Changed to "carousel3"
let isDragging3 = false,
  isAutoPlay3 = true,
  startX3,
  startScrollLeft3,
  timeoutId3;
let cardPerView3 = Math.round(carousel3.offsetWidth / firstCardWidth3); // Changed to "carousel3"

carouselChildrens3
  .slice(-cardPerView3)
  .reverse()
  .forEach((card) => {
    carousel3.insertAdjacentHTML("afterbegin", card.outerHTML); // Changed to "carousel3"
  });

carouselChildrens3.slice(0, cardPerView3).forEach((card) => {
  carousel3.insertAdjacentHTML("beforeend", card.outerHTML); // Changed to "carousel3"
});

carousel3.classList.add("no-transition");
carousel3.scrollLeft = carousel3.offsetWidth;
carousel3.classList.remove("no-transition");

arrowBtns3.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel3.scrollLeft +=
      btn.id == "left-3" ? -firstCardWidth3 : firstCardWidth3; // Changed to "left-3"
  });
});

const dragStart3 = (e) => {
  isDragging3 = true;
  carousel3.classList.add("dragging"); // Changed to "carousel3"
  startX3 = e.pageX;
  startScrollLeft3 = carousel3.scrollLeft; // Changed to "carousel3"
};

const dragging3 = (e) => {
  if (!isDragging3) return;
  carousel3.scrollLeft = startScrollLeft3 - (e.pageX - startX3); // Changed to "carousel3"
};

const dragStop3 = () => {
  isDragging3 = false;
  carousel3.classList.remove("dragging"); // Changed to "carousel3"
};

const infiniteScroll3 = () => {
  if (carousel3.scrollLeft === 0) {
    carousel3.classList.add("no-transition"); // Changed to "carousel3"
    carousel3.scrollLeft = carousel3.scrollWidth - 2 * carousel3.offsetWidth; // Changed to "carousel3"
    carousel3.classList.remove("no-transition"); // Changed to "carousel3"
  } else if (
    Math.ceil(carousel3.scrollLeft) ===
    carousel3.scrollWidth - carousel3.offsetWidth
  ) {
    carousel3.classList.add("no-transition"); // Changed to "carousel3"
    carousel3.scrollLeft = carousel3.offsetWidth; // Changed to "carousel3"
    carousel3.classList.remove("no-transition"); // Changed to "carousel3"
  }
  clearTimeout(timeoutId3);
  if (!wrapper3.matches(":hover")) autoPlay3();
};

const autoPlay3 = () => {
  if (window.innerWidth < 800 || !isAutoPlay3) return;
  timeoutId3 = setTimeout(
    () => (carousel3.scrollLeft += firstCardWidth3),
    2500
  ); // Changed to "carousel3"
};

autoPlay3();
carousel3.addEventListener("mousedown", dragStart3); // Changed to "carousel3"
carousel3.addEventListener("mousemove", dragging3); // Changed to "carousel3"
document.addEventListener("mouseup", dragStop3);
carousel3.addEventListener("scroll", infiniteScroll3); // Changed to "carousel3"
wrapper3.addEventListener("mouseenter", () => clearTimeout(timeoutId3));
wrapper3.addEventListener("mouseleave", autoPlay3);
