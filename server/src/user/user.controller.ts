import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private service: UserService, private cloudinaryService: CloudinaryService) {}

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req: Request) {
    return await this.service.getMe(req.user["id"]);
  }

  @Post("avatar")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("photo"))
  async updateAvatar(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const res = await this.cloudinaryService.uploadFile(file);
    return await this.service.updateAvatar(req.user["id"], res.url);
  }
}
