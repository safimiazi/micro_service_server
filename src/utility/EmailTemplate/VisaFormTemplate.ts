import fs from "fs";
import path from "path";

const getBase64Image = (filePath) => {
  const imagePath = path.resolve(filePath);
  const fileData = fs.readFileSync(imagePath);
  return `data:image/png;base64,${fileData.toString("base64")}`;
};



 export const visaFormTemplate = async ({
  signature,
  sill,
  name,
  email,
  address,
  phone,
  UEN,
  logo,
  banner,
}) => {
  const logoBase64 = getBase64Image(logo);
  const bannerBase64 = banner ? getBase64Image(banner) : null;
  const signatureBase64 = getBase64Image(signature);

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Visa Form</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
          }
          .container {
              max-width: 800px;
              margin: 20px auto;
              padding: 20px;
              background: #fff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .logo {
              text-align: center;
              margin-bottom: 20px;
          }
          .logo img {
              max-width: 150px;
              height: auto;
          }
          .header-banner img {
              width: 100%;
              height: auto;
              border-radius: 8px;
          }
          .details {
              margin-top: 20px;
          }
          .details p {
              margin: 8px 0;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <!-- Logo Section -->
          <div class="logo">
              <img src="${logoBase64}" alt="Company Logo" />
          </div>
          
          <!-- Banner Section -->
          ${
            bannerBase64
              ? `<div class="header-banner">
                  <img src="${bannerBase64}" alt="Header Banner" />
              </div>`
              : ""
          }

          <!-- Form Details -->
          <div class="details">
              <h2>Visa Form Details</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Address:</strong> ${address}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>UEN:</strong> ${UEN}</p>
          </div>

          <!-- Signature Section -->
          <div class="signature">
              <p><strong>Signature:</strong></p>
              <img src="${signatureBase64}" alt="Signature" style="max-width: 200px; height: auto;" />
          </div>
      </div>
  </body>
  </html>
  `;
};

