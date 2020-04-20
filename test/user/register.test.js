const chai = require('chai');
const axios = require('axios');
const faker = require('faker');
const User = require('../../src/models/User');

const expect = chai.expect;

const url = `http://localhost:3000/auth/register`;

describe('url', () => {
  describe('Đăng ký không thành công', () => {
    it('Không có email và password', async () => {
      const user = {};
      const res = await axios.post(url, user);
      const { data } = res;
      expect(data.statusCode, 'Status code should be 422').to.equal(422);
      expect(data.success, 'Success should be false').to.be.false;
      expect(data.msg, 'Message should be "Register fail"').to.equal('Register fail');
      expect(data.errors, 'Errors should be an array').to.be.an('array');
      expect(data.errors.length, `Length of errors should be ${data.errors.length}`).to.equal(data.errors.length);
    });

    it('Email và password trống', async () => {
      const user = {
        email: '',
        password: ''
      };
      const res = await axios.post(url, user);
      const { data } = res;
      expect(data.statusCode, 'Status code should be 422').to.equal(422);
      expect(data.success, 'Success should be false').to.be.false;
      expect(data.msg, 'Message should be "Register fail"').to.equal('Register fail');
      expect(data.errors, 'Errors should be an array').to.be.an('array');
      expect(data.errors.length, `Length of errors should be ${data.errors.length}`).to.equal(data.errors.length);
    });

    it('Sai định dạng email', async () => {
      const user = {
        email: faker.internet.userName(),
        password: faker.internet.password()
      };
      const res = await axios.post(url, user);
      const { data } = res;
      expect(data.statusCode, 'Status code should be 422').to.equal(422);
      expect(data.success, 'Success should be false').to.be.false;
      expect(data.msg, 'Message should be "Register fail"').to.equal('Register fail');
      expect(data.errors, 'Errors should be an array').to.be.an('array');
      expect(data.errors.length, `Length of errors should be ${data.errors.length}`).to.equal(data.errors.length);
    });

    it('Password có ít hơn 5 ký tự', async () => {
      const user = {
        email: faker.internet.email(),
        password: faker.internet.password(4)
      };
      const res = await axios.post(url, user);
      const { data } = res;
      expect(data.statusCode, 'Status code should be 422').to.equal(422);
      expect(data.success, 'Success should be false').to.be.false;
      expect(data.msg, 'Message should be "Register fail"').to.equal('Register fail');
      expect(data.errors, 'Errors should be an array').to.be.an('array');
      expect(data.errors.length, `Length of errors should be ${data.errors.length}`).to.equal(data.errors.length);
    });

    it('Email đã được đăng ký', async () => {
      const exitstUser = await User.create({
        email: faker.internet.email(),
        password: faker.internet.password()
      });
      const user = {
        email: exitstUser.getDataValue('email'),
        password: faker.internet.password()
      };
      const res = await axios.post(url, user);
      const { data } = res;
      expect(data.statusCode, 'Status code should be 500').to.equal(500);
      expect(data.success, 'Success should be false').to.be.false;
      expect(data.msg, `Message should be "${user.email} already in use"`).to.equal(`${user.email} already in use`);
      expect(data.user).to.be.null;

      await User.destroy({
        where: {
          email: exitstUser.getDataValue('email')
        }
      });
    });
  });
  
  describe('Đăng ký thành công', () => {
    it('Đăng ký thành công', async () => {
      const user = {
        email: faker.internet.email(),
        password: faker.internet.password()
      };
      const res = await axios.post(url, user);
      const { data } = res;
      expect(data.statusCode, 'Status code should be 200').to.equal(200);
      expect(data.success, 'Success should be true').to.be.true;
      expect(data.msg, `Message should be "Register sucess"`).to.equal('Register sucess');
      expect(data.token, 'Token should not be null').is.not.null;
      expect(data.token, 'Token should start with "Bearer "').to.have.string('Bearer ');
      expect(data.user, 'User should be a object').is.a('object');
      expect(data.user, 'User should have property id').have.property('id');
      expect(data.user, 'User should have property type').have.property('type');
      expect(data.user.active, 'User active should be true').to.be.true;
      expect(data.user, 'User should have property email').have.property('email');
      expect(data.user.email, 'Email should not be null').is.not.null;
      expect(data.user, 'User should have property password').have.property('password');
      expect(data.user.password, 'Password should not be null').is.not.null;

      await User.destroy({
        where: {
          email: user.email
        }
      });
    });
  });
});
