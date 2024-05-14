const CompanyDetails = require('./../models/companyDetailsModel');
const CompanyType = require('./../models/companyTypeModel');
const outletType = require('./../models/outletTypeModel'); // Ensure this matches the model's filename and export
const outlet = require('./../models/outletModel');
const catchAsync = require('./../utils/CatchAsync');
const AppError = require('./../utils/appError');
const generateAndStoreOTP = require('./../helpers/generateAndStoreOTP');

exports.getCompanies = catchAsync(async (req, res, next) => {
  const type = await CompanyType.findAll();
  const details = await CompanyDetails.findAll();
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    data: {
      type,
      details,
    },
  });
});

exports.createCompany = catchAsync(async (req, res, next) => {
  const { companyType, companyName, phone, email } = req.body;

  if (!companyType && !companyName && !(phone || email))
    return next(
      new AppError('Please provide Company Name, Phone, or Email', 401),
    );

  // Create or find the company type in the database
  let companyTypeRecord = await CompanyType.findOne({
    where: { company_type_name: companyType },
  });
  if (!companyTypeRecord) {
    companyTypeRecord = await CompanyType.create({
      company_type_name: companyType,
    });
  }

  const companyDetails = await CompanyDetails.create({
    company_name: companyName,
    email,
    contact: phone,
    company_type_id: companyTypeRecord.company_type_id,
  });

  let outletTypeRecord = await outletType.findOne({
    where: { outlet_type_name: companyType },
  });
  if (!outletTypeRecord) {
    outletTypeRecord = await outletType.create({
      outlet_type_name: companyType,
    });
  }

  const outletRecord = await outlet.create({
    outlet_name: companyName,
    email,
    contact: phone,
    company_id: companyDetails.company_id,
    outlet_type_id: outletTypeRecord.outlet_type_id, // Corrected variable name
  });

  // Generate and store OTP
  const hashedOTP = await generateAndStoreOTP(email);

  // Set hashed OTP as cookie in response
  res.cookie('otp', hashedOTP, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 2 * 60 * 1000,
    ),
    httpOnly: true,
    path: '/api',
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    data: {
      companyDetails,
    },
  });
});

exports.getCompany = catchAsync(async (req, res, next) => {
  const companyDetail = await CompanyDetails.findByPk(req.params.id);
  if (!companyDetail)
    return next(new AppError('No company found with that ID', 401));
  res.status(200).json({
    status: 'success',
    data: {
      companyDetail,
    },
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const companyDetail = await CompanyDetails.destroy({
    where: { company_id: req.params.id },
  });
  if (!companyDetail)
    return next(new AppError('No company found with that ID', 401));
  res.status(200).json({
    status: 'success',
    data: null,
  });
});
