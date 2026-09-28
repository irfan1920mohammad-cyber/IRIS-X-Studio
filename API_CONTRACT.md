# IRIS X Studio — API Contract & Architecture
**Project**: IRIS X Studio (AI Prompt Marketplace)  
**Assigned Owner**: Mohammad Irfan (Backend - API Layer)  
**Target Release ETA**: 12 October 2026  
**Current Milestone**: 28-30 September 2026 (Foundation & API Contracts)  

---

## 1. Overview & Architecture
This API contract defines the endpoints, payloads, response shapes, and error status codes provided by the Express backend for the IRIS X Studio Next.js frontend and admin dashboard.

- Base URL: http://localhost:5000/api
- Response Format: application/json
- Rule Compliance: Prompt data is served dynamically from the backend; premium prompt contents are never leaked publicly (masked with [PREMIUM CONTENT - UNLOCK TO ACCESS]).

---

## 2. Team Integration Points
- Gauresh More (Discovery Frontend): GET /api/prompts, GET /api/prompts/featured, GET /api/prompts/categories
- Harshad (Prompt Experience Frontend): GET /api/prompts/:id, GET /api/prompts/:id/preview
- Parmar Shubham (Admin Dashboard Frontend): GET /api/admin/prompts, POST /api/admin/prompts, PUT /api/admin/prompts/:id, DELETE /api/admin/prompts/:id, PATCH /publish, PATCH /feature
- Manoj N Dev (Backend - Data & Access): Database schema mapping (Mongoose/Neon PostgreSQL) & access token verification
- Shlok (Tech Team Lead): Shared API contract validation and PR integration
- Siddharth (Acting Team Lead): Milestone tracking (Foundation phase 28-30 Sep: ON TRACK)

---

## 3. Endpoints Summary
1. GET /api/health - Service health and team role info
2. GET /api/prompts - List and search prompts (category, tag, isPremium, search, sort)
3. GET /api/prompts/featured - Featured prompts for landing page
4. GET /api/prompts/categories - Categories and prompt counts
5. GET /api/prompts/:id - Prompt detail (safe for public, hides premium text)
6. GET /api/prompts/:id/preview - Prompt preview and output sample
7. GET /api/admin/prompts - Full prompt listings for Admin Dashboard
8. POST /api/admin/prompts - Create new prompt (with validation)
9. PUT /api/admin/prompts/:id - Update existing prompt
10. DELETE /api/admin/prompts/:id - Delete prompt
11. PATCH /api/admin/prompts/:id/publish - Toggle publish/unpublish
12. PATCH /api/admin/prompts/:id/feature - Toggle featured status
