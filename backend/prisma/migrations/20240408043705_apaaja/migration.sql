/*
  Warnings:

  - A unique constraint covering the columns `[nameTag]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tag_nameTag_key" ON "Tag"("nameTag");
