exports.validateEmail = email => {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const domain = email.split('@')[1];
    if (domain === 'wolox.co' || domain === 'wolox.com.ar') {
      return true;
    }
  }
  return false;
};

exports.validatePassword = password => {
  if (/^[a-z0-9]+$/i.test(password)) {
    if (password.length >= 8) {
      return true;
    }
  }
  return false;
};
