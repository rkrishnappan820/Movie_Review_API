-- CreateIndex
CREATE INDEX "reviews_movie_id_idx" ON "reviews"("movie_id");

-- CreateIndex
CREATE INDEX "reviews_user_id_idx" ON "reviews"("user_id");

-- CreateIndex
CREATE INDEX "watchlists_user_id_idx" ON "watchlists"("user_id");
