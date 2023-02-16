import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Sale } from '@prisma/client';
import { SalesService } from '../services/sales.service';
import * as swagger from "@nestjs/swagger";

@swagger.ApiTags("sales")
@Controller('sales')
export class SalesController {
    constructor(private salesService: SalesService) { }

    @Get('/')
    async findAllSales(): Promise<Sale[] | null> {
        return await this.salesService.getSales();
    }

    @Get('/:id')
    async findSalesById(@Param('id') id: string): Promise<Sale | null> {
        return await this.salesService.getSaleById(id);
    }

    @Post('/')
    async createSales(@Body() body: Sale): Promise<Sale> {
        return await this.salesService.createSale(body);
    }

    @Put('/:id')
    async updateSales(@Param('id') id: string, @Body() body: Sale): Promise<Sale> {
        return await this.salesService.upadateSale(id,body);
    }

    @Delete('/:id')
    async deleteSales(@Param('id') id: string): Promise<Sale> {
        return await this.salesService.deleteSale(id);
    }
}
