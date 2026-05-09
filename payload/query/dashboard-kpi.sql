SELECT

    -- total registered visitors
    (
        SELECT COUNT(*)
        FROM visitors
    ) AS total_visitors,

    -- total active visitors
    (
        SELECT COUNT(*)
        FROM visits
        WHERE status = 'CHECKED_IN'
        AND check_out_time IS NULL
    ) AS active_visitors,

    -- total visits today
    (
        SELECT COUNT(*)
        FROM visits
        WHERE DATE(check_in_time) = CURRENT_DATE
    ) AS visits_today,

    -- completed visits today
    (
        SELECT COUNT(*)
        FROM visits
        WHERE status = 'CHECKED_OUT'
        AND DATE(check_in_time) = CURRENT_DATE
    ) AS completed_visits_today;