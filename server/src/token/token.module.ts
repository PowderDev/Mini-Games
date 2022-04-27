import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SharedModule } from "src/shared/shared.module";
import { TokenService } from "./token.service";

@Module({
  imports: [SharedModule],
  providers: [TokenService, PrismaService],
})
export class TokenModule {}
