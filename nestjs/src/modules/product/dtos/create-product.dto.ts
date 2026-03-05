import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product title',
    example: 'Royal Memory Foam Mattress Pro',
  })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Product description' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Current selling price', example: 899.0 })
  @IsNumber()
  price: number;

  @ApiProperty({
    required: false,
    description: 'Price before discount',
    example: 1299.0,
  })
  @IsNumber()
  @IsOptional()
  originalPrice?: number;

  @ApiProperty({
    required: false,
    description: 'Badge label',
    example: 'BEST SELLER',
  })
  @IsString()
  @IsOptional()
  badge?: string;

  @ApiProperty({ required: false, example: 'Gel Memory Foam' })
  @IsString()
  @IsOptional()
  material?: string;

  @ApiProperty({ required: false, example: '12 Inches' })
  @IsString()
  @IsOptional()
  height?: string;

  @ApiProperty({ required: false, example: 'Made in Vietnam' })
  @IsString()
  @IsOptional()
  origin?: string;

  @ApiProperty({ required: false, example: 'Medium-Firm (6.5/10)' })
  @IsString()
  @IsOptional()
  firmness?: string;

  @ApiProperty({ required: false, example: 'CertiPUR-US®' })
  @IsString()
  @IsOptional()
  certifications?: string;

  @ApiProperty({ required: false, example: '10 Years Limited' })
  @IsString()
  @IsOptional()
  warranty?: string;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ required: false, default: 0, description: 'Stock quantity' })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({
    required: false,
    description: 'Array of category IDs to link',
    example: [1, 2],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  categoryIds?: number[];

  @ApiProperty({
    required: false,
    description: 'Array of file IDs to use as product images',
    example: [1, 2],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  imageIds?: number[];
}
