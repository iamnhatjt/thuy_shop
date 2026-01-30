import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StorageService } from '../storage/storage.service';
import { PaginationDto } from '../../common/dto/pagination.dto';

describe('ProductService Optimization', () => {
  let service: ProductService;
  let queryBuilderMock: any;

  beforeEach(async () => {
    queryBuilderMock = {
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
      select: jest.fn().mockReturnThis(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnValue(queryBuilderMock),
            findOne: jest.fn(),
          },
        },
        {
          provide: StorageService,
          useValue: {
            uploadFile: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should select only necessary fields in getPaginationProduct', async () => {
    const pagination: PaginationDto = { pageNum: 1, pageSize: 10 };
    await service.getPaginationProduct(pagination);

    expect(queryBuilderMock.select).toHaveBeenCalledWith([
      'product.id',
      'product.createdAt',
      'product.updatedAt',
      'product.title',
      'product.subtitle',
      'product.view',
      'product.amount',
    ]);
  });
});
