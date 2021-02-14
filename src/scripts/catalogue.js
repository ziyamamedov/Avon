

const sliderList = $('#catalogueSliderList');
/*XHr request which tells us how many images are there in the
  catalogue folder, which we need to build our slider */
$('#cat-btn').on('click', function(e){
  e.preventDefault();
  
  $.ajax({
    type: 'GET',
    url: "./php/catalogue-load.php",
    dataType: 'text',
    success: function(data){
      var numData = Number(data);

      console.log(data);

      const catalogueSwiper = new Swiper('.swiper-container_cat', {
        slidesPerView: 1,
        spaceBetween: 10,
        virtual: {
          slides: (function () {
            var slides = [];
            for (var i = 0; i < numData; i++) {
              slides.push(` <div class="catalogues__slider-item-col"><img class="catalogue__slider-item-img" src="./images/catalogue/02_2021/${i}.jpg" alt="Каталог 2 2021"></div>
                            <div class="catalogues__slider-item-col"><img class="catalogue__slider-item-img" src="./images/catalogue/02_2021/${i+1}.jpg" alt="Каталог 2 2021"></div>
                          `);
              i++
            }
            return slides;
          }()),
        },
      });
      
      $('.catalogues__slider-prev-btn').on('click', function() {
        catalogueSwiper.slidePrev();
      });
      $('.catalogues__slider-next-btn').on('click', function(){
        catalogueSwiper.slideNext();
      });

      catalogueSwiper.append();

      // for(let i = 0; i < numData - 3; i++) {
      //   sliderList.append(`<li class="catalogues__slider-item swiper-slide">
      //                         <div class="catalogues__slider-item-col"><img class="catalogue__slider-item-img" src="./images/catalogue/02_2021/p (${i}).jpg" alt="Каталог 2 2021"></div>
      //                         <div class="catalogues__slider-item-col"><img class="catalogue__slider-item-img" src="./images/catalogue/02_2021/p (${i+1}).jpg" alt="Каталог 2 2021"></div>
      //                       </li>`);
      //   i++;
      // }

      

      
      
    } 
  })
})