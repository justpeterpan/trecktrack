/*
  Warnings:

  - Added the required column `endMileage` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startMileage` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Trip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "driverId" INTEGER NOT NULL,
    "startLocation" TEXT NOT NULL,
    "endLocation" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "startMileage" REAL NOT NULL,
    "endMileage" REAL NOT NULL,
    "distance" REAL NOT NULL,
    "duration" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Trip_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Trip" ("createdAt", "description", "distance", "driverId", "duration", "endLocation", "endTime", "id", "startLocation", "startTime", "updatedAt") SELECT "createdAt", "description", "distance", "driverId", "duration", "endLocation", "endTime", "id", "startLocation", "startTime", "updatedAt" FROM "Trip";
DROP TABLE "Trip";
ALTER TABLE "new_Trip" RENAME TO "Trip";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
