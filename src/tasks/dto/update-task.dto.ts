import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsDateString, IsEnum, Validate } from 'class-validator';
import { TaskStatus } from 'src/tasks/enums/task-status.enum';
import { dateTransformer, IsDateFormatValid } from 'src/utils/date';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @Transform(({ value }) => dateTransformer(value), { toClassOnly: true })
  @Validate(IsDateFormatValid)
  @IsDateString()
  completed_at?: Date;
}
