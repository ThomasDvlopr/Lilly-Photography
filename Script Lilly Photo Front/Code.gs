/**
 * This function is called when the webapp is open.
 * @param{Object} e => Event from client calling.
 * @return{Html} pageData => HTML init.
 */
const doGet = (e) => {
  let template = HtmlService.createTemplateFromFile("index"); // It will create HTMl page from Index.html file data.
  let pageData = template
    .evaluate()
    .setTitle("Lilly Photography") // Set Title
    //.setFaviconUrl("https://drive.google.com/uc?export=view&id=1YiJD_cUwZ6XuQrzvypHAFmbXuqRmTRCU")
    .setSandboxMode(HtmlService.SandboxMode.IFRAME) //This method now has no effect — previously it set the sandbox mode used for client-side scripts
    .addMetaTag("viewport", "width=device-width, initial-scale=1") // important tag for Responsiveness
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // Sets the state of the page's X-Frame-Options header, which controls clickjacking prevention.
  return pageData;
};

/**
 * this function called HTML files
 * @return{HTML} HTML
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * this function sends data from contact form to back side
 * @param{Object} data from contact form
 * @return{Object} JSON response from back
 */
function processForm(myForm){
let options = {
  method: 'post',
  contentType: 'application/json',
  // Convert the JavaScript object to a JSON string.
  payload: JSON.stringify(myForm),
  muteHttpExceptions:true
};
const response = UrlFetchApp.fetch(URL_BACK_API, options).getContentText("UTF-8");
return response;
}

/**
 * this function allows to reload page on resize
 */
function getScriptURL() {
  return ScriptApp.getService().getUrl();
}

function getScriptURLBack () {
  return URL_BACK_API
}
