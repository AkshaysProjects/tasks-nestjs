import { AbstractEntity } from 'src/database/abstract.entity';
import { TaskStatus } from 'src/tasks/enums/task-status.enum';
import { Member } from 'src/teams/entities/member.entity';
import { Team } from 'src/teams/entities/team.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task extends AbstractEntity<Task> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  due_date: Date;

  @Column({ default: TaskStatus.Pending })
  status: TaskStatus;

  @ManyToOne(() => Team, (team) => team.tasks, { nullable: true })
  team: Team;

  @ManyToOne(() => Member, (member) => member.tasks, { nullable: true })
  assignee: Member;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  completed_at: Date;
}
