/*
  Warnings:

  - You are about to drop the `submission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `submission_vote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "submission";

-- DropTable
DROP TABLE "submission_vote";

-- CreateTable
CREATE TABLE "SubmissionVote" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "isUpvote" BOOLEAN NOT NULL,
    "userId" UUID NOT NULL,
    "submissionId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SubmissionVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "imageUrl" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "userId" UUID NOT NULL,
    "recipeId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);
