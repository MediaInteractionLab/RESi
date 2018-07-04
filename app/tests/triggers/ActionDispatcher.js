const assert = require('assert');
const ActionDispatcher = require('../../actionDispatcher');

describe('ActionDispatcher', function() {

    const actionDispatcher = new ActionDispatcher();

    describe('#addTrigger()', function() {
        it('test adding multiple triggers', function() {
            assert.equal(actionDispatcher.triggers.length, 0);
            
            actionDispatcher.addTrigger({
                request: {
                    method: 'POST',
                    url: 'http://www.test1.at/testing1',
                    data: {
                        testParam: 'param1'
                    }
                },
                labels: [],
                _id: '5ab261808cf49dj5658a330b',
                name: 'Hue Trigger',
                __v: 0
            });

            assert.equal(actionDispatcher.triggers.length, 1);
            
            actionDispatcher.addTrigger({
                request: {
                    method: 'GET',
                    url: 'http://www.test2.at/testing2',
                    data: {
                        testParam: 'param2',
                        paramTest: 'param3'
                    }
                },
                labels: ['testLabel', 'noLabel'],
                _id: '5ab261808cf64203hs8a330b',
                name: 'Hue Trigger 2',
                __v: 0
            });

            assert.equal(actionDispatcher.triggers.length, 2);
            
            actionDispatcher.addTrigger({
                request: {
                    method: 'PUT',
                    url: 'http://www.test3.at/testing3',
                    data: {
                        testParameter: 'param4'
                    }
                },
                labels: ['label1'],
                _id: '5ab2618ak48d4618658a330b',
                name: 'Hue Trigger 3',
                __v: 0
            });

            assert.equal(actionDispatcher.triggers.length, 3);

            let trigger = actionDispatcher.triggers[0];
            assert.equal(trigger.request.method, 'POST');
            assert.equal(trigger.request.url, 'http://www.test1.at/testing1');
            assert.equal(trigger.request.data.testParam, 'param1');
            assert.equal(trigger.labels.length, 0);
            assert.equal(trigger._id, '5ab261808cf49dj5658a330b');
            assert.equal(trigger.name, 'Hue Trigger');
            assert.equal(trigger.__v, 0);

            trigger = actionDispatcher.triggers[1];
            assert.equal(trigger.request.method, 'GET');
            assert.equal(trigger.request.url, 'http://www.test2.at/testing2');
            assert.equal(trigger.request.data.testParam, 'param2');
            assert.equal(trigger.request.data.paramTest, 'param3');
            assert.equal(trigger.labels.length, 2);
            assert.equal(trigger.labels[0], 'testLabel');
            assert.equal(trigger.labels[1], 'noLabel');
            assert.equal(trigger._id, '5ab261808cf64203hs8a330b');
            assert.equal(trigger.name, 'Hue Trigger 2');
            assert.equal(trigger.__v, 0);
            
            trigger = actionDispatcher.triggers[2];
            assert.equal(trigger.request.method, 'PUT');
            assert.equal(trigger.request.url, 'http://www.test3.at/testing3');
            assert.equal(trigger.request.data.testParameter, 'param4');
            assert.equal(trigger.labels.length, 1);
            assert.equal(trigger.labels[0], 'label1');
            assert.equal(trigger._id, '5ab2618ak48d4618658a330b');
            assert.equal(trigger.name, 'Hue Trigger 3');
            assert.equal(trigger.__v, 0);
        });
    });

    describe('#updateTrigger()', function() {
        it('test adding multiple triggers', function() {
            actionDispatcher.updateTrigger({
                request: {
                    method: 'DELETE',
                    url: 'http://www.test2.at/testing2',
                    data: {
                        testParam: 'param2',
                        paramTest: 'param3',
                        anotherParam: 'nothingToHide'
                    }
                },
                labels: ['testLabel', 'noLabel', 'oneMoreLabel'],
                _id: '5ab261808cf64203hs8a330b',
                name: 'Hue Trigger ULTIMATE',
                __v: 1
            });

            assert.equal(actionDispatcher.triggers.length, 3);

            let trigger = actionDispatcher.triggers[0];
            assert.equal(trigger.request.method, 'POST');
            assert.equal(trigger.request.url, 'http://www.test1.at/testing1');
            assert.equal(trigger.request.data.testParam, 'param1');
            assert.equal(trigger.labels.length, 0);
            assert.equal(trigger._id, '5ab261808cf49dj5658a330b');
            assert.equal(trigger.name, 'Hue Trigger');
            assert.equal(trigger.__v, 0);

            trigger = actionDispatcher.triggers[1];
            assert.equal(trigger.request.method, 'DELETE');
            assert.equal(trigger.request.url, 'http://www.test2.at/testing2');
            assert.equal(trigger.request.data.testParam, 'param2');
            assert.equal(trigger.request.data.paramTest, 'param3');
            assert.equal(trigger.request.data.anotherParam, 'nothingToHide');
            assert.equal(trigger.labels.length, 3);
            assert.equal(trigger.labels[0], 'testLabel');
            assert.equal(trigger.labels[1], 'noLabel');
            assert.equal(trigger.labels[2], 'oneMoreLabel');
            assert.equal(trigger._id, '5ab261808cf64203hs8a330b');
            assert.equal(trigger.name, 'Hue Trigger ULTIMATE');
            assert.equal(trigger.__v, 1);
            
            trigger = actionDispatcher.triggers[2];
            assert.equal(trigger.request.method, 'PUT');
            assert.equal(trigger.request.url, 'http://www.test3.at/testing3');
            assert.equal(trigger.request.data.testParameter, 'param4');
            assert.equal(trigger.labels.length, 1);
            assert.equal(trigger.labels[0], 'label1');
            assert.equal(trigger._id, '5ab2618ak48d4618658a330b');
            assert.equal(trigger.name, 'Hue Trigger 3');
            assert.equal(trigger.__v, 0);
        });
    });

    describe('#removeTrigger()', function() {
        it('test removing a trigger', function() {

            actionDispatcher.removeTrigger('5ab261808cf64203hs8a330b');

            assert.equal(actionDispatcher.triggers.length, 2);

            let trigger = actionDispatcher.triggers[0];
            assert.equal(trigger.request.method, 'POST');
            assert.equal(trigger.request.url, 'http://www.test1.at/testing1');
            assert.equal(trigger.request.data.testParam, 'param1');
            assert.equal(trigger.labels.length, 0);
            assert.equal(trigger._id, '5ab261808cf49dj5658a330b');
            assert.equal(trigger.name, 'Hue Trigger');
            assert.equal(trigger.__v, 0);

            trigger = actionDispatcher.triggers[1];
            assert.equal(trigger.request.method, 'PUT');
            assert.equal(trigger.request.url, 'http://www.test3.at/testing3');
            assert.equal(trigger.request.data.testParameter, 'param4');
            assert.equal(trigger.labels.length, 1);
            assert.equal(trigger.labels[0], 'label1');
            assert.equal(trigger._id, '5ab2618ak48d4618658a330b');
            assert.equal(trigger.name, 'Hue Trigger 3');
            assert.equal(trigger.__v, 0);
        });
    });

    describe('#trigger()', function() {
        // it('test basic filtering with filter chain', function() {
        // });
    });
});