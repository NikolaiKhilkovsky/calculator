"use strict";

/**
 * Main App module
 *
 * @type module
 */
var calculatorApp = angular.module('calculatorApp', []);

/**
 * Buttons list for calculator
 *
 * @type Array
 */
calculatorApp.constant('buttons', ['7', '8', '9', '←', 'C', '4', '5', '6', '×', '÷', '1', '2', '3', '+', '-', '0', '.', '(', ')', '=']);

/**
 * Regulars list for calculator
 *
 * @type Object
 */
calculatorApp.constant('reg', {
    regOpenBracket: /\(/g,
    regCloseBracket: /\)/g,
    regOpenBracketIsLast: /\($/,
    regExpInBrackets: /(\([^()]+\))/,
    regIsCalculated: /\s=\s\-?[0-9]+\.?[0-9]*$/,
    regOperatorIsLast: /(\s[+-×÷]\s)$/,
    regMinusIsLast: /\-$/,
    regDotIsLast: /(\.)$/
});

/**
 * Update result string
 * 
 * @type Service
 * @return String
 */
calculatorApp.service('result', ['reg', function (reg) {
    return {
        /**
         * Backspace button handler
         *
         * @param exp String - result string
         * @returns String
         */
        backSpace: function (exp) {
            return reg.regIsCalculated.test(exp) ? '' : exp.replace(/[()-]$|(\s[+-×÷]\s)$|[0-9.]$/, '');
        },
        /**
         * All buttons exept '←' and '=' handler
         *
         * @param exp String - result string
         * @param a String - pressed button
         * @returns String
         */
        update: function (exp, a) {
            var result = '';

            // Clean result string if '=' is present or result string is '0' and Digit or Bracket button pressed
            if ((reg.regIsCalculated.test(exp) || exp == '0') && /[0-9]|\.|\(/.test(a)) {
                exp = '';
            }

            // Handle pressed button
            switch (a) {
                case '+':
                case '-':
                case '×':
                case '÷':
                case '=':
                    if (reg.regIsCalculated.test(exp)) {
                        exp = exp.replace(/^.+=\s/, '');
                    }
                    exp = exp.replace(reg.regMinusIsLast, '');
                    if(a != '-'){
                        exp = exp.replace(reg.regDotIsLast, '');
                        exp = exp == '' ? '0' : exp.replace(reg.regOperatorIsLast, '');
                    }
                    if (a == '-') {
                        if(exp == '0' || exp == '' || /\($/.test(exp)){
                            exp = exp == '0' ? '' : exp;
                            result = a;
                        }
                        else if(reg.regOperatorIsLast.test(exp)){
                            result = a;
                        }
                        else {
                            exp = exp.replace(reg.regDotIsLast, '');
                            result = ' ' + a + ' ';
                        }
                    }
                    else {
                        result = reg.regOpenBracketIsLast.test(exp) ? '' : ' ' + a + ' ';
                    }
                    break;
                case '(':
                    if (reg.regOperatorIsLast.test(exp) || reg.regMinusIsLast.test(exp) || reg.regOpenBracketIsLast.test(exp) || exp == '') {
                        result = a;
                    }
                    break;
                case ')':
                    var open_bracket = reg.regOpenBracket.test(exp) ? exp.match(reg.regOpenBracket).length : 0;
                    var close_bracket = reg.regCloseBracket.test(exp) ? exp.match(reg.regCloseBracket).length : 0;
                    if (open_bracket > close_bracket && /([0-9]+|\)|\.)$/g.test(exp)) {
                        exp = exp.replace(reg.regDotIsLast, '');
                        result = a;
                    }
                    break;
                case '0':
                    if (exp != '0' && !/\)$/.test(exp)) {
                        result = a;
                    }
                    break;
                case '.':
                    if (exp == '' || /\s$/.test(exp) || /\($/.test(exp) || reg.regMinusIsLast.test(exp)) {
                        result = '0' + a;
                    }
                    else if (!/\.[0-9]*$/.test(exp) && !/\)$/.test(exp)) {
                        result = a;
                    }
                    break;
                default:
                    if (!/\)$/.test(exp)) {
                        result = a;
                    }
            }
            return exp + result;
        }
    };
}]);

/**
 * Calculate string expression
 * 
 * @type service
 * @param result - service.result
 * @return Object
 */
