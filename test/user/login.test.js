const chai = require('chai');
const axios = require('axios');
const faker = require('faker');
const User = require('../../src/models/User');

const expect = chai.expect;

const url = `http://localhost:3000/auth/login`;

describe(url, () => {
  describe('Đăng nhập không thành công', () => {
    it('Không có email và password', async () => {
      const user = {};
      const res = await axios.post(url, user);
      const { data } = res;
      expect(data.statusCode, 'Status code should be 422').to.equal(422);
      expect(data.success, 'Success should be false').to.be.false;
      expect(data.msg, 'Message should be "Login fail"').to.equal('Login fail');
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
      expect(data.msg, 'Message should be "Login fail"').to.equal('Login fail');
      expect(data.errors, 'Errors should be an array').to.be.an('array');
      expect(data.errors.length, `Length of errors should be ${data.errors.length}`).to.equal(data.errors.length);
    });

    it('Email chứa ký tự đặc biệt', async () => {
      const user = {
        email: '*##@$test@gmail.com',
        password: faker.internet.password()
      };
      const res = await axios.post(url, user);
      const { data } = res;
      expect(data.statusCode, 'Status code should be 422').to.equal(422);
      expect(data.success, 'Success should be false').to.be.false;
      expect(data.msg, 'Message should be "Login fail"').to.equal('Login fail');
      expect(data.errors, 'Errors should be an array').to.be.an('array');
      expect(data.errors.length, `Length of errors should be ${data.errors.length}`).to.equal(data.errors.length);
    });

    it('Người dùng nhập sai mật khẩu', async () => {
      const user = await User.create({
        email: faker.internet.email(),
        password: faker.internet.password()
      });
      const res = await axios.post(url, {
        email: user.email,
        password: faker.internet.password()
      });
      const { data } = res;
      expect(data.statusCode, 'Status code should be 400').to.equal(400);
      expect(data.success, 'Success should be false').to.be.false;
      expect(data.msg, 'Message should be "Incorrect password"').to.equal('Incorrect password');
      expect(data.user).to.be.null;

      await User.destroy({
        where: {
          email: user.email
        }
      });
    });
  });

  describe('Đăng nhập thành công', () => {
    it('Đăng nhập thành công', async () => {
      const user = await User.create({
        email: faker.internet.email(),
        password: faker.internet.password()
      });
      const res = await axios.post(url, user);
      const { data } = res;
      expect(data.statusCode, 'Status code should be 200').to.equal(200);
      expect(data.success, 'Success should be true').to.be.true;
      expect(data.msg, `Message should be "Login success"`).to.equal('Login success');
      expect(data.user, 'User should be a object').is.a('object');
      expect(data.token, 'Token should not be null').is.not.null;
      expect(data.token, 'Token should start with "Bearer "').to.have.string('Bearer ');

      await User.destroy({
        where: {
          email: user.email
        }
      });
    });
  });
});
