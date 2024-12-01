import Bull from "bull";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { visaFormTemplate } from "@/utility/EmailTemplate/VisaFormTemplate";
import { generatePDF } from "@/utility/HTMLToPdf/PdfGeneratorFn";
import { emailQueue } from "@/server";

// Function to add an email job to the queue
export const addEmailToQueue = async (email) => {
  await emailQueue.add(email, {
    attempts: 3,
    backoff: 5000,
  });
};

// Process the email queue
emailQueue.process(async (job) => {
  try {
    console.log("Processing job:", job.id);

    const { from, to, subject, text, data } = job.data;

    // Generate the HTML template and PDF
    const template = await visaFormTemplate(data);
    const outputDir = path.join(process.cwd(), "src", "privateVisaPdf");
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    const outputPath = path.join(outputDir, `${data.name}-VisaForm.pdf`);
    const pdfPath = await generatePDF(template, outputPath);

    // Create a test email account
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Send the email with the PDF attachment
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      attachments: [
        {
          filename: `${data.name}-VisaForm.pdf`,
          path: pdfPath,
        },
      ],
    });

    console.log("Email sent successfully:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error processing email job:", error);
    throw error; // Retry mechanism
  }
});
