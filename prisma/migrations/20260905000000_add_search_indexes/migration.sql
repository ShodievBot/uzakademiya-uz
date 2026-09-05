-- Enable trigram search for fast case-insensitive ILIKE '%q%' matches.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Trigram indexes on the columns the site searches against.
CREATE INDEX IF NOT EXISTS "Journal_title_trgm_idx"
  ON "Journal" USING gin ("title" gin_trgm_ops);

CREATE INDEX IF NOT EXISTS "Journal_titleRu_trgm_idx"
  ON "Journal" USING gin ("titleRu" gin_trgm_ops);

CREATE INDEX IF NOT EXISTS "Journal_titleUz_trgm_idx"
  ON "Journal" USING gin ("titleUz" gin_trgm_ops);

CREATE INDEX IF NOT EXISTS "Journal_publisher_trgm_idx"
  ON "Journal" USING gin ("publisher" gin_trgm_ops);

CREATE INDEX IF NOT EXISTS "Journal_shortDescription_trgm_idx"
  ON "Journal" USING gin ("shortDescription" gin_trgm_ops);

-- Filter indexes for the boolean/enum flags that the catalog uses in nearly every query.
CREATE INDEX IF NOT EXISTS "Journal_isScopusIndexed_idx"
  ON "Journal" ("isScopusIndexed");

CREATE INDEX IF NOT EXISTS "Journal_isOakRecommended_idx"
  ON "Journal" ("isOakRecommended");

CREATE INDEX IF NOT EXISTS "Journal_quartile_idx"
  ON "Journal" ("quartile");

-- GIN index for the array `has` subject filter.
CREATE INDEX IF NOT EXISTS "Journal_subjectAreas_gin_idx"
  ON "Journal" USING gin ("subjectAreas");

CREATE INDEX IF NOT EXISTS "Journal_createdAt_idx"
  ON "Journal" ("createdAt");
