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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGFsb2d1ZS5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjYXRhbG9ndWVzTGlzdCIsInF1ZXJ5U2VsZWN0b3IiLCJpbm5lckhUTUwiLCIkIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJkYXRhIiwiaSIsImxlbmd0aCIsIm9uIiwiZSIsImhyZWYiXSwibWFwcGluZ3MiOiI7O0FBQ0FBLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7QUFFeEQ7OztBQUlBLE1BQU1DLGNBQWMsR0FBR0YsUUFBUSxDQUFDRyxhQUFULENBQXVCLG1CQUF2QixDQUF2QixDQU53RCxDQU1XOztBQUNuRUQsRUFBQUEsY0FBYyxDQUFDRSxTQUFmLEdBQTJCLEVBQTNCO0FBSUE7OztBQUlBOztBQUNBQyxFQUFBQSxDQUFDLENBQUNDLElBQUYsQ0FBTztBQUNMQyxJQUFBQSxJQUFJLEVBQUUsS0FERDtBQUVMQyxJQUFBQSxHQUFHLEVBQUUseUJBRkE7QUFFMEI7QUFDL0JDLElBQUFBLFFBQVEsRUFBRSxNQUhMO0FBSUxDLElBQUFBLE9BQU8sRUFBRSxpQkFBU0MsSUFBVCxFQUFlO0FBQUM7QUFDdkIsV0FBSSxJQUFJQyxDQUFDLEdBQUcsQ0FBWixFQUFlQSxDQUFDLEdBQUdELElBQUksQ0FBQ0UsTUFBeEIsRUFBZ0NELENBQUMsRUFBakMsRUFBcUM7QUFFbkNWLFFBQUFBLGNBQWMsQ0FBQ0UsU0FBZixvR0FBOEdRLENBQTlHLDRFQUE2S0QsSUFBSSxDQUFDQyxDQUFELENBQWpMLGNBQXdMRCxJQUFJLENBQUNDLENBQUQsQ0FBNUwsdUVBQXVORCxJQUFJLENBQUNDLENBQUQsQ0FBM04sMklBQzBFRCxJQUFJLENBQUNDLENBQUQsQ0FEOUU7QUFHRDs7QUFOcUIsaUNBT2RBLEVBUGM7QUFRcEJQLFFBQUFBLENBQUMsbUJBQVlPLEVBQVosRUFBRCxDQUFrQkUsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsVUFBU0MsQ0FBVCxFQUFXO0FBQ3ZDLGVBQUtDLElBQUwsMkNBQTZDTCxJQUFJLENBQUNDLEVBQUQsQ0FBakQ7QUFDRCxTQUZEO0FBUm9COztBQU90QixXQUFJLElBQUlBLEVBQUMsR0FBRyxDQUFaLEVBQWVBLEVBQUMsR0FBR0QsSUFBSSxDQUFDRSxNQUF4QixFQUFnQ0QsRUFBQyxFQUFqQyxFQUFxQztBQUFBLGNBQTdCQSxFQUE2QjtBQUlwQztBQUNGO0FBaEJJLEdBQVA7QUFxQkQsQ0FyQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcclxuICBcclxuICAvKiotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAqIC0tLS0tLS0tLS0tLS0tLVZhcmlhYmxlcyBhbmQgRnVuY3Rpb25zLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG4gIFxyXG4gIGNvbnN0IGNhdGFsb2d1ZXNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhdGFsb2d1ZXNfX2xpc3QnKTsvL0xpc3Qgb2YgYWxsIGF2YWlsYWJsZSBjYXRhdGxvZ3Vlc1xyXG4gIGNhdGFsb2d1ZXNMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICBcclxuXHJcbiAgLyoqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLUZ1bmN0aW9uYWwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG4gIC8vRmlyc3Qgb2YgYWxsIHdlIHNjYW4gdGhlIGNhdGFsb2d1ZXMgZm9sZGVyIGlmIHRoZXJlIGlzIGFueSBjYXRhbG9ndWVzXHJcbiAgJC5hamF4KHtcclxuICAgIHR5cGU6ICdHRVQnLFxyXG4gICAgdXJsOiBcIi4vcGhwL2NhdC1saXN0LWxvYWQucGhwXCIsLy9UaGlzIGZpbGUgc2NhbnMgY2F0YWxvZ3VlcyBmb2xkZXJcclxuICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7Ly9JbiAnZGF0YScgd2UgaGF2ZSBhbiBhcnJheSB3aXRoIGZvbGRlcmFubWVzIG9mIGNhdGFsb2d1ZXNcclxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBcclxuICAgICAgICBjYXRhbG9ndWVzTGlzdC5pbm5lckhUTUwgKz0gYDxsaSBjbGFzcz1cImNhdGFsb2d1ZV9faXRlbVwiPjxhIGNsYXNzPVwiY2F0YWxvZ3VlX19pdGVtLWJ0blwiIGhyZWY9XCIjXCIgaWQ9XCJjYXQtYnRuJHtpfVwiPjxpbWcgY2xhc3M9XCJjYXRhbG9ndWVfX2l0ZW0taW1nXCIgc3JjPVwiLi9pbWFnZXMvY2F0YWxvZ3VlLyR7ZGF0YVtpXX0vJHtkYXRhW2ldfV8xLmpwZ1wiIGFsdD1cItCa0LDRgtCw0LvQvtCzICR7ZGF0YVtpXX1cIj48L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwiY2F0YWxvZ3VlX19pdGVtLXRpdGxlXCI+0JrQsNGC0LDQu9C+0LMgJHtkYXRhW2ldfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+YDtcclxuICAgICAgfVxyXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICQoYCNjYXQtYnRuJHtpfWApLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgdGhpcy5ocmVmID0gYC4vY2F0YWxvZ3VlX3NsaWRlci5odG1sP3BhcmFtPSR7ZGF0YVtpXX1gXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcblxyXG5cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG4iXSwiZmlsZSI6ImNhdGFsb2d1ZS5qcyJ9
