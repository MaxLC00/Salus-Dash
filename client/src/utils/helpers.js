import { Smartsheet } from 'smartsheet';

const client = Smartsheet.createClient({
  accessToken: 'pCH9tEeKEqYP11GkpGJEywBujnNJI27MhM75t', // Replace <access_token> with your API token
  logLevel: 'info'
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

function findAllSheets() {
    return client.sheets.listSheets();
}

export { getSheetData, findAllSheets };