import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BaseController } from 'src/common/bases/controller.base';
import { RoleAccess } from 'src/common/decorator/role-access.decorator';
import { UserRoleEnum } from '../user/enums/user-role.enum';
import { ProductService } from './product.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('product')
export class ProductController extends BaseController {
  constructor(private readonly productService: ProductService) {
    super();
  }

  @Get('all')
  async getAll(@Query() pagination: PaginationDto) {
    const [res, count] =
      await this.productService.getPaginationProduct(pagination);
    return this.paginationResponse(res, pagination, count);
  }

  @Get('detail')
  async getDetail(@Param('id') id: number) {
    const res = await this.productService.getDetailProduct(id);
    return this.successResponse(res);
  }

  @Post()
  @RoleAccess([UserRoleEnum.ADMIN])
  async createProduct() {}
}
