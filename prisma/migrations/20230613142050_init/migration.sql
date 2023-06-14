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

-- CreateTable
CREATE TABLE "Machine" (
    "machine_id" SERIAL NOT NULL,
    "serial_number" INTEGER NOT NULL,
    "bach_id" INTEGER NOT NULL,

    CONSTRAINT "Machine_pkey" PRIMARY KEY ("machine_id")
);

-- AddForeignKey
ALTER TABLE "Machine" ADD CONSTRAINT "Machine_bach_id_fkey" FOREIGN KEY ("bach_id") REFERENCES "Bach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
