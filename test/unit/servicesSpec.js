'use strict';

describe('CalculatorApp services', function() {
    var exp, button;

    // load modules
    beforeEach(module('calculatorApp'));

    //result service
    describe('result', function(){
        var result;

        beforeEach(function(){
            inject(function($injector) {
                result = $injector.get('result');
            });
        });

        //backSpace method
        exp = ['4',' + ',' - ',' × ',' ÷ ','.'];
        (function(exp){
            exp.forEach(function(s){
                it('should return "123" for backSpace method', function(){
                    expect(result.backSpace('123' + s)).toBe('123');
                });
            });
        })(exp);

        exp = ['10 + 3 = 13','1','-'];
        (function(exp){
            exp.forEach(function(s){
                it('should return "" for backSpace method', function(){
                    expect(result.backSpace(s)).toBe('');
                });
            });
        })(exp);

        exp = [' + ',' - ',' × ',' ÷ '];
        (function(exp){
            exp.forEach(function(s){
               it('shoud return "123' + s + '" for backSpace method', function(){
                   expect(result.backSpace('123' + s + '(')).toBe('123' + s);
               });
               it('shoud return 123' + s + '123" for backSpace method', function(){
                   expect(result.backSpace('(123' + s + '123)')).toBe('(123' + s + '123');
               });
            });
        })(exp);

        //update method
        exp = ['','0'];
        (function(exp){
            exp.forEach(function(e){
                button = ['0','1','2','3','4','5','6','7','8','9','-','('];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "' + a + '" for update method', function(){
                            expect(result.update(e, a)).toBe(a);
                        });
                    });
                })(e, button);
                button = ['+','×','÷'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "0 ' + a + ' " for update method', function(){
                            expect(result.update(e, a)).toBe('0 ' + a + ' ');
                        });
                    });
                })(e, button);
                button = ')';
                (function(e, button){
                    it('shoud return "' + e + '" for update method', function(){
                        expect(result.update(e, button)).toBe(e);
                    });
                })(e, button);
                button = '.';
                (function(e, button){
                    it('shoud return "0." for update method', function(){
                        expect(result.update(e, button)).toBe('0.');
                    });
                })(e, button);
            });
        })(exp);

        exp = ['1','1 + 1'];
        (function(exp){
            exp.forEach(function(e){
                button = ['0','1','2','3','4','5','6','7','8','9','.'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "' + e + a + '" for update method', function(){
                            expect(result.update(e, a)).toBe(e + a);
                        });
                    });
                })(e, button);
                button = ['+','-','×','÷'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "' + e + ' ' + a + ' " for update method', function(){
                            expect(result.update(e, a)).toBe(e + ' ' + a + ' ');
                        });
                    });
                })(e, button);
                button = ['(',')'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "' + e + '" for update method', function(){
                            expect(result.update(e, a)).toBe(e);
                        });
                    });
                })(e, button);
            });
        })(exp);

        exp = ['1.','1.1 + 1.'];
        (function(exp){
            exp.forEach(function(e){
                button = ['0','1','2','3','4','5','6','7','8','9'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "' + e + a + '" for update method', function(){
                            expect(result.update(e, a)).toBe(e + a);
                        });
                    });
                })(e, button);
                button = ['+','-','×','÷'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "' + e.replace(/\.$/, '') + ' ' + a + ' " for update method', function(){
                            expect(result.update(e, a)).toBe(e.replace(/\.$/, '') + ' ' + a + ' ');
                        });
                    });
                })(e, button);
                button = ['(',')','.'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "1" for update method', function(){
                            expect(result.update(e, a)).toBe(e);
                        });
                    });
                })(e, button);
            });
        })(exp);

        exp = ['1.1','1.1 + 1.1'] ;
        (function(exp){
            exp.forEach(function(e){
                button = ['0','1','2','3','4','5','6','7','8','9'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "1' + a + '" for update method', function(){
                            expect(result.update(e, a)).toBe(e + a);
                        });
                    });
                })(e, button);
                button = ['+','-','×','÷'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "1 ' + a + ' " for update method', function(){
                            expect(result.update(e, a)).toBe(e + ' ' + a + ' ');
                        });
                    });
                })(e, button);
                button = ['(',')','.'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "1" for update method', function(){
                            expect(result.update(e, a)).toBe(e);
                        });
                    });
                })(e, button);
            });
        })(exp);

        exp = ['1.1 + ','1.1 - ','1.1 × ','1.1 ÷ '];
        (function(exp){
            exp.forEach(function(e){
                button = ['0','1','2','3','4','5','6','7','8','9','(','-'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "' + e + a + '" for update method', function(){
                            expect(result.update(e, a)).toBe(e + a);
                        });
                    });
                })(e, button);
                button = ['+','×','÷'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "1.1 ' + a + ' " for update method', function(){
                            expect(result.update(e, a)).toBe('1.1 ' + a + ' ');
                        });
                    });
                })(e, button);
                button = ')';
                (function(e, button){
                    it('shoud return "' + e + '" for update method', function(){
                        expect(result.update(e, button)).toBe(e);
                    });
                })(e, button);
                button = '.';
                (function(e, button){
                    it('shoud return "' + e + '0." for update method', function(){
                        expect(result.update(e, button)).toBe(e + '0.');
                    });
                })(e, button);
            });
        })(exp);

        exp = ['1.1 + -','1.1 - -','1.1 × -','1.1 ÷ -'];
        (function(exp){
            exp.forEach(function(e){
                button = ['0','1','2','3','4','5','6','7','8','9','('];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "' + e + a + '" for update method', function(){
                            expect(result.update(e, a)).toBe(e + a);
                        });
                    });
                })(e, button);
                button = ['+','×','÷'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "1.1 ' + a + ' " for update method', function(){
                            expect(result.update(e, a)).toBe('1.1 ' + a + ' ');
                        });
                    });
                })(e, button);
                button = '-';
                (function(e, button){
                    it('shoud return "' + e.replace(/\-$/, '') + button + '" for update method', function(){
                        expect(result.update(e, button)).toBe(e.replace(/\-$/, '') + button);
                    });
                })(e, button);
                button = ')';
                (function(e, button){
                    it('shoud return "' + e + '" for update method', function(){
                        expect(result.update(e, button)).toBe(e);
                    });
                })(e, button);
                button = '.';
                (function(e, button){
                    it('shoud return "' + e + '0." for update method', function(){
                        expect(result.update(e, button)).toBe(e + '0.');
                    });
                })(e, button);
            });
        })(exp);

        // TODO create tests for expressions with brackets

    });

    describe('calculate', function(){

        //TODO create tests for calculate service

    });
});