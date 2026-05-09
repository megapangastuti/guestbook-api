SELECT
    vt.visit_number,

    vis.visitor_code,
    vis.name AS visitor_name,
    vis.company,

    vt.host_name,
    vt.purpose,

    vt.check_in_time,
    vt.check_out_time,

    vt.status,

    u.name AS receptionist_name,

    vt.notes

FROM visits vt

JOIN visitors vis
    ON vis.id = vt.visitor_id

LEFT JOIN users u
    ON u.id = vt.created_by

ORDER BY vt.created_at DESC;