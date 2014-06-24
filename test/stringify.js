
var query = require('querystring');

describe('.stringify(obj)', function(){
  describe('when the object is empty', function(){
    it('should return ""', function(){
      expect(query.stringify({})).to.eql('');
    })
  })

  describe('when a non-object is given', function(){
    it('should return ""', function(){
      expect(query.stringify(null)).to.eql('');
      expect(query.stringify(undefined)).to.eql('');
      expect(query.stringify(0)).to.eql('');
      expect(query.stringify()).to.eql('');
      expect(query.stringify('')).to.eql('');
    })
  })

  describe('when an object is given', function(){
    it('should return a query-string', function(){
      expect(query.stringify({ name: 'tobi', species: 'ferret' }))
        .to.eql('name=tobi&species=ferret');
    })

    it('should uri encode', function(){
      expect(query.stringify({ 'some thing': 'something else' }))
        .to.eql('some%20thing=something%20else')
    })
  })

  describe('when object with arrays is given', function(){
    it('should return a querystring', function(){
      expect(query.stringify({ items: [1, 2, 3], key: 'b' }))
        .to.eql('items%5B0%5D=1&items%5B1%5D=2&items%5B2%5D=3&key=b');
    })
  })

  describe('when a string url without a trailing slash and object with arrays is given', function () {
    it('should return a url with a concatenated querystring', function () {
      expect(query.buildUrl('base/url',{ items: [1, 2, 3], key: 'b' }))
        .to.eql('base/url?items%5B0%5D=1&items%5B1%5D=2&items%5B2%5D=3&key=b');
    })
  })

  describe('when a string url with a trailing slash and object with arrays is given', function () {
    it('should return a url with a concatenated querystring', function () {
      expect(query.buildUrl('base/url/', { items: [1, 2, 3], key: 'b' }))
        .to.eql('base/url?items%5B0%5D=1&items%5B1%5D=2&items%5B2%5D=3&key=b');
    })
  })
})
