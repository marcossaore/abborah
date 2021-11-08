/*
  Warnings:

  - You are about to drop the column `projectId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `task_id` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_projectId_fkey`;

-- AlterTable
ALTER TABLE `Task` DROP COLUMN `projectId`,
    ADD COLUMN `task_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
