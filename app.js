const express = require ("express");
const User = require ("./mongo");
const XLSX = require('xlsx');

const app = express();

// app.post("/excelSheet", async (req, res) => {
    const workbook = XLSX.readFile("./excelSheet.xlsx");  
    const sheetName = 'Sheet1';
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet data to JSON
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    const data = []
    jsonData.forEach((row) => {
        data.push({
          date: row.Date,
          time: row.Time,
          global_active_power: row.Global_active_power,
          global_reactive_power: row.Global_reactive_power,
          voltage: row.Voltage,
          global_intensity: row.Global_intensity,
          sub_metering_1: row.Sub_metering_1,
          sub_metering_2: row.Sub_metering_2,
          sub_metering_3: row.Sub_metering_3,
        });
      });
      const newRecord = new User({
        username: '', // Set the username
        email: '', // Set the email
        data: data, // Insert the 'data' array into the 'data' field
      });

      newRecord.save()
  .then(() => {
    console.log('Record saved:', newRecord);
  })
  .catch((error) => {
    console.error('Error saving record:', error);
  });

// })

app.post('/users', async (req, res) => {
    try {
      const { username, email } = req.body;
      
      // Create a new user document
      const newUser = new User({ username, email });
      
      // Save the user to MongoDB
    //   await newUser.save();
      
    //   res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.listen(2000, () => {
    console.log("Running on port 2000");
  })