# BIZONIQ v6 — Build Business IQ

BIZONIQ — адаптивный бизнес-тренажёр для новичков, действующих предпринимателей и тех, кто прокачивает бизнес-мышление.

## Что есть в v6
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
