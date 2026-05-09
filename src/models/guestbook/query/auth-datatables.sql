SELECT
    u.id,
    u.email,
    u.created_at,
    u.updated_at
FROM users u

WHERE 1 = 1

AND (
    :search IS NULL

    OR u.email ILIKE CONCAT('%', :search, '%')
)

ORDER BY u.created_at DESC;