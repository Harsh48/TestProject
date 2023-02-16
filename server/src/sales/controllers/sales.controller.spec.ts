import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Sale } from '@prisma/client';
import { Sales } from '../entities/sales.entity';
import { SalesService } from '../services/sales.service';
import { SalesController } from './sales.controller';
 

describe('SalesController', () => {
  let controller: SalesController;
  let service: SalesService;

  const testId = 'testId';
  const request = {
    id: testId,
    saleAmount: 100,
    saleAmountPaid: 100,
    taxAmount:5,
  } as Sale

  const result = {
    id: testId,
    createdAt: new Date(),
    saleAmount: 100,
    saleAmountPaid: 100,
    taxAmount:5,
    orderId: null,
    paymentStatus: 'PENDING',
    ShipmentStatus: 'PENDING',
    updatedAt: null
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesController],
      providers: [
        {
          provide: SalesService,
          useValue: {
            getSales: jest.fn(),
            createSale: jest.fn(),
            getSaleById: jest.fn(),
          },
        },
      ],
      imports: [],
    }).compile();

    controller = module.get<SalesController>(SalesController);
    service = module.get<SalesService>(SalesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('post should return data from service', async () => {
    service.createSale = jest.fn().mockReturnValueOnce(result);
    expect(
      await controller.createSales(request),
    ).toStrictEqual(result);
  });

  it('get should return data from service', async () => {
    service.getSaleById = jest.fn().mockReturnValueOnce(result);
    expect(await controller.findSalesById(testId)).toStrictEqual(result);
  });
});
