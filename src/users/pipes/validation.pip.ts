import { ArgumentMetadata, PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // Write Your own Validation Pipe
    console.log('My Custom Validation PIPE ', value);
    return value;
  }
}
