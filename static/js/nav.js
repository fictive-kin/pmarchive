document.addEventListener('DOMContentLoaded', function(event){
    var bodyEl = document.querySelector('.body');
    var hamburgerEl = document.querySelector('.hamburger-container');
    var navList = document.querySelector('.site-nav__link');

    hamburgerEl.addEventListener('click', function(){
        bodyEl.classList.toggle('js-is-active');
        hamburgerEl.classList.add('is-clicked');
    });

    //for accessibility
    hamburgerEl.addEventListener('keypress', function(e){
        //if user presses the enter key toggle class
        if (e.keyCode == 13) {
            bodyEl.classList.toggle('js-is-active');
        }
    });

    navList.addEventListener('keydown', function(e) {
        //if user presses the escape key while they are in the nav
        if (e.keyCode == 27) {
            bodyEl.classList.remove('js-is-active');
        }
    });
});
