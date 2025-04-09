# Future Academy LMS

A monorepo learning management system built with Next.js, React, and Turborepo.

## Prerequisites

- Node.js (v20.14.0 or higher)
- pnpm (v8.15.4 or higher)

## Getting Started

1. Install pnpm globally (if you haven't already):

```bash
npm install -g pnpm
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the project for production
<!-- - `pnpm lint` - Run linting
- `pnpm test` - Run tests -->

## Project Structure

The project is organized as a monorepo with the following structure:

```
future_academy/
├── apps/
│   ├── tutor-dashboard/    # Tutor portal application
│   ├── students-portal/    # Student portal application
│   └── tutors-portal/      # Tutors management portal
├── packages/               # Shared packages and components
└── pnpm-workspace.yaml    # Monorepo configuration
```

## Development

Each app in the `apps` directory is a standalone Next.js application that can be developed independently.

<!-- The `packages` directory contains shared code and components used across applications. -->

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

<!-- ## License

ISC -->
