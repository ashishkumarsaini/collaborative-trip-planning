import express from 'express';
import { activityValidator } from '../validators/index.js';
import { validateMiddleware, verifyAdmin, verifyJWT, verifyAdminOrSubAdmin } from "../middlewares/index.js";
import {
  createActivity,
  getActivity,
  updateActivity,
  deleteActivity
} from '../controllers/index.js';

const activityRouter = express.Router();

activityRouter
  .route('/create')
  .post(verifyJWT, verifyAdminOrSubAdmin, activityValidator, validateMiddleware, createActivity);
activityRouter
  .route('/update/:activityId')
  .put(verifyJWT, verifyAdminOrSubAdmin, activityValidator, validateMiddleware, updateActivity);
activityRouter
  .route('/delete/:activityId')
  .delete(verifyJWT, verifyAdmin, deleteActivity);
activityRouter
  .route('/:activityId')
  .get(getActivity);

export { activityRouter };
