const { where } = require('sequelize');
const Role = require('./../models/roleModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/CatchAsync');
const AppError = require('./../utils/appError');

exports.getUsers = catchAsync(async (req, res, next) => {
  const role = await Role.findAll();
  const users = await User.findAll();
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    data: {
      role,
      users,
    },
  });
});

// exports.createUser = catchAsync(async (req, res, next) => {
//   const { Position, password, confirmPassword, otp } = req.body;

//   if (!otp && !password && !confirmPassword)
//     return next(new AppError('please your Otp and Password', 401));

//   const user = await User.create({
//     password,
//     confirmPassword,
//   });
//   const role = await Role.create({
//     role_name: Position,
//   });

//   // SEND RESPONSE
//   res.status(200).json({
//     status: 'success',
//     data: {
//       user,
//       role,
//     },
//   });
// });

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return next(new AppError('No user found with that ID', 401));
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return next(new AppError('No user found with that ID', 404));

  // Get the role associated with the user
  const role = await Role.findByPk(user.role_id);
  if (!role) return next(new AppError('No role found for the user', 404));

  // Update the role properties
  role.deleted_by = req.user.user_id; // Assuming req.user contains the authenticated user's information
  role.deleted_date = new Date();
  await role.save();

  // Delete the user
  await user.destroy();

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
