var script = require('../../helpers/serverScript');

expect = require('chai').expect;

describe('Calculate Accuracy', function() {

  it('Should Calculate WPM from time and words typed', function() {

      // example typedRound - modify as needed.  1 word per 2 minutes or 0.5 WPM? 
      var typedRound = { typedText : 'Hedgehog', numErrors : 100, time : 120 };
      var updatedTypedRound = script.calcAccuracy(typedRound, 'Hedgehog');
      expect(updatedTypedRound.wpm).is.equal(0.5);

  });

// and add more tests

});



describe('Create message', function() {

  it('Should identify the correct message for a score', function() {
    expect(script.getMessage(72)).is.equal('Not bad; not good, but not bad.');

    // test various other scores, maybe include 0, a number bigger than 100, negative number

  });

})
