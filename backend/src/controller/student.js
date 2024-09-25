import { Mark } from "../model/Marks.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Contactus from '../model/Contactus.js'

export const getMyMarks = asyncHandler(async (req, res) => {
  const { enrolment } = req.params;

  // Use dot notation to query by the enrolment field within the marks object
  const data = await Mark.find({ "marks.enrolment": enrolment });

  if (!data || data.length === 0) {
    throw new ApiError(404, "No records found for this enrolment number");
  }

  res.status(200).json(
    new ApiResponse(200, data, "Marks fetched successfully")
  );
});

export const contactUs = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    throw new ApiError(400, "All fields are required");
  }

  const data = await Contactus.create({
    firstname: firstName,
    lastname: lastName,
    email: email,
    message: message,
  });

  res.status(200).json(
    new ApiResponse(200, data, "Message sent successfully") 
  );
}
)