--
-- PostgreSQL database dump
--

\restrict OYWttZzHi2oi5nPbrqUHr92m7x528xji6HgDQx9UbiCewHtCWiHbMNXIRgVmFRK

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
-- Data for Name: SiteSettings; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."SiteSettings" (id, "siteName", "siteUrl", "contactEmail", "telegramUsername", "whatsappNumber", "phoneNumber", "instagramHandle", "instagramUrl", "defaultLocale", "createdAt", "updatedAt") VALUES ('main-site-settings', 'UzAkademiya.uz', 'https://uzakademiya.uz', 'info-1@uzakademiya.uz', 'Shodiev20_11', '+998912345678', '+998912345678', 'Scopus_nashri', 'https://instagram.com/Scopus_nashri', 'ru', '2026-07-17 00:45:54.289', '2026-07-18 02:57:22.913');


--
-- PostgreSQL database dump complete
--

\unrestrict OYWttZzHi2oi5nPbrqUHr92m7x528xji6HgDQx9UbiCewHtCWiHbMNXIRgVmFRK

