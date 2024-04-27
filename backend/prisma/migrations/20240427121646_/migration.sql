-- CreateTable
CREATE TABLE "report" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "quiz_id" INTEGER,
    "report_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status_review" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
