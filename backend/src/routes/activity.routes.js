import express from 'express';
import { activityValidator } from '../validators/index.js';
import { validateMiddleware } from "../middlewares/index.js";
import {
  createActivity,
  getActivity,
  updateActivity,
  deleteActivity
} from '../controllers/index.js';

const activityRouter = express.Router();

activityRouter.route('/create').post(activityValidator, validateMiddleware, createActivity);
activityRouter.route('/update/:activityId').put(activityValidator, validateMiddleware, updateActivity);
activityRouter.route('/delete/:activityId').delete(deleteActivity);
activityRouter.route('/:activityId').get(getActivity);

export { activityRouter };
