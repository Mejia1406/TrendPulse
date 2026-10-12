import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1791821835524 implements MigrationInterface {
    name = 'InitialSchema1791821835524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "social_media" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "logo" varchar NOT NULL, "color" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "trends" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar NOT NULL, "name" varchar NOT NULL, "socialMediaId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "publication_stats" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "likesCount" integer NOT NULL, "commentsCount" integer NOT NULL, "sharesCount" integer NOT NULL, "viewsCount" integer NOT NULL, "url" varchar NOT NULL, "trendId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "captureAt" datetime NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(150) NOT NULL, "password" varchar(255) NOT NULL, "role" varchar(20) NOT NULL DEFAULT ('user'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "temporary_trends" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar NOT NULL, "name" varchar NOT NULL, "socialMediaId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_4be99f6a51a7854459b1d82a1b1" FOREIGN KEY ("socialMediaId") REFERENCES "social_media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_trends"("id", "category", "name", "socialMediaId", "createdAt", "updatedAt") SELECT "id", "category", "name", "socialMediaId", "createdAt", "updatedAt" FROM "trends"`);
        await queryRunner.query(`DROP TABLE "trends"`);
        await queryRunner.query(`ALTER TABLE "temporary_trends" RENAME TO "trends"`);
        await queryRunner.query(`CREATE TABLE "temporary_publication_stats" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "likesCount" integer NOT NULL, "commentsCount" integer NOT NULL, "sharesCount" integer NOT NULL, "viewsCount" integer NOT NULL, "url" varchar NOT NULL, "trendId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "captureAt" datetime NOT NULL, CONSTRAINT "FK_f034219e7c734025a1834b34534" FOREIGN KEY ("trendId") REFERENCES "trends" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_publication_stats"("id", "likesCount", "commentsCount", "sharesCount", "viewsCount", "url", "trendId", "createdAt", "captureAt") SELECT "id", "likesCount", "commentsCount", "sharesCount", "viewsCount", "url", "trendId", "createdAt", "captureAt" FROM "publication_stats"`);
        await queryRunner.query(`DROP TABLE "publication_stats"`);
        await queryRunner.query(`ALTER TABLE "temporary_publication_stats" RENAME TO "publication_stats"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publication_stats" RENAME TO "temporary_publication_stats"`);
        await queryRunner.query(`CREATE TABLE "publication_stats" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "likesCount" integer NOT NULL, "commentsCount" integer NOT NULL, "sharesCount" integer NOT NULL, "viewsCount" integer NOT NULL, "url" varchar NOT NULL, "trendId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "captureAt" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "publication_stats"("id", "likesCount", "commentsCount", "sharesCount", "viewsCount", "url", "trendId", "createdAt", "captureAt") SELECT "id", "likesCount", "commentsCount", "sharesCount", "viewsCount", "url", "trendId", "createdAt", "captureAt" FROM "temporary_publication_stats"`);
        await queryRunner.query(`DROP TABLE "temporary_publication_stats"`);
        await queryRunner.query(`ALTER TABLE "trends" RENAME TO "temporary_trends"`);
        await queryRunner.query(`CREATE TABLE "trends" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "category" varchar NOT NULL, "name" varchar NOT NULL, "socialMediaId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "trends"("id", "category", "name", "socialMediaId", "createdAt", "updatedAt") SELECT "id", "category", "name", "socialMediaId", "createdAt", "updatedAt" FROM "temporary_trends"`);
        await queryRunner.query(`DROP TABLE "temporary_trends"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "publication_stats"`);
        await queryRunner.query(`DROP TABLE "trends"`);
        await queryRunner.query(`DROP TABLE "social_media"`);
    }

}
