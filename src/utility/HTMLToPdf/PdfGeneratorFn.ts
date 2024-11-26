import puppeteer from "puppeteer";
import path from "path";

export const generatePDF = async (htmlContent, outputPath) => {
  // Ensure Puppeteer uses a resource-efficient setup
  const browser = await puppeteer.launch({
    headless: true, 
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    // Open a new page
    const page = await browser.newPage();

    // Set HTML content
    await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

    // Generate PDF
    await page.pdf({
      path: outputPath, // Output file path
      format: "A4", // Paper format
      printBackground: true, // Include CSS background
    });

    console.log("PDF generated successfully at:", path.resolve(outputPath));
    return path.resolve(outputPath);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error; // Propagate the error for handling by the caller
  } finally {
    // Ensure the browser is closed
    await browser.close();
  }
};
