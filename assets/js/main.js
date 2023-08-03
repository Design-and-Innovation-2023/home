(function () {
  /*=====================================
    Sticky
    ======================================= */
  window.onscroll = function () {
    var header_navbar = document.querySelector(".navbar-area");
    var sticky = header_navbar.offsetTop;

    if (window.pageYOffset > sticky) {
      header_navbar.classList.add("sticky");
    } else {
      header_navbar.classList.remove("sticky");
    }

    // show or hide the back-top-top button
    var backToTo = document.querySelector(".scroll-top");
    // if (
    //   document.body.scrollTop > 50 ||
    //   document.documentElement.scrollTop > 50
    // ) {
    //   backToTo.style.display = "flex";
    // } else {
    //   backToTo.style.display = "none";
    // }
  };

  // section menu active
  function onScroll(event) {
    var sections = document.querySelectorAll(".page-scroll");
    var scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    for (var i = 0; i < sections.length; i++) {
      var currLink = sections[i];
      var val = currLink.getAttribute("href");
      var refElement = document.querySelector(val);
      var scrollTopMinus = scrollPos + 73;
      if (
        refElement.offsetTop <= scrollTopMinus &&
        refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
      ) {
        document.querySelector(".page-scroll").classList.remove("active");
        currLink.classList.add("active");
      } else {
        currLink.classList.remove("active");
      }
    }
  }

  window.document.addEventListener("scroll", onScroll);

  // for menu scroll
  var pageLink = document.querySelectorAll(".page-scroll");

  pageLink.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(elem.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        offsetTop: 1 - 60,
      });
    });
  });

  ("use strict");
})();

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");

const carouselChildrens = [...carousel.children];
let isDragging = false,
  isAutoPlay = false,
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
// // Insert copies of the first few cards to end of carousel for infinite scrolling
// carouselChildrens.slice(0, cardPerView).forEach((card) => {
//   carousel.insertAdjacentHTML("beforeend", card.outerHTML);
// });
// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft +=
      btn.id == "left-1" ? -firstCardWidth : firstCardWidth;
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
// carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

const wrapper2 = document.querySelector(".wrapper-2"); // Changed to "wrapper-2"
const carousel2 = document.querySelector(".carousel-2"); // Changed to "carousel-2"
const firstCardWidth2 = carousel2.querySelector(".card-2").offsetWidth; // Changed to "card-2"
const arrowBtns2 = document.querySelectorAll(".wrapper-2 i"); // Changed to "wrapper-2"

const carouselChildrens2 = [...carousel2.children]; // Changed to "carousel2"
let isDragging2 = false,
  isAutoPlay2 = false,
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

// carouselChildrens2.slice(0, cardPerView2).forEach((card) => {
//   carousel2.insertAdjacentHTML("beforeend", card.outerHTML); // Changed to "carousel2"
// });

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
// carousel2.addEventListener("scroll", infiniteScroll2); // Changed to "carousel2"
wrapper2.addEventListener("mouseenter", () => clearTimeout(timeoutId2));
wrapper2.addEventListener("mouseleave", autoPlay2);

const wrapper3 = document.querySelector(".wrapper-3"); // Changed to "wrapper-3"
const carousel3 = document.querySelector(".carousel-3"); // Changed to "carousel-3"
const firstCardWidth3 = carousel3.querySelector(".card-3").offsetWidth; // Changed to "card-3"
const arrowBtns3 = document.querySelectorAll(".wrapper-3 i"); // Changed to "wrapper-3"

const carouselChildrens3 = [...carousel3.children]; // Changed to "carousel3"
let isDragging3 = false,
  isAutoPlay3 = false,
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

// carouselChildrens3.slice(0, cardPerView3).forEach((card) => {
//   carousel3.insertAdjacentHTML("beforeend", card.outerHTML); // Changed to "carousel3"
// });

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
// carousel3.addEventListener("scroll", infiniteScroll3); // Changed to "carousel3"
wrapper3.addEventListener("mouseenter", () => clearTimeout(timeoutId3));
wrapper3.addEventListener("mouseleave", autoPlay3);

const wrapper4 = document.querySelector(".wrapper-4"); // Changed to "wrapper-4"
const carousel4 = document.querySelector(".carousel-4"); // Changed to "carousel-4"
const firstCardWidth4 = carousel4.querySelector(".card-4").offsetWidth; // Changed to "card-4"
const arrowBtns4 = document.querySelectorAll(".wrapper-4 i"); // Changed to "wrapper-4"

const carouselChildrens4 = [...carousel4.children]; // Changed to "carousel4"
let isDragging4 = false,
  isAutoPlay4 = false,
  startX4,
  startScrollLeft4,
  timeoutId4;
let cardPerView4 = Math.round(carousel4.offsetWidth / firstCardWidth4); // Changed to "carousel4"

carouselChildrens4
  .slice(-cardPerView4)
  .reverse()
  .forEach((card) => {
    carousel4.insertAdjacentHTML("afterbegin", card.outerHTML); // Changed to "carousel4"
  });

// carouselChildrens4.slice(0, cardPerView4).forEach((card) => {
//   carousel4.insertAdjacentHTML("beforeend", card.outerHTML); // Changed to "carousel4"
// });

carousel4.classList.add("no-transition");
carousel4.scrollLeft = carousel4.offsetWidth;
carousel4.classList.remove("no-transition");

arrowBtns4.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel4.scrollLeft +=
      btn.id == "left-4" ? -firstCardWidth4 : firstCardWidth4; // Changed to "left-4"
  });
});

