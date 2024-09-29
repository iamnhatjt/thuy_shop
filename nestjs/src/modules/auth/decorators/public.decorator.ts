import { SetMetadata } from '@nestjs/common';
import { __PUBLIC_API__ } from '../auth.contants';

export const Public = () => SetMetadata(__PUBLIC_API__, true);
