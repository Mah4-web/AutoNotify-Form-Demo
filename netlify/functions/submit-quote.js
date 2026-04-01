exports.handler = async function (event, context) {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Your hidden Google Script URL from Netlify environment variables
    const FORM_URL = process.env.GOOGLE_SCRIPT_URL;

    if (!FORM_URL) {
      throw new Error("Missing GOOGLE_SCRIPT_URL environment variable.");
    }

    // Parse incoming JSON body and convert to URL-encoded data
    const body = JSON.parse(event.body);
    const params = new URLSearchParams();
    Object.keys(body).forEach((key) => params.append(key, body[key]));

    // Send form data to Google Script using native fetch
    const response = await fetch(FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    // Read the response from Google Script
    const result = await response.text();

    // Return response back to the user
    return {
      statusCode: 200,
      body: result,
    };
  } catch (error) {
    console.error("Error in submit-quote function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};