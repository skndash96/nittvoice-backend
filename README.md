# NITTVoice Backend
## Backend:
Repo: this
Deployment: https://nittvoice-backend.azurewebsites.net
Tech stack: Express JS, REST API, Prisma, PostgreSQL
Database: Supabase

## Frontend:
Repo: https://github.com/skndash96/nittvoice
Deployment: https://nittvoice.vercel.app
Tech stack: Next JS, React, Tailwind, Shadcn

## Auth Flow
1. User goes to client`/auth` and clicks the login with Dauth button
2. User is redirected to provider`/api/authorize` to allow the client to access the user's info
3. User is redirected back to Client/`login?code=abc`
4. Client makes an API request to the Server Route handler (NextJS)
5. Server fetches an access token by making a request to Provider`/api/token`
6. Server fetches user information by making a request to Provider`/api/resources/user`
7. Server signs a jwt containing user information as paylod with supabase jwt secret
8. Server sets the jwt as cookie.
9. Client reads the cookie and decodes the jwt to read user information.
10. Client and Server sets the token as bearer header in both `createBrowserClient` and `createServerClient` when needed.
11. Supabase tables are secured by RLS. Read and write access is given if request.jwt.claims::json ->> id matches with the record being queried.
12. Delete a cookie (#8) when user signs out