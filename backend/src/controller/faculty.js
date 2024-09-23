import xlsx from 'xlsx';
import fs from 'fs-extra';
import { Mark } from '../model/Marks.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const importMarks = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'No file uploaded');
  }

  if (!req.body.branch || !req.body.semester || !req.body.subject) {
    throw new ApiError(400, 'Branch, semester, and subject are required');
  }

  const filePath = req.file.path;

  try {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    let totalMarksIndex = -1;

    // Search for "Out of 70" across rows and columns
    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
      const row = data[rowIndex];
      totalMarksIndex = row.findIndex(header => header && header.toString().includes('Out of 70'));
      if (totalMarksIndex !== -1) {
        break;
      }
    }

    if (totalMarksIndex === -1) {
      throw new ApiError(400, '"Out of 70" column not found in the file');
    }

    // Use the correct row for headers (e.g., row 3 or 4)
    const headers = data[3];
    const enrolmentIndex = headers.findIndex(header => header === 'Enrollment No.');
    const nameIndex = headers.findIndex(header => header === 'Student Name');

    if (enrolmentIndex === -1) {
      throw new ApiError(400, 'Enrollment No. column not found in the file');
    }

    const validatedData = [];
    const errors = [];

    // Process rows starting from the first data row (e.g., row 5)
    for (let i = 4; i < data.length; i++) {
      const row = data[i];
      try {
        if (row[enrolmentIndex]) { 
          const markEntry = {
            branch: req.body.branch,
            semester: req.body.semester.toString(),
            subject: req.body.subject,
            marks: {
              enrolment: row[enrolmentIndex],
              name: row[nameIndex],
              marks: row[totalMarksIndex] || 0,
            },
          };
          validatedData.push(markEntry);
        }
      } catch (error) {
        errors.push(`Row ${i + 1}: ${error.message}`);
      }
    }

    const savedMarks = [];
    const saveErrors = [];

    // Save or update the marks in the database
    for (let i = 0; i < validatedData.length; i++) {
      try {
        const existingMark = await Mark.findOne({
          branch: validatedData[i].branch,
          semester: validatedData[i].semester,
          subject: validatedData[i].subject,
          'marks.enrolment': validatedData[i].marks.enrolment,
        });

        if (existingMark) {
          await Mark.updateOne(
            { _id: existingMark._id },
            { $set: { marks: validatedData[i].marks } }
          );
        } else {
          const newMark = new Mark(validatedData[i]);
          await newMark.save();
        }

        savedMarks.push(i + 1);
      } catch (error) {
        saveErrors.push(`Row ${i + 1}: ${error.message}`);
      }
    }

    res.status(200).json(
      new ApiResponse(200, {
        message: 'Marks has been saved successfully',
        totalRows: data.length - 4,
        savedRows: savedMarks.length,
        failedRows: saveErrors.length,
        validationErrors: errors,
        saveErrors,
      })
    );
  } catch (error) {
    throw new ApiError(500, 'Error processing the file');
  } finally {
    await fs.remove(filePath);
  }
});
