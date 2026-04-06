This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## Project Structure

- `app/`: Contains the Next.js application routes and components.
- `AGENTS.md`: Contains critical rules and constraints for AI agents working on this project.
- `CLAUDE.md`: Configuration and context for the Claude Code assistant.

## Development Guidelines

### AI Agent Instructions
If you are an AI assistant working on this repository, please refer to `AGENTS.md` for specific instructions regarding the Next.js version and API conventions used in this project.

### Commands

| Command         | Description                                  |
| :-------------- | :------------------------------------------- |
| `npm run dev`   | Starts the development server                |
| `npm run build` | Builds the application for production        |
| `npm run start` | Starts the production server                 |
| `npm run lint`  | Runs ESLint to check for code quality issues |

## How to Use

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd tc-generator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file in the root directory and add any necessary environment variables.

4. **Run the project**:
   Follow the "Getting Started" section above to launch the development environment.

## Contributing

1. Create a new branch for your feature or bugfix.
2. Ensure your code follows the project's linting rules.
3. Submit a Pull Request with a detailed description of your changes.
