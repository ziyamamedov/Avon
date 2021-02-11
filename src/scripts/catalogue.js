const catalogueSwiper = new Swiper('.swiper-container_cat', {
  slidesPerView: 1,
  spaceBetween: 10,
});

$('.catalogues__slider-prev-btn').on('click', function() {
  catalogueSwiper.slidePrev();
});
$('.catalogues__slider-next-btn').on('click', function(){
  catalogueSwiper.slideNext();
});