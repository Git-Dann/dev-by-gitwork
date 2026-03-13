# Dev by Gitwork Marketplace Architecture

## Core entities

- Developers
- Skills
- Availability windows
- Clients
- Booking requests
- Confirmed bookings
- Connected payout accounts

## Suggested database tables

### developers
- id
- slug
- name
- role
- bio
- location
- timezone
- seniority
- day_rate
- hourly_rate
- rating
- vetted
- stripe_account_id
- cal_managed_user_id

### developer_skills
- id
- developer_id
- skill_name
- years_experience

### availability_windows
- id
- developer_id
- start_at
- end_at
- status

### clients
- id
- company_name
- contact_name
- email

### booking_requests
- id
- developer_id
- client_id
- start_date
- end_date
- status
- quoted_total
- platform_fee

### bookings
- id
- booking_request_id
- start_date
- end_date
- payout_status
- payment_status

## Integration notes

- Use Stripe Connect for marketplace payment flows and platform fees.
- Use Cal.com Platform or your own scheduling layer for availability and booking windows.
- Use Postgres for search, booking history, and ops reporting.