calculatorApp.service('calculate', ['reg', 'result', function (reg, result) {
    return {
        /**
         * Check expression
         *
         * @param exp String
         * @returns Boolean (true if all is OK)
         */
        _checkExp: function (exp) {
            var test_open_bracket = reg.regOpenBracket.test(exp),
                test_close_bracket = reg.regCloseBracket.test(exp);
            reg.regOpenBracket.lastIndex = 0;
            reg.regCloseBracket.lastIndex = 0;

            if (exp == '' || reg.regIsCalculated.test(exp) || reg.regOperatorIsLast.test(exp) || reg.regMinusIsLast.test(exp) || reg.regDotIsLast.test(exp)) {
                return false;
            }
            if (test_open_bracket && !test_close_bracket) {
                return false;
            }
            if (test_open_bracket && test_close_bracket && exp.match(reg.regOpenBracket).length != exp.match(reg.regCloseBracket).length) {
                return false;
            }
            if (!test_open_bracket && !/[0-9]\s[+-×÷]\s[0-9]*.?[0-9]+/g.test(exp)) {
                return false;
            }
            if(test_open_bracket && !/\s[+-×÷]\s/g.test(exp)){
                return false;
            }
            return true;
        },

        /**
         * Calculate cimple expression whithout brackets
         *
         * @param exp String - expression for calculating
         * @returns String
         */
        _calcSimpleExp: function (exp) {
            var k, x, y;

            //Parse string to expression array
            exp = exp.replace('(', '').replace(')', '').split(' ');

            //Calculate expression array
            while (exp.length > 1) {
                if (exp.indexOf('∗') != -1 || exp.indexOf('÷') != -1) {
                    for (var i = 0; i < exp.length; i++) {
                        if (exp[i] == '∗' || exp[i] == '÷') {
                            oneOperation(i);
                        }
                    }
                }
                else {
                    oneOperation(1);
                }
            }

            /**
             * Calculate one operation
             *
             * @param i Number - index in expression array
             */
            function oneOperation(i) {
                // Checking if division by zero was
                if(exp[i - 1] == 'Infinity' || exp[i + 1] == 'Infinity'){
                    exp[i - 1] = 'Infinity';
                }
                else {
                    //Calculating with floating error considering
                    x = exp[i - 1].split('.');
                    y = exp[i + 1].split('.');
                    if (x[1] && y[1]) {
                        x[1] = '' + x[1];
                        y[1] = '' + y[1];
                        k = Math.pow(10, x[1].length > y[1].length ? x[1].length : y[1].length);
                    }
                    else if (x[1]) {
                        x[1] = '' + x[1];
                        k = Math.pow(10, x[1].length);
                    }
                    else if (y[1]) {
                        y[1] = '' + y[1];
                        k = Math.pow(10, y[1].length);
                    }
                    else {
                        k = 1;
                    }
                    switch (exp[i]) {
                        case '×':
                            exp[i - 1] = '' + ((parseFloat(exp[i - 1]) * k) * (parseFloat(exp[i + 1]) * k)) / (k * k);
                            break;
                        case '÷':
                            exp[i - 1] = exp[i + 1] == '0' ? 'Infinity' : ('' + ((parseFloat(exp[i - 1]) * k) / (parseFloat(exp[i + 1]) * k)));
                            break;
                        case '+':
                            exp[i - 1] = '' + ((parseFloat(exp[i - 1]) * k) + (parseFloat(exp[i + 1]) * k)) / k;
                            break;
                        case '-':
                            exp[i - 1] = '' + ((parseFloat(exp[i - 1]) * k) - (parseFloat(exp[i + 1]) * k)) / k;
                            break;
                    }
                }
                exp.splice(i, 2);
            }
            return exp[0].toString();
        },

        /**
         * Main calculation function
         *
         * @param exp String - full expression string for calculating
         * @param a String - pressed button
         * @returns Object
         */
        cEval: function (exp, a) {
            var res = '',
                success = false;
            if (this._checkExp(exp)) {
                res = result.update(exp, a);
                while (reg.regExpInBrackets.test(exp)) {
                    exp = exp.replace(reg.regExpInBrackets, this._calcSimpleExp(reg.regExpInBrackets.exec(exp)[0]));
                }
                exp = this._calcSimpleExp(exp);
                res += exp;
                success = true;
            }
            else {
                res = exp;
            }
            return {
                result: res,
                success: success
            };
        }
    };
}]);

/**
 * Main app controller
 * 
 * @param $scope
 * @param buttons - value.buttons
 * @param result - service.result
 * @param calculate - service.calculate
 */
calculatorApp.controller('CalculatorCtrl', ['$scope', 'buttons', 'result', 'calculate', function ($scope, buttons, result, calculate) {
    $scope.buttons = buttons;
    $scope.res = '';
    $scope.historyItems = [];
    $scope.update = function (a) {
        var scope_res_new;
        switch (a) {
            case 'C':
                $scope.res = '';
                break;
            case '←':
                $scope.res = result.backSpace($scope.res);
                break;
            case '=':
                scope_res_new = calculate.cEval($scope.res, a);
                if (scope_res_new.success) {
                    $scope.res = scope_res_new.result;
                    $scope.historyItems.push($scope.res);
                }
                break;
            default:
                $scope.res = result.update($scope.res, a);
        }
    };
}]);
