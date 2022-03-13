import {MigrationInterface, QueryRunner} from "typeorm";

export class InitAndUsers1647189142611 implements MigrationInterface {
    name = 'InitAndUsers1647189142611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "health_checks" ("id" SERIAL NOT NULL, "message" text NOT NULL, "date_created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_d44fff043c925e9cb7790950160" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "health_checks" ADD CONSTRAINT "FK_082889ad5057640e6377505d2fe" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "health_checks" DROP CONSTRAINT "FK_082889ad5057640e6377505d2fe"`);
        await queryRunner.query(`DROP TABLE "health_checks"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
