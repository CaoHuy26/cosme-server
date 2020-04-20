const chai = require('chai');
const axios = require('axios');
const faker = require('faker');
const dotenv = require('dotenv');
dotenv.config()

const expect = chai.expect;

const url = `http://localhost:3000/p/products`;

describe(url, function() {
  describe('GET all products success', () => {
    it('Return all products', async () => {
      const res = await axios.get(url);
      const { data } = res;
      expect(res.status, 'Status code should be 200').to.equal(200)
    })
  });
  
});