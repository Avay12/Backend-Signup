const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const companyTable = require('../models/companyDetailsModel');
const Role = require('../models/roleModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/CatchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { Position, companyName, password, confirmPassword, otp } = req.body;

  // Check if all required fields are provided
  if (!otp || !password || !confirmPassword) {
    return next(new AppError('Please provide your OTP and Password', 400));
  }

  const OTP = crypto.createHash('sha256').update(String(otp)).digest('hex');

  // Verify OTP
  const hashedOTP = req.cookies.otp; // Get the stored OTP from cookies
  console.log(OTP === hashedOTP);
  if (!hashedOTP || !(OTP === hashedOTP)) {
    return next(
      new AppError('Invalid OTP. Please provide the correct OTP.', 401),
    );
  }

  // Find or create the role with the given name
  let role = await Role.findOne({ where: { role_name: Position || 'admin' } });
  if (!role) {
    role = await Role.create({ role_name: Position });
  }

  // Find the company based on the provided name or use a default name
  const company = await companyTable.findOne({
    where: { company_name: companyName || 'AmusementPark' },
  });

  // Create the user with the role ID and company details
  const user = await User.create({
    password,
    role_id: role.role_id,
    company_name: company.company_name,
    company_id: company.company_id,
  });

  // Remove the OTP cookie as it's no longer needed
  res.clearCookie('otp');

  // Sign JWT token and send response
  createSendToken(user, 201, res);
});
// exports.protect = async (req, res, next) => {
//   // 1) Check if the token exists in the request headers
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   // 2) If no token is found, send an error response
//   if (!token) {
//     return next(
//       new AppError(
//         'You are not logged in! Please log in to access this resource.',
//         401,
//       ),
//     );
//   }

//   // 3) Verify the token
//   const decoded = await promisify(jwt.verify(token, process.env.JWT_SECRET));

//   // 4) Check if the user associated with the token exists
//   const user = await User.findByPk(decoded.id);

//   if (!user) {
//     return (
//       next(
//         new AppError('The user belonging to this token does not exist.', 401),
//       ),
//       401
//     );
//   }

//   // 5) Attach the user object to the request object
//   req.user = user;
//   next();
// };

exports.restrictedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          'You do not have the permission to perform this action',
          401,
        ),
      );
    }
    next();
  };
};
