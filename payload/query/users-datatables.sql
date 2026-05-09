SELECT
    u.id,
    u.name,
    u.email,
    u.role,
    u.created_at,
    u.updated_at
FROM users u
WHERE 1 = 1
    AND (
        :search IS NULL
        OR u.name ILIKE CONCAT('%', :search, '%')
        OR u.email ILIKE CONCAT('%', :search, '%')
        OR u.role::TEXT ILIKE CONCAT('%', :search, '%')
    )
ORDER BY u.created_at DESC;