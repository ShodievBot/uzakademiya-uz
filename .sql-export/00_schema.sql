-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Quartile" AS ENUM ('Q1', 'Q2', 'Q3', 'Q4');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('VERIFIED', 'PARTIALLY_VERIFIED', 'NEEDS_MANUAL_REVIEW');

-- CreateEnum
CREATE TYPE "UsefulBlockType" AS ENUM ('PARAGRAPH', 'LIST');

-- CreateTable
CREATE TABLE "Journal" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleRu" TEXT NOT NULL,
    "titleUz" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "coverImage" TEXT,
    "issn" TEXT,
    "eissn" TEXT,
    "country" TEXT,
    "languages" TEXT[],
    "subjectAreas" TEXT[],
    "categories" TEXT[],
    "isScopusIndexed" BOOLEAN NOT NULL DEFAULT false,
    "isOakRecommended" BOOLEAN NOT NULL DEFAULT false,
    "scopusCoverageYears" TEXT,
    "citescore2025" DOUBLE PRECISION,
    "citescore2026" DOUBLE PRECISION,
    "percentile" INTEGER,
    "quartile" "Quartile",
    "verificationStatus" "VerificationStatus",
    "telegramUrl" TEXT,
    "submissionUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScopusContent" (
    "id" TEXT NOT NULL,
    "journalId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "documentsCount" INTEGER NOT NULL,

    CONSTRAINT "ScopusContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegislationDocument" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleRu" TEXT NOT NULL,
    "titleUz" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "summaryRu" TEXT NOT NULL,
    "summaryUz" TEXT NOT NULL,
    "summaryEn" TEXT NOT NULL,
    "bodyRu" TEXT[],
    "bodyUz" TEXT[],
    "bodyEn" TEXT[],
    "sourceUrl" TEXT NOT NULL,
    "sourceLabelRu" TEXT NOT NULL,
    "sourceLabelUz" TEXT NOT NULL,
    "sourceLabelEn" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegislationDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsefulPage" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleRu" TEXT NOT NULL,
    "titleUz" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "cardTextRu" TEXT NOT NULL,
    "cardTextUz" TEXT NOT NULL,
    "cardTextEn" TEXT NOT NULL,
    "shortTitleRu" TEXT,
    "shortTitleUz" TEXT,
    "shortTitleEn" TEXT,
    "shortTextRu" TEXT,
    "shortTextUz" TEXT,
    "shortTextEn" TEXT,
    "fullTitleRu" TEXT,
    "fullTitleUz" TEXT,
    "fullTitleEn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsefulPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsefulBlock" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "type" "UsefulBlockType" NOT NULL,
    "titleRu" TEXT,
    "titleUz" TEXT,
    "titleEn" TEXT,
    "textRu" TEXT,
    "textUz" TEXT,
    "textEn" TEXT,
    "itemsRu" TEXT[],
    "itemsUz" TEXT[],
    "itemsEn" TEXT[],

    CONSTRAINT "UsefulBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsefulSource" (
    "id" TEXT NOT NULL,
    "sourceKey" TEXT NOT NULL,
    "titleRu" TEXT NOT NULL,
    "titleUz" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsefulSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsefulPageSource" (
    "pageId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,

    CONSTRAINT "UsefulPageSource_pkey" PRIMARY KEY ("pageId","sourceId")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL,
    "siteName" TEXT NOT NULL DEFAULT 'UzAkademiya.uz',
    "siteUrl" TEXT NOT NULL DEFAULT 'https://uzakademiya.uz',
    "contactEmail" TEXT,
    "telegramUsername" TEXT,
    "whatsappNumber" TEXT,
    "phoneNumber" TEXT,
    "instagramHandle" TEXT,
    "instagramUrl" TEXT,
    "defaultLocale" TEXT NOT NULL DEFAULT 'ru',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Journal_slug_key" ON "Journal"("slug");

-- CreateIndex
CREATE INDEX "Journal_slug_idx" ON "Journal"("slug");

-- CreateIndex
CREATE INDEX "Journal_isScopusIndexed_idx" ON "Journal"("isScopusIndexed");

-- CreateIndex
CREATE INDEX "Journal_isOakRecommended_idx" ON "Journal"("isOakRecommended");

-- CreateIndex
CREATE INDEX "Journal_quartile_idx" ON "Journal"("quartile");

-- CreateIndex
CREATE INDEX "ScopusContent_journalId_idx" ON "ScopusContent"("journalId");

-- CreateIndex
CREATE INDEX "ScopusContent_year_idx" ON "ScopusContent"("year");

-- CreateIndex
CREATE UNIQUE INDEX "ScopusContent_journalId_year_key" ON "ScopusContent"("journalId", "year");

-- CreateIndex
CREATE UNIQUE INDEX "LegislationDocument_slug_key" ON "LegislationDocument"("slug");

-- CreateIndex
CREATE INDEX "LegislationDocument_slug_idx" ON "LegislationDocument"("slug");

-- CreateIndex
CREATE INDEX "LegislationDocument_category_idx" ON "LegislationDocument"("category");

-- CreateIndex
CREATE INDEX "LegislationDocument_publishedAt_idx" ON "LegislationDocument"("publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "UsefulPage_slug_key" ON "UsefulPage"("slug");

-- CreateIndex
CREATE INDEX "UsefulPage_slug_idx" ON "UsefulPage"("slug");

-- CreateIndex
CREATE INDEX "UsefulBlock_pageId_idx" ON "UsefulBlock"("pageId");

-- CreateIndex
CREATE INDEX "UsefulBlock_sortOrder_idx" ON "UsefulBlock"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "UsefulSource_sourceKey_key" ON "UsefulSource"("sourceKey");

-- CreateIndex
CREATE INDEX "UsefulSource_sourceKey_idx" ON "UsefulSource"("sourceKey");

-- CreateIndex
CREATE INDEX "UsefulPageSource_sourceId_idx" ON "UsefulPageSource"("sourceId");

-- AddForeignKey
ALTER TABLE "ScopusContent" ADD CONSTRAINT "ScopusContent_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsefulBlock" ADD CONSTRAINT "UsefulBlock_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "UsefulPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsefulPageSource" ADD CONSTRAINT "UsefulPageSource_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "UsefulPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsefulPageSource" ADD CONSTRAINT "UsefulPageSource_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "UsefulSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AlterTable
ALTER TABLE "Journal" ADD COLUMN     "shortDescriptionEn" TEXT,
ADD COLUMN     "shortDescriptionRu" TEXT,
ADD COLUMN     "shortDescriptionUz" TEXT;
-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPERADMIN', 'EDITOR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT,
    "role" "AdminRole" NOT NULL DEFAULT 'EDITOR',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_isActive_idx" ON "User"("isActive");
