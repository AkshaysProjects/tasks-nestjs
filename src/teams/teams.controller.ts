import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddMembersDto } from 'src/teams/dto/add-members.dto';
import { RemoveMembersDto } from 'src/teams/dto/remove-members.dto';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamsService } from './teams.service';

@UseGuards(AuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }

  @Post(':id/members')
  addMember(@Param('id') id: string, @Body() { members }: AddMembersDto) {
    return this.teamsService.addMembers(+id, members);
  }

  @Delete(':id/members')
  removeMembers(
    @Param('id') id: string,
    @Body() { members }: RemoveMembersDto,
  ) {
    return this.teamsService.removeMembers(+id, members);
  }

  @Get(':teamId/member/:memberId/tasks')
  findMemberTasks(
    @Param('teamId') teamId: string,
    @Param('memberId') memberId: string,
  ) {
    return this.teamsService.findMemberTasks(+teamId, +memberId);
  }
}
