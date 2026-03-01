import express from 'express';
import { locationIdValidator, locationValidators } from '../validators/index.js';
import { validateMiddleware } from '../middlewares/validate.middlewares.js';
import {
  createLocation,
  deleteLocation,
  getAllLocations,
  getLocation,
  updateLocation
} from '../controllers/location.controllers.js';

const router = express.Router();

router.route('/add').post(locationValidators, validateMiddleware, createLocation);
router.route('/:locationId').get(locationIdValidator, validateMiddleware, getLocation);
router.route('/all').get(getAllLocations);
router.route('/update/:locationId').put(locationIdValidator, locationValidators, validateMiddleware, updateLocation);
router.route('/delete/:locationId').delete(locationIdValidator, validateMiddleware, deleteLocation);

export { router };
