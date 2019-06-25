exports.validateEmail = email => {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const domain = email.split('@')[1];
    if (domain === 'wolox.co' || domain === 'wolox.com.ar') {
      return true;
    }
  }
  return false;
};

exports.validatePassword = password => /^[a-z0-9]+$/i.test(password) && password.length >= 8;
