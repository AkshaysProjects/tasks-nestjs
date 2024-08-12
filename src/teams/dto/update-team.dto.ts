import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
