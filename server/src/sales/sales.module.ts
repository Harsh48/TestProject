import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SalesController } from './controllers/sales.controller'
import { SalesService } from "./services/sales.service";

@Module({
  controllers: [SalesController],
  providers: [SalesService,PrismaService],
  exports: [SalesService],
})
export class  SalesModule {}