--
-- PostgreSQL database dump
--

\restrict qEEDTpgBfaN9koIzGx0FUIHfgz9wYKL2MPA89UFs2q190L7hcOZ4DywnZ8dmqSK

-- Dumped from database version 17.10 (Homebrew)
-- Dumped by pg_dump version 17.10 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: AdminRole; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."AdminRole" AS ENUM (
    'SUPERADMIN',
    'EDITOR'
);


--
-- Name: Quartile; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Quartile" AS ENUM (
    'Q1',
    'Q2',
    'Q3',
    'Q4'
);


--
-- Name: UsefulBlockType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."UsefulBlockType" AS ENUM (
    'PARAGRAPH',
    'LIST'
);


--
-- Name: VerificationStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."VerificationStatus" AS ENUM (
    'VERIFIED',
    'PARTIALLY_VERIFIED',
    'NEEDS_MANUAL_REVIEW'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Journal; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Journal" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    "titleRu" text NOT NULL,
    "titleUz" text NOT NULL,
    "shortDescription" text NOT NULL,
    publisher text NOT NULL,
    website text NOT NULL,
    "coverImage" text,
    issn text,
    eissn text,
    country text,
    languages text[],
    "subjectAreas" text[],
    categories text[],
    "isScopusIndexed" boolean DEFAULT false NOT NULL,
    "isOakRecommended" boolean DEFAULT false NOT NULL,
    "scopusCoverageYears" text,
    citescore2025 double precision,
    citescore2026 double precision,
    percentile integer,
    quartile public."Quartile",
    "verificationStatus" public."VerificationStatus",
    "telegramUrl" text,
    "submissionUrl" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "shortDescriptionEn" text,
    "shortDescriptionRu" text,
    "shortDescriptionUz" text
);


--
-- Name: LegislationDocument; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."LegislationDocument" (
    id text NOT NULL,
    slug text NOT NULL,
    "titleRu" text NOT NULL,
    "titleUz" text NOT NULL,
    "titleEn" text NOT NULL,
    "summaryRu" text NOT NULL,
    "summaryUz" text NOT NULL,
    "summaryEn" text NOT NULL,
    "bodyRu" text[],
    "bodyUz" text[],
    "bodyEn" text[],
    "sourceUrl" text NOT NULL,
    "sourceLabelRu" text NOT NULL,
    "sourceLabelUz" text NOT NULL,
    "sourceLabelEn" text NOT NULL,
    category text NOT NULL,
    "publishedAt" timestamp(3) without time zone NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "editedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: ScopusContent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ScopusContent" (
    id text NOT NULL,
    "journalId" text NOT NULL,
    year integer NOT NULL,
    "documentsCount" integer NOT NULL
);


--
-- Name: SiteSettings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SiteSettings" (
    id text NOT NULL,
    "siteName" text DEFAULT 'UzAkademiya.uz'::text NOT NULL,
    "siteUrl" text DEFAULT 'https://uzakademiya.uz'::text NOT NULL,
    "contactEmail" text,
    "telegramUsername" text,
    "whatsappNumber" text,
    "phoneNumber" text,
    "instagramHandle" text,
    "instagramUrl" text,
    "defaultLocale" text DEFAULT 'ru'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: UsefulBlock; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UsefulBlock" (
    id text NOT NULL,
    "pageId" text NOT NULL,
    "sortOrder" integer NOT NULL,
    type public."UsefulBlockType" NOT NULL,
    "titleRu" text,
    "titleUz" text,
    "titleEn" text,
    "textRu" text,
    "textUz" text,
    "textEn" text,
    "itemsRu" text[],
    "itemsUz" text[],
    "itemsEn" text[]
);


--
-- Name: UsefulPage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UsefulPage" (
    id text NOT NULL,
    slug text NOT NULL,
    "titleRu" text NOT NULL,
    "titleUz" text NOT NULL,
    "titleEn" text NOT NULL,
    "cardTextRu" text NOT NULL,
    "cardTextUz" text NOT NULL,
    "cardTextEn" text NOT NULL,
    "shortTitleRu" text,
    "shortTitleUz" text,
    "shortTitleEn" text,
    "shortTextRu" text,
    "shortTextUz" text,
    "shortTextEn" text,
    "fullTitleRu" text,
    "fullTitleUz" text,
    "fullTitleEn" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: UsefulPageSource; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UsefulPageSource" (
    "pageId" text NOT NULL,
    "sourceId" text NOT NULL
);


--
-- Name: UsefulSource; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UsefulSource" (
    id text NOT NULL,
    "sourceKey" text NOT NULL,
    "titleRu" text NOT NULL,
    "titleUz" text NOT NULL,
    "titleEn" text NOT NULL,
    url text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    "fullName" text,
    role public."AdminRole" DEFAULT 'EDITOR'::public."AdminRole" NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "lastLoginAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- PostgreSQL database dump complete
--

\unrestrict qEEDTpgBfaN9koIzGx0FUIHfgz9wYKL2MPA89UFs2q190L7hcOZ4DywnZ8dmqSK

