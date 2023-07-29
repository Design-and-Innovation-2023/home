// background image slider

const sliderImgs = ["img1.png", "img2.png", "img3.png"];
let sliderImage = document.querySelector('.background-image');
let sliderGrids = [...document.querySelectorAll('.grid-item')];
let currentImage = 0;

setInterval(() => {
    changeSliderImage();
}, 5000);

const changeSliderImage = () => {
    sliderGrids.map((gridItem, index) => {
        setTimeout(() => {
            gridItem.classList.remove('hide');

            setTimeout(() => {

                if(index == sliderGrids.length - 1){
                    if(currentImage >= sliderImgs.length - 1){
                        currentImage = 0;
                    } else{
                        currentImage++;
                    }

                    sliderImage.src = `team/img/${sliderImgs[currentImage]}`;

                    sliderGrids.map((item, i) => {
                        setTimeout(() => {
                            item.classList.add('hide')
                        }, i * 100);
                    })

                }

            }, 100);

        }, index * 100);
    })
}

(function ($) {
    $.fn.timeline = function(){
        var selectors = {
            id: $(this),
            item: $(this). find(".timeline-item"),
            activeClass: "timeline-item--active",
            img: ".timeline_img"
        };

        selectors.item.eq(0).addClass(selectors.activeClass);
        selectors.id.css(
            "background-image",
            "url("+
            selectors.item
            .first()
            .find(selectors.img)
            .attr("src") +
            ")"
        );

        var itemLength = selectors.item.length;
        $(window).scroll(function(){
            var max, min;
            var pos = $(this).scrollTop();
            selectors.item.each(function(i)
            {
                min = $(this).offset().top;
                max = $(this).height() + $(this).offset().top;
                var that = $(this);
                if (i == itemLength - 2 && pos > min + $(this).height() / 2){
                    selectors.item.removeClass(selectors.activeClass);
                    selectors.id.css(
                        "background-image",
                        "url(" + 
                        selectors.item
                        .last()
                        .find(selectors.img)
                        .attr("src") +
                        ")"
                    );
                    selectors.item.last().addClass(selectors.activeClass);
                }else if(pos <= max - 40 && pos >= min){
                    selectors.id.css(
                        "background-image",
                        "url(" +
                        $(this)
                        .find(selectors.img)
                        .attr("src") + 
                        ")"
                    );
                    selectors.item.removeClass(selectors.activeClass);
                    $(this).addClass(selectors.activeClass);
                }
            });
        });
    };
}) (jQuery);

$("#timeline-1").timeline();