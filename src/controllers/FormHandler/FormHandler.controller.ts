import { addEmailToQueue } from "@/queues/EmailQueue";

export const FormController = {
  async VisaForm(req, res, next) {
    try {
      const emailTam = {
        "from": "mohibullamiazi@gmail.com",
        "to": "safigaming266@gmail.com",
        "subject": "Your Visa Form",
        "text": "Please find your Visa Form attached.",
        "data": {
          "signature": "https://i.ibb.co.com/8N5rvsb/signature.png",
          "sill": "https://i.ibb.co.com/rpz3PzJ/user.jpg",
          "name": "John Doe",
          "email": "johndoe@example.com",
          "address": "123 Main Street, Cityville",
          "phone": "0123456789",
          "UEN": "987654321",
          "logo": "https://ibb.co.com/DMvYXvn",
          "banner": "https://ibb.co.com/DMvYXvn"
        }
      }
      
      const { from, to, subject, text, data } = emailTam;

      await addEmailToQueue({ from, to, subject, text, data });

      console.log("Email job added to the queue");
      res.json({ message: "Email queued successfully" });
    } catch (error) {
      console.error("Error adding email to the queue:", error);
      res.status(500).json({ message: "Failed to queue email" });
    }
  },
};
