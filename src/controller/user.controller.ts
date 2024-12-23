import { Request, Response } from "npm:express@4.18.2"
import { CreationAttributes } from 'npm:sequelize@6.32.1';
import { User } from "../database/model/user.model.ts";
import { Iuser } from "../database/model/enum/user.enum.ts";
import { OtpController } from "./otp.controller.ts";
import { Buffer } from "node:buffer";


 export function ganarateOtp():string {
    // generate random 6 digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
}
 export class UserController {
    private otpController: OtpController;

    constructor() {
      this.otpController = new OtpController();
    }
  
    async sendOtp(req: Request, res: Response) {
      const { mobile } = req.body;
  
      if (!mobile) {
        return res.status(400).json({
          message: "Please provide a valid mobile number",
        });
      }
  
      try {
        await this.otpController.sendOtps(req, res);
        return res.status(200).json({
          message: "OTP sent successfully",
        });
      } catch (error) {
        return res.status(500).json({
          message: "Failed to send OTP",
          error: (error as Error).message,
        });
      }
    }
  
    async verifyOtp(req: Request, res: Response) {
      const { mobile, otpCode } = req.body;
  
      if (!mobile || !otpCode) {
        return res.status(400).json({
          message: "Please provide mobile number and OTP code",
        });
      }
  
      try {
        const isOtpValid = await this.otpController.verifyOtpCode(req, res);
  
        if (!isOtpValid) {
          return res.status(400).json({
            message: "Invalid or expired OTP",
          });
        }
  
        const user = await User.findOne({ where: { mobile } });
  
        if (user) {
          const token = Buffer.from(`${user.mobile}`).toString("base64"); 
          return res.status(200).json({
            message: "Authentication successful",
            token,
            data: user,
          });
        } else {
          return res.status(200).json({
            message: "Please provide a nickname to complete registration",
            requiresNickname: true,
          });
        }
      } catch (error) {
        return res.status(500).json({
          message: "Failed to verify OTP",
          error: (error as Error).message,
        });
      }
    }
   
    async registerAccount(req: Request, res: Response) {
      const { name, mobile } = req.body;
  
      if (!name) {
        return res.status(400).json({
          message: "Please provide a nickname to complete registration",
        });
      }
  
      try {
        const userNew = await User.create({
          mobile,
          name,
          role: Iuser.customer, //admin, customer,
        } as CreationAttributes<User>);
  
        const token = Buffer.from(`${userNew.mobile}`).toString("base64"); 
  
        return res.status(201).json({
          message: "Registration successful",
          token,
          data: userNew,
        });
      } catch (error) {
        return res.status(500).json({
          message: "Failed to register account",
          error: (error as Error).message,
        });
      }
    }
  

    getProfile(req: Request, res: Response) {
      try {
        return res.status(200).json({
          message: "User details fetched successfully",
          data: req.user, 
        });
      } catch (error) {
        return res.status(500).json({
          message: "Failed to fetch user details",
          error: (error as Error).message,
        });
      }
    }
  
}