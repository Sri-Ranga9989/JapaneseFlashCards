import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';  
import axios from 'axios';
import express from 'express';
import data from './newData.json' assert { type: 'json' };
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path';
dotenv.config();


const app = express();
const port = 3000;

// Get equivalent of __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Get vocabulary data
app.get('/vocabulary', (req, res) => {
  try {
      const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'newData.json'), 'utf8'));
      res.json(data);
  } catch (error) {
      console.error('Error reading vocabulary data:', error);
      res.status(500).json({ error: 'Failed to load vocabulary data' });
  }
});

// Get image from Unsplash
app.get('/image', async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
  }
  
  try {
    
      const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: {
              query,
              client_id: process.env.accessKey,
              page : 1,
              per_page : 1,
              w : 200,
              h : 200
          }
      });
      
      res.json({ url: response.data.urls.thumb });
  } catch (error) {
      console.error('Error fetching image from Unsplash:', error);
      res.status(500).json({ error: 'Failed to fetch image' });
  }
});

// Update card box
app.post('/update-box', (req, res) => {
  const { hiragana, box } = req.body;
  
  if (!hiragana || !box) {
      return res.status(400).json({ error: 'Hiragana and box are required' });
  }
  
  try {
      const dataPath = path.join(__dirname, 'newData.json');
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      
      const vocabIndex = data.vocabulary.findIndex(v => v.hiragana === hiragana);
      
      if (vocabIndex === -1) {
          return res.status(404).json({ error: 'Vocabulary not found' });
      }
      
      data.vocabulary[vocabIndex].box = parseInt(box);
      
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      
      res.json({ success: true });
  } catch (error) {
      console.error('Error updating box:', error);
      res.status(500).json({ error: 'Failed to update box' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});