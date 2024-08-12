import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { CreateMemberDto } from 'src/teams/dto/create-member.dto';
import { Member } from 'src/teams/entities/member.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Repository, TypeORMError } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private readonly teamsRepository: Repository<Team>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
  ) {}

  create(createTeamDto: CreateTeamDto) {
    return this.teamsRepository.save(createTeamDto).catch((error) => {
      if (
        error instanceof TypeORMError &&
        error.message.startsWith('Duplicate entry') &&
        error.message.includes('member.IDX')
      )
        throw new ConflictException(
          'Member with this email already exists in another team',
        );
    });
  }

  findAll() {
    return this.teamsRepository.find();
  }

  findOne(id: number) {
    return this.teamsRepository.findOne({
      where: { id },
      relations: { members: true },
    });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.teamsRepository.update(id, updateTeamDto).catch((error) => {
      if (
        error instanceof TypeORMError &&
        error.message.startsWith('Duplicate entry') &&
        error.message.includes('member.IDX')
      )
        throw new ConflictException(
          'Member with this email already exists in another team',
        );
    });
  }

  remove(id: number) {
    return this.teamsRepository.delete(id);
  }

  async addMembers(id: number, members: CreateMemberDto[]) {
    const existingMembers = await this.memberRepository.find({
      where: members.map((member) => ({ email: member.email })),
      relations: ['team'],
    });

    const errors = existingMembers
      .filter((member) => member.team && member.team.id !== id)
      .map((member) => ({
        email: member.email,
        message: `Member with this email already exists in another team (Team ID: ${member.team.id})`,
      }));

    const validMembers = members.filter(
      (member) => !existingMembers.some((em) => em.email === member.email),
    );

    if (validMembers.length > 0) {
      await this.memberRepository.upsert(
        validMembers.map((member) => ({ ...member, team: { id } })),
        ['email'],
      );
    }

    if (errors.length > 0) {
      throw new ConflictException({
        statusCode: 409,
        successfulInserts: validMembers.length,
        errors,
      });
    }

    return { statusCode: 200, successfulInserts: validMembers.length };
  }

  async removeMembers(id: number, members: string[]) {
    const existingMembers = await this.memberRepository.find({
      where: members.map((member) => ({ email: member })),
      relations: { team: true },
    });

    const errors = members
      .filter((member) => !existingMembers.some((em) => em.email === member))
      .map((member) => ({
        email: member,
        message: `Member with this email does not exist in this team (Team ID: ${id})`,
      }));

    const validMembers = existingMembers.filter(
      (member) => member.team && member.team.id === id,
    );

    if (validMembers.length > 0) {
      await this.memberRepository.delete(
        validMembers.map((member) => member.id),
      );
    }

    if (errors.length > 0) {
      throw new ConflictException({
        statusCode: 404,
        successfulDeletes: validMembers.length,
        errors,
      });
    }

    return { statusCode: 200, successfulDeletes: validMembers.length };
  }

  findMemberTasks(teamId: number, memberId: number) {
    return this.tasksRepository.find({
      where: { team: { id: teamId }, assignee: { id: memberId } },
      relations: { team: true },
    });
  }
}
