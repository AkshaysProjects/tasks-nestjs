import { AbstractEntity } from 'src/database/abstract.entity';
import { Team } from 'src/teams/entities/team.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Member extends AbstractEntity<Member> {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => Team, (team) => team.members)
  team: Team;
}
