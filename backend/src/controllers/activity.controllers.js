import mongoose from "mongoose";
import { Activity } from "../models/activity.model.js";
import { APIError, APIResponse, asyncHandler, RESPONSE_STATUS_CODE } from "../utils/index.js";

export const createActivity = asyncHandler(async (req, res) => {
  const activityData = req.body;

  const createdActivity = await Activity.create(activityData);

  if (!createdActivity) {
    throw new APIError(RESPONSE_STATUS_CODE.internalServer, "Unable to create activity!");
  }

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Activity Created!", { activity: createdActivity }));

});

export const updateActivity = asyncHandler(async (req, res) => {
  const { activityId } = req.params;

  if (!mongoose.isValidObjectId(activityId)) {
    throw new APIError(RESPONSE_STATUS_CODE.badRequest, "Invalid Activity Id!");
  }

  const activityData = req.body;

  const updatedActivity = await Activity.findByIdAndUpdate(activityId, activityData, { returnDocument: 'after' });

  if (!updatedActivity) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Unable to update activity!");
  }

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Activity updated!", { activity: updatedActivity }));
});

export const deleteActivity = asyncHandler(async (req, res) => {
  const { activityId } = req.params;

  if (!mongoose.isValidObjectId(activityId)) {
    throw new APIError(RESPONSE_STATUS_CODE.badRequest, "Invalid Activity Id!");
  }

  const deletedActivity = await Activity.findByIdAndDelete(activityId);

  if (!deletedActivity) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Unable to delete activity!");
  }

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Activity deleted!"));
});

export const getActivity = asyncHandler(async (req, res) => {
  const { activityId } = req.params;

  if (!mongoose.isValidObjectId(activityId)) {
    throw new APIError(RESPONSE_STATUS_CODE.badRequest, "Invalid Activity Id!");
  }

  const activity = await Activity.findById(activityId);

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Activity found!", { activity }));
});
