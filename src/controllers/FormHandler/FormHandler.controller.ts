import { addEmailToQueue } from "@/queues/EmailQueue";

export const FormController = {
  async VisaForm(req, res, next) {
    try {
      const { from, to, subject, text, data } = req.body;

      await addEmailToQueue({ from, to, subject, text, data });

      console.log("Email job added to the queue");
      res.json({ message: "Email queued successfully" });
    } catch (error) {
      console.error("Error adding email to the queue:", error);
      res.status(500).json({ message: "Failed to queue email" });
    }
  },
};
