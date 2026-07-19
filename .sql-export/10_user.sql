--
-- PostgreSQL database dump
--

\restrict igfpgZhmlYI9ekDTwZY4m2GSAgIlO573ZsoGEO5elThWu2RsgPF6PQosIbssozr

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
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."User" (id, email, "passwordHash", "fullName", role, "isActive", "lastLoginAt", "createdAt", "updatedAt") VALUES ('cmrpr6czg0000c1k1m0zh2nh6', 'jshodiev.20.11@gmail.com', 'scrypt:97720f4f497374f68d1554d33c68eae7:c24ee2d1adb1ed3353764bda7ed2ec78572d58fe4bfd6770d694a6312d1fc329d0bd2db618f4446539469cf719a8e6dc0f0527ddb45af8f1f949c38893df97dc', 'Jaavohir', 'SUPERADMIN', true, '2026-07-18 06:17:17.426', '2026-07-18 02:33:53.98', '2026-07-18 06:17:17.431');


--
-- PostgreSQL database dump complete
--

\unrestrict igfpgZhmlYI9ekDTwZY4m2GSAgIlO573ZsoGEO5elThWu2RsgPF6PQosIbssozr

