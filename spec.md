# Jonathan Ayan Insurance Broker Website

## Current State
Full insurance broker website with contact form storing submissions to backend canister. Admin panel at /admin requires Internet Identity login and a secret token to claim admin access. The token was previously unknown to the user, causing repeated "Access Denied" issues after each production deployment.

## Requested Changes (Diff)

### Add
- Pre-fill the admin secret token automatically in the admin panel UI so the owner (Jonathan Ayan) never needs to type it manually
- Replace the visible token input field with a simple one-click "Grant Me Admin Access" button

### Modify
- AdminPanel.tsx: Initialize adminSecret state with the known owner token `jonathan-admin-2026`
- AdminPanel.tsx: Hide the token input field (use hidden input), show only the claim button with clear label

### Remove
- Visible "Admin Secret Token" text input and label from the access denied / claim admin UI

## Implementation Plan
1. Update AdminPanel.tsx to pre-fill token and show simple one-click button (done)
2. Deploy draft and then production
