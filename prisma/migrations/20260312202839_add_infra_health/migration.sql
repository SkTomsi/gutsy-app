-- CreateTable
CREATE TABLE "DbHealth" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "code" INTEGER NOT NULL,

    CONSTRAINT "DbHealth_pkey" PRIMARY KEY ("id")
);
