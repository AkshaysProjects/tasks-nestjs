import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { Task } from 'src/tasks/entities/task.entity';
import { Member } from 'src/teams/entities/member.entity';
import { Team } from 'src/teams/entities/team.entity';
import { TeamsService } from 'src/teams/teams.service';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Team, Member])],
  controllers: [TasksController],
  providers: [JwtService, AuthGuard, TasksService, TeamsService],
})
export class TasksModule {}
