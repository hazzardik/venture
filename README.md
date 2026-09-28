# BIZONIQ v7 — Build Business IQ

BIZONIQ — адаптивный бизнес-тренажёр для новичков, действующих предпринимателей и тех, кто прокачивает бизнес-мышление.

## Что есть в v7
- 4 сменяемые траектории обучения без сброса прогресса;
- 56 коротких уроков по 8 направлениям;
- Business Dictionary;
- 32 бизнес-кейса;
- 4 симулятора: кофейня, SaaS, интернет-магазин, агентство;
- Business Coach с интерактивными сценариями;
- XP, уровни, streak и достижения;
- локальное автосохранение для гостей;
- экспорт/импорт прогресса JSON;
- регистрация и вход через Supabase Auth;
- облачная синхронизация прогресса между устройствами;
- Row Level Security в Supabase;
- PWA-режим для iPhone;
- адаптивный интерфейс для телефона и ПК.

## Supabase
Frontend использует только publishable key. Секретные/service-role ключи в репозитории отсутствуют. Данные каждого пользователя защищены RLS и доступны только владельцу.

## iPhone
Открой GitHub Pages сайт в Safari → Поделиться → На экран «Домой».

## Deploy
GitHub Pages автоматически публикуется из ветки `main` через GitHub Actions.


## Brand v6
BIZONIQ replaces the previous FORGE brand. The v6 dashboard adds Skill Map, continue-from-last-progress behavior and a saved-terms filter while preserving existing local and Supabase progress.


## Audience mechanics v6
- 6-question learning-path diagnostic;
- Daily Business Duel with one rewarded answer per day;
- 30-Day Founder Challenge;
- weekly XP target;
- Learning Archetype based only on completed learning modules;
- native Web Share / clipboard fallback;
- PWA install guidance and install prompt.


## Certificates v6
BIZONIQ certificates are server-issued after verified progress requirements. Certificates have unique IDs, a public verification endpoint and printable certificate pages. They are platform certificates of completion, not accredited diplomas.


## Billing v7
- Free + Pro pricing: 99 RUB/month or 799 RUB/year (~67 RUB/month, saves 389 RUB/year vs monthly).
- Supabase billing_customers, subscriptions and billing_events tables with RLS.
- Paddle.js checkout scaffold using browser-safe client token + Price IDs.
- Supabase paddle-webhook Edge Function with Paddle-Signature HMAC verification and idempotent event storage.
- Supabase paddle-portal Edge Function for Customer Portal management links.
- Pro gating is intentionally not enforced until Paddle credentials are configured, so the public beta never dead-ends behind an unpayable paywall.
- Set PADDLE_ENFORCE_PRO=true only after live/sandbox billing is fully connected and tested.


## Creator Console v9
- Private Creator Console at `/admin.html`, protected by authenticated creator roles.
- One-time hashed bootstrap codes activate creator accounts; plaintext bootstrap codes are never stored in the database.
- Product metrics: total users, daily/7-day activity, activation rate, practice rate, Pro intent, learning paths, popular lessons/cases, difficult cases and page views.
- Beta feedback review inside the console.
- Manual Pro grants by email for 7/30/90/365 days or lifetime.
- Secure Pro access codes `BZQ-PRO-XXXX-XXXX` with duration, redemption limits, expiration and deactivation.
- Access codes are stored as SHA-256 hashes; only the final four characters remain visible after creation.
- User code redemption is server-side and extends an existing manual entitlement.
- Creator audit log records code creation/deactivation and manual Pro grants/revocations.
- Direct client access to private code, analytics and audit tables is blocked by RLS.
