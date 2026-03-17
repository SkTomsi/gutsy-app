/*
  Warnings:

  - You are about to drop the column `symptoms` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "symptoms",
ADD COLUMN     "checkInAfternoon" TEXT NOT NULL DEFAULT '13:00',
ADD COLUMN     "checkInEvening" TEXT NOT NULL DEFAULT '20:00',
ADD COLUMN     "checkInMorning" TEXT NOT NULL DEFAULT '08:00',
ADD COLUMN     "conditions" TEXT[],
ADD COLUMN     "loggingFrequency" TEXT,
ADD COLUMN     "notificationsEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user',
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'UTC';
