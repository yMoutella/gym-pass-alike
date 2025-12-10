-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'T1', 'T2', 'T3');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'FREE';
