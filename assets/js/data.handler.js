/* #region Constants */
// Consts
const sidebarContainer = 'sidebarCollapse';
const inputDataTableContainer = 'inputDataTableContainer';
const inputDataList = 'inputDataList';

/* #endregion */

// Input Data
var selectedScriptIndex = 0;
var currentScript = {};
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
var currentFilter = [
    // {
    //     column: '',
    //     value: ''
    // }
];
var currentSearch = '';

// Execution Result
var isExecuting = false;
// testing - will be loaded with the result script
var executionResult = {
    // timestamp: '123',
    // results: [
    //     {
    //         id: 1,
    //         success: true,
    //         desc: ''
    //     },
    //     {
    //         id: 2,
    //         success: false,
    //         desc: 'error description'
    //     }
    // ]
};

// Profile data
var currentProfile = userProfiles[0];

/* Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions -- Helper Functions */
/* #region Helper Functions */

Element.prototype.addClass = function (className) {
    this.classList.add(className);
    return this;
}

Element.prototype.removeClass = function (className) {
    this.classList.remove(className);
    return this;
}

Element.prototype.insertAsFirstChild = function (childElement) {
    this.insertBefore(childElement, this.firstChild);
}

//Returns true if it is a DOM node
function isNode(o) {
    return (
        typeof Node === "object" ? o instanceof Node :
            o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
    );
}

//Returns true if it is a DOM element    
function isElement(o) {
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
    );
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
    scriptsArray[selectedScriptIndex].inputs.forEach(input => {
        inputFields.push(input.name.replace(' ', '-'));
    });
    inputFields.push('status');
    tableContainer.setAttribute('data-lists-values', '[' + inputFields.join(',') + ']');

    // table header cells
    let totalWidth = 2;
    let headerRow = tableContainer.querySelector('thead tr');
    scriptsArray[selectedScriptIndex].inputs.forEach(input => {
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
            'status': 'Error',
            'id': getNextInputListItemId()
        });
        $(table.querySelectorAll('[data-toggle="tooltip"]')).tooltip();
        updateStatus(table.querySelector('tbody').lastElementChild);
        return;
    }

    let inputListItem = {};
    let row = document.createElement('tr');
    let rowId = getNextInputListItemId();
    row.setAttribute('data-id', rowId);
    row.setAttribute('id', rowId);
    scriptsArray[selectedScriptIndex].inputs.forEach(input => {
        let cellClass = input.name.replace(' ', '-');
        let cellInputType = input.type;
        let cellPlaceHolder = input.name;

        row.innerHTML += '<td>' +
            '<input type="' + cellInputType + '" class="form-control form-control-flush h-100 bw-flush-1 ' + cellClass + '" placeholder="' + cellPlaceHolder + '" value=""' +
            'oninput="inputDataChanged.call(this);"> </td>';

        inputListItem[input.name.replace(' ', '-')] = '';
    });

    row.innerHTML += '<td> <span data-role="icon" class="text-warning">●</span> <span class="status"' +
        'data-toggle="tooltip" data-html="true" title=""> Pending </span> </td>' +
        '<td class="text-center"> <span class="fe fe-trash-2 mr-1 pointer" onclick="deleteRowClick.call(this)"' +
        'data-toggle="tooltip" data-placement="top" data-html="true" title="Delete row"> </span>' +
        '<span class="fe fe-copy pointer" onclick="copyRowClick.call(this)" data-toggle="tooltip"' +
        'data-placement="top" data-html="true" title="Copy row"> </span> </td> </tr>';

    inputListItem['status'] = 'Warning';

    table.querySelector('tbody').append(row);
    updateStatus(row);
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
    updateStatus(originalRow.parentElement.lastElementChild);
    $(originalRow.parentElement.lastElementChild.querySelectorAll('[data-toggle="tooltip"]')).tooltip();

    applySorting(inputList);
}

function deleteRowClick() {
    deleteRow(this.parentElement.parentElement);
}

function deleteRow(row) {
    inputList.remove('id', row.dataset.id);
}

