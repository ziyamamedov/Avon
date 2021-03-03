"use strict";

document.addEventListener('DOMContentLoaded', function () {
  /**-----------------------------------------------------------
   * ---------------Variables and Functions---------------------
   * -----------------------------------------------------------*/
  var cataloguesList = document.querySelector('.catalogues__list'); //List of all available catatlogues

  cataloguesList.innerHTML = '';
  /**-----------------------------------------------------------
   * --------------------Functional---------------------------
   * -----------------------------------------------------------*/
  //First of all we scan the catalogues folder if there is any catalogues

  $.ajax({
    type: 'GET',
    url: "./php/cat-list-load.php",
    //This file scans catalogues folder
    dataType: 'json',
    success: function success(data) {
      //In 'data' we have an array with folderanmes of catalogues
      for (var i = 0; i < data.length; i++) {
        cataloguesList.innerHTML += "<li class=\"catalogue__item\"><a class=\"catalogue__item-btn\" href=\"#\" id=\"cat-btn".concat(i, "\"><img class=\"catalogue__item-img\" src=\"./images/catalogue/").concat(data[i], "/").concat(data[i], "_1.jpg\" alt=\"\u041A\u0430\u0442\u0430\u043B\u043E\u0433 ").concat(data[i], "\"></a>\n                                      <h3 class=\"catalogue__item-title\">\u041A\u0430\u0442\u0430\u043B\u043E\u0433 ").concat(data[i], "</h3>\n                                    </li>");
      }

      var _loop = function _loop(_i) {
        $("#cat-btn".concat(_i)).on('click', function (e) {
          this.href = "./catalogue_slider.html?param=".concat(data[_i]);
        });
      };

      for (var _i = 0; _i < data.length; _i++) {
        _loop(_i);
      }
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGFsb2d1ZS5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjYXRhbG9ndWVzTGlzdCIsInF1ZXJ5U2VsZWN0b3IiLCJpbm5lckhUTUwiLCIkIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJkYXRhIiwiaSIsImxlbmd0aCIsIm9uIiwiZSIsImhyZWYiXSwibWFwcGluZ3MiOiI7O0FBQ0FBLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7QUFFeEQ7OztBQUlBLE1BQU1DLGNBQWMsR0FBR0YsUUFBUSxDQUFDRyxhQUFULENBQXVCLG1CQUF2QixDQUF2QixDQU53RCxDQU1XOztBQUNuRUQsRUFBQUEsY0FBYyxDQUFDRSxTQUFmLEdBQTJCLEVBQTNCO0FBSUE7OztBQUlBOztBQUNBQyxFQUFBQSxDQUFDLENBQUNDLElBQUYsQ0FBTztBQUNMQyxJQUFBQSxJQUFJLEVBQUUsS0FERDtBQUVMQyxJQUFBQSxHQUFHLEVBQUUseUJBRkE7QUFFMEI7QUFDL0JDLElBQUFBLFFBQVEsRUFBRSxNQUhMO0FBSUxDLElBQUFBLE9BQU8sRUFBRSxpQkFBU0MsSUFBVCxFQUFlO0FBQUM7QUFDdkIsV0FBSSxJQUFJQyxDQUFDLEdBQUcsQ0FBWixFQUFlQSxDQUFDLEdBQUdELElBQUksQ0FBQ0UsTUFBeEIsRUFBZ0NELENBQUMsRUFBakMsRUFBcUM7QUFFbkNWLFFBQUFBLGNBQWMsQ0FBQ0UsU0FBZixvR0FBOEdRLENBQTlHLDRFQUE2S0QsSUFBSSxDQUFDQyxDQUFELENBQWpMLGNBQXdMRCxJQUFJLENBQUNDLENBQUQsQ0FBNUwsdUVBQXVORCxJQUFJLENBQUNDLENBQUQsQ0FBM04sMklBQzBFRCxJQUFJLENBQUNDLENBQUQsQ0FEOUU7QUFHRDs7QUFOcUIsaUNBT2RBLEVBUGM7QUFRcEJQLFFBQUFBLENBQUMsbUJBQVlPLEVBQVosRUFBRCxDQUFrQkUsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsVUFBU0MsQ0FBVCxFQUFXO0FBQ3ZDLGVBQUtDLElBQUwsMkNBQTZDTCxJQUFJLENBQUNDLEVBQUQsQ0FBakQ7QUFDRCxTQUZEO0FBUm9COztBQU90QixXQUFJLElBQUlBLEVBQUMsR0FBRyxDQUFaLEVBQWVBLEVBQUMsR0FBR0QsSUFBSSxDQUFDRSxNQUF4QixFQUFnQ0QsRUFBQyxFQUFqQyxFQUFxQztBQUFBLGNBQTdCQSxFQUE2QjtBQUlwQztBQUNGO0FBaEJJLEdBQVA7QUFxQkQsQ0FyQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuIFxyXG4gIC8qKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICogLS0tLS0tLS0tLS0tLS0tVmFyaWFibGVzIGFuZCBGdW5jdGlvbnMtLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcbiAgXHJcbiAgY29uc3QgY2F0YWxvZ3Vlc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2F0YWxvZ3Vlc19fbGlzdCcpOy8vTGlzdCBvZiBhbGwgYXZhaWxhYmxlIGNhdGF0bG9ndWVzXHJcbiAgY2F0YWxvZ3Vlc0xpc3QuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gIFxyXG5cclxuICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tRnVuY3Rpb25hbC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbiAgLy9GaXJzdCBvZiBhbGwgd2Ugc2NhbiB0aGUgY2F0YWxvZ3VlcyBmb2xkZXIgaWYgdGhlcmUgaXMgYW55IGNhdGFsb2d1ZXNcclxuICAkLmFqYXgoe1xyXG4gICAgdHlwZTogJ0dFVCcsXHJcbiAgICB1cmw6IFwiLi9waHAvY2F0LWxpc3QtbG9hZC5waHBcIiwvL1RoaXMgZmlsZSBzY2FucyBjYXRhbG9ndWVzIGZvbGRlclxyXG4gICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHsvL0luICdkYXRhJyB3ZSBoYXZlIGFuIGFycmF5IHdpdGggZm9sZGVyYW5tZXMgb2YgY2F0YWxvZ3Vlc1xyXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNhdGFsb2d1ZXNMaXN0LmlubmVySFRNTCArPSBgPGxpIGNsYXNzPVwiY2F0YWxvZ3VlX19pdGVtXCI+PGEgY2xhc3M9XCJjYXRhbG9ndWVfX2l0ZW0tYnRuXCIgaHJlZj1cIiNcIiBpZD1cImNhdC1idG4ke2l9XCI+PGltZyBjbGFzcz1cImNhdGFsb2d1ZV9faXRlbS1pbWdcIiBzcmM9XCIuL2ltYWdlcy9jYXRhbG9ndWUvJHtkYXRhW2ldfS8ke2RhdGFbaV19XzEuanBnXCIgYWx0PVwi0JrQsNGC0LDQu9C+0LMgJHtkYXRhW2ldfVwiPjwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJjYXRhbG9ndWVfX2l0ZW0tdGl0bGVcIj7QmtCw0YLQsNC70L7QsyAke2RhdGFbaV19PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5gO1xyXG4gICAgICB9XHJcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgJChgI2NhdC1idG4ke2l9YCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICB0aGlzLmhyZWYgPSBgLi9jYXRhbG9ndWVfc2xpZGVyLmh0bWw/cGFyYW09JHtkYXRhW2ldfWBcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuXHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcbiJdLCJmaWxlIjoiY2F0YWxvZ3VlLmpzIn0=
