(function () {
    'use strict';

    var menuBtn = document.querySelector('.header__menuBtn'),

        navigationActiveClass = 'navigation-is-active',
        talksBtn = document.querySelectorAll('.navigation__btn')[1],

        main = document.querySelector('.main'),

        loader = document.querySelector('.loader-circle'),
        loaderIsHiddenClass = 'is-hidden';

    function init() {
        loadTalks();
    }

    function showLoader() {
        loader.classList.remove(loaderIsHiddenClass);
    }

    function hideLoader() {
        loader.classList.add(loaderIsHiddenClass);
    }

    function openMenu() {
        document.body.classList.add(navigationActiveClass);
    }

    function closeMenu() {
        document.body.classList.remove(navigationActiveClass);
    }

    function onMenuButtonClicked() {
        if (document.body.classList.contains(navigationActiveClass)) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function renderTalksData(data) {
        var list = document.createElement('ul');
        list.className = 'talks__list';

        data.talks.forEach(function (talk) {
            var listItem = document.createElement('li');
            listItem.className = 'talks__listItem';

            var title = document.createElement('h2');
            title.className = 'talks__title';
            title.innerText = talk.title;
            listItem.appendChild(title);

            var speaker = document.createElement('p');
            speaker.className = 'talks__speaker';
            speaker.innerHTML = '<strong>By: </strong> ' + talk.speaker;
            listItem.appendChild(speaker);

            var products = document.createElement('p');
            products.className = 'talks__category';
            products.innerHTML = '<strong>Category: </strong>' + talk.products;
            listItem.appendChild(products);

            var targetAudience = document.createElement('p');
            targetAudience.className = 'talks__audience';
            targetAudience.innerHTML = '<strong>Target audience: </strong>' + talk.audience;
            listItem.appendChild(targetAudience);

            list.appendChild(listItem);
        });

        main.innerHTML = list.outerHTML;
    }

    function loadTalks() {
        var url = 'api/talks.json';

        showLoader();

        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                renderTalksData(data);

                hideLoader();
            })
            .catch(function() {
                hideLoader();
            });
    }

    function onTalksButtonClicked() {
        closeMenu();

        loadTalks();
    }

    menuBtn.addEventListener('click', onMenuButtonClicked);
    talksBtn.addEventListener('click', onTalksButtonClicked);

    init();

})();