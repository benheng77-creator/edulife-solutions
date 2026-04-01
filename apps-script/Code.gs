function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var name = data.name || "No name";
    var email = data.email || "No email";
    var organisation = data.organisation || "Not provided";
    var message = data.message || "No message";

    var subject = "New enquiry from " + name + (organisation !== "Not provided" ? " (" + organisation + ")" : "");

    var body = "Name: " + name + "\nEmail: " + email + "\nOrganisation: " + organisation + "\n\nMessage:\n" + message;

    var htmlBody = "<h2 style='margin:0 0 16px 0;font-family:Arial,sans-serif;color:#111;'>New Enquiry</h2>" +
      "<table style='border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;'>" +
      "<tr><td style='padding:6px 16px 6px 0;font-weight:bold;color:#666;'>Name</td><td style='padding:6px 0;'>" + name + "</td></tr>" +
      "<tr><td style='padding:6px 16px 6px 0;font-weight:bold;color:#666;'>Email</td><td style='padding:6px 0;'><a href='mailto:" + email + "'>" + email + "</a></td></tr>" +
      "<tr><td style='padding:6px 16px 6px 0;font-weight:bold;color:#666;'>Organisation</td><td style='padding:6px 0;'>" + organisation + "</td></tr>" +
      "</table>" +
      "<hr style='margin:16px 0;border:none;border-top:1px solid #eee;'>" +
      "<p style='font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;'>" + message + "</p>" +
      "<p style='margin-top:24px;font-size:12px;color:#999;'>Sent from edulife-solutions.pages.dev</p>";

    GmailApp.sendEmail("benheng77@gmail.com", subject, body, {
      htmlBody: htmlBody,
      replyTo: email,
      name: "Edulife Solutions Website"
    });

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: "ok" })).setMimeType(ContentService.MimeType.JSON);
}
