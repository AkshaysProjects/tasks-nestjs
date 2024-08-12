import { AbstractEntity } from 'src/database/abstract.entity';
import { Member } from 'src/teams/entities/member.entity';
import { Column, Entity, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class Team extends AbstractEntity<Team> {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Member, (member) => member.team, { cascade: true })
  @JoinTable()
  members: Member[];
}
