import express from 'express';
import {
  createTrip,
  updateTrip,
  deleteTrip,
  getTrip
} from '../controllers/index.js';
import { tripValidator } from '../validators/trip.validators.js';
import { validateMiddleware, verifyJWT } from '../middlewares/index.js';

const tripRouter = express.Router();

tripRouter.route('/create').post(verifyJWT, tripValidator, validateMiddleware, createTrip);
tripRouter.route('/update/:tripId').put(tripValidator, validateMiddleware, updateTrip);
tripRouter.route('/delete/:tripId').delete(deleteTrip);
tripRouter.route('/:tripId').get(getTrip);

export { tripRouter };
