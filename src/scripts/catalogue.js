
document.addEventListener('DOMContentLoaded', function () {
  const cataloguesList = document.querySelector('.catalogues__list');
  cataloguesList.innerHTML = '';

  $.ajax({
    type: 'GET',
    url: "./php/cat-list-load.php",
    dataType: 'json',
    success: function(data) {
      console.log(data);
    }
  })
  


});



const sliderList = $('#catalogueSliderList');
sliderList.html = '';
/*XHr request which tells us how many images are there in the
  catalogue folder, which we need to build our slider */
$('#cat-btn').on('click', function(e){
  e.preventDefault();
  
  $.ajax({
    type: 'GET',
    url: "./php/catalogue-load.php",
    dataType: 'text',
    success: function(data){
      var imgCount = Number(data); // Quantity of images in the folder
      var pageCount = imgCount - 2; //Quantiy of pages in the catalogue(2 are blank pages)
      const inputPageSelector = document.querySelector('.catalogue__slider-diplay-input');// Дисплей отобр-я текущей страницы
      const catalogueSwiper = new Swiper('.swiper-container_cat', {
        speed: 800,
        keyboard: {
          enabled: true
        },
        virtual: {
          slides: function () {
            var slides = [];
            for (var i = 0; i < imgCount; i++) {
              
              slides.push(`<div class="catalogues__slider-item-col"><img class="catalogue__slider-item-img" src="./images/catalogue/01_2021/${i}.jpg" alt="Каталог 3 2021"></div>
                            <div class="catalogues__slider-item-col"><img class="catalogue__slider-item-img" src="./images/catalogue/01_2021/${i+1}.jpg" alt="Каталог 3 2021"></div>`);
              i++;
          
            }
            return slides;
          }()
        },
        on: {
          slideChange: function () {
            changeDisplay(catalogueSwiper.activeIndex * 2, pageCount);
          }
        }
      });
      
      function changeDisplay(currentPage, totalPages) {
        if((currentPage == 0)) {
          inputPageSelector.value = `1 / ${totalPages}`;
        } else if (currentPage >= totalPages) {
          inputPageSelector.value = `${totalPages} / ${totalPages}`;
        } else {
          inputPageSelector.value = `${currentPage} - ${currentPage + 1} / ${totalPages}`;
          
        }
        
      };
      changeDisplay(0, pageCount);

      $('.catalogues__slider-prev-btn').on('click', function(e) {
        e.preventDefault();
        catalogueSwiper.slidePrev();
      });
      $('.catalogues__slider-next-btn').on('click', function(e){
        e.preventDefault();
        catalogueSwiper.slideNext();
      });

      $('.catalogues__slider-first-btn').on('click', function(e) {
        e.preventDefault();
        catalogueSwiper.slideTo(0, 0);
      });

      $('.catalogue__slider-last-btn').on('click', function(e) {
        e.preventDefault();
        
        catalogueSwiper.slideTo(((imgCount / 2) - 1), 0);
      });

      // Функционал выбора и отображения текущей страницы
      
      inputPageSelector.addEventListener('focus', function() {
       this.value = '';
      });
      inputPageSelector.addEventListener('keydown', function(e){
        if( ((e.keyCode > 47) && (e.keyCode< 57)) || (e.keyCode == 8) ) {
          // Default behavior
        } else if(e.keyCode == 13) {//Enter pressed
            let chosenSlide = catalogueSwiper.activeIndex*2;
            if(this.value == '') {
              this.blur();
              changeDisplay(chosenSlide, pageCount);
            } else {
              chosenSlide = Number(this.value)
              catalogueSwiper.slideTo(chosenSlide/2, 800);
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