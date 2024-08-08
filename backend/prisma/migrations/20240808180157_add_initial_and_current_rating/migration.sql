/*
  Warnings:

  - You are about to drop the column `rating` on the `film` table. All the data in the column will be lost.
  - Added the required column `currentRating` to the `film` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initialRating` to the `film` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "film" DROP COLUMN "rating",
ADD COLUMN     "currentRating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "initialRating" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "rating" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DOUBLE PRECISION NOT NULL,
    "filmId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rating_filmId_profileId_key" ON "rating"("filmId", "profileId");

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
