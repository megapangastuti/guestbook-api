SELECT
    vt.id,

    vt.visit_number,

    vt.visitor_id,

    vis.id AS visitor_master_id,
    vis.visitor_code,
    vis.name AS visitor_name,
    vis.company,

    vt.host_name,
    vt.purpose,

    vt.check_in_time,
    vt.check_out_time,

    vt.status,

    vt.created_by,

    u.id AS receptionist_id,
    u.name AS receptionist_name,

    vt.notes,

    vt.created_at,
    vt.updated_at

FROM visits vt

JOIN visitors vis
    ON vis.id = vt.visitor_id

LEFT JOIN users u
    ON u.id = vt.created_by

WHERE 1 = 1

AND (
    :search IS NULL

    OR vt.visit_number ILIKE CONCAT('%', :search, '%')

    OR vis.visitor_code ILIKE CONCAT('%', :search, '%')

    OR vis.name ILIKE CONCAT('%', :search, '%')

    OR vis.company ILIKE CONCAT('%', :search, '%')

    OR vt.host_name ILIKE CONCAT('%', :search, '%')

    OR vt.purpose ILIKE CONCAT('%', :search, '%')

    OR vt.status::TEXT ILIKE CONCAT('%', :search, '%')

    OR u.name ILIKE CONCAT('%', :search, '%')
)

ORDER BY vt.check_in_time DESC;