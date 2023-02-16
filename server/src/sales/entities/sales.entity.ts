import { ObjectType, Field, registerEnumType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    IsOptional,
    IsDate,
    ValidateNested,
    IsNumber,
    IsEnum,
} from "class-validator";
import { Type } from "class-transformer";
import { Order } from "../../order/base/Order";

enum PAYMENT_STATUS {
    'PENDING',
    'SUCCESS',
    'FALIURE'
  }

  enum SHIPMENT_STATUS {
    'PENDING',
    'PACKED',
    'SHIPPED',
    'DELIVERED'
  }

  registerEnumType(SHIPMENT_STATUS, {
    name: 'SHIPMENT_STATUS',
  });

  registerEnumType(PAYMENT_STATUS, {
    name: 'PAYMENT_STATUS',
  });
  
 
  

@ObjectType()
class Sales {

    @ApiProperty({
        required: false,
        type: String,
    })
    @IsOptional()
    @IsString()
    @Field(() => String)
    id?: string;

    @ApiProperty({
        required: true,
        type: Number,
    })
    @IsNumber()
    saleAmount!: Number;

    @ApiProperty({
        required: true,
        type: Number,
    })
    @IsNumber()
    saleAmountPaid!: Number;

    @ApiProperty({
        required: true,
        type: Number,
    })
    @IsNumber()
    taxAmount!: Number;

    @Field(() => PAYMENT_STATUS)
    @IsOptional()
    @IsEnum(PAYMENT_STATUS)
    paymentStatus?: PAYMENT_STATUS;

    @Field(() => SHIPMENT_STATUS)
    @IsOptional()
    @IsEnum(SHIPMENT_STATUS)
    shipmentStatus?: SHIPMENT_STATUS;

    @ApiProperty({
        required: true,
    })
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @Field(() => Date)
    createdAt!: Date;

    @ApiProperty({
        required: false,
        type: () => Order,
    })

    @ValidateNested()
    @Type(() => Order)
    @IsOptional()
    order?: Order;

    @ApiProperty({
        required: true,
    })

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @Field(() => Date)
    updatedAt!: Date;
}


export { Sales };
