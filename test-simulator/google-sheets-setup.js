/**
 * ===== GOOGLE SHEETS INTEGRATION SETUP =====
 * 
 * Bu kod Google Sheets bilan integratsiya qilish uchun.
 * 
 * QADAMLAR:
 * 
 * 1. Google Sheets yarating (https://sheets.google.com)
 * 2. Birinchi qatorga sarlavhalar qo'ying:
 *    | Sana | Ism | Guruh | Fan | Rejim | Ball (%) | To'g'ri | Noto'g'ri | Javobsiz | Jami | Vaqt |
 * 
 * 3. Extensions > Apps Script ni oching
 * 4. Quyidagi kodni joylashtiring:
 */

// ===== GOOGLE APPS SCRIPT CODE (Copy this to Apps Script) =====
/*

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.date || new Date().toLocaleString(),
      data.name || '',
      data.group || '',
      data.subject || '',
      data.mode === 'exam' ? 'Imtihon' : 'Mashq',
      data.score + '%',
      data.correct || 0,
      data.incorrect || 0,
      data.unanswered || 0,
      data.total || 0,
      data.timeSpent || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'active',
    message: 'MedTest Pro API is running'
  })).setMimeType(ContentService.MimeType.JSON);
}

*/

/**
 * 5. Deploy > New deployment
 * 6. Type: Web app
 * 7. Execute as: Me
 * 8. Who has access: Anyone
 * 9. Deploy va URL ni nusxalang
 * 10. URL ni app.js faylidagi GOOGLE_SHEETS_URL ga joylashtiring
 * 
 * TAYYOR! Endi test natijalari avtomatik Google Sheets ga yoziladi.
 */
