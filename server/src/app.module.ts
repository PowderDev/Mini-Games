import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { TokenModule } from "./token/token.module";
import { SharedModule } from "./shared/shared.module";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";

@Module({
  imports: [
    UserModule,
    AuthModule,
    SharedModule,
    TokenModule,
    SharedModule,
    CloudinaryModule,
    // ServeStaticModule.forRoot({
    //   rootPath: resolve("../client/out"),
    // }),
  ],
})
export class AppModule {}
