import Data from "./models/VisualizationDashboard_models.js"
import fs from 'fs';
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from 'url';
import connectToDB from "./config_db/db.js";

// Resolve the __dirname variable since it's not available by default in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectToDB();
// Function to read JSON file and save data to MongoDB
const saveDataFromJson = async () => {
  const jsonFilePath = path.join(__dirname, 'data.json'); // Replace with the path to your JSON file

  console.log("Reading JSON file...");
  fs.readFile(jsonFilePath, 'utf8', async (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);

      try {
        const docs = await Data.insertMany(jsonData);
        console.log('Data successfully inserted into MongoDB:', docs);
      } catch (insertError) {
        console.error('Error inserting data into MongoDB:', insertError);
      } 
    } catch (parseError) {
      console.error('Error parsing JSON data:', parseError);
    }
  });
};

  export default saveDataFromJson;