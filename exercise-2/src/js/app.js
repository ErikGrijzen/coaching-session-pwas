(function() {
    'use strict';

    var menuBtn = document.querySelector('.header__menuBtn'),

        navigationActiveClass = 'navigation-is-active',
        navigationButtons = document.querySelectorAll('.navigation__btn'),
        programBtn = navigationButtons[0],
        talksBtn = navigationButtons[1],
        workshopsBtn = navigationButtons[2],

        loader = document.querySelector('.loader-circle'),
        loaderIsHiddenClass = 'is-hidden';

    function init() {
        loadProgram();
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

    function loadProgram() {

    }

    function loadTalks() {

    }

    function loadWorkshops() {

    }

    function onProgramButtonClicked() {
        loadProgram();
    }

    function onTalksButtonClicked() {
        loadTalks();
    }

    function onWorkshopsButtonClicked() {
        loadWorkshops();
    }

    menuBtn.addEventListener('click', onMenuButtonClicked);
    programBtn.addEventListener('click', onProgramButtonClicked);
    talksBtn.addEventListener('click', onTalksButtonClicked);
    workshopsBtn.addEventListener('click', onWorkshopsButtonClicked);

    init();

})();