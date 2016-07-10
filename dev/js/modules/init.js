;(function() {
    var link = document.getElementsByClassName('main_link');
    for (var i = 0; i < link.length; i++) {
        link[i].addEventListener("click", function (e) {
            e.preventDefault();
            this.nextElementSibling.classList.toggle('active');
        });
   }


})();