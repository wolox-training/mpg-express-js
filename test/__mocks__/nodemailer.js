module.exports = {
  createTransport: () => ({ sendMail: jest.fn(() => Promise.resolve()) })
};
