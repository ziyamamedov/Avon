"use strict";

document.addEventListener('DOMContentLoaded', function () {
  //This functions helps us get the data sent from the other page
  function $_GET(key) {
    var p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
  }

  var sliderWrapper = document.querySelector('.catalogues__slider-wrapper');
  var sliderList = $('#catalogueSliderList'); //List of slides of catalogue

  sliderList.html = '';
  var sliderClsBtn = document.querySelector('.catalogue__slider-cls-btn');
  sliderClsBtn.href = './catalogue.html';
  var folderName = $_GET('param'); //foldername is sent from previous page through GET

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
        virtual: {
          //The slider will be virtual, since there is a lot of slides
          slides: function () {
            var slides = [];

            for (var i = 1; i <= imgCount; i++) {
              if (i == 1) {
                slides.push("<div class=\"catalogues__slider-item-col\"></div>\n                            <div class=\"catalogues__slider-item-col\"><img class=\"catalogue__slider-item-img\" src=\"./images/catalogue/".concat(folderName, "/").concat(folderName, "_").concat(i, ".jpg\" alt=\"\u041A\u0430\u0442\u0430\u043B\u043E\u0433 3 2021\"></div>"));
              } else if (i == imgCount) {
                slides.push("<div class=\"catalogues__slider-item-col\"><img class=\"catalogue__slider-item-img\" src=\"./images/catalogue/".concat(folderName, "/").concat(folderName, "_").concat(i, ".jpg\" alt=\"\u041A\u0430\u0442\u0430\u043B\u043E\u0433 3 2021\"></div>\n                              <div class=\"catalogues__slider-item-col\"></div>"));
              } else {
                //Each slide contains two columns with a pictchure in each
                slides.push("<div class=\"catalogues__slider-item-col\"><img class=\"catalogue__slider-item-img\" src=\"./images/catalogue/".concat(folderName, "/").concat(folderName, "_").concat(i, ".jpg\" alt=\"\u041A\u0430\u0442\u0430\u043B\u043E\u0433 3 2021\"></div>\n                            <div class=\"catalogues__slider-item-col\"><img class=\"catalogue__slider-item-img\" src=\"./images/catalogue/").concat(folderName, "/").concat(folderName, "_").concat(i + 1, ".jpg\" alt=\"\u041A\u0430\u0442\u0430\u043B\u043E\u0433 3 2021\"></div>"));
                i++;
              }
            }

            return slides;
          }()
        },
        on: {
          slideChange: function slideChange() {
            //On each slide change the display will change
            changeDisplay(catalogueSwiper.activeIndex * 2, pageCount);
          }
        }
      }); //This function changes the page display

      function changeDisplay(currentPage, totalPages) {
        if (currentPage == 0) {
          inputPageSelector.value = "1 / ".concat(totalPages); // 1 / 358
        } else if (currentPage >= totalPages) {
          inputPageSelector.value = "".concat(totalPages, " / ").concat(totalPages);
        } else {
          inputPageSelector.value = "".concat(currentPage, " - ").concat(currentPage + 1, " / ").concat(totalPages); //358 / 358
        }
      }

      ; //--------------Implementations------------

      changeDisplay(0, pageCount); // Sets the display to initial position(1 / 358)

      $('.catalogues__slider-prev-btn').on('click', function (e) {
        e.preventDefault();
        catalogueSwiper.slidePrev();
      });
      $('.catalogues__slider-next-btn').on('click', function (e) {
        e.preventDefault();
        catalogueSwiper.slideNext();
      });
      $('.catalogues__slider-first-btn').on('click', function (e) {
        e.preventDefault();
        catalogueSwiper.slideTo(0, 0);
      });
      $('.catalogue__slider-last-btn').on('click', function (e) {
        e.preventDefault();
        catalogueSwiper.slideTo(imgCount / 2, 0);
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

            catalogueSwiper.slideTo(chosenSlide / 2, 800);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGFsb2d1ZV9zbGlkZXIuanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiJF9HRVQiLCJrZXkiLCJwIiwid2luZG93IiwibG9jYXRpb24iLCJzZWFyY2giLCJtYXRjaCIsIlJlZ0V4cCIsInNsaWRlcldyYXBwZXIiLCJxdWVyeVNlbGVjdG9yIiwic2xpZGVyTGlzdCIsIiQiLCJodG1sIiwic2xpZGVyQ2xzQnRuIiwiaHJlZiIsImZvbGRlck5hbWUiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGEiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsImltZ0NvdW50IiwiTnVtYmVyIiwicGFnZUNvdW50IiwiaW5wdXRQYWdlU2VsZWN0b3IiLCJjYXRhbG9ndWVTd2lwZXIiLCJTd2lwZXIiLCJzcGVlZCIsImtleWJvYXJkIiwiZW5hYmxlZCIsInZpcnR1YWwiLCJzbGlkZXMiLCJpIiwicHVzaCIsIm9uIiwic2xpZGVDaGFuZ2UiLCJjaGFuZ2VEaXNwbGF5IiwiYWN0aXZlSW5kZXgiLCJjdXJyZW50UGFnZSIsInRvdGFsUGFnZXMiLCJ2YWx1ZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInNsaWRlUHJldiIsInNsaWRlTmV4dCIsInNsaWRlVG8iLCJrZXlDb2RlIiwiY2hvc2VuU2xpZGUiLCJibHVyIl0sIm1hcHBpbmdzIjoiOztBQUNBQSxRQUFRLENBQUNDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFZO0FBQ3hEO0FBQ0EsV0FBU0MsS0FBVCxDQUFlQyxHQUFmLEVBQW9CO0FBQ2xCLFFBQUlDLENBQUMsR0FBR0MsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxNQUF4QjtBQUNBSCxJQUFBQSxDQUFDLEdBQUdBLENBQUMsQ0FBQ0ksS0FBRixDQUFRLElBQUlDLE1BQUosQ0FBV04sR0FBRyxHQUFHLFdBQWpCLENBQVIsQ0FBSjtBQUNBLFdBQU9DLENBQUMsR0FBR0EsQ0FBQyxDQUFDLENBQUQsQ0FBSixHQUFVLEtBQWxC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SixVQUFBQSxhQUFhLENBQUNYLGVBQWUsQ0FBQ1ksV0FBaEIsR0FBNEIsQ0FBN0IsRUFBZ0NkLFNBQWhDLENBQWI7QUFDRDtBQUNGLE9BSkQ7QUFLRDtBQTVHSSxHQUFQO0FBZ0hELENBaklEIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgLy9UaGlzIGZ1bmN0aW9ucyBoZWxwcyB1cyBnZXQgdGhlIGRhdGEgc2VudCBmcm9tIHRoZSBvdGhlciBwYWdlXHJcbiAgZnVuY3Rpb24gJF9HRVQoa2V5KSB7XHJcbiAgICB2YXIgcCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XHJcbiAgICBwID0gcC5tYXRjaChuZXcgUmVnRXhwKGtleSArICc9KFteJj1dKyknKSk7XHJcbiAgICByZXR1cm4gcCA/IHBbMV0gOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNsaWRlcldyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ3Vlc19fc2xpZGVyLXdyYXBwZXInKTtcclxuICBjb25zdCBzbGlkZXJMaXN0ID0gJCgnI2NhdGFsb2d1ZVNsaWRlckxpc3QnKTsvL0xpc3Qgb2Ygc2xpZGVzIG9mIGNhdGFsb2d1ZVxyXG4gIHNsaWRlckxpc3QuaHRtbCA9ICcnO1xyXG4gIGNvbnN0IHNsaWRlckNsc0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXRhbG9ndWVfX3NsaWRlci1jbHMtYnRuJyk7XHJcbiAgc2xpZGVyQ2xzQnRuLmhyZWYgPSAnLi9jYXRhbG9ndWUuaHRtbCdcclxuICBjb25zdCBmb2xkZXJOYW1lID0gJF9HRVQoJ3BhcmFtJyk7IC8vZm9sZGVybmFtZSBpcyBzZW50IGZyb20gcHJldmlvdXMgcGFnZSB0aHJvdWdoIEdFVFxyXG4gIFxyXG4gIC8qWEhyIHJlcXVlc3Qgd2hpY2ggdGVsbHMgdXMgaG93IG1hbnkgaW1hZ2VzIGFyZSB0aGVyZSBpbiB0aGVcclxuICBjYXRhbG9ndWUgZm9sZGVyLCB3aGljaCB3ZSBuZWVkIHRvIGJ1aWxkIG91ciBzbGlkZXIgKi9cclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgdXJsOiBcIi4vcGhwL2NhdGFsb2d1ZS1sb2FkLnBocFwiLFxyXG4gICAgZGF0YTogYGZvbGRlcj0ke2ZvbGRlck5hbWV9YCwvL1NlbmQgdG8gdGhlIHNlcnZlciB3aGljaCBmb2xkZXIgd2Ugd2FudCB0byBzY2FuXHJcbiAgICBkYXRhVHlwZTogJ3RleHQnLFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG5cclxuICAgICAgLy8gLS0tLS0tLS0tLS0tLURlZmluaXRpb25zLS0tLS0tLS0tLVxyXG4gICAgICB2YXIgaW1nQ291bnQgPSBOdW1iZXIocmVzcG9uc2UpOyAvLyBRdWFudGl0eSBvZiBpbWFnZXMgaW4gdGhlIGZvbGRlcihjb21lcyBmcm9tIHRoZSBzZXJ2ZXIpXHJcbiAgICAgIHZhciBwYWdlQ291bnQgPSBpbWdDb3VudDsgLy9RdWFudGl5IG9mIHBhZ2VzIGluIHRoZSBjYXRhbG9ndWUoMiBhcmUgYmxhbmsgcGFnZXMpXHJcbiAgICAgIGNvbnN0IGlucHV0UGFnZVNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2d1ZV9fc2xpZGVyLWRpcGxheS1pbnB1dCcpOy8vIEN1cnJlbnQgcGFnZSBkaXNwbGF5XHJcbiAgICAgIGNvbnN0IGNhdGFsb2d1ZVN3aXBlciA9IG5ldyBTd2lwZXIoJy5zd2lwZXItY29udGFpbmVyX2NhdCcsIHsvL0NyZWF0ZSBzd2lwZXIgc2xpZGVyXHJcbiAgICAgICAgc3BlZWQ6IDgwMCxcclxuICAgICAgICBrZXlib2FyZDogey8vS2V5Ym9hcmQgY29udHJvbCBvZiBhIHNsaWRlclxyXG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdmlydHVhbDogey8vVGhlIHNsaWRlciB3aWxsIGJlIHZpcnR1YWwsIHNpbmNlIHRoZXJlIGlzIGEgbG90IG9mIHNsaWRlc1xyXG4gICAgICAgICAgc2xpZGVzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gaW1nQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgIGlmKGkgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgc2xpZGVzLnB1c2goYDxkaXYgY2xhc3M9XCJjYXRhbG9ndWVzX19zbGlkZXItaXRlbS1jb2xcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXRhbG9ndWVzX19zbGlkZXItaXRlbS1jb2xcIj48aW1nIGNsYXNzPVwiY2F0YWxvZ3VlX19zbGlkZXItaXRlbS1pbWdcIiBzcmM9XCIuL2ltYWdlcy9jYXRhbG9ndWUvJHtmb2xkZXJOYW1lfS8ke2ZvbGRlck5hbWV9XyR7aX0uanBnXCIgYWx0PVwi0JrQsNGC0LDQu9C+0LMgMyAyMDIxXCI+PC9kaXY+YCk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChpID09IGltZ0NvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXMucHVzaChgPGRpdiBjbGFzcz1cImNhdGFsb2d1ZXNfX3NsaWRlci1pdGVtLWNvbFwiPjxpbWcgY2xhc3M9XCJjYXRhbG9ndWVfX3NsaWRlci1pdGVtLWltZ1wiIHNyYz1cIi4vaW1hZ2VzL2NhdGFsb2d1ZS8ke2ZvbGRlck5hbWV9LyR7Zm9sZGVyTmFtZX1fJHtpfS5qcGdcIiBhbHQ9XCLQmtCw0YLQsNC70L7QsyAzIDIwMjFcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhdGFsb2d1ZXNfX3NsaWRlci1pdGVtLWNvbFwiPjwvZGl2PmApO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL0VhY2ggc2xpZGUgY29udGFpbnMgdHdvIGNvbHVtbnMgd2l0aCBhIHBpY3RjaHVyZSBpbiBlYWNoXHJcbiAgICAgICAgICAgICAgICBzbGlkZXMucHVzaChgPGRpdiBjbGFzcz1cImNhdGFsb2d1ZXNfX3NsaWRlci1pdGVtLWNvbFwiPjxpbWcgY2xhc3M9XCJjYXRhbG9ndWVfX3NsaWRlci1pdGVtLWltZ1wiIHNyYz1cIi4vaW1hZ2VzL2NhdGFsb2d1ZS8ke2ZvbGRlck5hbWV9LyR7Zm9sZGVyTmFtZX1fJHtpfS5qcGdcIiBhbHQ9XCLQmtCw0YLQsNC70L7QsyAzIDIwMjFcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXRhbG9ndWVzX19zbGlkZXItaXRlbS1jb2xcIj48aW1nIGNsYXNzPVwiY2F0YWxvZ3VlX19zbGlkZXItaXRlbS1pbWdcIiBzcmM9XCIuL2ltYWdlcy9jYXRhbG9ndWUvJHtmb2xkZXJOYW1lfS8ke2ZvbGRlck5hbWV9XyR7aSsxfS5qcGdcIiBhbHQ9XCLQmtCw0YLQsNC70L7QsyAzIDIwMjFcIj48L2Rpdj5gKTtcclxuICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNsaWRlcztcclxuICAgICAgICAgIH0oKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb246IHtcclxuICAgICAgICAgIHNsaWRlQ2hhbmdlOiBmdW5jdGlvbiAoKSB7Ly9PbiBlYWNoIHNsaWRlIGNoYW5nZSB0aGUgZGlzcGxheSB3aWxsIGNoYW5nZVxyXG4gICAgICAgICAgICBjaGFuZ2VEaXNwbGF5KGNhdGFsb2d1ZVN3aXBlci5hY3RpdmVJbmRleCAqIDIsIHBhZ2VDb3VudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIC8vVGhpcyBmdW5jdGlvbiBjaGFuZ2VzIHRoZSBwYWdlIGRpc3BsYXlcclxuICAgICAgZnVuY3Rpb24gY2hhbmdlRGlzcGxheShjdXJyZW50UGFnZSwgdG90YWxQYWdlcykge1xyXG4gICAgICAgIGlmKChjdXJyZW50UGFnZSA9PSAwKSkge1xyXG4gICAgICAgICAgaW5wdXRQYWdlU2VsZWN0b3IudmFsdWUgPSBgMSAvICR7dG90YWxQYWdlc31gOy8vIDEgLyAzNThcclxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQYWdlID49IHRvdGFsUGFnZXMpIHtcclxuICAgICAgICAgIGlucHV0UGFnZVNlbGVjdG9yLnZhbHVlID0gYCR7dG90YWxQYWdlc30gLyAke3RvdGFsUGFnZXN9YDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaW5wdXRQYWdlU2VsZWN0b3IudmFsdWUgPSBgJHtjdXJyZW50UGFnZX0gLSAke2N1cnJlbnRQYWdlICsgMX0gLyAke3RvdGFsUGFnZXN9YDsvLzM1OCAvIDM1OFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8tLS0tLS0tLS0tLS0tLUltcGxlbWVudGF0aW9ucy0tLS0tLS0tLS0tLVxyXG4gICAgICBjaGFuZ2VEaXNwbGF5KDAsIHBhZ2VDb3VudCk7Ly8gU2V0cyB0aGUgZGlzcGxheSB0byBpbml0aWFsIHBvc2l0aW9uKDEgLyAzNTgpXHJcblxyXG4gICAgICAkKCcuY2F0YWxvZ3Vlc19fc2xpZGVyLXByZXYtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjYXRhbG9ndWVTd2lwZXIuc2xpZGVQcmV2KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICAkKCcuY2F0YWxvZ3Vlc19fc2xpZGVyLW5leHQtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNhdGFsb2d1ZVN3aXBlci5zbGlkZU5leHQoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAkKCcuY2F0YWxvZ3Vlc19fc2xpZGVyLWZpcnN0LWJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY2F0YWxvZ3VlU3dpcGVyLnNsaWRlVG8oMCwgMCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgJCgnLmNhdGFsb2d1ZV9fc2xpZGVyLWxhc3QtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBcclxuICAgICAgICBjYXRhbG9ndWVTd2lwZXIuc2xpZGVUbygoaW1nQ291bnQgLyAyKSAsIDApO1xyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIC8vIEN1cnJlbnQgcGFnZSBkaXNwbGF5IGZ1bmN0aW9uYWxcclxuICAgICAgXHJcbiAgICAgIGlucHV0UGFnZVNlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9ICcnOy8vQ2xlYXIgdGhlIGRpc3BsYXkgb24gZm9jdXNcclxuICAgICAgfSk7XHJcbiAgICAgIC8vSW5wdXR0aW5nIGRhdGEgdG8gdGhlIGRpc3BsYXlcclxuICAgICAgaW5wdXRQYWdlU2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGlmKCAoKGUua2V5Q29kZSA+IDQ3KSAmJiAoZS5rZXlDb2RlPCA1NykpIHx8IChlLmtleUNvZGUgPT0gOCkgKSB7XHJcbiAgICAgICAgICAvL0lmIG51bWJlcnMgcHJlc3NkID0+IERlZmF1bHQgYmVoYXZpb3JcclxuICAgICAgICB9IGVsc2UgaWYoZS5rZXlDb2RlID09IDEzKSB7Ly9FbnRlciBwcmVzc2VkXHJcbiAgICAgICAgICAgIGxldCBjaG9zZW5TbGlkZSA9IGNhdGFsb2d1ZVN3aXBlci5hY3RpdmVJbmRleCoyOy8vQ3VycmVudCBhY3RpdmUgcGFnZVxyXG4gICAgICAgICAgICBpZih0aGlzLnZhbHVlID09ICcnKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5ibHVyKCk7XHJcbiAgICAgICAgICAgICAgY2hhbmdlRGlzcGxheShjaG9zZW5TbGlkZSwgcGFnZUNvdW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjaG9zZW5TbGlkZSA9IE51bWJlcih0aGlzLnZhbHVlKTsvL1R1cm4gZW50ZXJlZCB2YWx1ZSB0byBudW1iZXIgc2luY2UgaXRzIGEgc3RyaW5nIGJ5IGRlZmF1bHRcclxuICAgICAgICAgICAgICBjYXRhbG9ndWVTd2lwZXIuc2xpZGVUbyhjaG9zZW5TbGlkZS8yLCA4MDApO1xyXG4gICAgICAgICAgICAgIHRoaXMuYmx1cigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGlucHV0UGFnZVNlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZih0aGlzLnZhbHVlID09ICcnKSB7XHJcbiAgICAgICAgICBjaGFuZ2VEaXNwbGF5KGNhdGFsb2d1ZVN3aXBlci5hY3RpdmVJbmRleCoyLCBwYWdlQ291bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSkgXHJcbiAgICB9IFxyXG4gIH0pXHJcblxyXG5cclxufSk7XHJcbiJdLCJmaWxlIjoiY2F0YWxvZ3VlX3NsaWRlci5qcyJ9
