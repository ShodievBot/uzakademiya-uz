--
-- PostgreSQL database dump
--

\restrict zebRN1IzBKNzMmpON80w1kVq4kP0vSnkLeAoR8MVK1TXS9k8UImlWwHoxAfyGpc

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

SET default_tablespace = '';

--
-- Name: Journal Journal_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Journal"
    ADD CONSTRAINT "Journal_pkey" PRIMARY KEY (id);


--
-- Name: LegislationDocument LegislationDocument_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."LegislationDocument"
    ADD CONSTRAINT "LegislationDocument_pkey" PRIMARY KEY (id);


--
-- Name: ScopusContent ScopusContent_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ScopusContent"
    ADD CONSTRAINT "ScopusContent_pkey" PRIMARY KEY (id);


--
-- Name: SiteSettings SiteSettings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SiteSettings"
    ADD CONSTRAINT "SiteSettings_pkey" PRIMARY KEY (id);


--
-- Name: UsefulBlock UsefulBlock_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsefulBlock"
    ADD CONSTRAINT "UsefulBlock_pkey" PRIMARY KEY (id);


--
-- Name: UsefulPageSource UsefulPageSource_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsefulPageSource"
    ADD CONSTRAINT "UsefulPageSource_pkey" PRIMARY KEY ("pageId", "sourceId");


--
-- Name: UsefulPage UsefulPage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsefulPage"
    ADD CONSTRAINT "UsefulPage_pkey" PRIMARY KEY (id);


--
-- Name: UsefulSource UsefulSource_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsefulSource"
    ADD CONSTRAINT "UsefulSource_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Journal_isOakRecommended_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Journal_isOakRecommended_idx" ON public."Journal" USING btree ("isOakRecommended");


--
-- Name: Journal_isScopusIndexed_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Journal_isScopusIndexed_idx" ON public."Journal" USING btree ("isScopusIndexed");


--
-- Name: Journal_quartile_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Journal_quartile_idx" ON public."Journal" USING btree (quartile);


--
-- Name: Journal_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Journal_slug_idx" ON public."Journal" USING btree (slug);


--
-- Name: Journal_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Journal_slug_key" ON public."Journal" USING btree (slug);


--
-- Name: LegislationDocument_category_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "LegislationDocument_category_idx" ON public."LegislationDocument" USING btree (category);


--
-- Name: LegislationDocument_publishedAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "LegislationDocument_publishedAt_idx" ON public."LegislationDocument" USING btree ("publishedAt");


--
-- Name: LegislationDocument_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "LegislationDocument_slug_idx" ON public."LegislationDocument" USING btree (slug);


--
-- Name: LegislationDocument_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "LegislationDocument_slug_key" ON public."LegislationDocument" USING btree (slug);


--
-- Name: ScopusContent_journalId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ScopusContent_journalId_idx" ON public."ScopusContent" USING btree ("journalId");


--
-- Name: ScopusContent_journalId_year_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "ScopusContent_journalId_year_key" ON public."ScopusContent" USING btree ("journalId", year);


--
-- Name: ScopusContent_year_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ScopusContent_year_idx" ON public."ScopusContent" USING btree (year);


--
-- Name: UsefulBlock_pageId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "UsefulBlock_pageId_idx" ON public."UsefulBlock" USING btree ("pageId");


--
-- Name: UsefulBlock_sortOrder_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "UsefulBlock_sortOrder_idx" ON public."UsefulBlock" USING btree ("sortOrder");


--
-- Name: UsefulPageSource_sourceId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "UsefulPageSource_sourceId_idx" ON public."UsefulPageSource" USING btree ("sourceId");


--
-- Name: UsefulPage_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "UsefulPage_slug_idx" ON public."UsefulPage" USING btree (slug);


--
-- Name: UsefulPage_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "UsefulPage_slug_key" ON public."UsefulPage" USING btree (slug);


--
-- Name: UsefulSource_sourceKey_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "UsefulSource_sourceKey_idx" ON public."UsefulSource" USING btree ("sourceKey");


--
-- Name: UsefulSource_sourceKey_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "UsefulSource_sourceKey_key" ON public."UsefulSource" USING btree ("sourceKey");


--
-- Name: User_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_email_idx" ON public."User" USING btree (email);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_isActive_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_isActive_idx" ON public."User" USING btree ("isActive");


--
-- Name: User_role_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "User_role_idx" ON public."User" USING btree (role);


--
-- Name: ScopusContent ScopusContent_journalId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ScopusContent"
    ADD CONSTRAINT "ScopusContent_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES public."Journal"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UsefulBlock UsefulBlock_pageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsefulBlock"
    ADD CONSTRAINT "UsefulBlock_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES public."UsefulPage"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UsefulPageSource UsefulPageSource_pageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsefulPageSource"
    ADD CONSTRAINT "UsefulPageSource_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES public."UsefulPage"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UsefulPageSource UsefulPageSource_sourceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UsefulPageSource"
    ADD CONSTRAINT "UsefulPageSource_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES public."UsefulSource"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict zebRN1IzBKNzMmpON80w1kVq4kP0vSnkLeAoR8MVK1TXS9k8UImlWwHoxAfyGpc

