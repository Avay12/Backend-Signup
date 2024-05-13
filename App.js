const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const sequelize = require('./utils/db');
const CompanyDetails = require('./models/companyDetailsModel');
const Customer = require('./models/customerModel');
const Outlet = require('./models/outletModel');
const User = require('./models/userModel');
const OutletType = require('./models/outletTypeModel');

const app = express();

app.use(cookieParser());

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// 2) ROUTE HANDLERS
const companyRoute = require('./routes/companyRoutes');
const userRoute = require('./routes/userRoutes');

// 3) ROUTES
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/user', userRoute);

// Synchronize models with the database
sequelize
  .sync()
  .then((result) => {
    console.log('Database & tables created!');
  })
  .catch((err) => {
    console.error('Database synchronization error:', err);
  });

// Error handler for routes not found
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
