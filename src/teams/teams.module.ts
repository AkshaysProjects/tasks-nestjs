import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/auth.guard';
import { Task } from 'src/tasks/entities/task.entity';
import { Member } from 'src/teams/entities/member.entity';
import { Team } from 'src/teams/entities/team.entity';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Member, Task])],
  controllers: [TeamsController],
  providers: [JwtService, AuthGuard, TeamsService],
})
export class TeamsModule {}
