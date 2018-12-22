/* Pre defined test names */
const elementTagTest = "tag";
const elementClassTest = "class";
const parentElementClassTest = "parentClass";

/* Pre defined tests */
const elementTests = {
    "tag" : { 
        "properties" : ["tagName"],
        "function" : "equal"
    },
    "parentClass" : {
        "properties" : ["parentElement", "classList"],
        "function" : "contains"
    },
    "class" : {
        "properties" : ["classList"],
        "function" : "contains"
    }
};

/* Pre defined test functions */
const testFunctions = {
    "equal" : function (current, value) { return current == value; },
    "=" : function (current, value) { return current == value; },
    "contains" : function (list, value) { return list.contains(value); }
}

/* helper function */
function testElement(element, test, value) {
    var testDef = elementTests[test];
    return checkElementProperty(element, testDef["properties"], testFunctions[testDef["function"]], value);
}

/* property check */
function checkElementProperty(element, properties, testFunc, value) {
    var current = element;
    for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        
        current = current[property];
    }

    return testFunc(current, value);
}

/* shorthand for predefined tests */
function checkElementTag(element, tag) {
    return testElement(element, elementTagTest, tag);
}

Element.prototype.checkElementTag = function (tag) {
    return testElement(this, elementTagTest, tag);
}

function checkElementParentClass(element, parentClass) {
    return testElement(element, parentElementClassTest, parentClass);
}

Element.prototype.checkElementParentClass = function (parentClass) {
    return testElement(this, parentElementClassTest, parentClass);
}

function checkElementClass(element, elementClass) {
    return testElement(element, elementClassTest, elementClass);
}

Element.prototype.checkElementClass = function (elementClass) {
    return testElement(this, elementClassTest, elementClass);
}