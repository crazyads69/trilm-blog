FROM node:18-alpine AS base

# Create app directory
WORKDIR /app

# Install Turborepo
FROM base AS builder
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=frontend --docker

# Install dependencies
FROM base AS installer
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=frontend...

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=installer /app/apps/frontend/public ./apps/frontend/public
COPY --from=installer /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=installer /app/apps/frontend/package.json ./apps/frontend/package.json
COPY --from=installer /app/apps/frontend/next.config.js ./apps/frontend/next.config.js
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/package.json ./package.json

WORKDIR /app/apps/frontend
EXPOSE 3000
CMD ["yarn", "start"]