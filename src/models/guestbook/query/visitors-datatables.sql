SELECT
    v.id,
    v.visitor_code,
    v.name,
    v.phone,
    v.email,
    v.company,
    v.identity_number,
    v.created_at,
    v.updated_at
FROM visitors v
ORDER BY v.created_at DESC;