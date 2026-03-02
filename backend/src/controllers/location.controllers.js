import mongoose from "mongoose";
import { Location } from "../models/location.model.js";
import { APIError, APIResponse, asyncHandler, RESPONSE_STATUS_CODE } from "../utils/index.js";

export const createLocation = asyncHandler(async (req, res) => {
  const locationData = req.body;

  const searchedCity = await Location.findOne({ city: locationData.city });

  if (searchedCity) {
    throw new APIError(RESPONSE_STATUS_CODE.conflict, "Location already exists!");
  }

  const createdLocation = await Location.create(locationData);

  if (!createdLocation) {
    throw new APIError(RESPONSE_STATUS_CODE.internalServer, 'Failed to save location!');
  }

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(
      RESPONSE_STATUS_CODE.ok, "Location created successfully!",
      { location: createdLocation }
    ));
});

export const getLocation = asyncHandler(async (req, res) => {
  const { locationId } = req.params;

  if (!mongoose.isValidObjectId(locationId)) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Invalid location id!");
  }

  const searchedLocation = await Location.findById(locationId);

  if (!searchedLocation) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Location not found!");
  }

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Location found!", { location: searchedLocation }));
});

export const getAllLocations = asyncHandler(async (_req, res) => {
  const allLocations = await Location.find({}, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.json(result);
    }
  });

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "", { locations: allLocations }));
});

export const updateLocation = asyncHandler(async (req, res) => {
  const { locationId } = req.params;

  if (!mongoose.isValidObjectId(locationId)) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Invalid location id!");
  }

  const locationData = req.body;

  const updatedLocation = await Location.findByIdAndUpdate(locationId, locationData, { returnDocument: 'after' });

  if (!updatedLocation) {
    throw new APIError(RESPONSE_STATUS_CODE.internalServer, "Failed to update location!");
  }

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Location updated", { location: updatedLocation }));
});

export const deleteLocation = asyncHandler(async (req, res) => {
  const { locationId } = req.params;

  if (!mongoose.isValidObjectId(locationId)) {
    throw new APIError(RESPONSE_STATUS_CODE.notFound, "Invalid location id!");
  }

  const deletedLocation = await Location.findByIdAndDelete(locationId);

  if (!deletedLocation) {
    throw new APIError(RESPONSE_STATUS_CODE.internalServer, "Failed to delete location!");
  }

  return res
    .status(RESPONSE_STATUS_CODE.ok)
    .json(new APIResponse(RESPONSE_STATUS_CODE.ok, "Location deleted"));
});
