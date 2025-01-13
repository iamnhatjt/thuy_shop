import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Expose, ExposeOptions } from 'class-transformer';

export const ExposeDisplay = (
  apiOption?: ApiPropertyOptions,
  exposeOption?: ExposeOptions,
) =>
  applyDecorators(
    ApiProperty({
      description: '',
      ...apiOption,
    }),
    Expose({
      ...exposeOption,
    }),
  );
