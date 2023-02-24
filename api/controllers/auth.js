import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import Organization from "../models/Organization.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const organization = new Organization({
      ...req.body,
      password: hashPassword,
    });

    await organization.save();

    res.status(200).send("Organization created");
  } catch (error) {
    console.log(error);
    next(createError(500, ""));
  }
};

export const login = async (req, res, next) => {
  try {
    const organization = await Organization.findOne({ name: req.body.name });

    if (!organization) {
      return next(createError(404, "Organization not found"));
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      organization.password
    );

    if (!validPassword) {
      return next(createError(400, "Wrong Credentials"));
    }

    const token = jwt.sign({ id: organization._id }, process.env.SECRET);
    const { password, ...otherDetails } = organization._doc;
    // console.log(token);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(otherDetails);
  } catch (error) {
    console.log(error);
    next(createError(500, ""));
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("organization has been logged out.");
};
