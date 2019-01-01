/* #region Constants */
// Consts
const sidebarContainer = 'sidebarCollapse';
const inputDataTableContainer = 'inputDataTableContainer';
const inputDataList = 'inputDataList';

/* #endregion */

// Input Data
var selectedScript = 0;
var inputListOptions = {
    valueNames: [
        'status',
        { data: ['id'] }
    ]
    // items: [{'card-name': 'test', 'username': 'testing', 'status':'warning'}]
};
var inputList;
var inputListItemCounter = 0;
var currentSort = {
    column: '',
    order: ''
}

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
/* #region Input Data */

function createInputDataTable(tableContainer) {
    if (!tableContainer)
        tableContainer = document.querySelector('#' + inputDataTableContainer);

    // data-lists-values for sorting
    let inputFields = [];
    scriptsArray[selectedScript].inputs.forEach(input => {
        inputFields.push(input.name.replace(' ', '-'));
    });
    inputFields.push('status');
    tableContainer.setAttribute('data-lists-values', '[' + inputFields.join(',') + ']');

    // table header cells
    let totalWidth = 2;
    let headerRow = tableContainer.querySelector('thead tr');
    scriptsArray[selectedScript].inputs.forEach(input => {
        let headerCell = document.createElement('th');
        headerCell.addClass('col-' + input.width);
        totalWidth += input.width;

        // let headerCellLink = document.createElement('a');
        // headerCellLink.setAttribute('href', '#!');
        // headerCellLink.addClass('text-muted');
        // headerCellLink.addClass('sort');
        // headerCellLink.setAttribute('data-sort', input.name.replace(' ', '-'));
        // headerCellLink.innerText = input.name;
        // headerCellLink.setAttribute('onclick', 'onclick="updateSorting.call(this);"');

        headerCell.innerHTML = '<a href="#!" class="text-muted sort" data-sort="' + input.name.replace(' ', '-') + '" ' + 
            'onclick="updateSorting.call(this);">' + input.name + '</a>';

        // headerCell.append(headerCellLink);
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
    addNewRow(document.querySelector('#' + inputDataTableContainer));

    // Init list
    inputList = new List(inputDataTableContainer, inputListOptions);
    inputList.remove('id', 0);
    addNewRow(document.querySelector('#' + inputDataTableContainer));

    applySorting(inputList, currentSort = { column: inputList.valueNames[2].name, order: 'asc' });
}

function addNewRowClick() {
    addNewRow(document.querySelector(this.dataset.target));
}

function addNewRow(table) {
    if (inputList) {
        inputList.add({
            'card-name': '',
            'username': '',
            'status': 'Warning',
            'id': getNextInputListItemId()
        });
        return;
    }

    let inputListItem = {};
    let row = document.createElement('tr');
    row.setAttribute('data-id', getNextInputListItemId());
    scriptsArray[selectedScript].inputs.forEach(input => {
        let cellClass = input.name.replace(' ', '-');
        let cellInputType = input.type;
        let cellPlaceHolder = input.name;

        row.innerHTML += '<td>' +
            '<input type="' + cellInputType + '" class="form-control form-control-flush h-100 ' + cellClass + '" placeholder="' + cellPlaceHolder + '" value=""' + 
            'onchange="inputDataChanged.call(this);"> </td>';

        inputListItem[input.name.replace(' ', '-')] = '';
    });

    row.innerHTML += '<td> <span class="text-warning">●</span> <span class="status"> Warning </span> </td>' +
        '<td class="text-center"> <span class="fe fe-trash-2 mr-1 pointer" onclick="deleteRowClick.call(this)"> </span>' +
        '<span class="fe fe-copy pointer" onclick="copyRowClick.call(this)"> </span> </td> </tr>';

    inputListItem['status'] = 'Warning';

    table.querySelector('tbody').append(row);
}

function copyRowClick() {
    copyRow(this.parentElement.parentElement);
}

function copyRow(originalRow) {
    let newRow = {};
    let originalItem = inputList.get('id', originalRow.dataset.id)[0]._values;
    for (var property in originalItem) {
        if (originalItem.hasOwnProperty(property)) {
            newRow[property] = originalItem[property]
        }
    }
    newRow.id = getNextInputListItemId();
    inputList.add(newRow);
    applySorting(inputList);
}

function deleteRowClick() {
    deleteRow(this.parentElement.parentElement);
}

function deleteRow(row) {
    inputList.remove('id', row.dataset.id);
}

function inputDataChanged() {
    let changedValueId = [].slice.apply(this.classList).filter( function (x) {
        return inputList.valueNames.reduce( function (acc, cur) {
            if (cur.data)
                acc = acc || cur.data[0] == x;
            else if (cur.name)
                acc = acc || cur.name == x;
            else
                acc = acc || cur == x;

            return acc;
        }, false);
    });

    let listItem = inputList.get('id', this.parentElement.parentElement.dataset.id)[0];
    listItem._values[changedValueId] = this.value;
}

function getNextInputListItemId() {
    return inputListItemCounter++;
}

function getInputDataArray() {
    let inputDataArray = [];
    let inputs = scriptsArray[selectedScript].inputs.reduce( function (acc, cur) {
        acc.push(cur.name.replace(' ', '-'));
        return acc;
    } ,[]);

    inputList.items.forEach(item => {
        let dataRow = [];
        inputs.forEach(input => {
            dataRow.push(item._values[input]);
        });
        inputDataArray.push(dataRow);
    });

    return inputDataArray;
}

function updateSorting() {
    currentSort.column = this.dataset.sort;
    // happens before the actual sorting so it's backwards
    currentSort.order = this.classList.contains('asc') ? 'desc' : 'asc';
}

function applySorting(list, sort) {
    sort = sort || currentSort;
    currentSort = sort;

    list.sort(sort.column, { order: sort.order });
}

/* #endregion */
/* Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data */

/* Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init */

// Init when the script is loaded
function dataHandlerInit() {
    loadMenusFromFile();
    createInputDataTable();
}

/* Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init */

//dataHandlerInit();