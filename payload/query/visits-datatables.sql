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
    ON u.id = vt.created_by;