'use strict';

/* jasmine specs for controllers go here */
describe('CalculatorApp controllers', function () {
    describe('Controller "CalculatorCtrl"', function(){
        var scope, ctrl;

        beforeEach(module('calculatorApp'));

        beforeEach(inject(function($rootScope, $controller){
            scope = $rootScope.$new();
            ctrl = $controller('CalculatorCtrl', {$scope: scope});
        }));

        it('should create "buttons" model with 20 buttons', function() {
            expect(scope.buttons.length).toBe(20);
        });
    });
});
