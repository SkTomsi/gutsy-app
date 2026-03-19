/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "USER" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isOnboarded" BOOLEAN NOT NULL DEFAULT false,
    "conditions" TEXT[],
    "goals" TEXT[],
    "loggingFrequency" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "notificationsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "checkInMorning" TEXT NOT NULL DEFAULT '08:00',
    "checkInAfternoon" TEXT NOT NULL DEFAULT '13:00',
    "checkInEvening" TEXT NOT NULL DEFAULT '20:00',
    "role" TEXT NOT NULL DEFAULT 'USER',

    CONSTRAINT "USER_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USER_email_key" ON "USER"("email");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"("id") ON DELETE CASCADE ON UPDATE CASCADE;
