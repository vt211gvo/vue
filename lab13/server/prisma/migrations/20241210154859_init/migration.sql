-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
