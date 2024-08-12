import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/teams/entities/member.entity';
import { Team } from 'src/teams/entities/team.entity';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Member])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
