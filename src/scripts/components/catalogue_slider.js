
document.addEventListener('DOMContentLoaded', function () {
  //This functions helps us get the data sent from the other page
  function $_GET(key) {
    var p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
  }
  window.addEventListener('resize', function (){
    if(window.innerWidth == 480) {
      location.reload();
    }
  });
  const sliderWrapper = document.querySelector('.catalogues__slider-wrapper');
  const sliderList = $('#catalogueSliderList');//List of slides of catalogue
  sliderList.html = '';
  const sliderClsBtn = document.querySelector('.catalogue__slider-cls-btn');
  sliderClsBtn.href = './catalogue.html'
  const folderName = $_GET('param'); //foldername is sent from previous page through GET
  const windowWidth = window.innerWidth;//Width of a window


  /*XHr request which tells us how many images are there in the
  catalogue folder, which we need to build our slider */
  $.ajax({
    type: 'POST',
    url: "./php/catalogue-load.php",
    data: `folder=${folderName}`,//Send to the server which folder we want to scan
    dataType: 'text',
    success: function(response){

      // -------------Definitions----------
      var imgCount = Number(response); // Quantity of images in the folder(comes from the server)
      var pageCount = imgCount; //Quantiy of pages in the catalogue(2 are blank pages)
      const inputPageSelector = document.querySelector('.catalogue__slider-diplay-input');// Current page display
      const catalogueSwiper = new Swiper('.swiper-container_cat', {//Create swiper slider
        speed: 800,
        keyboard: {//Keyboard control of a slider
          enabled: true
        },
        zoom: true,
        virtual: {//The slider will be virtual, since there is a lot of slides
          slides: function () {
            var slides = [];
            if(windowWidth <= 480) {//If screensize smaller than 480px show only one page
              for (var i = 1; i <= imgCount; i++) {
                slides.push(`<div class="catalogues__slider-item-col" style="width:100%"><img class="catalogue__slider-item-img" src="./images/catalogue/${folderName}/${folderName}_${i}.jpg" alt="Каталог 3 2021"></div>`);
              }
            } else {
              for (var i = 1; i <= imgCount; i++) {
                if(i == 1) {//Doing zoom------------------
                  slides.push(` <div class="catalogues__slider-item-col"></div>
                                <div class="catalogues__slider-item-col">
                                  <div class="swiper-zoom-container">
                                    <img class="catalogue__slider-item-img" src="./images/catalogue/${folderName}/${folderName}_${i}.jpg" alt="Каталог 3 2021">
                                  </div>
                                </div>`);
                } else if (i == imgCount) {
                  slides.push(` <div class="catalogues__slider-item-col">
                                  <div class="swiper-zoom-container">
                                    <img class="catalogue__slider-item-img" src="./images/catalogue/${folderName}/${folderName}_${i}.jpg" alt="Каталог 3 2021">
                                  </div>
                                </div>
                                <div class="catalogues__slider-item-col"></div>`);
                } else {
                  //Each slide contains two columns with a pictchure in each
                  slides.push(` <div class="catalogues__slider-item-col">
                                  <div class="swiper-zoom-container">
                                    <img class="catalogue__slider-item-img" src="./images/catalogue/${folderName}/${folderName}_${i}.jpg" alt="Каталог 3 2021">
                                  </div>
                                </div>
                                <div class="catalogues__slider-item-col">
                                  <div class="swiper-zoom-container">
                                    <img class="catalogue__slider-item-img" src="./images/catalogue/${folderName}/${folderName}_${i+1}.jpg" alt="Каталог 3 2021">
                                  </div>
                                </div>`);
                  i++;
                }
              
            }
          }
            return slides;
          }()
        },
        on: {
          slideChange: function () {//On each slide change the display will change
            if(windowWidth <= 480) {
              changeDisplay(catalogueSwiper.activeIndex, pageCount);
            } else {
              changeDisplay(catalogueSwiper.activeIndex * 2, pageCount);
            }
          }
        }
      });
      
      //This function changes the page display
      function changeDisplay(currentPage, totalPages) {
        if((currentPage == 0)) {
          inputPageSelector.value = `1 / ${totalPages}`;// 1 / 358
        } else if (currentPage >= totalPages) {
          inputPageSelector.value = `${totalPages} / ${totalPages}`;
        } else {
          if(windowWidth <= 480){
            inputPageSelector.value = `${currentPage + 1} / ${totalPages}`;//358 / 358
          } else {
            inputPageSelector.value = `${currentPage} - ${currentPage + 1} / ${totalPages}`;//358 / 358
          } 
        }
      };

      //--------------Implementations------------
      changeDisplay(0, pageCount);// Sets the display to initial position(1 / 358)

      $('.catalogue__slider-prev-btn').on('click', function(e) {
        e.preventDefault();
        catalogueSwiper.slidePrev();
      });
      $('.catalogue__slider-next-btn').on('click', function(e){
        e.preventDefault();
        catalogueSwiper.slideNext();
      });

      $('.catalogue__slider-first-btn').on('click', function(e) {
        e.preventDefault();
        catalogueSwiper.slideTo(0, 0);
      });
      $('.catalogue__slider-last-btn').on('click', function(e) {
        e.preventDefault();
        if(windowWidth <= 480) catalogueSwiper.slideTo((imgCount) , 0);
        else catalogueSwiper.slideTo((imgCount / 2) , 0);
      });
      
      // Current page display functional
      
      inputPageSelector.addEventListener('focus', function() {
        this.value = '';//Clear the display on focus
      });
      //Inputting data to the display
      inputPageSelector.addEventListener('keydown', function(e){
        if( ((e.keyCode > 47) && (e.keyCode< 57)) || (e.keyCode == 8) ) {
          //If numbers pressd => Default behavior
        } else if(e.keyCode == 13) {//Enter pressed
            let chosenSlide = catalogueSwiper.activeIndex*2;//Current active page
            if(this.value == '') {
              this.blur();
              changeDisplay(chosenSlide, pageCount);
            } else {
              chosenSlide = Number(this.value);//Turn entered value to number since its a string by default
              if(windowWidth <=480) catalogueSwiper.slideTo(chosenSlide - 1, 800);
              else catalogueSwiper.slideTo(chosenSlide/2, 800);
              
              
              this.blur();
            }
        } else {
            e.preventDefault();
        }
      });
      inputPageSelector.addEventListener('blur', function() {
        if(this.value == '') {
          changeDisplay(catalogueSwiper.activeIndex*2, pageCount);
        }
      }) 
    } 
  })


});
