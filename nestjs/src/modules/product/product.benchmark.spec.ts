import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { StorageService } from '../storage/storage.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductImageEntity } from './entities/product-image.entity';
import { ProductDto } from './dtos/product.dto';

describe('ProductService Performance Benchmark', () => {
  let service: ProductService;
  let storageService: StorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: {
              createQueryBuilder: jest.fn(),
              findOne: jest.fn(),
          },
        },
        {
          provide: StorageService,
          useValue: {
            uploadFile: jest.fn().mockImplementation(async () => {
                await new Promise(resolve => setTimeout(resolve, 100)); // Simulate 100ms latency
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    storageService = module.get<StorageService>(StorageService);

    // Mock ProductEntity.create and ProductImageEntity.create
    // We need to cast to any to avoid type issues with protected properties or mismatch
    jest.spyOn(ProductEntity, 'create').mockImplementation((dto: any) => {
        return {
            ...dto,
            images: [],
            save: jest.fn().mockResolvedValue(true),
        } as any;
    });

    jest.spyOn(ProductImageEntity, 'create').mockImplementation((dto: any) => {
        return {
            ...dto,
        } as any;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('benchmark createProduct', async () => {
    const dto: ProductDto = {
        title: 'Test Product',
        subtitle: 'Subtitle',
        amount: 10,
        description: 'Desc',
    } as ProductDto;

    const imageCount = 10;
    const listImage: any[] = Array(imageCount).fill({
        buffer: Buffer.from('test'),
        mimetype: 'image/png'
    });

    const start = Date.now();
    await service.createProduct(dto, listImage);
    const end = Date.now();

    const duration = end - start;
    console.log(`BENCHMARK: Time taken for ${imageCount} images: ${duration}ms`);
  });
});
