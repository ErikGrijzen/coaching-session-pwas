(function() {
    'use strict';

    // Register Service Worker

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
                 .register('./service-worker.js')
                 .then(function() {
                     console.log('Service Worker Registered');
                 });
    }

    // Application

    var menuButton = document.querySelector('.header__menuBtn');
    var main = document.querySelector('.main');
    var loader = document.querySelector('.loader-circle');

    function hideLoader() {
        loader.classList.add('is-hidden');
    }

    function parseTalkData(data) {
       var list = document.createElement('ul');
       list.className = 'talks_list';

       data.detailLines.forEach(function(talk) {
          var listItem = document.createElement('li');
          listItem.className = 'talks__listItem';
          listItem.innerText = talk.title;

          list.appendChild(listItem);
       });

       main.innerHTML = list.outerHTML;
    }



    menuButton.addEventListener('click', function() {
       document.body.classList.toggle('navigation-is-active');
    });

    fetch('api/talks.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            parseTalkData(data);

            hideLoader();
        });

})();

