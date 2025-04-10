PRD: App 8 – Website Builder (Next.js Version)

Overview

This PRD outlines the plan for App 8: Website Builder, part of the Self Cast Studios system. This version is a brand new build using Next.js, housed within its own /frontend directory and deployed via Vercel.

The app’s purpose is to generate a dynamic, SEO-optimized personal brand website for each client, using content from the central Supabase backend. This version does not include client authentication or dashboard functionality.

Objectives

Build a Next.js-based personal brand website

Use Supabase as the content source

Deploy to Vercel with optimized routing and SEO

Include hidden backlinks to the Self Cast Studios main site

Display dynamic blog posts, videos, and brand identity elements

App Structure

/frontend
├── components/         # Shared UI components
├── pages/              # Next.js routes
│   ├── index.tsx       # Homepage
│   ├── blog/[slug].tsx # Blog post pages
│   └── video/[id].tsx  # Video pages
├── public/             # Static assets (images, logos)
├── styles/             # Tailwind CSS
├── utils/              # Content fetchers, SEO helpers
├── next.config.js      # Build config
└── vercel.json         # Vercel deployment config

Key Features

1. Homepage Layout

Client name, tagline, profile image

Selected quote or mission statement

Recent blog posts preview

Embedded or linked shortform videos

Links to About, Blog, Contact sections

2. Blog System

Markdown-based blog posts stored in Supabase

SEO-friendly dynamic routing (/blog/[slug])

Each post includes:

Title, author, date

Markdown rendering with heading anchors

Thumbnail image

3. Video Display

Displays shortform or longform content

Supports embedded YouTube/Vimeo

Routing under /video/[id]

4. Hidden Backlinks

Footer HTML comments or <meta> tag links to https://selfcaststudios.com

Styled or positioned to remain invisible to users but indexable by crawlers

5. Content Fetching

Uses Supabase REST API (service role key stored in .env.local)

Fetches content types:

blogs

videos

profile_info (bio, links, images)

Vercel Deployment

Root directory: /frontend

Build command: npm run build

Output directory: .next

Environment Variables:

SUPABASE_URL

SUPABASE_SERVICE_ROLE_KEY

GitHub auto-deploy setup

Deliverables

Fully functional Next.js website

Branded and styled using Tailwind

Dynamic pages for blog + video

Hidden SEO backlink to Self Cast

Configured for Vercel CI/CD deployment

Timeline

Phase

Tasks

Est. Time

Setup

Next.js app scaffold, Vercel config

1 day

Content

Supabase schema sync, fetch logic

1–2 days

Layout

Home + blog + video components

2–3 days

SEO

Head tags, OpenGraph, backlinks

1 day

Polish

Styling, fallback handling

1–2 days

Total

—

6–9 days
