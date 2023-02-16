import { PrismaService } from "../../prisma/prisma.service";
import { Sale } from "@prisma/client";
import { Injectable } from "@nestjs/common";


@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {
  }

  async createSale(body: Sale): Promise<Sale> {
    return await this.prisma.sale.create({data:body})
  }

  async getSaleById(id: string): Promise<Sale | null> {
    return await this.prisma.sale
      .findUnique({
        where: { id: id },
      })
  }

  async getSales(): Promise<Sale[] | null> {
    return await this.prisma.sale.findMany()
  }

  async upadateSale(id: string, body: Sale): Promise<Sale> {
    return await this.prisma.sale
      .update({
        where: {
          id
        },
        data: {
           ...body
        },
      })
  }

  async deleteSale(id: string): Promise<Sale> {
    return await this.prisma.sale
      .delete({where:{id}})
  }
}