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
  removeUserPermissionForTrip,
  requestToJoinTrip,
  acceptRequestToJoinTrip
} from '../controllers/index.js';
import { tripValidator } from '../validators/trip.validators.js';
import {
  validateMiddleware,
  verifyJWT,
  userAllowedToEditTrip,
  verifyTripCreator
} from '../middlewares/index.js';

const tripRouter = express.Router();

// create, update, delete trips
tripRouter.route('/create').post(verifyJWT, tripValidator, validateMiddleware, createTrip);
tripRouter
  .route('/update/:tripId')
  .put(verifyJWT, userAllowedToEditTrip, tripValidator, validateMiddleware, updateTrip);
tripRouter.route('/delete/:tripId').delete(verifyJWT, verifyTripCreator, deleteTrip);

// join trip
tripRouter.route('/request/:tripId').put(verifyJWT, requestToJoinTrip);
tripRouter.route('/accept-request/:tripId/:userId').put(verifyJWT, userAllowedToEditTrip, acceptRequestToJoinTrip);

// trip permisisons
tripRouter.route('/permission/add/:tripId').put(verifyJWT, verifyTripCreator, addUserPermissionForTrip);
tripRouter
  .route('/permission/remove/:tripId/:permissionId')
  .put(verifyJWT, verifyTripCreator, removeUserPermissionForTrip);

// get trips
tripRouter.route('/recommendation').get(getRecommendationTrips);
tripRouter.route('/created/all').get(verifyJWT, getCreatedTrips);
tripRouter.route('/booked/all').get(verifyJWT, getBookedTrips);
tripRouter.route('/:tripId').get(getTrip);

export { tripRouter };
