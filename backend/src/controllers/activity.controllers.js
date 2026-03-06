import mongoose from "mongoose";
import { APIError, APIResponse, asyncHandler, RESPONSE_STATUS_CODE } from "../utils/index.js";
import { Activity, Trip } from "../models/index.js";

export const createActivity = asyncHandler(async (req, res) => {
  const activityData = req.body;
  const trip = req.trip;
  const location = req.location;

  const session = await mongoose.startSession();

  try {
    const createdActivity = await Activity.create({ ...activityData, location: location._id }, { session });

    if (!createdActivity) {
      throw new APIError(RESPONSE_STATUS_CODE.internalServer, "Unable to create activity!");
    }

    const updatedTrip = await Trip.findByIdAndUpdate(
      trip._id,
      {
        $push: { activities: createdActivity._id },
        $inc: { numberOfDays: createdActivity.numberOfDays }
      },
      { new: true, session }
    );

    if (!updatedTrip) {
      throw new APIError(RESPONSE_STATUS_CODE.internalServer, "Unable to update trip!");
    }

    return res
      .status(RESPONSE_STATUS_CODE.ok)
      .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Activity created!", { activity: createdActivity }));
  } catch (error) {
    await session.abortTransaction();
    console.error('Failed to create activity:', error);
    throw new APIError(RESPONSE_STATUS_CODE.internalServer, "Unable to create activity!");
  } finally {
    await session.endSession();
  }
});

export const updateActivity = asyncHandler(async (req, res) => {
  const { activityId } = req.params;
  const trip = req.trip;
  const location = req.location;

  if (!mongoose.isValidObjectId(activityId)) {
    throw new APIError(RESPONSE_STATUS_CODE.badRequest, "Invalid Activity Id!");
  }

  const activityData = req.body;

  const session = await mongoose.startSession();

  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      { ...activityData, location: location._id },
      { returnDocument: 'before', session }
    );

    if (!updatedActivity) {
      throw new APIError(RESPONSE_STATUS_CODE.notFound, "Unable to update activity!");
    };

    const daysCount = activityData.numberOfDays - updatedActivity.numberOfDays;

    const updatedTrip = await Trip.findByIdAndUpdate(
      trip._id,
      {
        $inc: { numberOfDays: daysCount }
      },
      { new: true, session }
    );

    if (!updatedTrip) {
      throw new APIError(RESPONSE_STATUS_CODE.internalServer, "Unable to update trip!");
    }

    return res
      .status(RESPONSE_STATUS_CODE.ok)
      .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Activity updated!"));
  } catch (error) {
    await session.abortTransaction();
    console.error('Failed to create activity:', error);
    throw new APIError(RESPONSE_STATUS_CODE.internalServer, "Unable to create activity!");
  } finally {
    await session.endSession();
  }
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
