import express from 'express';
import {
  createTrip,
  updateTrip,
  deleteTrip,
  getTrip,
  getBookedTrips,
  getCreatedTrips,
  getRecommendationTrips
} from '../controllers/index.js';
import { tripValidator } from '../validators/trip.validators.js';
import {
  validateMiddleware,
  verifyAdmin,
  verifyJWT,
  verifyAdminOrSubAdmin,
  userCreatedTrip
} from '../middlewares/index.js';

const tripRouter = express.Router();

tripRouter.route('/create').post(verifyJWT, tripValidator, validateMiddleware, createTrip);
tripRouter
  .route('/update/:tripId')
  .put(verifyJWT, verifyAdminOrSubAdmin, userCreatedTrip, tripValidator, validateMiddleware, updateTrip);
tripRouter.route('/delete/:tripId').delete(verifyJWT, verifyAdmin, deleteTrip);
tripRouter.route('/recommendation').get(getRecommendationTrips);
tripRouter.route('/created/all').get(verifyJWT, getCreatedTrips);
tripRouter.route('/booked/all').get(verifyJWT, getBookedTrips);
tripRouter.route('/:tripId').get(getTrip);

export { tripRouter };
