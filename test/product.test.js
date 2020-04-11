const chai = require('chai');
const axios = require('axios');
const faker = require('faker');
const dotenv = require('dotenv');
dotenv.config()

const expect = chai.expect;

console.log(process.env)

const url = `http://localhost:3000/p/products`;

describe(url, function() {
  describe('GET all products success', function() {
    it('Return all products', async function() {
      const res = await axios.get(url);
      const { data } = res;
      expect(res.status, 'Status code should be 200').to.equal(200)
    })
  });
  
});