import { SetMetadata } from '@nestjs/common';

export const Is_Public_key = 'Is_Public';

export const Public = () => SetMetadata(Is_Public_key, true);
