/*
  Warnings:

  - You are about to drop the column `finsihed` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Project` DROP COLUMN `finsihed`,
    ADD COLUMN `finished` BOOLEAN NULL DEFAULT false;
