import { AbstractEntity } from 'src/database/abstract.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Member } from 'src/teams/entities/member.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Team extends AbstractEntity<Team> {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Member, (member) => member.team, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  members: Member[];

  @OneToMany(() => Task, (task) => task.team, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tasks: Task[];
}
