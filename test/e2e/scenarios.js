'use strict';

describe('calculatorApp', function () {
    describe('Buttons list', function () {
        beforeEach(function () {
            browser.get('/');
        });

        it('should show calculator buttons and check buttons pressing', function () {
            var calculatorButtons = element.all(by.repeater('button in buttons'));
            var resultInput = element(by.model('res'));

            expect(calculatorButtons.count()).toBe(20);

            calculatorButtons.get(0).click();
            expect(resultInput.getAttribute('value')).toBe('7');

            calculatorButtons.get(1).click();
            expect(resultInput.getAttribute('value')).toBe('78');

            calculatorButtons.get(2).click();
            expect(resultInput.getAttribute('value')).toBe('789');

            calculatorButtons.get(3).click();
            expect(resultInput.getAttribute('value')).toBe('78');

            calculatorButtons.get(4).click();
            expect(resultInput.getAttribute('value')).toBe('');

            calculatorButtons.get(5).click();
            expect(resultInput.getAttribute('value')).toBe('4');

            calculatorButtons.get(6).click();
            expect(resultInput.getAttribute('value')).toBe('45');

            calculatorButtons.get(7).click();
            expect(resultInput.getAttribute('value')).toBe('456');

            calculatorButtons.get(8).click();
            expect(resultInput.getAttribute('value')).toBe('456 × ');

            calculatorButtons.get(9).click();
            expect(resultInput.getAttribute('value')).toBe('456 ÷ ');

            calculatorButtons.get(10).click();
            expect(resultInput.getAttribute('value')).toBe('456 ÷ 1');

            calculatorButtons.get(11).click();
            expect(resultInput.getAttribute('value')).toBe('456 ÷ 12');

            calculatorButtons.get(12).click();
            expect(resultInput.getAttribute('value')).toBe('456 ÷ 123');

            calculatorButtons.get(13).click();
            expect(resultInput.getAttribute('value')).toBe('456 ÷ 123 + ');

            calculatorButtons.get(14).click();
            expect(resultInput.getAttribute('value')).toBe('456 ÷ 123 + -');

            calculatorButtons.get(15).click();
            expect(resultInput.getAttribute('value')).toBe('456 ÷ 123 + -0');

            calculatorButtons.get(16).click();
            expect(resultInput.getAttribute('value')).toBe('456 ÷ 123 + -0.');

            calculatorButtons.get(10).click();
            expect(resultInput.getAttribute('value')).toBe('456 ÷ 123 + -0.1');

            calculatorButtons.get(13).click();
            expect(resultInput.getAttribute('value')).toBe('456 ÷ 123 + -0.1 + ');

            calculatorButtons.get(17).click();
            expect(resultInput.getAttribute('value')).toBe('456 ÷ 123 + -0.1 + (');

            calculatorButtons.get(10).click();
            expect(resultInput.getAttribute('value')).toBe('456 ÷ 123 + -0.1 + (1');

            calculatorButtons.get(18).click();
            expect(resultInput.getAttribute('value')).toBe('456 ÷ 123 + -0.1 + (1)');

            calculatorButtons.get(4).click();
            expect(resultInput.getAttribute('value')).toBe('');

            calculatorButtons.get(10).click();
            expect(resultInput.getAttribute('value')).toBe('1');

            calculatorButtons.get(13).click();
            expect(resultInput.getAttribute('value')).toBe('1 + ');

            calculatorButtons.get(10).click();
            expect(resultInput.getAttribute('value')).toBe('1 + 1');

            calculatorButtons.get(19).click();
            expect(resultInput.getAttribute('value')).toBe('1 + 1 = 2');
        });

        it('shoud show result in history', function () {
            var calculatorButtons = element.all(by.repeater('button in buttons'));
            var history = element.all(by.repeater('item in historyItems'));

            expect(history.count()).toBe(0);

            calculatorButtons.get(13).click();
            calculatorButtons.get(10).click();
            calculatorButtons.get(19).click();
            expect(history.count()).toBe(1);

            calculatorButtons.get(13).click();
            calculatorButtons.get(10).click();
            calculatorButtons.get(19).click();
            expect(history.count()).toBe(2);
        });
    });
});
