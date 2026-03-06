import { Location } from "../models/index.js";
import { asyncHandler } from "../utils/index.js";

export const useLocation = asyncHandler(async (req, _res, next) => {
  const { location: locationData } = req.body;

  let location = await Location.findOne({ city: locationData.city });

  if (!location) {
    location = await Location.create(locationData);
  }

  req.location = location;
  next();
});
