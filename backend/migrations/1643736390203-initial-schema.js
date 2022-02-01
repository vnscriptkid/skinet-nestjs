const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class initialSchema1643736390203 {
  name = 'initialSchema1643736390203';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE \`products\``);
  }
};
