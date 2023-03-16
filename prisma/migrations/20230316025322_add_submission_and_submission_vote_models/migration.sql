-- CreateTable
CREATE TABLE "submission_vote" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "is_upvote" BOOLEAN NOT NULL,
    "user_id" UUID NOT NULL,
    "submission_id" UUID NOT NULL,

    CONSTRAINT "submission_vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submission" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "image_url" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "user_id" UUID NOT NULL,
    "recipeId" UUID NOT NULL,

    CONSTRAINT "submission_pkey" PRIMARY KEY ("id")
);
