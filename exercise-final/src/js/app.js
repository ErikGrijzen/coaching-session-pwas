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

    function getSpeakerFromHTML(html) {
        return html.substr(html.indexOf('wiki">') + 6, html.indexOf('</a>') - html.indexOf('wiki">') - 6);
    }

    function parseTalkData(data) {
       var list = document.createElement('ul');
       list.className = 'talks__list';

       data.detailLines.forEach(function(talk) {
           var listItem = document.createElement('li');
           listItem.className = 'talks__listItem';

           var title = document.createElement('h2');
           title.className = 'talks__title';
           title.innerText = talk.title;
           listItem.appendChild(title);

           var speaker = document.createElement('p');
           speaker.className = 'talks__speaker';
           speaker.innerHTML = '<strong>By: </strong> ' + getSpeakerFromHTML(talk.details[0]);
           listItem.appendChild(speaker);

           var products = document.createElement('p');
           products.className = 'talks__category';
           products.innerHTML = '<strong>Category: </strong>' + talk.details[3];
           listItem.appendChild(products);

           var targetAudience = document.createElement('p');
           targetAudience.className = 'talks__audience';
           targetAudience.innerHTML = '<strong>Target audience: </strong>' + talk.details[4];
           listItem.appendChild(targetAudience);

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

