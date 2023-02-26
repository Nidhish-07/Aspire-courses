import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import Organization from "../models/Organization.js";

export const deleteOrganization = async (req, res, next) => {
  try {
    const organization = await Organization.findById(req.params.id);

    if (!organization) {
      return next(createError(404, "organization not found"));
    }

    if (req.organizationId !== organization._id.toString()) {
      // console.log(data);
      return next(createError(403, "You can only delete your account"));
    }
    // res.send(data);
    await Organization.findByIdAndDelete(req.params.id);
    res.status(200).send("organization has been deleted");
  } catch (error) {
    console.log(error);
    next(createError(500, ""));
  }
};

export const updateOrganization = async (req, res, next) => {
  if (req.params.id === req.organizationId) {
    try {
      const updatedOrganization = await Mentor.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).send(updatedOrganization);
    } catch (error) {
      console.log(error);
      next(createError(500, ""));
    }
  }
};