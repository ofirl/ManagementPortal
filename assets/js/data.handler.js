var sidebarContainer = 'sidebarCollapse';

Element.prototype.addClass = function (className) {
    this.classList.add(className);
}

Element.prototype.removeClass = function (className) {
    this.classList.remove(className);
}

function createMenu(menuData, parentElement) {
    // creating the menu
    let menuElement = document.createElement('ul');

    // default menu = main menu
    if (!parentElement) {
        parentElement = document.querySelector('#' + sidebarContainer);
        menuElement.addClass('navbar-nav');
    }
    // sub menu
    else {
        menuElement.addClass('nav');
        menuElement.addClass('nav-sm');
        menuElement.addClass('flex-column');
    }

    // for each menu item
    for (let index = 0; index < menuData.length; index++) {
        const menuObject = menuData[index];

        // create a menu item (<li>)
        let menuItem = document.createElement('li');
        menuItem.addClass('nav-item');
        menuElement.append(menuItem);

        // create a menu link (<a>)
        let menuLink = document.createElement('a');
        menuLink.addClass('nav-link');

        // create a feather icon (<i>)
        if (menuObject.featherIcon) {
            let featherIcon = document.createElement('i');
            featherIcon.addClass('fe');
            featherIcon.addClass('fe-' + menuObject.featherIcon);

            menuLink.append(featherIcon);
        }

        // enter text
        menuLink.innerHTML += menuObject.name;

        // create a badge (<span>)
        if (menuObject.badge || menuObject.badgeText) {
            let badge = document.createElement('span');
            badge.addClass('badge');
            badge.addClass('badge-' + menuObject.badge);
            badge.addClass('ml-auto');
            badge.innerHTML = menuObject.badgeText;

            menuLink.append(badge);
        }
        menuItem.append(menuLink);

        if (menuObject.children) {
            menuLink.setAttribute('href', '#' + menuObject.href);
            menuLink.setAttribute('data-toggle', 'collapse');
            menuLink.setAttribute('role', 'button');
            menuLink.setAttribute('aria-expanded', 'false');
            menuLink.setAttribute('aria-controls', menuObject.href);

            let subMenu = document.createElement('div');
            subMenu.addClass('collapse');
            subMenu.id = menuObject.href;
            createMenu(menuObject.children, subMenu);

            menuItem.append(subMenu);
        }
        else {
            menuLink.setAttribute('href', menuObject.href);
        }
    }

    parentElement.insertBefore(menuElement, parentElement.firstChild);
}

function loadMenusFromFile() {
    createMenu(menuJson.menu);
    var navbars = $(".navbar-nav, .navbar-nav .nav");
    var collpaseElements = $(".navbar-nav .collapse");
    collpaseElements.on({
        "show.bs.collapse": function () {
            var a;
            (a = $(this)).closest(navbars).find(collpaseElements).not(a).collapse("hide")
        }
    });
}

loadMenusFromFile();