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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Category Admin')
@Controller('admin/category')
@RoleAccess([UserRoleEnum.ADMIN])
export class CategoryAdminController extends BaseController {
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const res = await this.categoryService.create(createCategoryDto);
    return this.successResponse(res);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const { data, totalCount } =
      await this.categoryService.findAll(paginationDto);
    return this.paginationResponse(data, paginationDto, totalCount);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const res = await this.categoryService.findOne(+id);
    return this.successResponse(res);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const res = await this.categoryService.update(+id, updateCategoryDto);
    return this.successResponse(res);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.categoryService.remove(+id);
    return this.successResponse({});
  }
}
