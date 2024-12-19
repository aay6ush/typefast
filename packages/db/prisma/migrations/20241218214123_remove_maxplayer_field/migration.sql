/*
  Warnings:

  - You are about to drop the column `isPublic` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `maxPlayers` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "isPublic",
DROP COLUMN "maxPlayers";
