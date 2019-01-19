List.prototype.getNextInputListItemId = function () {
    if (this.nextItemId == undefined || this.nextItemId == null)
        this.nextItemId = 1;
    
    return this.nextItemId++;
}

List.prototype.addItem = function (originalItemValues) {
    let newItem = {};
    for (var property in originalItemValues) {
        if (originalItemValues.hasOwnProperty(property)) {
            newItem[property] = originalItemValues[property]
        }
    }
    newItem.id = this.getNextInputListItemId();
    return this.add(newItem)[0];
};

List.prototype.copyItem = function (column, value) {
    let originalItem = this.get(column, value);
    if (originalItem.length > 0)
        return this.addItem(originalItem[0]._values);

    return null;
};

// List.prototype.sort += function (valueName, options) {
//     console.log('test');
//     this.currentSort = { valueName: valueName, options: options };
// };

List.prototype.applyCurrentSort = function () {
    if (this.currentSort == undefined || this.currentSort == null)
        return;

    this.sort(this.currentSort.valueName, this.currentSort.options);
};