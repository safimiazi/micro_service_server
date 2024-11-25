import fs from "fs";
import pdf from "html-pdf";
import path from "path";

export const FormController = {
  async VisaForm(req, res, next) {
    try {
      // HTML ফাইলের সঠিক পাথ নির্ধারণ করুন
      const htmlFilePath = path.join(__dirname, "./Hello.html");

      // HTML ফাইলটি পড়ুন
      const html = fs.readFileSync(htmlFilePath, "utf8");

      console.log("HTML Content:", html); // নিশ্চিত করুন ফাইল ঠিকঠাক পড়া হয়েছে

      // PDF তৈরির অপশন নির্ধারণ করুন
      const options = { format: "Letter" };

      // HTML থেকে PDF তৈরি করুন
      pdf.create(html, options).toFile("./output.pdf", function (err, result) {
        if (err) {
          console.error("Error creating PDF:", err);
          return res.status(500).send("Error creating PDF");
        }
        console.log("PDF Created:", result.filename);
        res.send("PDF successfully created!");
      });
    } catch (error) {
      console.error("Error reading HTML file:", error);
      res.status(500).send("Error generating PDF");
    }
  },
};
