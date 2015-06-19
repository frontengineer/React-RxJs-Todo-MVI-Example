jest.dontMock('../src/shared/About');


describe('first', function(){
  it('runs first test', function(){
    var about = require('../src/shared/About');
    expect(1).toBe(1);
  })
});
