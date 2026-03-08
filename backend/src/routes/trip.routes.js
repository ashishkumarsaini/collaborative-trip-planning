import express from 'express';
import {
  createTrip,
  updateTrip,
  deleteTrip,
  getTrip,
  getBookedTrips,
  getCreatedTrips,
  getRecommendationTrips,
  addUserPermissionForTrip,
  removeUserPermissionForTrip
} from '../controllers/index.js';
import { tripValidator } from '../validators/trip.validators.js';
import {
  validateMiddleware,
  verifyJWT,
  userAllowedToEditTrip,
  verifyTripCreator
} from '../middlewares/index.js';

const tripRouter = express.Router();

tripRouter.route('/create').post(verifyJWT, tripValidator, validateMiddleware, createTrip);
tripRouter
  .route('/update/:tripId')
  .put(verifyJWT, userAllowedToEditTrip, tripValidator, validateMiddleware, updateTrip);
tripRouter.route('/delete/:tripId').delete(verifyJWT, verifyTripCreator, deleteTrip);
tripRouter.route('/recommendation').get(getRecommendationTrips);
tripRouter.route('/created/all').get(verifyJWT, getCreatedTrips);
tripRouter.route('/booked/all').get(verifyJWT, getBookedTrips);
tripRouter.route('/:tripId').get(getTrip);

// trip permisisons
tripRouter.route('/permission/add/:tripId').put(verifyJWT, verifyTripCreator, addUserPermissionForTrip);
tripRouter
  .route('/permission/remove/:tripId/:permissionId')
  .put(verifyJWT, verifyTripCreator, removeUserPermissionForTrip);

export { tripRouter };
