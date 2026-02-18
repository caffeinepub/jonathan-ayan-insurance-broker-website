# Specification

## Summary
**Goal:** Fix admin authorization so that the Principal ID '5xjc2-y22qo-6hyhb-cz5mg-dskju-ngytr-slbw7-lwush-4ucbp-glcln-s' can access the admin panel in production.

**Planned changes:**
- Fix the backend authorization system to properly recognize the specified Principal ID as an admin
- Ensure admin Principal IDs persist in stable storage across canister upgrades

**User-visible outcome:** The user with Principal ID '5xjc2-y22qo-6hyhb-cz5mg-dskju-ngytr-slbw7-lwush-4ucbp-glcln-s' can successfully access the admin panel without seeing the "Access Denied" error, and this access persists after deployments.
