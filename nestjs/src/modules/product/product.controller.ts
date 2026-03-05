import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../common/bases/controller.base';
import { ProductService } from './product.service';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController extends BaseController {
  constructor(private readonly productService: ProductService) {
    super();
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    const { data, totalCount } =
      await this.productService.findAllActive(pagination);
    return this.paginationResponse(data, pagination, totalCount);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const res = await this.productService.findOneDetail(+id);
    return this.successResponse(res);
  }
}
