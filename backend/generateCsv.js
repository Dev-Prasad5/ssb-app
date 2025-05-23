const fs = require('fs');
const path = require('path');

// ✅ Corrected uploads directory path (inside backend folder)
const uploadsDir = path.join(__dirname, 'uploads');

// Output CSV file path
const outputCsv = path.join(__dirname, 'images.csv');

fs.readdir(uploadsDir, (err, files) => {
  if (err) {
    return console.error('Error reading uploads directory:', err);
  }

  const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

  let csvContent = 'filename\n';

  imageFiles.forEach(file => {
    csvContent += `uploads/${file}\n`;
  });

  fs.writeFile(outputCsv, csvContent, (err) => {
    if (err) {
      return console.error('Error writing CSV file:', err);
    }
    console.log(`CSV file created successfully at ${outputCsv}`);
  });
});
