import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Question from '../models/Question.js';

dotenv.config();

// Get correct directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'data.json');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Read data from JSON file
const questions = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Insert Data into MongoDB
const importData = async () => {
  try {
    await Question.deleteMany(); // Clear previous data
    await Question.insertMany(questions); // Insert new data
    console.log('✅ Data imported successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

importData();
