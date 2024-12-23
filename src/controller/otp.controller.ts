import { Request, Response } from "npm:express@4.18.2"
import { User } from "../database/model/user.model.ts";

export class OtpController {
    async sendOtps(req: Request, _res: Response): Promise<void> {
        const { mobile } = req.body;
    
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
        const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); 
        console.log(`Generated OTP for ${mobile}: ${otp}`);
    
        await User.update(
          { otp, otp_expirsation: otpExpiration },
          { where: { mobile } }
        );
      }
    
      // تایید OTP
      async verifyOtpCode(req: Request, _res: Response): Promise<boolean> {
        const { mobile, otpCode } = req.body;
    
        const user = await User.findOne({ where: { mobile, otp: otpCode } });
    
        if (!user || user.otp_expirsation < new Date()) {
          return false; 
        }
        const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); 
        await User.update({ otp: otpCode, otp_expirsation:otpExpiration  }, { where: { mobile } });
        return true;
      }
}