Flight Booking API - Overview
This API allows users to search, book, and manage flight tickets. It includes user authentication, flight searching, booking management, and cancellation features.
Key Features:
✅ User Authentication: Signup, email verification, and login.
✅ Flight Search: Retrieve flights based on filters like departure city, arrival city, and departure date.
✅ Flight Details: Fetch specific flight details using a unique flight ID.
✅ Booking Management: Book flights, view booking details, list all user bookings, and cancel tickets.
✅ Seat Availability: Flight seat availability is updated dynamically upon booking or cancellation.
Endpoints Overview:
Auth: Signup (/auth/signup), Login (/auth/login)
Flights: Search flights (/api/flights), Get flight details (/api/flights/:flightId)
Booking: Book a flight (/api/booking), View booking details (/api/booking/:bookingId), List all bookings (/api/booking/user/:userId), Cancel booking (/api/booking/:bookingId/cancel)

🔹 Note: Users must verify their email to log in. Bookings require valid credentials.
Exposed my local port 8001 using ngrok:
req must be send on:
https://dc64-103-104-84-58.ngrok-free.app
then endpoints/.
