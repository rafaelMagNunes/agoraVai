import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddConstructionIdToIten1588958879693
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'itens',
      new TableColumn({
        name: 'construction_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'itens',
      new TableForeignKey({
        columnNames: ['construction_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'constructions',
        name: 'ItenConstruction',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('itens', 'ItenConstruction');

    await queryRunner.dropColumn('itens', 'construction_id');
  }
}
