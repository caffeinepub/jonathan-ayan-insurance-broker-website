# Specification

## Summary
**Goal:** Fix admin access in the production environment so that authorized users can access the admin panel after publishing.

**Planned changes:**
- Ensure admin whitelist in backend uses consistent Principal ID configuration across draft and production environments
- Verify admin whitelist persists correctly during canister upgrades and deployments

**User-visible outcome:** Admin users can successfully access the admin panel at /admin in the production environment after publishing, with the same credentials that work in the draft environment.
