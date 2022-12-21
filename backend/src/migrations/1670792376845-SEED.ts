import { MigrationInterface, QueryRunner } from "typeorm"

export class SEED1670792376845 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create a company with name "Pilotr" and address "Pilotr HQ" and country "Pilotrland" and employeeCount 100 and save it, with a admin user with email "johndoe@gmail.com" and password "password" and firstName "John" and lastName "Doe" and jobTitle "CEO" and role "ADMIN" and status "ACTIVE" and save it, and a data group with name "Pilotr Data" and description "Data created by Pilotr" and localDataPath "C:\Pilotr\Data" and totalData 0 and save it
        queryRunner.query(`INSERT INTO "company" ("name", "address", "country", "employeeCount") VALUES ('Pilotr', 'Pilotr HQ', 'Pilotrland', 100)`);
        queryRunner.query(`INSERT INTO "user" ("email", "password", "firstName", "lastName", "jobTitle", "role", "status") VALUES ('johndoe@gmail.com', 'password', 'John', 'Doe', 'CEO', 'ADMIN', 'ACTIVE')`);
        queryRunner.query(`INSERT INTO "data_group" ("name", "description", "localDataPath", "totalData") VALUES ('Pilotr Data', 'Data created by Pilotr', 'Pilotr\Data', 0)`);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       console.log("No down migration for SEED")
       queryRunner.query(`SELECT * FROM "company"`)
    }

}
