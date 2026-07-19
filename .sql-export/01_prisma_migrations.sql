--
-- PostgreSQL database dump
--

\restrict sFEWxYDSnkGy6NOhHVsHLhPFbY5wEouLwIYigyyScaZrZEdpLiYrEXFdkwAwT84

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
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('1a5b1ccf-ad12-43f1-9101-1230d5aeac24', '0b2c0da63d7a7a95da85a6126acdae73153b1d429654ac0ac4e644f3398ff2a9', '2026-07-17 03:22:33.711705+03', '0001_init', NULL, NULL, '2026-07-17 03:22:33.666928+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('a62eba01-82ef-40df-831d-96ea86d808a5', '436010ce946c749d9f900954c4b4351da86f536f3f17eee2b1b0f6f3c4476037', '2026-07-18 02:10:30.035783+03', '20260717231030_add_journal_localized_short_descriptions', NULL, NULL, '2026-07-18 02:10:30.024727+03', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('7dcf5457-a908-4ff3-9fa1-bf232c58ffd8', '3c78eeace810d63c76b562d5b442d78d4cc98785bd7156836db966d2c334a993', '2026-07-18 05:28:42.276002+03', '20260718022842_add_admin_user_model', NULL, NULL, '2026-07-18 05:28:42.258178+03', 1);


--
-- PostgreSQL database dump complete
--

\unrestrict sFEWxYDSnkGy6NOhHVsHLhPFbY5wEouLwIYigyyScaZrZEdpLiYrEXFdkwAwT84

