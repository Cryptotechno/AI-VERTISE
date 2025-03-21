# AI-VERTISE

AI-powered media mix optimization calculator built with React, TypeScript, and Tailwind CSS.

## Features

- AI-driven media channel allocation
- Real-time budget optimization
- Interactive visualization with Chart.js
- Animated UI with Framer Motion
- Responsive design with Tailwind CSS
- Export to Excel functionality

## Live Demo

Visit the live demo at [https://nataliiamakota.github.io/AI-VERTISE/](https://nataliiamakota.github.io/AI-VERTISE/)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nataliiamakota/AI-VERTISE.git
cd AI-VERTISE
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

To create a production build:

```bash
npm run build
```

The build files will be in the `dist` directory.

### Deployment

The project is configured for GitHub Pages deployment. To deploy:

1. Update the `homepage` field in `package.json` with your GitHub Pages URL
2. Update the `base` field in `vite.config.ts` with your repository name
3. Run the deploy command:
```bash
npm run deploy
```

Or push to the main branch to trigger automatic deployment via GitHub Actions.

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Chart.js
- React Icons
- XLSX

## Project Structure

```
AI-VERTISE/
├── src/
│   ├── components/
│   │   └── sections/
│   │       ├── About.tsx
│   │       ├── Calculator.tsx
│   │       └── Contact.tsx
│   ├── assets/
│   └── App.tsx
├── public/
├── .github/
│   └── workflows/
│       └── deploy.yml
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Google Sheets Contact Form Integration

The contact form on this website has been configured to send submissions to a Google Sheet. Follow these steps to set up the integration:

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/) and create a new spreadsheet
2. Name your spreadsheet (e.g., "Website Contact Form Submissions")
3. The script will automatically create a sheet named "Form Submissions" with the appropriate headers

### 2. Create and Deploy Google Apps Script

1. In your Google Sheet, click on **Extensions** > **Apps Script**
2. Delete any code in the editor and paste the following:

```javascript
function doPost(e) {
  try {
    // Parse the request data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName("Form Submissions") || spreadsheet.insertSheet("Form Submissions");
    
    // If sheet is new, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Contact", "Message"]);
      sheet.getRange(1, 1, 1, 3).setFontWeight("bold");
    }
    
    // Add the form data to the sheet
    sheet.appendRow([
      new Date().toISOString(),
      data.contact,
      data.message
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "Data added to Google Sheet"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Add this function to allow CORS
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok"
  })).setMimeType(ContentService.MimeType.JSON);
}
```

3. Save the project with a name (e.g., "Contact Form Handler")
4. Deploy the script as a Web App:
   - Click **Deploy** > **New deployment**
   - Select type: **Web app**
   - Set "Execute as" to: **Me**
   - Set "Who has access" to: **Anyone**
   - Click **Deploy**
   - Copy the Web App URL that is displayed after deployment

### 3. Update the Website Code

1. Open the file `src/components/sections/Contact.tsx`
2. Locate the line with `const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec';`
3. Replace `YOUR_DEPLOYED_SCRIPT_ID` with the ID from your deployed Web App URL
   - The ID is the long string between `/s/` and `/exec` in the URL

### 4. Build and Deploy Your Website

1. Run the build command for your website
2. Deploy the updated website

### Notes

- The form data is sent with `mode: 'no-cors'`, which means you won't receive a detailed response from the Google Apps Script
- Check the console logs and the Google Sheet to verify that submissions are being recorded correctly
- You may need to authorize the script the first time it runs - open the Web App URL directly in your browser and authorize it
- For testing, you can use browser developer tools to monitor the network requests when submitting the form

### Troubleshooting

If form submissions are not appearing in your Google Sheet:
1. Check that the Web App URL is correctly set in the Contact.tsx file
2. Verify that the script is deployed as a Web App with the correct permissions
3. Check browser console for any errors during form submission
4. Try accessing the Web App URL directly in a browser to ensure it's working
