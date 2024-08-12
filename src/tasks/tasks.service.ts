import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignTaskDto } from 'src/tasks/dto/assign-task.dto';
import { Task } from 'src/tasks/entities/task.entity';
import { TaskStatus } from 'src/tasks/enums/task-status.enum';
import { Team } from 'src/teams/entities/team.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
    @InjectRepository(Team) private readonly teamsRepository: Repository<Team>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return this.tasksRepository.save(createTaskDto);
  }

  findAll() {
    return this.tasksRepository.find();
  }

  findOne(id: number) {
    return this.tasksRepository.findOne({
      where: { id },
      relations: { team: true, assignee: true },
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    if (updateTaskDto.status === TaskStatus.Completed)
      updateTaskDto.completed_at = new Date();
    return this.tasksRepository
      .update({ id }, updateTaskDto)
      .then(() => this.tasksRepository.findOneBy({ id }));
  }

  remove(id: number) {
    return this.tasksRepository.delete({ id });
  }

  async assign(id: number, assignTaskDto: AssignTaskDto) {
    const task = await this.findOne(id);

    if (!task) throw new NotFoundException('Task not found');

    if (task.assignee) throw new ConflictException('Task already assigned');

    const team = await this.teamsRepository.findOne({
      where: { id: assignTaskDto.team },
      relations: { members: true },
    });

    if (!team) throw new NotFoundException('Team not found');

    if (!team.members.some((member) => member.id === assignTaskDto.assignee))
      throw new NotFoundException('Assignee is not a member of the team');

    return this.tasksRepository
      .update(
        { id },
        {
          status: TaskStatus.Assigned,
          team,
          assignee: { id: assignTaskDto.assignee },
        },
      )
      .then(() =>
        this.tasksRepository.findOne({
          where: { id },
          relations: { team: true, assignee: true },
        }),
      );
  }

  async unassign(id: number) {
    const task = await this.findOne(id);

    if (!task) throw new NotFoundException('Task not found');

    if (!task.assignee) throw new ConflictException('Task not assigned');

    return this.tasksRepository
      .update(
        { id },
        { status: TaskStatus.Pending, team: null, assignee: null },
      )
      .then(() =>
        this.tasksRepository.findOne({
          where: { id },
          relations: { team: true, assignee: true },
        }),
      );
  }
}
