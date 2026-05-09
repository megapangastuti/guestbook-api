SELECT v.id,
       v.visit_number,
       v.visitor_id,
       vis.visitor_code,
       vis.name AS visitor_name,
       vis.company,
       v.host_name,
       v.purpose,
       v.check_in_time,
       v.check_out_time,
       v.status,
       v.created_by,
       u.name AS receptionist_name,
       v.notes,
       v.created_at,
       v.updated_at
FROM visits v
LEFT JOIN visitors vis ON vis.id = v.visitor_id
LEFT JOIN users u ON u.id = v.created_by
