# Blog App

A full-stack blog built with Next.js. Visitors browse posts by category and subscribe by email,
and the admin manages everything from a private dashboard.

**Live demo:** https://blog-app-psi-blue.vercel.app

## Features
- Posts load 3 at a time with infinite scroll and skeleton placeholders
- Category filter (Technology, Startup, Lifestyle) handled on the server
- Admin panel to add and delete posts, with thumbnails uploaded to Cloudinary
- Email subscription list that the admin can view and manage (duplicates and invalid emails are rejected)
- Password-protected admin pages and write APIs through middleware, using a signed, expiring session cookie
- Post content is sanitized with DOMPurify before it is rendered
- Large phone photos are shrunk in the browser before upload
- Light/dark theme and a responsive layout tested on mobile

## Tech
- Next.js (App Router), React, TypeScript, Tailwind CSS
- Next.js API routes, Mongoose, MongoDB Atlas
- Cloudinary for images
- Deployed on Vercel, with a GitHub Action that keeps the free database awake

## Getting started
```bash
cp .env.example .env.local   # fill in the values
npm install
npm run dev                  # http://localhost:3000
```

The admin panel is at `/login` (use the `ADMIN_PASSWORD` you set).

## Environment variables
| Name | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `ADMIN_PASSWORD` | Password for the admin panel |
| `SESSION_SECRET` | Optional secret for signing the admin cookie (defaults to `ADMIN_PASSWORD`) |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Cloudinary credentials |

## Notes
- Thumbnails are limited to 4 MB (Vercel accepts request bodies up to 4.5 MB).
- `.github/workflows/keep-alive.yml` pings the API every hour so the free MongoDB cluster doesn't pause.
