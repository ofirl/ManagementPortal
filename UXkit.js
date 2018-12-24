/* General Helping Functions -- General Helping Functions -- General Helping Functions -- General Helping Functions -- General Helping Functions */

/** @class Element */

/**
 * Helper Functions
 * @namespace
 */
var helperFuncs = {
    /**
     * Toggles a class on a DOM element
     * @param {Element} element element to change
     * @param {String} className class to toggle
     */
    toggleElementClass : function (element, className) {
        element.toggleClass();
        if (element.classList.contains(className))
            element.classList.remove(className);
        else
            element.classList.add(className);
    },
    /**
     * Checks an element with a predefined test
     * @param {Element} element element to check
     * @param {string} test test to run
     * @param {*} value value to check against
     * @returns {boolean}
     */
    testElement : function (element, test, value) {
        var testDef = elementTests[test];
        return checkElementProperty(element, testDef["properties"], testFunctions[testDef["function"]], value);
    },
    /**
     * Checks an element property
     * @param {Element} element element to check
     * @param {string[]} properties element properties to follow
     * @param {testFunction} testFunc function to check with
     * @param {*} value value to check against
     * @returns {boolean}
     */
    checkElementProperty : function (element, properties, testFunc, value) {
        var current = element;
        for (let i = 0; i < properties.length; i++) {
            const property = properties[i];
            
            current = current[property];
        }

        return testFunc(current, value);
    },
    /**
     * Checks an element tag
     * @param {Element} element element to check
     * @param {string} tag tag to check against
     * @returns {boolean}
     */
    checkElementTag : function (element, tag) {
        return testElement(element, testNames.elementTagTest, tag);
    },
    /**
     * Checks an element parent class
     * @param {Element} element element to check
     * @param {string} parentClass class to check against
     * @returns {boolean}
     */
    checkElementParentClass : function (element, parentClass) {
        return testElement(element, testNames.parentElementClassTest, parentClass);
    },
    /**
     * Checks an element class
     * @param {Element} element element to check
     * @param {string} elementClass class to check against
     * @returns {boolean}
     */
    checkElementClass : function (element, elementClass) {
        return testElement(element, testNames.elementClassTest, elementClass);
    }
}

/**
 * Toggles a class on a DOM element
 * @param {String} className class to toggle
 * @memberof Element
 */
Element.prototype.toggleClass = function (className) {
    return helperFuncs.toggleElementClass(this, className);
};

/* General Helping Functions -- General Helping Functions -- General Helping Functions -- General Helping Functions -- General Helping Functions */

/* Element Tests -- Element Tests -- Element Tests -- Element Tests -- Element Tests -- Element Tests -- Element Tests -- Element Tests -- Element Tests -- Element Tests */

/**
 * Pre defined test names
 * @namespace
 */
var testNames = {
    /** @constant 
        @type {string} test name for element tag test
        @default
    */
    elementTagTest : "tag",
    /** @constant 
        @type {string} test name for element class test
        @default
    */
    elementClassTest : "class",
    /** @constant 
        @type {string} test name for element parent class test
        @default
    */
    parentElementClassTest : "parentClass"
}

/** 
 * Pre defined tests
 * @namespace
 */
const elementTests = {
    /**
     * @typedef {object} ElementTest
     * @property {string[]} properties - properties array.
     * @property {string} function - condition function.
     * @memberof elementTests
     */
    /** @constant 
     *  @type {ElementTest} test for element tag
     */
    elementTagTest : { 
        "properties" : ["tagName"],
        "function" : "equal"
    },
    /** @constant 
     *  @type {ElementTest} test for element parent class
     */
    parentElementClassTest : {
        "properties" : ["parentElement", "classList"],
        "function" : "contains"
    },
    /** @constant 
     *  @type {ElementTest} test for element class
     */
    elementClassTest : {
        "properties" : ["classList"],
        "function" : "contains"
    }
};

/** 
 * Pre defined test functions 
 * @namespace
 */
const testFunctions = {
    /** 
     *  a test function
     *  @typedef {function} testFunction
     *  @param {*} current value to check
     *  @param {*} valuevalue to check against
     *  @memberof testFunctions
     */
    /**
     * Checks for equality (==)
     * @param {*} current value
     * @param {*} value value to check against
     */
    "equal" : function (current, value) { return current == value; },
    /**
     * Checks for identity (===)
     * @param {*} current value
     * @param {*} value value to check against
     */
    "identity" : function (current, value) { return current === value; },
    /**
     * Checks for contains (for arrays)
     * @param {Array.<*>} list array
     * @param {*} value value to search for in the array
     */
    "contains" : function (list, value) { return list.contains(value); }
}

/* shorthand for predefined tests */
/**
 * Checks an element tag
 * @param {String} tag tag to check against
 * @memberof Element
 */
Element.prototype.checkElementTag = function (tag) {
    return helperFuncs.checkElementTag(this, tag);
}

/**
 * Checks an element parent class
 * @param {String} parentClass class to check against
 * @memberof Element
 */
Element.prototype.checkElementParentClass = function (parentClass) {
    return helperFuncs.checkElementParentClass(this, parentClass);
}

/**
 * Checks an element class
 * @param {String} elementClass class to check against
 * @memberof Element
 */
Element.prototype.checkElementClass = function (elementClass) {
    return helperFuncs.checkElementClass(this, elementClass);
}

/* Element Tests -- Element Tests -- Element Tests -- Element Tests -- Element Tests -- Element Tests -- Element Tests -- Element Tests -- Element Tests -- Element Tests */