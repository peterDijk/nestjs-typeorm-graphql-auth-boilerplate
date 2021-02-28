import {MigrationInterface, QueryRunner} from "typeorm";

export class HealthAddUserRelation1614520902977 implements MigrationInterface {
    name = 'HealthAddUserRelation1614520902977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "health_checks" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "health_checks" ADD CONSTRAINT "FK_082889ad5057640e6377505d2fe" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "health_checks" DROP CONSTRAINT "FK_082889ad5057640e6377505d2fe"`);
        await queryRunner.query(`ALTER TABLE "health_checks" DROP COLUMN "user_id"`);
    }

}
