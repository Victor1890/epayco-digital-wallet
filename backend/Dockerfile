FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

WORKDIR /app
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --lockfile
COPY . .
RUN pnpm run build

FROM node:22-alpine AS runner
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist

RUN pnpm install --prod --lockfile

EXPOSE ${PORT:-4000}

CMD ["node", "dist/main"]
