/* #region Constants */
// Consts
const sidebarContainer = 'sidebarCollapse';
const inputDataTableContainer = 'inputDataTableContainer';
const inputDataList = 'inputDataList';

/* #endregion */

// Input Data
var selectedScript = 0;
var inputData = [];
var inputListOptions = {
    valueNames: ['status']
    // items: [{'card-name': 'test', 'username': 'testing', 'status':'warning'}]
};
var inputList;

/* Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions */
/* #region Helper Functions */

Element.prototype.addClass = function (className) {
    this.classList.add(className);
}

Element.prototype.removeClass = function (className) {
    this.classList.remove(className);
}

Element.prototype.insertAsFirstChild = function (childElement) {
    this.insertBefore(childElement, this.firstChild);
}

/* #endregion */
/* Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions */

/* Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation */
/* #region Menu Creation */

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

/* #endregion */
/* Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation -- Menu Creation */

/* Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data */

function createInputDataTable(tableContainer) {
    if (!tableContainer)
        tableContainer = document.querySelector('#' + inputDataTableContainer);

    // data-lists-values for sorting
    let inputFields = [];
    scriptsJson[selectedScript].inputs.forEach(input => {
        inputFields.push(input.name.replace(' ', '-'));
    });
    inputFields.push('status');
    tableContainer.setAttribute('data-lists-values', '[' + inputFields.join(',') + ']');

    // table header cells
    let totalWidth = 2;
    let headerRow = tableContainer.querySelector('thead tr');
    scriptsJson[selectedScript].inputs.forEach(input => {
        let headerCell = document.createElement('th');
        headerCell.addClass('col-' + input.width);
        totalWidth += input.width;

        let headerCellLink = document.createElement('a');
        headerCellLink.setAttribute('href', '#');
        headerCellLink.addClass('text-muted');
        headerCellLink.addClass('sort');
        headerCellLink.setAttribute('data-sort', input.name.replace(' ', '-'));
        headerCellLink.innerText = input.name;
        headerCellLink.setAttribute('onclick', 'return false;');

        headerCell.append(headerCellLink);
        headerRow.insertBefore(headerCell, headerRow.querySelector('[data-sort=status]').parentElement);

        let inputOption = {
            name: input.name.replace(' ', '-'),
            attr: 'value'
        };
        inputListOptions.valueNames.push(inputOption);
    });

    // total card width
    tableContainer.parentElement.addClass('col-' + totalWidth);

    // add one new empty row
    addNewRow(document.querySelector('#inputDataTableContainer'));

    // Init list
    inputList = new List(inputDataTableContainer, inputListOptions);
}

function addNewRowClick() {
    addNewRow(document.querySelector(this.dataset.target));
}

function addNewRow(table) {
    if (inputList) {
        inputList.add({
            'card-name': '',
            'username': '',
            'status': 'Warning'
        });
        return;
    }

    let inputListItem = {};
    let row = document.createElement('tr');
    scriptsJson[selectedScript].inputs.forEach(input => {
        let cellClass = input.name.replace(' ', '-');
        let cellInputType = input.type;
        let cellPlaceHolder = input.name;

        row.innerHTML += '<td>' +
            '<input type="' + cellInputType + '" class="form-control form-control-flush h-100 ' + cellClass + '" placeholder="' + cellPlaceHolder + '" value=""> </td>';

        inputListItem[input.name.replace(' ', '-')] = '';
    });

    row.innerHTML += '<td> <span class="text-warning">●</span> <span class="status"> Warning </span> </td>' +
        '<td class="text-center"> <span class="fe fe-trash-2 mr-1" onclick="deleteRowClick.call(this)"> </span>' +
        '<span class="fe fe-copy" onclick="copyRowClick.call(this)"> </span> </td> </tr>';

    inputListItem['status'] = 'Warning';

    table.querySelector('tbody').append(row);
}

function copyRowClick() {
    copyRow(this.parentElement.parentElement);
}

function copyRow(originalRow) {
    // TODO : copy row
}

function deleteRowClick() {
    deleteRow(this.parentElement.parentElement);
}

function deleteRow(row) {
    // TODO : delete row
}

function inputDataChanged() {

}

/* Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data */

/* Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init */

// Init when the script is loaded
function dataHandlerInit() {
    loadMenusFromFile();
    createInputDataTable();
}

/* Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init */

dataHandlerInit();

// Define value names
var options = {
    valueNames: [
        'username',
        'status',
        { name: 'card-name', attr: 'value' }
    ]
};

// // Init list
// inputList = new List('inputDataTableContainer', inputListOptions);

// inputList.add({
//     'card-name': 1,
//     'username': 'test',
//     'status': '45'
// });