const dragStart4 = (e) => {
  isDragging4 = true;
  carousel4.classList.add("dragging"); // Changed to "carousel4"
  startX4 = e.pageX;
  startScrollLeft4 = carousel4.scrollLeft; // Changed to "carousel4"
};

const dragging4 = (e) => {
  if (!isDragging4) return;
  carousel4.scrollLeft = startScrollLeft4 - (e.pageX - startX4); // Changed to "carousel4"
};

const dragStop4 = () => {
  isDragging4 = false;
  carousel4.classList.remove("dragging"); // Changed to "carousel4"
};

const infiniteScroll4 = () => {
  if (carousel4.scrollLeft === 0) {
    carousel4.classList.add("no-transition"); // Changed to "carousel4"
    carousel4.scrollLeft = carousel4.scrollWidth - 2 * carousel4.offsetWidth; // Changed to "carousel4"
    carousel4.classList.remove("no-transition"); // Changed to "carousel4"
  } else if (
    Math.ceil(carousel4.scrollLeft) ===
    carousel4.scrollWidth - carousel4.offsetWidth
  ) {
    carousel4.classList.add("no-transition"); // Changed to "carousel4"
    carousel4.scrollLeft = carousel4.offsetWidth; // Changed to "carousel4"
    carousel4.classList.remove("no-transition"); // Changed to "carousel4"
  }
  clearTimeout(timeoutId4);
  if (!wrapper4.matches(":hover")) autoPlay4();
};

const autoPlay4 = () => {
  if (window.innerWidth < 800 || !isAutoPlay4) return;
  timeoutId4 = setTimeout(
    () => (carousel4.scrollLeft += firstCardWidth4),
    2500
  ); // Changed to "carousel4"
};

autoPlay4();
carousel4.addEventListener("mousedown", dragStart4); // Changed to "carousel4"
carousel4.addEventListener("mousemove", dragging4); // Changed to "carousel4"
document.addEventListener("mouseup", dragStop4);
// carousel4.addEventListener("scroll", infiniteScroll4); // Changed to "carousel4"
wrapper4.addEventListener("mouseenter", () => clearTimeout(timeoutId4));
wrapper4.addEventListener("mouseleave", autoPlay4);

const wrapper5 = document.querySelector(".wrapper-5");
const carousel5 = document.querySelector(".carousel-5");
const firstCardWidth5 = carousel5.querySelector(".cardnewer").offsetWidth;
const arrowBtns5 = document.querySelectorAll(".wrapper-5 i");

const carouselChildrens5 = [...carousel5.children];
let isDragging5 = false,
  isAutoPlay5 = false,
  startX5,
  startScrollLeft5,
  timeoutId5;
const cardPerView5 = 1; // Set to 1 to display only one card at a time

// Calculate the width of the carousel based on the number of cards to display
const carouselWidth5 = firstCardWidth5 * cardPerView5;

carouselChildrens5
  .slice(-cardPerView5)
  .reverse()
  .forEach((card) => {
    carousel5.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

// carouselChildrens5.slice(0, cardPerView5).forEach((card) => {
//   carousel5.insertAdjacentHTML("beforeend", card.outerHTML);
// });

carousel5.classList.add("no-transition");
carousel5.scrollLeft = carouselWidth5; // Set the initial scroll to show the first card
carousel5.classList.remove("no-transition");

arrowBtns5.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel5.scrollLeft +=
      btn.id == "left-5" ? -carouselWidth5 : carouselWidth5;
  });
});

const dragStart5 = (e) => {
  isDragging5 = true;
  carousel5.classList.add("dragging");
  startX5 = e.pageX;
  startScrollLeft5 = carousel5.scrollLeft;
};

const dragging5 = (e) => {
  if (!isDragging5) return;
  carousel5.scrollLeft = startScrollLeft5 - (e.pageX - startX5);
};

const dragStop5 = () => {
  isDragging5 = false;
  carousel5.classList.remove("dragging");
};

const infiniteScroll5 = () => {
  if (carousel5.scrollLeft === 0) {
    carousel5.classList.add("no-transition");
    carousel5.scrollLeft = carousel5.scrollWidth - carouselWidth5;
    carousel5.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel5.scrollLeft) >=
    carousel5.scrollWidth - carouselWidth5
  ) {
    carousel5.classList.add("no-transition");
    carousel5.scrollLeft = carouselWidth5;
    carousel5.classList.remove("no-transition");
  }
  clearTimeout(timeoutId5);
  if (!wrapper5.matches(":hover")) autoPlay5();
};

const autoPlay5 = () => {
  if (window.innerWidth < 800 || !isAutoPlay5) return;
  timeoutId5 = setTimeout(() => (carousel5.scrollLeft += carouselWidth5), 2500);
};

autoPlay5();
carousel5.addEventListener("mousedown", dragStart5);
carousel5.addEventListener("mousemove", dragging5);
document.addEventListener("mouseup", dragStop5);
carousel5.addEventListener("scroll", infiniteScroll5);
wrapper5.addEventListener("mouseenter", () => clearTimeout(timeoutId5));
wrapper5.addEventListener("mouseleave", autoPlay5);

const $icon = document.querySelector(".icon");
const $arrow = document.querySelector(".arrow");

$icon.onclick = () => {
  $arrow.animate([{ left: "0" }, { left: "10px" }, { left: "0" }], {
    duration: 700,
    iterations: Infinity,
  });
};
