import { AdministrationService } from "@/service/administration/Administration.service";

export const AdministrationController = {

  async Login(req, res, next) {
    try {
      const { email, password } = req.body;
      await AdministrationService.Login(email, password, res);
    } catch (error) {
      next(error);
    }
  },
  
  async GetAdmin(req, res, next) {
    try {
      res.send(req.admin);
    } catch (error) {
      next(error);
    }
  },
  async getAgent(req, res, next) {
    try {
      res.send(req.agent);
    } catch (error) {
      next(error);
    }
  },

 async AdminEditAgencyUserProfile(req, res, next){
  try {
    const {id} = req.params;
    const data = req.body;
    console.log("id", data)
    res.send(req.body)
  } catch (error) {
    
  }
 }
};
