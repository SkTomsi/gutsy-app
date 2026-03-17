-- AlterTable
ALTER TABLE "user" ADD COLUMN     "goals" TEXT[],
ADD COLUMN     "isOnboarded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "symptoms" TEXT[];
