const express = require('express');

const router = express.Router();
const companyController = require('./../controllers/companyController');

router
  .route('/')
  .get(companyController.getCompanies)
  .post(companyController.createCompany);

router
  .route('/:id')
  .get(companyController.getCompany)
  .delete(companyController.delete);

module.exports = router;
