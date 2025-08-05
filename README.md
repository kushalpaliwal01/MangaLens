# MangaLens
Turn Japanese text in manga panels to English overlays on the phone

## Problem
Current methods don't take into account the context of the converstation which leads to wrong translations. Furthermore, the tools also ignore the speech bubbles present in the panels and so the overlay is not accurate and the readers suffer because of ugly and slow translators.

## Solution
1. Import image/pdf or camera snap of manga panels.
2. OCR bubbles + boxes.
3. Context Aware translate.
4. Clean bubble + overlay the translated text.
5. Allow user to save the result or export.

## Stack
React Native + Expo
Supabase (Auth, Postgres, Storage, )