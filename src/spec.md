# Specification

## Summary
**Goal:** Replace contact form time and day dropdowns with more specific hour selector and day-of-month input fields.

**Planned changes:**
- Replace the bestTimeToContact dropdown with an hour selector displaying all 24 hours in 12-hour or 24-hour format
- Replace the bestDayToContact dropdown with a day-of-month input allowing values 1-31
- Update the form submission hook to send the new hour and day formats to the backend
- Update the admin panel submissions table to display the specific hour and day-of-month values in readable format

**User-visible outcome:** Clients can select a specific hour of the day and enter a specific day of the month in the contact form. Admins see the precise time and day preferences in the submissions table.
