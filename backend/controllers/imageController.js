const db = require('../db');

// Helper function to sanitize filename (replace spaces with underscores)
function sanitizeFilename(filename) {
  return filename.replace(/\s+/g, '_');
}

exports.uploadImage = (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: 'No file uploaded' });

  // Sanitize filename before saving to DB
  const cleanFilename = sanitizeFilename(file.filename);

  // If filename changed, rename file in uploads folder accordingly
  if (cleanFilename !== file.filename) {
    const fs = require('fs');
    const path = require('path');
    const oldPath = path.join(__dirname, '..', 'uploads', file.filename);
    const newPath = path.join(__dirname, '..', 'uploads', cleanFilename);

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error('Error renaming file:', err);
        return res.status(500).json({ error: 'Failed to process uploaded file' });
      }

      // Insert sanitized filename into DB
      const sql = 'INSERT INTO ppdt_images (filename) VALUES (?)';
      db.query(sql, [cleanFilename], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ message: 'Image uploaded successfully' });
      });
    });
  } else {
    // Filename no change, just insert
    const sql = 'INSERT INTO ppdt_images (filename) VALUES (?)';
    db.query(sql, [cleanFilename], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(200).json({ message: 'Image uploaded successfully' });
    });
  }
};

exports.getRandomImage = (req, res) => {
  const sql = 'SELECT filename FROM ppdt_images ORDER BY RAND() LIMIT 1';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'No images found' });

    let filename = results[0].filename;

    // Remove duplicate uploads/ prefix if present in filename
    if (filename.startsWith('uploads/')) {
      filename = filename.slice('uploads/'.length);
    }

    const imageUrl = '/uploads/' + filename;
    res.json({ image: imageUrl });
  });
};



exports.getAllImages = (req, res) => {
    const sql = 'SELECT * FROM ppdt_images';
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  };