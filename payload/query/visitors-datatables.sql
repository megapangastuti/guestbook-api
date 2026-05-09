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
WHERE 1 = 1
    AND (
        :search IS NULL
        OR v.visitor_code ILIKE CONCAT('%', :search, '%')
        OR v.name ILIKE CONCAT('%', :search, '%')
        OR v.phone ILIKE CONCAT('%', :search, '%')
        OR v.email ILIKE CONCAT('%', :search, '%')
        OR v.company ILIKE CONCAT('%', :search, '%')
        OR v.identity_number ILIKE CONCAT('%', :search, '%')
    )
ORDER BY v.created_at DESC;