import express from 'express';
import { activityValidator } from '../validators/index.js';
import {
  validateMiddleware,
  verifyJWT,
  useLocation,
  userAllowedToEditTrip,
  verifyTripCreator
} from "../middlewares/index.js";
import {
  createActivity,
  getActivity,
  updateActivity,
  deleteActivity,
  getTripActivities
} from '../controllers/index.js';

const activityRouter = express.Router();

activityRouter
  .route('/create/:tripId')
  .post(
    verifyJWT,
    userAllowedToEditTrip,
    useLocation,
    activityValidator,
    validateMiddleware,
    createActivity
  );
activityRouter
  .route('/update/:tripId/:activityId')
  .put(
    verifyJWT,
    userAllowedToEditTrip,
    useLocation,
    activityValidator,
    validateMiddleware,
    updateActivity
  );
activityRouter
  .route('/delete/:tripId/:activityId')
  .delete(verifyJWT, verifyTripCreator, deleteActivity);
activityRouter
  .route('/:activityId')
  .get(getActivity);
activityRouter
  .route('/trip/:tripId')
  .get(getTripActivities);

export { activityRouter };
