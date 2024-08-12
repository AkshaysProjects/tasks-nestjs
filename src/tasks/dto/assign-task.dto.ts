import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignTaskDto {
  @IsNumber()
  @IsNotEmpty()
  team: number;

  @IsNumber()
  @IsNotEmpty()
  assignee: number;
}
