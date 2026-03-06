import express from 'express';
import { activityValidator } from '../validators/index.js';
import {
  validateMiddleware,
  verifyAdmin,
  verifyJWT,
  verifyAdminOrSubAdmin,
  userCreatedTrip,
  useLocation
} from "../middlewares/index.js";
import {
  createActivity,
  getActivity,
  updateActivity,
  deleteActivity
} from '../controllers/index.js';

const activityRouter = express.Router();

activityRouter
  .route('/create/:tripId')
  .post(
    verifyJWT,
    verifyAdminOrSubAdmin,
    userCreatedTrip,
    useLocation,
    activityValidator,
    validateMiddleware,
    createActivity
  );
activityRouter
  .route('/update/:tripId/:activityId')
  .put(
    verifyJWT,
    verifyAdminOrSubAdmin,
    userCreatedTrip,
    useLocation,
    activityValidator,
    validateMiddleware,
    updateActivity
  );
activityRouter
  .route('/delete/:tripId/:activityId')
  .delete(verifyJWT, verifyAdmin, userCreatedTrip, deleteActivity);
activityRouter
  .route('/:activityId')
  .get(getActivity);

export { activityRouter };
