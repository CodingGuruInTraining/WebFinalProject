
//var assert = chai.assert;
// describe contains a collection of tests
describe('String comparison', function() {

  // it() is a test
  it('should return 0 for the number of differences between two identical strings', function(){

    expect( strDiffs('a', 'a') ).to.be.equal(0);
    expect( strDiffs('bb', 'bb') ).to.be.equal(0);
    expect( strDiffs('hedgehog', 'hedgehog') ).to.be.equal(0);
    expect( strDiffs('Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.') ).to.be.equal(0);

    // etc. include strings that were not comparing correctly
  });


  it('should return the number of difference between two dissimilar strings', function() {

    expect( strDiffs('ab', 'aa') ).to.be.equal(1);
    expect( strDiffs('ab', '12') ).to.be.equal(2);  // it's working great!
    expect( strDiffs('abc', '123') ).to.be.equal(3);  // oh.
    expect( strDiffs('hedgehog', 'Java is to JavaScript as Ham is to Hamster')).to.be.equal(8); // Is 8 right? or 42?

    // etc.. include various examples of strings and their expected differences

  });


});
