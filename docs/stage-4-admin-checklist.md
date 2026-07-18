# UzAkademiya — Stage 4 Admin / Content Prep Checklist

## Current state audit

### Already implemented
- [x] Public frontend pages
- [x] i18n routing and multilingual pages
- [x] Prisma + PostgreSQL connection
- [x] Journal model
- [x] Scopus content model
- [x] Legislation model
- [x] Useful materials models
- [x] Site settings model
- [x] Seed scripts for core content
- [x] SEO/base metadata
- [x] Sitemap and robots
- [x] Stage 3 UI polish

### Missing for admin panel
- [ ] Admin authentication
- [ ] User/Admin model in Prisma
- [ ] Role/access model
- [ ] Protected `/admin` routes
- [ ] Admin layout/navigation
- [ ] CRUD for Site Settings
- [ ] CRUD for Useful Pages
- [ ] CRUD for Useful Sources
- [ ] CRUD for Legislation
- [ ] CRUD for Journals
- [ ] CRUD for Scopus yearly content
- [ ] Form validation layer
- [ ] Save/update/delete flows
- [ ] Admin UX states (loading/error/success)
- [ ] Basic audit/logging strategy
- [ ] Deployment/admin env checklist

---

## Stage 4 priority order

### 4.1 Foundation
- [ ] Decide auth strategy
- [ ] Add admin/user schema
- [ ] Add migration
- [ ] Create protected `/admin` route group
- [ ] Create admin login page
- [ ] Create admin dashboard shell

### 4.2 First editable entity
- [ ] Site Settings editor
- [ ] Save site name / contacts / default locale
- [ ] Show current saved values from DB

### 4.3 Useful materials CMS
- [ ] Useful pages list
- [ ] Create useful page
- [ ] Edit useful page
- [ ] Delete useful page
- [ ] Manage blocks
- [ ] Manage linked sources

### 4.4 Legislation CMS
- [ ] Legislation list
- [ ] Create document
- [ ] Edit document
- [ ] Delete document

### 4.5 Journals CMS
- [ ] Journals list
- [ ] Create journal
- [ ] Edit journal
- [ ] Delete journal
- [ ] Edit Scopus metrics
- [ ] Edit yearly Scopus content

### 4.6 Hardening
- [ ] Validation
- [ ] Error handling
- [ ] Empty states
- [ ] Access restrictions
- [ ] Final QA
- [ ] Production deploy checklist

---

## Recommended architecture

### Auth
Preferred:
- email/password admin login
- Prisma `User` model
- `role` field
- protected admin route group

### Minimum first release
- 1 superadmin user
- no public registration
- only internal admin access

### First CRUD target
1. Site Settings
2. Useful Pages
3. Legislation
4. Journals

---

## Notes
- Existing Prisma content structure is already suitable for admin CRUD.
- The main missing layer is authentication + admin interface.
- Stage 4 should start from backend/admin foundation, not from public UI.
