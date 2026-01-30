
# Multi-stage Dockerfile for TanStack Router Frontend (SSR)
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate
WORKDIR /app

# Stage 1: Install production dependencies
FROM base AS deps-prod
WORKDIR /app
ENV NODE_ENV=production
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod

# Stage 2: Install all dependencies (for build)
FROM base AS deps
WORKDIR /app
ENV NODE_ENV=development
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Stage 3: Build (client + SSR bundles)
FROM base AS build
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build the app (adjust script if needed)
RUN pnpm run build

# Stage 4: Runtime (SSR server)
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup -S app && adduser -S app -G app

# Copy only necessary runtime artifacts
COPY package.json pnpm-lock.yaml ./
COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/.output ./.output

USER app
EXPOSE ${PORT:-3000}

# Healthcheck (adjust endpoint if needed)
HEALTHCHECK --interval=2m --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)).then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Start SSR server (adjust script if needed)
CMD ["pnpm", "run", "serve:prod"]
