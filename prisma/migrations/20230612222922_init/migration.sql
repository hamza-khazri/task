-- CreateTable
CREATE TABLE "Bach" (
    "id" SERIAL NOT NULL,
    "bach_model" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "license" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bach_pkey" PRIMARY KEY ("id")
);
