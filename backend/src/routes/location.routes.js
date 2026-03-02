import express from 'express';
import { locationIdValidator, locationValidators } from '../validators/index.js';
import { validateMiddleware } from '../middlewares/validate.middlewares.js';
import {
  createLocation,
  deleteLocation,
  getLocation,
  updateLocation
} from '../controllers/location.controllers.js';

const locationRouter = express.Router();

locationRouter.route('/add').post(locationValidators, validateMiddleware, createLocation);
locationRouter.route('/:locationId').get(locationIdValidator, validateMiddleware, getLocation);
locationRouter
  .route('/update/:locationId')
  .put(locationIdValidator, locationValidators, validateMiddleware, updateLocation);
locationRouter.route('/delete/:locationId').delete(locationIdValidator, validateMiddleware, deleteLocation);
// locationRouter.route('/by-country').get(getAllLocations);

export { locationRouter };
