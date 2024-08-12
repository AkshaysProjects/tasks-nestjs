import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum } from 'class-validator';
import { TaskStatus } from 'src/tasks/enums/task-status.enum';
import { dateTransformer } from 'src/utils/date';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @Transform(({ value }) => dateTransformer(value))
  @IsDate()
  due_date: Date;
}
