/*
  Warnings:

  - Added the required column `commenterId` to the `post_comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post_comment` ADD COLUMN `commenterId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `post_comment` ADD CONSTRAINT `post_comment_commenterId_fkey` FOREIGN KEY (`commenterId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