function inputDataChanged() {
    let changedValueId = [].slice.apply(this.classList).filter(function (x) {
        return inputList.valueNames.reduce(function (acc, cur) {
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

    updateStatus(this.parentElement.parentElement);
}

function getNextInputListItemId() {
    return inputListItemCounter++;
}

function getInputDataArray() {
    let inputDataArray = [];
    let inputs = scriptsArray[selectedScriptIndex].inputs.reduce(function (acc, cur) {
        acc.push(cur.name.replace(' ', '-'));
        return acc;
    }, []);

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

function updateStatus(row) {
    let tooltipTitle = [];
    let statusCell = row.lastElementChild.previousElementSibling;
    let statusText = statusCell.querySelector('.status');
    let statusIcon = statusCell.querySelector('[data-role="icon"]');
    let error = false;

    statusText.innerHTML = 'Pending';
    statusIcon.className = 'text-warning';

    currentScript.inputs.forEach(input => {
        if (!input.optional) {
            let inputEle = row.querySelector('.' + input.name.replace(' ', '-'));
            inputEle.removeClass('is-invalid');

            let val = inputEle.value;
            if (val != undefined && val != null && val != '') {
                return;
            }

            inputEle.addClass('is-invalid');

            statusText.innerHTML = 'Error';
            statusIcon.className = 'text-danger';
            tooltipTitle.push('<b>' + input.name + '</b> must not be empty');
        }
    });

    statusText.setAttribute('title', tooltipTitle.join('<br>'));
    $(statusText).tooltip('dispose');
    if (tooltipTitle.length > 0)
        $(statusText).tooltip();

    if (inputList) {
        let listItem = inputList.get('id', row.dataset.id)[0];
        listItem._values['status'] = statusText.innerHTML;
    }
}

function changeTitles() {
    document.querySelector('#script-title').innerHTML = currentScript.name;
    document.querySelector('#script-desc').innerHTML = currentScript.description;
}

function clearInputData() {
    inputList.clear();
}

function removeSuccessFromInputList() {
    inputList.remove('status', 'Success');
}

function refreshInputTableFilter() {
    filterInputTable(true);
}

function filterInputTable(refreshFilter) {
    refreshFilter = refreshFilter || false;

    if (!refreshFilter) {
        let filterColumn = this.dataset['filtercolumn'];
        let filterValue = this.dataset['filtervalue'];

        if (filterValue != '' || filterColumn != '') {
            let filterObject = {
                column : filterColumn,
                value: filterValue
            };
            let foundItemIndex = currentFilter.findIndex( (v, i) => v.column == filterColumn && v.value == filterValue );
            if (foundItemIndex != -1) {
                currentFilter.splice(foundItemIndex, 1);
            }
            else {
                currentFilter.push(filterObject);
            }
        }
        else {
            currentFilter = [];
        }
    }

    if (currentFilter.length == 0) {
        inputList.filter();
        return;
    }

    inputList.filter(function(item) {
        let itemResult = false;
        return currentFilter.reduce( function (acc, curr, idx, src) {
            console.log(curr);
            console.log(item._values);
            console.log(item._values[curr.column].localeCompare(curr.value));
            return acc || item._values[curr.column].localeCompare(curr.value) == 0;
        }, false);
    });
}

function clearInputTableFilter() {
    document.querySelectorAll('#filterStatusOptions label').forEach( (e) => e.removeClass('active') );
    currentFilter = [];
    filterInputTable(true);
}

function searchInputList() {
    currentSearch = this.value;
    inputList.fuzzySearch(currentSearch);
}

function clearInputTableSearch() {
    let inputSearch = this.parentElement.querySelector('input').value = '';
    searchInputList.call(inputSearch);
}

function logonDataChanged() {
    console.log(this.selectedIndex);
    if (this.selectedIndex != -1) {
        console.log(this.selectedIndex);
        let selectedIndex = this.selectedIndex;
        console.log(currentProfile.defaults.logon[selectedIndex]);
        document.querySelector('#logonDataSystem').value = currentProfile.defaults.logon[selectedIndex].system;
        document.querySelector('#logonDataUsername').value = currentProfile.defaults.logon[selectedIndex].username;
    }
}

/* #endregion */
/* Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data -- Input Data */

/* Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute */
/* #region Execute */

function executeScript(forceRun) {
    forceRun = forceRun || false;

    let error = false;
    inputList.items.forEach(item => {
        error = error || item._values['status'] == "Error";
    });

    if (!forceRun && error) {
        // do alert
        $('#inputDataErrorModal').modal('show');
        return;
    }

    alert('run script here');
    
    // $('#ScriptExecutionAlert').alert();

    clearInputTableFilter();

    let statusCells = document.querySelector('#' + inputDataTableContainer).querySelectorAll('.status');
    statusCells.forEach( (e) => e.previousElementSibling.addClass('is-loading').addClass('pr-4') );
    statusCells.forEach( (e) => e.innerText = 'Executing' );

    inputList.items.forEach( (item) => item._values['status'] = 'Executing' );

    document.querySelector('#filterOptionsToggle').children[0].setAttribute('disabled', '');
    $('#filterStatusOptions').collapse('hide');

    // let statusCells = [].slice.call(document.querySelector('#' + inputDataTableContainer).querySelectorAll('.status')).map((e) => e.previousElementSibling);
    // statusCells.forEach((e) => e.addClass('is-loading'));

    isExecuting = true;
    waitForExecutionResult();
}

function saveForLater() {

}

function waitForExecutionResult() {
    if (!isExecuting)
        return;

    let previousScriptElement = document.querySelector('#executionResult');
    if (previousScriptElement)
        document.body.removeChild(previousScriptElement);

    let resultScript = document.createElement('script');
    resultScript.setAttribute('id', 'executionResult');
    resultScript.setAttribute('src', 'results/session_id-result.js');
    resultScript.setAttribute('onload', 'executionResultLoaded();');

    document.body.append(resultScript);

    setTimeout(waitForExecutionResult, 3000);
}

function executionResultLoaded() {
    // testing - will be loaded via script
    executionResult = {
        timestamp: '123',
        results: [
            {
                id: 1,
                success: true,
                desc: ''
            },
            {
                id: 2,
                success: false,
                desc: 'error description'
            }
        ]
    };

    isExecuting = false;

    document.querySelectorAll('#' + inputDataTableContainer + ' .is-loading').forEach( (e) => e.removeClass('is-loading').removeClass('pr-4') );
    document.querySelector('#filterOptionsToggle').children[0].removeAttribute('disabled', '');

    executionResult.results.forEach(item => {
        let inputListItem = inputList.get('id', item.id)[0];
        inputListItem._values['status'] = item.success ? 'Success' : 'Error';

        let itemRow = document.querySelector('#' + inputDataTableContainer + ' [data-id="' + item.id + '"]');

        let statusText = itemRow.querySelector('.status');
        statusText.innerText = item.success ? 'Success' : 'Error';

        let statusIcon = statusText.previousElementSibling;
        statusIcon.className = item.success ? 'text-success' : 'text-danger';
    });
}

/* #endregion */
/* Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute -- Execute */

/* Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init */

function updateSelectedScript() {
    currentScript = scriptsArray[selectedScriptIndex];
}

function updateTooltips() {
    $('[data-toggle="tooltip"]').tooltip();
}

function updatePredefinedConnections() {
    let selectElement = document.querySelector('#predefinedConnectionsSelect');

    currentProfile.defaults.logon.forEach( function (e, idx) {
        let option = document.createElement('option');
        option.innerHTML = e.description;
        option.setAttribute('value', idx);
        if (e.default)
            option.setAttribute('selected', 'selected');
        selectElement.append(option);
    } );

    if (selectElement.selectedIndex != '' && selectElement.selectedIndex != -1) {
        let selectedIndex = selectElement.selectedIndex;
        document.querySelector('#logonDataSystem').value = currentProfile.defaults.logon[selectedIndex].system;
        document.querySelector('#logonDataUsername').value = currentProfile.defaults.logon[selectedIndex].username;
    }
}

// Init when the script is loaded
function dataHandlerInit() {
    updateSelectedScript();
    changeTitles();
    loadMenusFromFile();
    createInputDataTable();
    updateTooltips();
    updatePredefinedConnections();
}

/* Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init -- Init */

//dataHandlerInit();