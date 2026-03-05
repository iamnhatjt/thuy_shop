import { CommonEntity } from '../../../common/entity/common.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { AmountProductEntity } from '../../shopping-card/entities/amount-product.entity';
import { CategoryEntity } from '../../category/entities/category.entity';
import { FileEntity } from '../../file/entities/file.entity';

@Entity()
export class ProductEntity extends CommonEntity {
  @Column()
  title: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({
    name: 'original_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  originalPrice: number | null;

  @Column({ nullable: true })
  badge: string;

  @Column({ nullable: true })
  material: string;

  @Column({ nullable: true })
  height: string;

  @Column({ nullable: true })
  origin: string;

  @Column({ nullable: true })
  firmness: string;

  @Column({ nullable: true })
  certifications: string;

  @Column({ nullable: true })
  warranty: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ default: 0 })
  view: number;

  @Column({ default: 0 })
  amount: number;

  @OneToMany(() => AmountProductEntity, (card) => card.product, {
    onDelete: 'CASCADE',
  })
  amountShopCard: AmountProductEntity[];

  @ManyToMany(() => FileEntity)
  @JoinTable({
    name: 'product_images',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'file_id', referencedColumnName: 'id' },
  })
  images: FileEntity[];

  @ManyToMany(() => CategoryEntity, (category) => category.products)
  categories: CategoryEntity[];
}
