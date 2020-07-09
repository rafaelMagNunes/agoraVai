import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddStateToConstruction1592095839958
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'constructions',
      new TableColumn({
        name: 'state',
        type: 'varchar',
        length: '2',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('constructions', 'state');
  }
}
