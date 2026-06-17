# Fix Profile Saving Bug

## Problem

Profile picture (avatar) and stats (age, heightCm, targetWeightKg, dailyCalorieGoal) don't persist when saved.

## Root Causes

1. **Silent error swallowing** in `ProfilePage.tsx` — the `catch` block is completely empty (`catch { // ignore }`), hiding any API errors from the user
2. **Potential ValidationPipe issue** — if the `avatar` base64 string is too large (>100KB default body parser limit), the request would fail silently. (Body parser limit was bumped to 2MB in a recent commit, but if the old server is still running, it still uses the 100KB limit.)
3. **No user feedback** — even on success, the user only sees a brief "Saved!" flash that may go unnoticed

## Required Changes

- [ ] Add error handling in `ProfilePage.tsx` — show error toast/message on failure
- [ ] Verify the `PATCH /api/auth/profile` endpoint receives the correct payload format
- [ ] Debug the actual API response by temporarily logging it
- [ ] Ensure the dev server was restarted after the body parser limit change
