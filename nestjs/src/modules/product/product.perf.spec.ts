import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { StorageService } from '../storage/storage.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { DataSource, Repository, Entity, Column } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';

// Define MockProductEntity to avoid complex relations
@Entity('product_entity')
class MockProductEntity extends CommonEntity {
  @Column()
  title: string;
  @Column()
  subtitle: string;
  @Column()
  view: number;
  @Column({
    default: 8386,
  })
  amount: number;
  @Column({
    type: 'text',
  })
  description: string;
}

describe('ProductService Performance Benchmark', () => {
  let service: ProductService;
  let repo: Repository<MockProductEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [MockProductEntity],
          synchronize: true,
          logging: false,
        }),
        TypeOrmModule.forFeature([MockProductEntity]),
      ],
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useFactory: (dataSource: DataSource) => {
            return dataSource.getRepository(MockProductEntity);
          },
          inject: [DataSource],
        },
        {
          provide: StorageService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repo = module.get<Repository<MockProductEntity>>(getRepositoryToken(MockProductEntity));

    // Seed data
    const largeDescription = 'A'.repeat(5000); // 5KB description
    const products = [];
    for (let i = 0; i < 1000; i++) {
      const p = new MockProductEntity();
      p.title = `Product ${i}`;
      p.subtitle = `Subtitle ${i}`;
      p.view = i;
      p.amount = 100;
      p.description = largeDescription;
      products.push(p);
    }
    await repo.save(products, { chunk: 100 });
    console.log('Seeded 1000 products');
  });

  it('benchmark getPaginationProduct', async () => {
    const pagination: PaginationDto = {
      pageSize: 50, // Fetch 50 items
      pageNum: 1,
    };

    const iterations = 100;
    const start = process.hrtime();

    for (let i = 0; i < iterations; i++) {
        // Fetch random pages to avoid simple caching if any
        pagination.pageNum = (i % 10) + 1;
        await service.getPaginationProduct(pagination);
    }

    const end = process.hrtime(start);
    const durationInMs = (end[0] * 1000 + end[1] / 1e6);
    const avgTime = durationInMs / iterations;

    console.log(`BENCHMARK: Total time for ${iterations} calls: ${durationInMs.toFixed(2)}ms`);
    console.log(`BENCHMARK: Average time per call: ${avgTime.toFixed(2)}ms`);
  }, 60000);
});
