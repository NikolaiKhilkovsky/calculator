'use strict';

describe('CalculatorApp services', function() {
    var exp, button;

    // load modules
    beforeEach(module('calculatorApp'));

    //result service
    describe('Service "result"', function(){
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

        exp = ['1','1 + 1','1 + (1','1 + (-1'];
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
                        if((e == '1 + (1' || e == '1 + (-1') && a == ')'){
                            it('shoud return "' + e + a + '" for update method', function(){
                                expect(result.update(e, a)).toBe(e + a);
                            });
                        }
                        else {
                            it('shoud return "' + e + '" for update method', function(){
                                expect(result.update(e, a)).toBe(e);
                            });
                        }
                    });
                })(e, button);
            });
        })(exp);

        exp = ['1.','1.1 + 1.','1 + (1.','1 + (1.1'];
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

                button = ['(','.'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "' + e + '" for update method', function(){
                            expect(result.update(e, a)).toBe(e);
                        });
                    });
                })(e, button);

                button = ')';
                (function(e, button){
                    if(e == '1 + (1.' || e == '1 + (1.1'){
                        it('shoud return "' + e.replace(/\.$/, '') + button + '" for update method', function(){
                            expect(result.update(e, button)).toBe(e.replace(/\.$/, '') + button);
                        });
                    }
                    else {
                        it('shoud return "' + e + '" for update method', function(){
                            expect(result.update(e, button)).toBe(e);
                        });
                    }
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

        exp = ['1.1 + ','1.1 - ','1.1 × ','1.1 ÷ ','1.1 + (1.1 + ','1.1 + (1.1 - ','1.1 + (1.1 × ','1.1 + (1.1 ÷ '];
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
                        it('shoud return "' + e.replace(/\s[+×÷-]\s$/, '') + ' ' + a + ' " for update method', function(){
                            expect(result.update(e, a)).toBe(e.replace(/\s[+×÷-]\s$/, '') + ' ' + a + ' ');
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

        exp = ['1.1 + -','1.1 - -','1.1 × -','1.1 ÷ -','1.1 + (1.1 + -','1.1 + (1.1 - -','1.1 + (1.1 × -','1.1 + (1 ÷ -'];
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
                        it('shoud return "' + e.replace(/\s[+×÷-]\s\-$/, '') + ' ' + a + ' " for update method', function(){
                            expect(result.update(e, a)).toBe(e.replace(/\s[+×÷-]\s\-$/, '') + ' ' + a + ' ');
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

        exp = ['(','1 + (','((','1 + (('];
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

                button = '.';
                (function(e, button){
                    it('shoud return "' + e + '0." for update method', function(){
                        expect(result.update(e, button)).toBe(e + '0.');
                    });
                })(e, button);

                button = ['+','×','÷',')'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "' + e + '" for update method', function(){
                            expect(result.update(e, a)).toBe(e);
                        });
                    });
                })(e, button);
            });
        })(exp);

        exp = ['((1)','1 + ((1)'];
        (function(exp){
            exp.forEach(function(e){
                button = ['+','×','÷','-'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "' + e + ' ' + a + ' " for update method', function(){
                            expect(result.update(e, a)).toBe(e + ' ' + a + ' ');
                        });
                    });
                })(e, button);

                button = ')';
                (function(e, button){
                    it('shoud return "' + e + button + '" for update method', function(){
                        expect(result.update(e, button)).toBe(e + button);
                    });
                })(e, button);

                button = ['0','1','2','3','4','5','6','7','8','9','(','.'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "' + e +'" for update method', function(){
                            expect(result.update(e, a)).toBe(e);
                        });
                    });
                })(e, button);
            });
        })(exp);

        exp = ['(1)','(1 + 1)'];
        (function(exp){
            exp.forEach(function(e){
                button = ['+','×','÷','-'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "' + e + ' ' + a + ' " for update method', function(){
                            expect(result.update(e, a)).toBe(e + ' ' + a + ' ');
                        });
                    });
                })(e, button);

                button = ['0','1','2','3','4','5','6','7','8','9','(','.',')'];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "' + e +'" for update method', function(){
                            expect(result.update(e, a)).toBe(e);
                        });
                    });
                })(e, button);
            });
        })(exp);

        exp = ['1 + 2 = 3','1 - 2 = -1','1 + (1.5 + 2) = 4.5','(1.5 + 2) - 5 = -2.5'];
        (function(exp){
            exp.forEach(function(e, i){
                button = ['0','1','2','3','4','5','6','7','8','9','('];
                (function(e, button){
                    button.forEach(function(a){
                        it('shoud return "' + a + '" for update method', function(){
                            expect(result.update(e, a)).toBe(a);
                        });
                    });
                })(e, button);

                button = '.';
                (function(e, button){
                    it('shoud return "0' + button + '" for update method', function(){
                        expect(result.update(e, button)).toBe('0' + button);
                    });
                })(e, button);

                button = ['+','×','÷','-'];
                (function(e, button){
                    button.forEach(function(a){
                        switch(i){
                            case 0:
                                it('shoud return "3' + ' ' + a + ' " for update method', function(){
                                    expect(result.update(e, a)).toBe('3' + ' ' + a + ' ');
                                });
                                break;
                            case 1:
                                it('shoud return "-1' + ' ' + a + ' " for update method', function(){
                                    expect(result.update(e, a)).toBe('-1' + ' ' + a + ' ');
                                });
                                break;
                            case 2:
                                it('shoud return "4.5' + ' ' + a + ' " for update method', function(){
                                    expect(result.update(e, a)).toBe('4.5' + ' ' + a + ' ');
                                });
                                break;
                            case 3:
                                it('shoud return "-2.5' + ' ' + a + ' " for update method', function(){
                                    expect(result.update(e, a)).toBe('-2.5' + ' ' + a + ' ');
                                });
                                break;
                        }
                    });
                })(e, button);

                button = ')';
                (function(e, button){
                    it('shoud return "' + e + '" for update method', function(){
                        expect(result.update(e, button)).toBe(e);
                    });
                })(e, button);
            });
        })(exp);

        exp = ['1 + 2','1 - 2','1 + (1.5 + 2)','(1.5 + 2) - 5','1 + (-3)'];
        (function(exp){
            exp.forEach(function(e){
                button = '=';
                it('shoud return "' + e + ' ' + button + ' " for update method', function(){
                    expect(result.update(e, button)).toBe(e + ' ' + button + ' ');
                });
            });
        })(exp);
    });

    describe('Service "calculate"', function(){
        var calculate,
            exp_good = ['1 + 2','1 - 2','1 + (1.5 + 2)','(1.5 + 2) - 5','1 + (-3)','1 + (1 + 1) - (1 + 1)'],
            exp_bad = ['','1','1 + ','1 + (1.5 + 2','(1.5 + 2) -','1 + (-3','1 + (1 + 1) - (1 + 1'],
            simple_exp = [{
                exp: '1 + 1',
                res: '2'
            },
            {
                exp: '-10 + 20',
                res: '10'
            },
            {
                exp: '10 + -20',
                res: '-10'
            },
            {
                exp: '-10 + 5',
                res: '-5'
            },
            {
                exp: '1 - 1',
                res: '0'
            },
            {
                exp: '2 × 3',
                res: '6'
            },
            {
                exp: '6 ÷ 3',
                res: '2'
            }];

        beforeEach(function(){
            inject(function($injector) {
                calculate = $injector.get('calculate');
            });
        });

        //_checkExp method
        exp_bad.forEach(function(e){
            it('shoud return "false" for _checkExp method', function(){
                expect(calculate._checkExp(e)).toBeFalsy();
            });
        });

        exp_good.forEach(function(e){
            it('shoud return "true" for _checkExp method', function(){
                expect(calculate._checkExp(e)).toBeTruthy();
            });
        });

        //_calcSimpleExp method
        simple_exp.forEach(function(e){
            it('shoud return "' + e.res + '" for _calcSimpleExp method', function(){
                expect(calculate._calcSimpleExp(e.exp)).toBe(e.res);
            });
        });

        //TODO update tests for calculate service

    });
});