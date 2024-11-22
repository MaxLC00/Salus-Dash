const express = require('express');
const router = express.Router();
const client = require('smartsheet');

const smartsheet = client.createClient({
    accessToken: process.env.SMARTSHEET_ACCESS_TOKEN
});
  
  // Function to fetch and process sheet data
  function getSheetData(selectedSheetId) {
    return new Promise((resolve, reject) => {
      smartsheet.sheets.getSheet({id: selectedSheetId})
        .then(function(sheetInfo) {
          const rowsArray = sheetInfo.rows.map(row => row.cells.map(cell => cell.value));
  
          const trueList = [];
          const falseList = [];
  
          selectedRows.forEach((row) => {
            const listItem = `<li>${row[0]}</li>`;
            if (row[1] === true) {
              trueList.push(listItem);
            } else {
              falseList.push(listItem);
            }
          });
  
          resolve({ 
            trueList: trueList.join(''), 
            falseList: falseList.join('') 
          });
          return { trueList, falseList };
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }

  module.exports = router;