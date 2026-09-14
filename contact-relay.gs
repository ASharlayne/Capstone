const RECIPIENT = "a.sharlayne@gmail.com";

function doPost(event) {
  const data = event && event.parameter ? event.parameter : {};

  if (data.website) {
    return jsonResponse({ ok: true });
  }

  const name = String(data.name || "").trim();
  const email = String(data.email || "").trim();
  const reason = String(data.reason || "").trim();
  const message = String(data.message || "").trim();

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10 || !reason) {
    return jsonResponse({ ok: false, error: "Invalid form submission." });
  }

  MailApp.sendEmail({
    to: RECIPIENT,
    subject: "Capstone contact form: " + reason,
    body: [
      "Name: " + name,
      "Email: " + email,
      "Reason: " + reason,
      "",
      message
    ].join("\n"),
    replyTo: email,
    name: "Capstone contact form"
  });

  return jsonResponse({ ok: true });
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
