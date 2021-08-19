import Skill from '@modules/skills/infra/typeorm/entities/Skill'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'

@Entity('mentees')
export default class Mentee {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  linkedin_link: string

  @Column()
  github_link: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToMany(() => Skill)
  @JoinTable({
    name: 'mentees_skills',
    joinColumn: {
      name: 'mentee_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'skill_id',
      referencedColumnName: 'id',
    },
  })
  skills: Skill[]
}
