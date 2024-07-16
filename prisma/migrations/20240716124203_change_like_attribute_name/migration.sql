/*
  Warnings:

  - You are about to drop the column `number_value` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "number_value",
ADD COLUMN     "number_likes" INTEGER NOT NULL DEFAULT 0;
