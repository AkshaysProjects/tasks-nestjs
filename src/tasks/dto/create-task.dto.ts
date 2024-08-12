import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString, Validate } from 'class-validator';
import { dateTransformer, IsDateFormatValid } from 'src/utils/date';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @Transform(({ value }) => dateTransformer(value), { toClassOnly: true })
  @Validate(IsDateFormatValid)
  @IsDateString()
  due_date: Date;
}
