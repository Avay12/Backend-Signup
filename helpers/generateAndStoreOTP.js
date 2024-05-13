const sendEmail = require('./../utils/email');
const crypto = require('crypto');
const otpGenerator = require('otp-generator');

const generateAndStoreOTP = async function (email) {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  const hashedOTP = crypto
    .createHash('sha256')
    .update(String(otp))
    .digest('hex');

  await sendEmail({
    email: email,
    subject: 'Your password reset token (valid for 10 min)',
    message: `Your otp number is${otp}`,
  });

  console.log(otp);

  return hashedOTP; // Return the unhashed OTP for sending to the user
};

module.exports = generateAndStoreOTP;
