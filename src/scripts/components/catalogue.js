
document.addEventListener('DOMContentLoaded', function () {
 
  /**-----------------------------------------------------------
   * ---------------Variables and Functions---------------------
   * -----------------------------------------------------------*/
  
  const cataloguesList = document.querySelector('.catalogues__list');//List of all available catatlogues
  cataloguesList.innerHTML = '';

  

  /**-----------------------------------------------------------
   * --------------------Functional---------------------------
   * -----------------------------------------------------------*/

  //First of all we scan the catalogues folder if there is any catalogues
  $.ajax({
    type: 'GET',
    url: "./php/cat-list-load.php",//This file scans catalogues folder
    dataType: 'json',
    success: function(data) {//In 'data' we have an array with folderanmes of catalogues
      for(let i = 0; i < data.length; i++) {
        
        cataloguesList.innerHTML += `<li class="catalogue__item"><a class="catalogue__item-btn" href="#" id="cat-btn${i}"><img class="catalogue__item-img" src="./images/catalogue/${data[i]}/${data[i]}_1.jpg" alt="Каталог ${data[i]}"></a>
                                      <h3 class="catalogue__item-title">Каталог ${data[i]}</h3>
                                    </li>`;
      }
      for(let i = 0; i < data.length; i++) {
        $(`#cat-btn${i}`).on('click', function(e){
          this.href = `./catalogue_slider.html?param=${data[i]}`
        });
      }
    }
  });



});




