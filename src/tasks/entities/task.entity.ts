import { AbstractEntity } from 'src/database/abstract.entity';
import { TaskStatus } from 'src/tasks/enums/task-status.enum';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, default: null })
  completed_at: Date;
}
