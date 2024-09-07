import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const app = express();
const upload = multer({ dest: "uploads/" });

// Initialize Google SDK clients
const API_KEY = ""; // Your API key
const fileManager = new GoogleAIFileManager(API_KEY);
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function uploadAndGenerateContent(filePath) {
  try {
    // Upload the file to Google
    const uploadResult = await fileManager.uploadFile(filePath, {
      mimeType: "image/jpeg",
      displayName: path.basename(filePath),
    });

    // Generate content from the uploaded file
    const result = await model.generateContent([
      "I am developing a set of testing instructions for a digital product and need your assistance to create detailed test cases based on the provided screenshots. For each screenshot, identify the features in it and generate a comprehensive test case for each function that includes the following components: 1. Description: A summary of what the test case is about, including the feature or functionality being tested. 2. Pre-conditions: Any setup or conditions that need to be met before testing can begin. This could include configuration settings, user accounts, or other prerequisites. 3. Testing Steps: A clear, step-by-step guide on how to perform the test. This should include specific actions to be taken and any interactions with the digital product. 4. Expected Result: The expected outcome if the feature is working correctly. Describe what should happen when the test steps are followed.",
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ]);

    return result.response.text();
  } catch (error) {
    console.error(
      "Error during file upload or content generation:",
      error.message
    );
    throw error;
  }
}

app.use(express.static("public")); // Serve the front-end files

app.post(
  "/generate-instructions",
  upload.array("screenshots"),
  async (req, res) => {
    try {
      const { context } = req.body;
      const files = req.files;

      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No screenshots uploaded." });
      }

      // Process each file and group test cases by screenshot
      const instructions = await Promise.all(
        files.map(async (file) => {
          const caption = await uploadAndGenerateContent(file.path);

          // Process the generated caption into detailed test cases
          const testCases = caption;

          return {
            screenshot: path.basename(file.path),
            testCases,
          };
        })
      );

      res.json({ testCases: instructions });

      // Clean up uploaded files
      files.forEach((file) => fs.unlinkSync(file.path));
    } catch (error) {
      console.error("Error generating instructions:", error.message);
      res
        .status(500)
        .json({ error: "An error occurred while generating instructions." });
    }
  }
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
