/**
 * this function is called when opening the webapp
 * @return{Object} data format JSON
 */
function doGet() {
    const data = {
      status :'success',
      pictures : getData_()
    }
    const output = JSON.stringify(data);
    return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON);
}

/**
 * this function is called when client submit the contact form
 * @param{Object} request from client side
 * @return{Object} data format JSON
 */
const doPost = (request = {}) => {
  const { parameter, postData: { contents, type } = {} } = request;

  if (type === 'application/json') {
    const jsonData = JSON.parse(contents);
    sendEmails_(jsonData)
    createContact_(jsonData)
    return ContentService.createTextOutput(JSON.stringify(jsonData));
  }

  if (type === 'application/x-www-form-urlencoded') {
    const json = {};
    contents
      .split('&')
      .map((input) => input.split('='))
      .forEach(([key, value]) => {
        json[decodeURIComponent(key)] = decodeURIComponent(value);
      });
    return ContentService.createTextOutput(JSON.stringify(json));
  }
  return ContentService.createTextOutput(JSON.stringify(contentsD));
};

/**
 * this function sends emails
 * @param{Object} data from form
 */
function sendEmails_(data) {
  const url1 = "https://docs.google.com/feeds/download/documents/export/Export?id=" + TEMPLATE_MAIL_CLIENT_ID + "&exportFormat=html";
  const url2 = "https://docs.google.com/feeds/download/documents/export/Export?id=" + TEMPLATE_MAIL_ADMIN_ID + "&exportFormat=html";

  const param ={
    mehtod : "get",
    headers : {
      "Authorization":"Bearer "+ScriptApp.getOAuthToken()
    },
    muteHttpExceptions:true
  }
  let html2 = UrlFetchApp.fetch(url2,param);
  html2 = html2.getContentText();
  html2 = html2.replace(/#LASTNAME/g, data.lastname);
  html2 = html2.replace(/#FIRSTNAME/g, data.firstname);
  html2 = html2.replace(/#EMAIL/g, data.email);
  html2 = html2.replace(/#TEXTAREA/g, data.textarea);
  const subject2 = data.firstname + " " + data.lastname;

  const prop2 = {
    htmlBody:html2,
    noReply: true
  };
  GmailApp.sendEmail(ADMIN_EMAIL,subject2,'',prop2);

  let htmlClient = UrlFetchApp.fetch(url1,param);
  htmlClient = htmlClient.getContentText();
  htmlClient = htmlClient.replace(/#LASTNAME/g, data.lastname.charAt(0).toUpperCase() + data.lastname.substring(1));
  htmlClient = htmlClient.replace(/#FIRSTNAME/g, data.firstname.charAt(0).toUpperCase() + data.firstname.substring(1));
  const email = data.email;
  const subject = 'Lilly Photography';
  const prop = {
    htmlBody:htmlClient,
    noReply: true
  };
  GmailApp.sendEmail(email,subject,'',prop);
}

/**
 * this function generates a list of image urls from the drive in a sheet
 * setting up a trigger that runs once a day 
 */
function insertPics(){
  let baseUrl = "http://drive.google.com/uc?export=view&id=";
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_PICTURE_ID);
  const files = folder.getFiles();
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('pictures');
  ss.getRange(2, 1, ss.getLastRow() - 1, ss.getLastColumn()).clearContent();
  let arr = []
  let id = 0;

  while(files.hasNext()){
    const file = files.next();
    const imgId = file.getId();
    const imgUrl = baseUrl+imgId;
    ss.appendRow([id, imgUrl]);
    id++;
  }
}

/**
 * this function generates a contact list in a sheet from the client side form 
 */
function createContact_(data){
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('contacts');
  let formattedDate = Utilities.formatDate(new Date(), "GMT+2", "dd/MM/yyyy HH:mm");
  sheet.appendRow([data.lastname, data.firstname, data.email, formattedDate])
}

/**
 * this function generates an array of objects that will be used for rendering images on the client side
 * @return{Array} array of objects
 */
const getData_ = () => {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('pictures');
  const values = ss.getRange(2, 1, ss.getLastRow() - 1, ss.getLastColumn()).getValues();
  const headers = ss.getRange(1, 1, 1, ss.getLastColumn()).getValues()[0];

  const data = [];

  for (let i = 0; i < values.length; i++) {
    const val = values[i];
    const tmp = {};
    for (let j = 0; j < headers.length; j++) {
      tmp[headers[j]] = val[j];
    }
    data.push(tmp)
  }
  return data;
}

// function getData_(){;
//  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('pictures');
//   const rows = sheet.getDataRange().getValues();
//   const pictures = rows.slice(1);
//   console.log(pictures)
//   return pictures;
// }



