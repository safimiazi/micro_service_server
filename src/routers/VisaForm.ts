import { FormController } from "@/controllers/FormHandler/FormHandler.controller";
import CreateRouter from "@/utility/CreateRouter";

const makeRouter = new CreateRouter("/ui/form");
const app = makeRouter.getApp();

app.get("/example", (req, res) => {
  console.log("hello");
});

export default makeRouter;
