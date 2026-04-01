function doPost(e) {
  // Get the submitted form data
  const fullName = e.parameter['name'];
  const email = e.parameter['email'];
  const phone = e.parameter['phone'];
  const message = e.parameter['message'];

  // Open the Google Sheet where you want to store the data
  
  const sheet = SpreadsheetApp.openById("your_sheet_id").getSheetByName("FormResponses");
![]()
  // Append the data to the sheet
  sheet.appendRow([new Date(), fullName, email, phone, message]);

  // Send an email notification
  const subject = 'New Contact Form Submission from ' + fullName;
  const body = 'You have received a new contact form submission:\n\n' +
             'Full Name: ' + fullName + '\n' +
             'Email: ' + email + '\n' +
             'Phone: ' + phone + '\n' +
             'Message: ' + message;

  // Send the email to your desired email address
  const recipient = 'your-email@gmail.com';  // Change this to your email
  GmailApp.sendEmail(recipient, subject, body);

  // Return a response to the user (success message)
  return ContentService.createTextOutput("Form Submitted Successfully!")
    .setMimeType(ContentService.MimeType.TEXT);
}

---

# 📌 NOTE for the script:

You need to replace the your_sheet_id placeholder with your actual Google Sheet ID in the code. For example:

- const sheet = SpreadsheetApp.openById("your_sheet_id");

## How to find your Google Sheet ID

1. Copy your Google Sheet URL. It will look something like this: 
https://docs.google.com/spreadsheets/d/2b5ADl2wBMhfIKiujWtCD6X66nzOF-LdRff2LkMyAbGc/edit?gid=0#gid=0

2. The Sheet ID is the part between /d/ and /edit.
- 👉 In this example, the ID is:
**2b5ADl2wBMhfIKiujWtCD6X66nzOF-LdRff2LkMyAbGc**

3. Copy that ID and paste it into your script where your_sheet_id is. For example:

- const sheet = SpreadsheetApp.openById("2b5ADl2wBMhfIKiujWtCD6X66nzOF-LdRff2LkMyAbGc");


