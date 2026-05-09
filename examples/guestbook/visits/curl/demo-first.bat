@echo off
echo Testing FIRST endpoint for visits
echo Reading payload from payload/first.json
echo.
type payload\first.json
echo.

curl -X POST http://localhost:3000/api/guestbook/visits/first ^
  -H "Content-Type: application/json" ^
  -d @payload/first.json

echo.
echo Demo FIRST completed.
pause
