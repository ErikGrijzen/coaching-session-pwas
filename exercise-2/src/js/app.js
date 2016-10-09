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

    function loadTalks() {

    }

    function onTalksButtonClicked() {
        closeMenu();

        loadTalks();
    }

    menuBtn.addEventListener('click', onMenuButtonClicked);
    talksBtn.addEventListener('click', onTalksButtonClicked);

    init();

})();