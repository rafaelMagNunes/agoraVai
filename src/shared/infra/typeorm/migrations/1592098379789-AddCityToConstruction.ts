import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCityToConstruction1592098379789
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'constructions',
      new TableColumn({
        name: 'city',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('constructions', 'city');
  }
}
