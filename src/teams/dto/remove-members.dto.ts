import { IsArray, IsEmail } from 'class-validator';

export class RemoveMembersDto {
  @IsArray()
  @IsEmail({}, { each: true })
  members: string[];
}
