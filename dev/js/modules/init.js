;(function() {
    var link = document.getElementsByClassName('main_link');
    var list = document.getElementsByClassName('main_list');
    /*for (var i = 0; i < link.length; i++) {
        link[i].addEventListener("click", function (e) {
            e.preventDefault();
            this.nextElementSibling.classList.toggle('active');
        });
   }*/
    list.addEventListener('click', function (e) {
        console.log('кликнули на' + e.target.getAttribute('my-attr'));
        link.nextElementSibling.classList.toggle('active');
    })
})();