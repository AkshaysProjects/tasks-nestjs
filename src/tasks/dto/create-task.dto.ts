import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { dateTransformer } from 'src/utils/date';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @Transform(({ value }) => dateTransformer(value))
  @IsDate()
  due_date: Date;
}
