"use strict";

document.addEventListener('DOMContentLoaded', function () {
  //This functions helps us get the data sent from the other page
  function $_GET(key) {
    var p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth == 480) {
      location.reload();
    }
  });
  var sliderWrapper = document.querySelector('.catalogues__slider-wrapper');
  var sliderList = $('#catalogueSliderList'); //List of slides of catalogue

  sliderList.html = '';
  var sliderClsBtn = document.querySelector('.catalogue__slider-cls-btn');
  sliderClsBtn.href = './catalogue.html';
  var folderName = $_GET('param'); //foldername is sent from previous page through GET

  var windowWidth = window.innerWidth; //Width of a window

  /*XHr request which tells us how many images are there in the
  catalogue folder, which we need to build our slider */

  $.ajax({
    type: 'POST',
    url: "./php/catalogue-load.php",
    data: "folder=".concat(folderName),
    //Send to the server which folder we want to scan
    dataType: 'text',
    success: function success(response) {
      // -------------Definitions----------
      var imgCount = Number(response); // Quantity of images in the folder(comes from the server)

      var pageCount = imgCount; //Quantiy of pages in the catalogue(2 are blank pages)

      var inputPageSelector = document.querySelector('.catalogue__slider-diplay-input'); // Current page display

      var catalogueSwiper = new Swiper('.swiper-container_cat', {
        //Create swiper slider
        speed: 800,
        keyboard: {
          //Keyboard control of a slider
          enabled: true
        },
        zoom: true,
        virtual: {
          //The slider will be virtual, since there is a lot of slides
          slides: function () {
            var slides = [];

            if (windowWidth <= 480) {
              //If screensize smaller than 480px show only one page
              for (var i = 1; i <= imgCount; i++) {
                slides.push("<div class=\"catalogues__slider-item-col\" style=\"width:100%\"><img class=\"catalogue__slider-item-img\" src=\"./images/catalogue/".concat(folderName, "/").concat(folderName, "_").concat(i, ".jpg\" alt=\"\u041A\u0430\u0442\u0430\u043B\u043E\u0433 3 2021\"></div>"));
              }
            } else {
              for (var i = 1; i <= imgCount; i++) {
                if (i == 1) {
                  //Doing zoom------------------
                  slides.push(" <div class=\"catalogues__slider-item-col\"></div>\n                                <div class=\"catalogues__slider-item-col\">\n                                  <div class=\"swiper-zoom-container\">\n                                    <img class=\"catalogue__slider-item-img\" src=\"./images/catalogue/".concat(folderName, "/").concat(folderName, "_").concat(i, ".jpg\" alt=\"\u041A\u0430\u0442\u0430\u043B\u043E\u0433 3 2021\">\n                                  </div>\n                                </div>"));
                } else if (i == imgCount) {
                  slides.push(" <div class=\"catalogues__slider-item-col\">\n                                  <div class=\"swiper-zoom-container\">\n                                    <img class=\"catalogue__slider-item-img\" src=\"./images/catalogue/".concat(folderName, "/").concat(folderName, "_").concat(i, ".jpg\" alt=\"\u041A\u0430\u0442\u0430\u043B\u043E\u0433 3 2021\">\n                                  </div>\n                                </div>\n                                <div class=\"catalogues__slider-item-col\"></div>"));
                } else {
                  //Each slide contains two columns with a pictchure in each
                  slides.push(" <div class=\"catalogues__slider-item-col\">\n                                  <div class=\"swiper-zoom-container\">\n                                    <img class=\"catalogue__slider-item-img\" src=\"./images/catalogue/".concat(folderName, "/").concat(folderName, "_").concat(i, ".jpg\" alt=\"\u041A\u0430\u0442\u0430\u043B\u043E\u0433 3 2021\">\n                                  </div>\n                                </div>\n                                <div class=\"catalogues__slider-item-col\">\n                                  <div class=\"swiper-zoom-container\">\n                                    <img class=\"catalogue__slider-item-img\" src=\"./images/catalogue/").concat(folderName, "/").concat(folderName, "_").concat(i + 1, ".jpg\" alt=\"\u041A\u0430\u0442\u0430\u043B\u043E\u0433 3 2021\">\n                                  </div>\n                                </div>"));
                  i++;
                }
              }
            }

            return slides;
          }()
        },
        on: {
          slideChange: function slideChange() {
            //On each slide change the display will change
            if (windowWidth <= 480) {
              changeDisplay(catalogueSwiper.activeIndex, pageCount);
            } else {
              changeDisplay(catalogueSwiper.activeIndex * 2, pageCount);
            }
          }
        }
      }); //This function changes the page display

      function changeDisplay(currentPage, totalPages) {
        if (currentPage == 0) {
          inputPageSelector.value = "1 / ".concat(totalPages); // 1 / 358
        } else if (currentPage >= totalPages) {
          inputPageSelector.value = "".concat(totalPages, " / ").concat(totalPages);
        } else {
          if (windowWidth <= 480) {
            inputPageSelector.value = "".concat(currentPage + 1, " / ").concat(totalPages); //358 / 358
          } else {
            inputPageSelector.value = "".concat(currentPage, " - ").concat(currentPage + 1, " / ").concat(totalPages); //358 / 358
          }
        }
      }

      ; //--------------Implementations------------

      changeDisplay(0, pageCount); // Sets the display to initial position(1 / 358)

      $('.catalogue__slider-prev-btn').on('click', function (e) {
        e.preventDefault();
        catalogueSwiper.slidePrev();
      });
      $('.catalogue__slider-next-btn').on('click', function (e) {
        e.preventDefault();
        catalogueSwiper.slideNext();
      });
      $('.catalogue__slider-first-btn').on('click', function (e) {
        e.preventDefault();
        catalogueSwiper.slideTo(0, 0);
      });
      $('.catalogue__slider-last-btn').on('click', function (e) {
        e.preventDefault();
        if (windowWidth <= 480) catalogueSwiper.slideTo(imgCount, 0);else catalogueSwiper.slideTo(imgCount / 2, 0);
      }); // Current page display functional

      inputPageSelector.addEventListener('focus', function () {
        this.value = ''; //Clear the display on focus
      }); //Inputting data to the display

      inputPageSelector.addEventListener('keydown', function (e) {
        if (e.keyCode > 47 && e.keyCode < 57 || e.keyCode == 8) {//If numbers pressd => Default behavior
        } else if (e.keyCode == 13) {
          //Enter pressed
          var chosenSlide = catalogueSwiper.activeIndex * 2; //Current active page

          if (this.value == '') {
            this.blur();
            changeDisplay(chosenSlide, pageCount);
          } else {
            chosenSlide = Number(this.value); //Turn entered value to number since its a string by default

            if (windowWidth <= 480) catalogueSwiper.slideTo(chosenSlide - 1, 800);else catalogueSwiper.slideTo(chosenSlide / 2, 800);
            this.blur();
          }
        } else {
          e.preventDefault();
        }
      });
      inputPageSelector.addEventListener('blur', function () {
        if (this.value == '') {
          changeDisplay(catalogueSwiper.activeIndex * 2, pageCount);
        }
      });
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGFsb2d1ZV9zbGlkZXIuanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiJF9HRVQiLCJrZXkiLCJwIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJtYXRjaCIsIlJlZ0V4cCIsImlubmVyV2lkdGgiLCJyZWxvYWQiLCJzbGlkZXJXcmFwcGVyIiwicXVlcnlTZWxlY3RvciIsInNsaWRlckxpc3QiLCIkIiwiaHRtbCIsInNsaWRlckNsc0J0biIsImhyZWYiLCJmb2xkZXJOYW1lIiwid2luZG93V2lkdGgiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGEiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsImltZ0NvdW50IiwiTnVtYmVyIiwicGFnZUNvdW50IiwiaW5wdXRQYWdlU2VsZWN0b3IiLCJjYXRhbG9ndWVTd2lwZXIiLCJTd2lwZXIiLCJzcGVlZCIsImtleWJvYXJkIiwiZW5hYmxlZCIsInpvb20iLCJ2aXJ0dWFsIiwic2xpZGVzIiwiaSIsInB1c2giLCJvbiIsInNsaWRlQ2hhbmdlIiwiY2hhbmdlRGlzcGxheSIsImFjdGl2ZUluZGV4IiwiY3VycmVudFBhZ2UiLCJ0b3RhbFBhZ2VzIiwidmFsdWUiLCJlIiwicHJldmVudERlZmF1bHQiLCJzbGlkZVByZXYiLCJzbGlkZU5leHQiLCJzbGlkZVRvIiwia2V5Q29kZSIsImNob3NlblNsaWRlIiwiYmx1ciJdLCJtYXBwaW5ncyI6Ijs7QUFDQUEsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBWTtBQUN4RDtBQUNBLFdBQVNDLEtBQVQsQ0FBZUMsR0FBZixFQUFvQjtBQUNsQixRQUFJQyxDQUFDLEdBQUdDLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsTUFBeEI7QUFDQUgsSUFBQUEsQ0FBQyxHQUFHQSxDQUFDLENBQUNJLEtBQUYsQ0FBUSxJQUFJQyxNQUFKLENBQVdOLEdBQUcsR0FBRyxXQUFqQixDQUFSLENBQUo7QUFDQSxXQUFP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SUFBYyxFQUFqQixFQUFxQjtBQUNuQkosVUFBQUEsYUFBYSxDQUFDWixlQUFlLENBQUNhLFdBQWhCLEdBQTRCLENBQTdCLEVBQWdDZixTQUFoQyxDQUFiO0FBQ0Q7QUFDRixPQUpEO0FBS0Q7QUEzSUksR0FBUDtBQStJRCxDQXRLRCIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xyXG4gIC8vVGhpcyBmdW5jdGlvbnMgaGVscHMgdXMgZ2V0IHRoZSBkYXRhIHNlbnQgZnJvbSB0aGUgb3RoZXIgcGFnZVxyXG4gIGZ1bmN0aW9uICRfR0VUKGtleSkge1xyXG4gICAgdmFyIHAgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xyXG4gICAgcCA9IHAubWF0Y2gobmV3IFJlZ0V4cChrZXkgKyAnPShbXiY9XSspJykpO1xyXG4gICAgcmV0dXJuIHAgPyBwWzFdIDogZmFsc2U7XHJcbiAgfVxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKXtcclxuICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoID09IDQ4MCkge1xyXG4gICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgIH1cclxuICB9KTtcclxuICBjb25zdCBzbGlkZXJXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2d1ZXNfX3NsaWRlci13cmFwcGVyJyk7XHJcbiAgY29uc3Qgc2xpZGVyTGlzdCA9ICQoJyNjYXRhbG9ndWVTbGlkZXJMaXN0Jyk7Ly9MaXN0IG9mIHNsaWRlcyBvZiBjYXRhbG9ndWVcclxuICBzbGlkZXJMaXN0Lmh0bWwgPSAnJztcclxuICBjb25zdCBzbGlkZXJDbHNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ3VlX19zbGlkZXItY2xzLWJ0bicpO1xyXG4gIHNsaWRlckNsc0J0bi5ocmVmID0gJy4vY2F0YWxvZ3VlLmh0bWwnXHJcbiAgY29uc3QgZm9sZGVyTmFtZSA9ICRfR0VUKCdwYXJhbScpOyAvL2ZvbGRlcm5hbWUgaXMgc2VudCBmcm9tIHByZXZpb3VzIHBhZ2UgdGhyb3VnaCBHRVRcclxuICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoOy8vV2lkdGggb2YgYSB3aW5kb3dcclxuXHJcblxyXG4gIC8qWEhyIHJlcXVlc3Qgd2hpY2ggdGVsbHMgdXMgaG93IG1hbnkgaW1hZ2VzIGFyZSB0aGVyZSBpbiB0aGVcclxuICBjYXRhbG9ndWUgZm9sZGVyLCB3aGljaCB3ZSBuZWVkIHRvIGJ1aWxkIG91ciBzbGlkZXIgKi9cclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgdXJsOiBcIi4vcGhwL2NhdGFsb2d1ZS1sb2FkLnBocFwiLFxyXG4gICAgZGF0YTogYGZvbGRlcj0ke2ZvbGRlck5hbWV9YCwvL1NlbmQgdG8gdGhlIHNlcnZlciB3aGljaCBmb2xkZXIgd2Ugd2FudCB0byBzY2FuXHJcbiAgICBkYXRhVHlwZTogJ3RleHQnLFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG5cclxuICAgICAgLy8gLS0tLS0tLS0tLS0tLURlZmluaXRpb25zLS0tLS0tLS0tLVxyXG4gICAgICB2YXIgaW1nQ291bnQgPSBOdW1iZXIocmVzcG9uc2UpOyAvLyBRdWFudGl0eSBvZiBpbWFnZXMgaW4gdGhlIGZvbGRlcihjb21lcyBmcm9tIHRoZSBzZXJ2ZXIpXHJcbiAgICAgIHZhciBwYWdlQ291bnQgPSBpbWdDb3VudDsgLy9RdWFudGl5IG9mIHBhZ2VzIGluIHRoZSBjYXRhbG9ndWUoMiBhcmUgYmxhbmsgcGFnZXMpXHJcbiAgICAgIGNvbnN0IGlucHV0UGFnZVNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2d1ZV9fc2xpZGVyLWRpcGxheS1pbnB1dCcpOy8vIEN1cnJlbnQgcGFnZSBkaXNwbGF5XHJcbiAgICAgIGNvbnN0IGNhdGFsb2d1ZVN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXItY29udGFpbmVyX2NhdCcsIHsvL0NyZWF0ZSBzd2lwZXIgc2xpZGVyXHJcbiAgICAgICAgc3BlZWQ6IDgwMCxcclxuICAgICAgICBrZXlib2FyZDogey8vS2V5Ym9hcmQgY29udHJvbCBvZiBhIHNsaWRlclxyXG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgem9vbTogdHJ1ZSxcclxuICAgICAgICB2aXJ0dWFsOiB7Ly9UaGUgc2xpZGVyIHdpbGwgYmUgdmlydHVhbCwgc2luY2UgdGhlcmUgaXMgYSBsb3Qgb2Ygc2xpZGVzXHJcbiAgICAgICAgICBzbGlkZXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNsaWRlcyA9IFtdO1xyXG4gICAgICAgICAgICBpZih3aW5kb3dXaWR0aCA8PSA0ODApIHsvL0lmIHNjcmVlbnNpemUgc21hbGxlciB0aGFuIDQ4MHB4IHNob3cgb25seSBvbmUgcGFnZVxyXG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IGltZ0NvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlcy5wdXNoKGA8ZGl2IGNsYXNzPVwiY2F0YWxvZ3Vlc19fc2xpZGVyLWl0ZW0tY29sXCIgc3R5bGU9XCJ3aWR0aDoxMDAlXCI+PGltZyBjbGFzcz1cImNhdGFsb2d1ZV9fc2xpZGVyLWl0ZW0taW1nXCIgc3JjPVwiLi9pbWFnZXMvY2F0YWxvZ3VlLyR7Zm9sZGVyTmFtZX0vJHtmb2xkZXJOYW1lfV8ke2l9LmpwZ1wiIGFsdD1cItCa0LDRgtCw0LvQvtCzIDMgMjAyMVwiPjwvZGl2PmApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBpbWdDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihpID09IDEpIHsvL0RvaW5nIHpvb20tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgICAgICAgc2xpZGVzLnB1c2goYCA8ZGl2IGNsYXNzPVwiY2F0YWxvZ3Vlc19fc2xpZGVyLWl0ZW0tY29sXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhdGFsb2d1ZXNfX3NsaWRlci1pdGVtLWNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN3aXBlci16b29tLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiY2F0YWxvZ3VlX19zbGlkZXItaXRlbS1pbWdcIiBzcmM9XCIuL2ltYWdlcy9jYXRhbG9ndWUvJHtmb2xkZXJOYW1lfS8ke2ZvbGRlck5hbWV9XyR7aX0uanBnXCIgYWx0PVwi0JrQsNGC0LDQu9C+0LMgMyAyMDIxXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PSBpbWdDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICBzbGlkZXMucHVzaChgIDxkaXYgY2xhc3M9XCJjYXRhbG9ndWVzX19zbGlkZXItaXRlbS1jb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzd2lwZXItem9vbS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImNhdGFsb2d1ZV9fc2xpZGVyLWl0ZW0taW1nXCIgc3JjPVwiLi9pbWFnZXMvY2F0YWxvZ3VlLyR7Zm9sZGVyTmFtZX0vJHtmb2xkZXJOYW1lfV8ke2l9LmpwZ1wiIGFsdD1cItCa0LDRgtCw0LvQvtCzIDMgMjAyMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhdGFsb2d1ZXNfX3NsaWRlci1pdGVtLWNvbFwiPjwvZGl2PmApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgLy9FYWNoIHNsaWRlIGNvbnRhaW5zIHR3byBjb2x1bW5zIHdpdGggYSBwaWN0Y2h1cmUgaW4gZWFjaFxyXG4gICAgICAgICAgICAgICAgICBzbGlkZXMucHVzaChgIDxkaXYgY2xhc3M9XCJjYXRhbG9ndWVzX19zbGlkZXItaXRlbS1jb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzd2lwZXItem9vbS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImNhdGFsb2d1ZV9fc2xpZGVyLWl0ZW0taW1nXCIgc3JjPVwiLi9pbWFnZXMvY2F0YWxvZ3VlLyR7Zm9sZGVyTmFtZX0vJHtmb2xkZXJOYW1lfV8ke2l9LmpwZ1wiIGFsdD1cItCa0LDRgtCw0LvQvtCzIDMgMjAyMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhdGFsb2d1ZXNfX3NsaWRlci1pdGVtLWNvbFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN3aXBlci16b29tLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwiY2F0YWxvZ3VlX19zbGlkZXItaXRlbS1pbWdcIiBzcmM9XCIuL2ltYWdlcy9jYXRhbG9ndWUvJHtmb2xkZXJOYW1lfS8ke2ZvbGRlck5hbWV9XyR7aSsxfS5qcGdcIiBhbHQ9XCLQmtCw0YLQsNC70L7QsyAzIDIwMjFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PmApO1xyXG4gICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNsaWRlcztcclxuICAgICAgICAgIH0oKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgIHNsaWRlQ2hhbmdlOiBmdW5jdGlvbiAoKSB7Ly9PbiBlYWNoIHNsaWRlIGNoYW5nZSB0aGUgZGlzcGxheSB3aWxsIGNoYW5nZVxyXG4gICAgICAgICAgICBpZih3aW5kb3dXaWR0aCA8PSA0ODApIHtcclxuICAgICAgICAgICAgICBjaGFuZ2VEaXNwbGF5KGNhdGFsb2d1ZVN3aXBlci5hY3RpdmVJbmRleCwgcGFnZUNvdW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaGFuZ2VEaXNwbGF5KGNhdGFsb2d1ZVN3aXBlci5hY3RpdmVJbmRleCAqIDIsIHBhZ2VDb3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgLy9UaGlzIGZ1bmN0aW9uIGNoYW5nZXMgdGhlIHBhZ2UgZGlzcGxheVxyXG4gICAgICBmdW5jdGlvbiBjaGFuZ2VEaXNwbGF5KGN1cnJlbnRQYWdlLCB0b3RhbFBhZ2VzKSB7XHJcbiAgICAgICAgaWYoKGN1cnJlbnRQYWdlID09IDApKSB7XHJcbiAgICAgICAgICBpbnB1dFBhZ2VTZWxlY3Rvci52YWx1ZSA9IGAxIC8gJHt0b3RhbFBhZ2VzfWA7Ly8gMSAvIDM1OFxyXG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBhZ2UgPj0gdG90YWxQYWdlcykge1xyXG4gICAgICAgICAgaW5wdXRQYWdlU2VsZWN0b3IudmFsdWUgPSBgJHt0b3RhbFBhZ2VzfSAvICR7dG90YWxQYWdlc31gO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZih3aW5kb3dXaWR0aCA8PSA0ODApe1xyXG4gICAgICAgICAgICBpbnB1dFBhZ2VTZWxlY3Rvci52YWx1ZSA9IGAke2N1cnJlbnRQYWdlICsgMX0gLyAke3RvdGFsUGFnZXN9YDsvLzM1OCAvIDM1OFxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5wdXRQYWdlU2VsZWN0b3IudmFsdWUgPSBgJHtjdXJyZW50UGFnZX0gLSAke2N1cnJlbnRQYWdlICsgMX0gLyAke3RvdGFsUGFnZXN9YDsvLzM1OCAvIDM1OFxyXG4gICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLy0tLS0tLS0tLS0tLS0tSW1wbGVtZW50YXRpb25zLS0tLS0tLS0tLS0tXHJcbiAgICAgIGNoYW5nZURpc3BsYXkoMCwgcGFnZUNvdW50KTsvLyBTZXRzIHRoZSBkaXNwbGF5IHRvIGluaXRpYWwgcG9zaXRpb24oMSAvIDM1OClcclxuXHJcbiAgICAgICQoJy5jYXRhbG9ndWVfX3NsaWRlci1wcmV2LWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY2F0YWxvZ3VlU3dpcGVyLnNsaWRlUHJldigpO1xyXG4gICAgICB9KTtcclxuICAgICAgJCgnLmNhdGFsb2d1ZV9fc2xpZGVyLW5leHQtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNhdGFsb2d1ZVN3aXBlci5zbGlkZU5leHQoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkKCcuY2F0YWxvZ3VlX19zbGlkZXItZmlyc3QtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjYXRhbG9ndWVTd2lwZXIuc2xpZGVUbygwLCAwKTtcclxuICAgICAgfSk7XHJcbiAgICAgICQoJy5jYXRhbG9ndWVfX3NsaWRlci1sYXN0LWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYod2luZG93V2lkdGggPD0gNDgwKSBjYXRhbG9ndWVTd2lwZXIuc2xpZGVUbygoaW1nQ291bnQpICwgMCk7XHJcbiAgICAgICAgZWxzZSBjYXRhbG9ndWVTd2lwZXIuc2xpZGVUbygoaW1nQ291bnQgLyAyKSAsIDApO1xyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIC8vIEN1cnJlbnQgcGFnZSBkaXNwbGF5IGZ1bmN0aW9uYWxcclxuICAgICAgXHJcbiAgICAgIGlucHV0UGFnZVNlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9ICcnOy8vQ2xlYXIgdGhlIGRpc3BsYXkgb24gZm9jdXNcclxuICAgICAgfSk7XHJcbiAgICAgIC8vSW5wdXR0aW5nIGRhdGEgdG8gdGhlIGRpc3BsYXlcclxuICAgICAgaW5wdXRQYWdlU2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGlmKCAoKGUua2V5Q29kZSA+IDQ3KSAmJiAoZS5rZXlDb2RlPCA1NykpIHx8IChlLmtleUNvZGUgPT0gOCkgKSB7XHJcbiAgICAgICAgICAvL0lmIG51bWJlcnMgcHJlc3NkID0+IERlZmF1bHQgYmVoYXZpb3JcclxuICAgICAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09IDEzKSB7Ly9FbnRlciBwcmVzc2VkXHJcbiAgICAgICAgICAgIGxldCBjaG9zZW5TbGlkZSA9IGNhdGFsb2d1ZVN3aXBlci5hY3RpdmVJbmRleCoyOy8vQ3VycmVudCBhY3RpdmUgcGFnZVxyXG4gICAgICAgICAgICBpZih0aGlzLnZhbHVlID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5ibHVyKCk7XHJcbiAgICAgICAgICAgICAgY2hhbmdlRGlzcGxheShjaG9zZW5TbGlkZSwgcGFnZUNvdW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaG9zZW5TbGlkZSA9IE51bWJlcih0aGlzLnZhbHVlKTsvL1R1cm4gZW50ZXJlZCB2YWx1ZSB0byBudW1iZXIgc2luY2UgaXRzIGEgc3RyaW5nIGJ5IGRlZmF1bHRcclxuICAgICAgICAgICAgICBpZih3aW5kb3dXaWR0aCA8PTQ4MCkgY2F0YWxvZ3VlU3dpcGVyLnNsaWRlVG8oY2hvc2VuU2xpZGUgLSAxLCA4MDApO1xyXG4gICAgICAgICAgICAgIGVsc2UgY2F0YWxvZ3VlU3dpcGVyLnNsaWRlVG8oY2hvc2VuU2xpZGUvMiwgODAwKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICB0aGlzLmJsdXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpbnB1dFBhZ2VTZWxlY3Rvci5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYodGhpcy52YWx1ZSA9PSAnJykge1xyXG4gICAgICAgICAgY2hhbmdlRGlzcGxheShjYXRhbG9ndWVTd2lwZXIuYWN0aXZlSW5kZXgqMiwgcGFnZUNvdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pIFxyXG4gICAgfSBcclxuICB9KVxyXG5cclxuXHJcbn0pO1xyXG4iXSwiZmlsZSI6ImNhdGFsb2d1ZV9zbGlkZXIuanMifQ==
