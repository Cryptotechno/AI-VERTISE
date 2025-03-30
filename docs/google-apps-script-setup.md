# Google Apps Script Setup for Contact Form

To make the contact form work correctly, you need to set up a Google Apps Script that will receive form submissions and save them to a Google Sheet.

## Steps to Set Up

1. Create a new Google Sheet at [sheets.google.com](https://sheets.google.com)
2. Name the sheet something like "AI VERTISE - Contact Form Submissions"
3. Add the following column headers in the first row:
   - Timestamp
   - Email
   - Message

4. Go to Extensions > Apps Script in the Google Sheet menu
5. Replace the default code with this:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Add a new row with the form data
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.email || "",
      data.message || ""
    ]);
    
    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } 
  catch(error) {
    // Log the error
    console.error(error);
    
    // Return error
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

6. Save the script (give it a name like "AI VERTISE Form Handler")
7. Click Deploy > New Deployment
8. Select "Web app" as the deployment type
9. Set the following settings:
   - Execute as: "Me"
   - Who has access: "Anyone"
10. Click "Deploy"
11. Copy the Web App URL that is generated
12. Open `src/components/sections/Contact.tsx` in your project
13. Replace the `GOOGLE_APPS_SCRIPT_URL` value with your new Web App URL
14. The form submissions should now work!

## Testing

To test if the setup is working:
1. Fill out and submit the contact form on your site
2. Check the Google Sheet to confirm the data was received
3. You should see a new row with the timestamp, email, and message

## Troubleshooting

If submissions aren't working:
- Check the browser console for errors
- Make sure the Web App URL is correctly pasted in the Contact.tsx file
- Verify the script is deployed and accessible to anyone
- Try deploying the Apps Script again if needed 