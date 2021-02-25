import {MigrationInterface, QueryRunner} from "typeorm";

export class pvdInit1614283070985 implements MigrationInterface {
    name = 'pvdInit1614283070985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "health_checks" ("id" SERIAL NOT NULL, "message" text NOT NULL, "date_created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d44fff043c925e9cb7790950160" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "health_checks"`);
    }

}
