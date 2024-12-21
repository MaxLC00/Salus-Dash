// NO smartsheet SDK import here!

async function getSheetData(sheetId, startRow, endRow) {
  try {
    const response = await fetch(`/api/sheets/${sheetId}?startRow=${startRow}&endRow=${endRow}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}

async function findAllSheets() {
    try {
        const response = await fetch('/api/sheets');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching sheets:', error);
        throw error;
    }
}

export { getSheetData, findAllSheets };