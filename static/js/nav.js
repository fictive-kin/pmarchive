document.addEventListener('DOMContentLoaded', function(event){
    var navEl = document.querySelector('.nav');
    var hamburgerEl = document.querySelector('.hamburger-container');

    hamburgerEl.addEventListener('click', function(){
        navEl.classList.toggle('js-is-active');
    });
});
