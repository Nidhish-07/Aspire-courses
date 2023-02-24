import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import Course from "../models/Course.js";

export const createCourse = async (req, res, next) => {
  const course = new Course({
    organizationId: req.organizationId,
    ...req.body,
  });
  try {
    const savedCourse = await course.save();

    res.status(200).send(savedCourse);
  } catch (error) {
    console.log(error);
    next(createError(500, ""));
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (course.organizationId !== req.organizationId) {
      return next(createError(403, "You can delete your course only"));
    }

    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json("course deleted");
  } catch (error) {
    console.log(error);
    next(createError(500, ""));
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (course.organizationId !== req.organizationId) {
      return next(createError(403, "You can delete your session only"));
    }
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedCourse);
  } catch (error) {
    console.log(error);
    next(createError(500, ""));
  }
};

export const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) next(createError(404, "Course not found!"));

    res.status(200).send(course);
  } catch (error) {
    console.log(error);
    next(createError(500, ""));
  }
};

export const getCourses = async (req, res, next) => {
  const q = req.query;

  const filters = {
    ...(q.mode && { mode: q.mode }),
    ...(q.tutor && { tutor: q.tutor }),
    ...(q.title && { title: { $regex: q.title, $options: "i" } }),
  };

  try {
    const courses = await Course.find(filters);
    res.status(200).send(courses);
  } catch (error) {
    console.log(error);
    next(createError(500, ""));
  }
};
