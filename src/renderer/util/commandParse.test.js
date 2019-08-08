const { commandParse } = require('./commandParse');


test('adds 1 + 2 to equal 3', () => {
  expect(commandParse('yarn watch ${IP}', [{ key: 'IP', value: '19.0' }]))
    .toBe('yarn watch 19.0');
});
