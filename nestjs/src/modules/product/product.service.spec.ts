import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { StorageService } from '../storage/storage.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

describe('ProductService', () => {
  let service: ProductService;
  let repo: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
              createQueryBuilder: jest.fn(),
              findOne: jest.fn(),
              create: jest.fn(),
              save: jest.fn(),
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
    repo = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));

    jest.spyOn(repo, 'findOne').mockResolvedValue({} as ProductEntity);
  });

  it('getDetailProduct should explicitly request images relation', async () => {
    await service.getDetailProduct(1);

    expect(repo.findOne).toHaveBeenCalledWith(expect.objectContaining({
        where: { id: 1 },
        relations: ['images']
    }));
  });

  it('getPaginationProduct should use queryBuilder and not find', async () => {
    const qb = {
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
    };
    (repo.createQueryBuilder as jest.Mock).mockReturnValue(qb);

    await service.getPaginationProduct({ pageNum: 1, pageSize: 10 } as any);

    expect(repo.createQueryBuilder).toHaveBeenCalledWith('product');
    expect(qb.getManyAndCount).toHaveBeenCalled();
    expect(repo.findOne).not.toHaveBeenCalled();
  });
});
