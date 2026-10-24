# Infinity Realty — Dubai Off-Plan Landing Pages

Standalone Next.js 15 app for `dxb.invest.infinityrealty.ae`. Leads are proxied server-side to the ERP `POST /api/crm/external/leads` (x-api-key), so round-robin and duplicate handling are reused.

- Routes: `/off-plan`, `/off-plan/{apartments,villas,townhouses}`, `/off-plan/[slug]`
- Projects: edit `src/lib/projects.ts` (add only verified facts)
- Campaign copy: `src/lib/campaigns.ts` (`?cg=gulf|international` or `utm_campaign` containing gulf/international)
- Env: see `.env.example`. Set `CRM_API_URL`/`CRM_API_KEY` in Vercel.
- Attribution: first/last touch stored in localStorage (skipped if `il_consent=denied`), sent in lead notes.
- Events (dataLayer, no PII): landing_page_view, project_view, category_select, lead_form_start/submit/success/error, whatsapp_click, consultation_booking_click.
- Rate limit and idempotency are in-memory per instance; use a shared store for strict guarantees.
- Not done: consent banner, legal copy review, real imagery, GTM/pixels, CRM-side attribution columns.
