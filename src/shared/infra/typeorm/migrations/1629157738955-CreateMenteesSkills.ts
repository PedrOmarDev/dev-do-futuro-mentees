import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export default class CreateMenteesSkills1629157738955
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'mentees_skills',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'mentee_id',
            type: 'uuid',
          },
          {
            name: 'skill_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'MenteeSkill',
            referencedTableName: 'mentees',
            referencedColumnNames: ['id'],
            columnNames: ['mentee_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'SkillMentee',
            referencedTableName: 'skills',
            referencedColumnNames: ['id'],
            columnNames: ['skill_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('mentees_skills')
  }
}
