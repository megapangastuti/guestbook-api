SELECT
    vt.visit_number,

    vis.visitor_code,
    vis.name AS visitor_name,
    vis.company,

    vt.host_name,
    vt.purpose,

    vt.check_in_time,

    u.name AS receptionist_name

FROM visits vt

JOIN visitors vis
    ON vis.id = vt.visitor_id

LEFT JOIN users u
    ON u.id = vt.created_by

WHERE vt.status = 'CHECKED_IN'
AND vt.check_out_time IS NULL

ORDER BY vt.check_in_time DESC;