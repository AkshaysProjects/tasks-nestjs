import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateMemberDto } from 'src/teams/dto/create-member.dto';

export class AddMembersDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMemberDto)
  members: CreateMemberDto[];
}
