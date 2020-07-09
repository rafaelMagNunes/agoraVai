import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCepToConstruction1592095207618
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'constructions',
      new TableColumn({
        name: 'cep',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cosntructions', 'cep');
  }
}
