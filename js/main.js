
$(document).ready(function () {
  /*menu*/
  $("#menu-toggle").on("click", function () {
    $(this).toggleClass("active open");
    $(".overlayTop").toggleClass("open");
    $("body").toggleClass("non-scroll");
  });
  $(".mainMenu > li > a").on("click", function () {
    $(".overlayTop").removeClass("open");
    $("#menu-toggle").removeClass("active open");
    $("body").removeClass("non-scroll");
  });

  $(".mainMenu .hasSubmenu > a").each(function () {
    $(this).after(
      '<button class="submenuToggle" aria-label="Toggle submenu"></button>'
    );
  });

  // Mobile only
  $(".mainMenu").on("click", ".hasSubmenu > .submenuToggle", function (e) {
    debugger
    if (window.innerWidth > 1100) return;

    e.preventDefault();
    e.stopPropagation();

    const $parent = $(this).closest(".hasSubmenu");
    $parent.toggleClass("open");
    $parent.find(".childList").slideToggle(200);
  });
  // Mobile Only End
  
  // $(".mainMenu .hasSubmenu").removeClass("open");
  $(".mainMenu .childList .innerList").slideUp(200);
  
  $(".hasInnerList > a").click(event => { // maybe change to hover
    event.preventDefault();
    const list = $(event.target).parent(".hasInnerList")
    list.toggleClass('active')
    list.find(".innerList").slideToggle(200);
  });
  
  /*menu end*/

  var $page = $("html, body");
  $('a[href*="#"]').click(function () {
    $page.animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top - 86,
      },
      600
    );
    return false;
  });

  $(".languages #locale-switch").on("click", function () {
    $(this).parent(".languages").toggleClass("active");
  });

  $(document).click(function (e) {
    if ($(e.target).closest("#locale-switch").length) {
      return;
    }
    $(".languages").removeClass("active");

    e.stopPropagation();
  });

  function checkScroll() {
    if ($(window).scrollTop() > 50) {
      $("header").addClass("active");
    } else {
      $("header").removeClass("active");
    }
  }

  checkScroll();

  $(window).on("scroll", checkScroll);

  // Выпадающие блоки
  $(".tocDefault").on("click", function () {
    let dropSelect = $(this).parents(".drop");
    let dropContent = $(this).next(".optionsHolder");
    dropSelect.toggleClass("active");

    if (dropSelect.hasClass("active")) {
      dropContent.stop().slideDown();
    } else {
      dropContent.stop().slideUp();
    }
  });

  $(".drop").each(function () {
    let dropContent = $(this).find(".optionsHolder");
    if ($(this).hasClass("active")) {
      dropContent.show();
    } else {
      dropContent.hide();
    }
  });

  $("#click-sort").on("click", function (e) {
    e.stopPropagation();
    $("#crisp-wrap").toggleClass("active");
  });

  $("#crisp-wrap").on("click", function (e) {
    e.stopPropagation();
  });

  $(document).on("click", function () {
    $("#crisp-wrap").removeClass("active");
  });

  if ($(window).width() <= 1100) {
    $(".drop").removeClass("active").find(".optionsHolder").hide();
  }

  $(function () {
    function updateGenderView($container, gender) {
      $container.find(".genderOption").removeClass("active");
      $container.find("#gender-" + gender).addClass("active");
      $container
        .removeClass("mode-female mode-male")
        .addClass("mode-" + gender);
    }

    $(".structureCore").each(function () {
      var $core = $(this);

      var activeGender =
        $core.find(".genderOption.active").attr("id") === "gender-male"
          ? "male"
          : "female";
      updateGenderView($core, activeGender);

      $core.find(".genderOption").on("click", function () {
        if ($(this).hasClass("active")) return;
        var gender = $(this).attr("id") === "gender-male" ? "male" : "female";
        updateGenderView($core, gender);
      });
    });
  });

  const repeatCount = 5;

  $(".cometUnit").each(function () {
    const $container = $(this);
    const $imgs = $container.find("img");
    const $texts = $container.find(".runText");

    for (let i = 0; i < repeatCount; i++) {
      for (let j = 0; j < Math.min($imgs.length, $texts.length); j++) {
        const $imgClone = $imgs.eq(j).clone();
        const $textClone = $texts.eq(j).clone();
        $container.append($imgClone, $textClone);
      }
    }
  });

  // === Автоматическая скорость бегущей строки ===
  function setMarqueeSpeed(selector, pxPerSecond = 60) {
    const track = document.querySelector(selector);
    if (!track) return;
    // Получаем ширину содержимого
    const contentWidth = track.scrollWidth;
    // Вычисляем длительность анимации
    const duration = contentWidth / pxPerSecond;
    // Устанавливаем длительность анимации
    track.style.animationDuration = duration + "s";
    // Устанавливаем переменную для keyframes
    track.style.setProperty("--marquee-width", `-${contentWidth}px`);
  }
  setMarqueeSpeed(".marqueeTrack", 60); // 60px/sec — можно менять

  $(".howTab").on("click", function () {
    $(".howTab").removeClass("active");
    $(this).addClass("active");

    const tabId = $(this).attr("id");

    if (tabId === "tab-buy-guide") {
      $(".sellContent").hide();
      $(".buyContent").show();
    } else if (tabId === "tab-sell-guide") {
      $(".buyContent").hide();
      $(".sellContent").show();
    }
  });

  const $minRange = $("#range-min");
  const $maxRange = $("#range-max");
  const $minPrice = $(".firstPrice");
  const $maxPrice = $(".lastPrice");

  function formatPrice(val) {
    return "€" + parseFloat(val).toFixed(2);
  }

  function updatePrices() {
    let minVal = parseInt($minRange.val()) || 20;
    let maxVal = parseInt($maxRange.val()) || 500;

    if (minVal > maxVal) {
      let temp = minVal;
      minVal = maxVal;
      maxVal = temp;
    }

    $minPrice.text(formatPrice(minVal));
    $maxPrice.text(formatPrice(maxVal));
  }

  $minRange.on("input change", updatePrices);
  $maxRange.on("input change", updatePrices);

  updatePrices();

  $("#click-category").on("click", function (e) {
    e.preventDefault();

    $(this).toggleClass("active");
    $("#vlock-category").slideToggle(300);
  });

  function bindClusterToggle() {
    $("#tap_character").on("click", function (e) {
      e.stopPropagation();
      $(".clusterBay").addClass("active");
    });

    $(".clusterBay").on("click", function (e) {
      e.stopPropagation();
    });

    $(document).on("click", function () {
      $(".clusterBay").removeClass("active");
    });
  }

  if (window.innerWidth <= 1100) {
    bindClusterToggle();
  }

  $(window).on("resize", function () {
    if (window.innerWidth <= 1100) {
      bindClusterToggle();
    } else {
      $(".clusterBay").removeClass("active");
      $("#tap_character").off("click");
      $(".clusterBay").off("click");
      $(document).off("click");
    }
  });

  //Popup START
  $("#openSlider").on("click", function (e) {
    e.preventDefault();
    $("#popup").addClass("openPopup");
    $("body").addClass("openPopup");
  });
  function closeMyPopup() {
    $("#popup").removeClass("openPopup");
    $("body").removeClass("openPopup");
  }
  $("#closeField").on("click", function (event) {
    if (event.target === this) {
      closeMyPopup();
    }
  });
  $("#closePopup").on("click", function (event) {
    event.stopPropagation();
    closeMyPopup();
  });
  $(document).on("keydown", function (event) {
    if (event.key === "Escape" && $("#popup").hasClass("openPopup")) {
      closeMyPopup();
    }
  });
  //Popup END

  // Другий попап з фотографією START
  let currentImageIndex = 0;
  let imageSources = [];

  // Функція для парсингу фотографій з HTML
  function parseImagesFromHTML() {
    imageSources = [];
    
    // Спробуємо різні селектори для пошуку фотографій
    const selectors = [
      "#popup .imgContainer img",
      ".popupWrapper .imgContainer img", 
      ".sliderPopup .imgContainer img",
      ".swiper-slide .imgContainer img",
      ".swiper-wrapper .imgContainer img"
    ];
    
    let foundImages = false;
    
    for (let selector of selectors) {
      const images = $(selector);
      
      if (images.length > 0) {
        images.each(function() {
          const src = $(this).attr("src");
          if (src && imageSources.indexOf(src) === -1) {
            imageSources.push(src);
            foundImages = true;
          }
        });
        if (foundImages) break;
      }
    }
    
    // Якщо не знайшли фотографії, спробуємо знайти всі img в попапі
    if (!foundImages) {
      $("#popup img").each(function() {
        const src = $(this).attr("src");
        if (src && src.includes('slide-img') && imageSources.indexOf(src) === -1) {
          imageSources.push(src);
        }
      });
    }
  }

  // Функція для оновлення списку фотографій (можна викликати ззовні)
  window.updateImageList = function() {
    parseImagesFromHTML();
  };

  // Парсимо фотографії при відкритті першого попапу
  $("#openSlider").on("click", function() {
    // Невелика затримка, щоб HTML встиг оновитися
    setTimeout(function() {
      parseImagesFromHTML();
    }, 100);
  });

  // Також парсимо фотографії при показі попапу
  $("#popup").on("transitionend", function() {
    if ($(this).hasClass("openPopup")) {
      parseImagesFromHTML();
    }
  });

  // Функція для відкриття попапу з фотографією
  function openImagePopup(imageIndex) {
    
    if (imageSources.length === 0) {
      console.warn("Список фотографій порожній, не можемо відкрити попап");
      return;
    }
    
    currentImageIndex = imageIndex;
    updateImageDisplay();
    $("#imagePopup").addClass("openImagePopup");
    $("body").addClass("openPopup");
  }

  // Функція для закриття попапу з фотографією
  function closeImagePopup() {
    $("#imagePopup").removeClass("openImagePopup");
    $("body").removeClass("openPopup");
  }

  // Функція для оновлення відображення фотографії
  function updateImageDisplay() {
    if (imageSources.length > 0 && currentImageIndex < imageSources.length) {
      $("#fullSizeImage").attr("src", imageSources[currentImageIndex]);
      $("#totalImages").text(imageSources.length);
    } else {
      console.warn("Немає фотографій для відображення");
    }
  }

  // Функція для навігації до попередньої фотографії
  function showPreviousImage() {
    if (imageSources.length > 0) {
      currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
      updateImageDisplay();
    }
  }

  // Функція для навігації до наступної фотографії
  function showNextImage() {
    if (imageSources.length > 0) {
      currentImageIndex = (currentImageIndex + 1) % imageSources.length;
      updateImageDisplay();
    }
  }

  // Обробники подій для другого попапу
  $("#closeImageField").on("click", function (event) {
    if (event.target === this) {
      closeImagePopup();
    }
  });

  $("#closeImagePopup").on("click", function (event) {
    event.stopPropagation();
    closeImagePopup();
  });

  $("#prevImageBtn").on("click", function (event) {
    event.stopPropagation();
    showPreviousImage();
  });

  $("#nextImageBtn").on("click", function (event) {
    event.stopPropagation();
    showNextImage();
  });

  // Обробка клавіатури для навігації
  $(document).on("keydown", function (event) {
    if ($("#imagePopup").hasClass("openImagePopup")) {
      if (event.key === "Escape") {
        closeImagePopup();
      } else if (event.key === "ArrowLeft") {
        showPreviousImage();
      } else if (event.key === "ArrowRight") {
        showNextImage();
      }
    }
  });

  // Додаємо обробники кліків на фотографії в першому попапі
  $(document).on("click", ".imgContainer img", function (event) {
    event.stopPropagation();
    
    // Перепарсовуємо фотографії перед відкриттям попапу
    parseImagesFromHTML();
    
    const clickedImageSrc = $(this).attr("src");
    if (imageSources.length === 0) {
      console.warn("Список фотографій порожній, спробуємо знайти фотографію безпосередньо");
      // Якщо список порожній, додаємо поточну фотографію
      imageSources = [clickedImageSrc];
      currentImageIndex = 0;
      openImagePopup(0);
      return;
    }
    
    const imageIndex = imageSources.indexOf(clickedImageSrc);
    
    if (imageIndex !== -1) {
      openImagePopup(imageIndex);
    } else {
      console.warn("Фотографію не знайдено в списку, додаємо її");
      // Додаємо фотографію до списку, якщо її там немає
      imageSources.push(clickedImageSrc);
      currentImageIndex = imageSources.length - 1;
      openImagePopup(currentImageIndex);
    }
  });

  // Другий попап з фотографією END

  new Swiper("#swiper-slider", {
    loop: false,
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 7,
    watchOverflow: true,
    autoHeight: true,
    navigation: {
      nextEl: "#swiperBtnNext",
      prevEl: "#swiperBtnPrev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1440: {
        slidesPerView: 4,
      },
    },
  });
});

