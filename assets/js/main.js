$(document).ready(function() {
    let $win = $(window);
    let $doc = $(document)


    function drawLine() {
        if ($win.width() > 768) {
            $('.lLine,.rLine').css("display", "block").animate({ 'height': $doc.height() }, 'slow');
        } else {
            $('.lLine,.rLine,tline').css("display", "none")
        }
    }
    drawLine();
    $win.resize(function() {
        drawLine();
    });




    /* LES SLIDERS DE HOME */
    /* scrollbar */
    $win.scroll(function() {
        if ($win.width() > 768) {
            let $posY = $(document).scrollTop()
            $(".scroll").css({ "transform": `translateY(${$posY}px)` })
        }
    });

    /* SLIDER AUTO */
    $(function() {

        /* slider 1*/
        let $sliderItem = $(".slider-item");
        let $now = 0;

        function slide() {
            for (var i = 0; i < $sliderItem.length; i++) {
                $($sliderItem[i]).css('display', 'none')
            }
            $now++;
            ($now > $sliderItem.length) ? ($now = 1) : {};
            $($sliderItem[$now - 1]).fadeIn(1000)

        }
        /* slider 2 */
        /* SLIDE CITATION */

        let $citeIndex = 0;

        function showCitation() {
            let $i;
            let $citationSlider = $(".citation-carte");
            let $citationIndic = $(".indicator-item")
            for ($i = 0; $i < $citationSlider.length; $i++) {
                $($citationSlider[$i]).css('display', 'none');
                $($citationIndic[$i]).hasClass("indicator-active") ? $($citationIndic[$i]).removeClass("indicator-active") : {};
            }
            $citeIndex++;
            if ($citeIndex > $citationSlider.length) {
                $citeIndex = 1;
            }
            $($citationSlider[$citeIndex - 1]).fadeIn(1000);
            $($citationIndic[$citeIndex - 1]).addClass("indicator-active");
        }

        function autoSlide() {
            slide();
            showCitation()
        }
        showCitation()
        slide()
        setInterval(autoSlide, 3000)

    })

    /* MULTIMEDIA SLIDER */
    let $showSlide = function($n) {
        let $i;
        let $mediaSlider = $(".slider-media");
        if ($n > $mediaSlider.length) { $SlideIndex = 1 };
        if ($n < 1) { $SlideIndex = $mediaSlider.length };
        for ($i = 0; $i < $mediaSlider.length; $i++) {
            $($mediaSlider[$i]).css('display', 'none')
        }
        $($mediaSlider[$SlideIndex - 1]).fadeIn(1500)
    }

    $("#multimedia button.left").click(function(e) {
        e.preventDefault();
        changeSlider(-1)

    });

    $("#multimedia button.right").click(function(e) {
        e.preventDefault();
        changeSlider(1)

    });

    let $SlideIndex = 1;
    $showSlide($SlideIndex)

    function changeSlider($n) {
        $showSlide($SlideIndex += $n)
    }
    /* fin */

    /* FIN SLIDER */


    /* Apparition au défillement */
    const $options = { root: null, rootMargin: " 0px", threshold: 0.25 }
    const $ratio = 0.25
    const $show = function(entries, $observer) {
        entries.forEach($entry => {
            if ($entry.intersectionRatio > $ratio) {
                $($entry.target).addClass("show").slideDown(3000);
                $observer.unobserve($entry.target);
            }
        });
    }
    const $observer = new IntersectionObserver($show, $options)
    const $scrollShow = $(".scroll-show,.scroll-show > *")
    for (let i = 0; i < $scrollShow.length; i++) {
        $observer.observe($scrollShow[i])
    }
    $(function() { $("h2,#top .carte").animate({ 'left': '0' }, 1500) });




    /* MENU DEROULANT */
    const $menu = $(".menu .content"),
        $menuBtn = $(".menu-btn"),
        $menuList = $(".list");
    const $optionsList = [
        "Une fois par semaine",
        "Une fois toutrs les deux semaine (2 fois par mois)",
        "Une fois par mois ",
        "Une fois touts les trois mois ",
        "Une fois tous les six mois"
    ];

    function addOptions(selectedOption) {
        $menuList.text("");
        $optionsList.forEach(option => {
            let isSelected = option == selectedOption ? "selected" : "";
            let $li = `<li onclick="updateSelected(this)" class="${isSelected}">${option}</li>`;
            $($li).appendTo($menuList);
        });
    }
    addOptions();

    updateSelected = function(selectedLi) {
        addOptions($(selectedLi).text());
        $menu.slideToggle(500);
        $($menuBtn).find(":first-child").text($(selectedLi).text())
    }
    $menuBtn.on("click", () => $menu.slideToggle(500));
});