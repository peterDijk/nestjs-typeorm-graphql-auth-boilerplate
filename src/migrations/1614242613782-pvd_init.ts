import {MigrationInterface, QueryRunner} from "typeorm";

export class pvdInit1614242613782 implements MigrationInterface {
    name = 'pvdInit1614242613782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "health_models" ("id" SERIAL NOT NULL, "message" text NOT NULL, "date_created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d60e56340d3cbae8517a2454ef6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "health_models"`);
    }

}
