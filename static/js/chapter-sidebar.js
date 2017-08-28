document.addEventListener('DOMContentLoaded', function(event) {

    var chapterSections = document.querySelectorAll('.chapter');
    var sidebar = document.querySelector('.chapter-list');
    var counter = 1;

    for (var i = 0; i < chapterSections.length; i++) {

        //create li and anchor elements for sidebar
        var li = document.createElement('li');
        li.setAttribute('class', 'chapter-list__item');

        var chapterLink = document.createElement('a');
        chapterLink.setAttribute('class', 'chapter-list__link');

        var chapterNum = '#chapter-' + counter;
        chapterLink.setAttribute('href', chapterNum);

        chapterLink.textContent = counter;

        //append elements to dom
        sidebar.appendChild(li);
        li.appendChild(chapterLink);

        counter++;
    }
});
