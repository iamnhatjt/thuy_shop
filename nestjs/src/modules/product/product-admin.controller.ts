import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleAccess } from '../../common/decorator/role-access.decorator';
import { BaseController } from '../../common/bases/controller.base';
import { UserRoleEnum } from '../user/enums/user-role.enum';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Product Admin')
@Controller('admin/product')
@RoleAccess([UserRoleEnum.ADMIN])
export class ProductAdminController extends BaseController {
  constructor(private readonly productService: ProductService) {
    super();
  }

  @Post()
  async create(@Body() dto: CreateProductDto) {
    const res = await this.productService.create(dto);
    return this.successResponse(res);
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    const { data, totalCount } = await this.productService.findAll(pagination);
    return this.paginationResponse(data, pagination, totalCount);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const res = await this.productService.findOneDetail(+id);
    return this.successResponse(res);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    const res = await this.productService.update(+id, dto);
    return this.successResponse(res);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.productService.remove(+id);
    return this.successResponse({});
  }
}
