import Mentee from '@modules/mentees/infra/typeorm/entities/Mentee'
import { TypeSkill } from '@modules/skills/enums/TypeSkillEnum'

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'

@Entity('skills')
export default class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({
    type: 'enum',
    enum: Object.values(TypeSkill),
  })
  mode: TypeSkill

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @ManyToMany(() => Mentee)
  @JoinTable({
    name: 'mentees_skills',
    joinColumn: {
      name: 'skill_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'mentee_id',
      referencedColumnName: 'id',
    },
  })
  mentees: Mentee[]
}
