import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../common/bases/controller.base';
import { CategoryService } from './category.service';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController extends BaseController {
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const { data, totalCount } =
      await this.categoryService.findAllActive(paginationDto);
    return this.paginationResponse(data, paginationDto, totalCount);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.categoryService.findOne(+id);
    return this.successResponse(res);
  }
}
