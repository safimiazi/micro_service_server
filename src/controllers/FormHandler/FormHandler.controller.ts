import visaFormTemplate from "@/utility/EmailTemplate/VisaFormTemplate";
import { generatePDF } from "@/utility/HTMLToPdf/PdfGeneratorFn";
import fs from "fs";
import pdf from "html-pdf";
import path from "path";

export const FormController = {
  async VisaForm(req, res, next) {
    try {
      // Get HTML template
      const template = await visaFormTemplate();

      // Define the output directory
      const outputDir = path.join(process.cwd(), "src", "privateVisaPdf");

      // Ensure the directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Define the full path for the PDF file
      const outputPath = path.join(outputDir, "VisaForm.pdf");
      // Generate the PDF
      const pdfPath = await generatePDF(template, outputPath);

      // Send the PDF file as a response
      res.sendFile(pdfPath);
    } catch (error) {
      console.error("Error in VisaForm controller:", error);
      res.status(500).send("Failed to generate PDF.");
    }
  },
};
