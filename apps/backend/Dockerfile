FROM node:18-alpine AS base

# Installing dependencies
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1

# Create app directory
WORKDIR /app

# Install Turborepo
FROM base AS builder
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=backend --docker

# Install dependencies
FROM base AS installer
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN yarn turbo run build --filter=backend...

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=installer /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=installer /app/apps/backend/build ./apps/backend/build
COPY --from=installer /app/apps/backend/public ./apps/backend/public
COPY --from=installer /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=installer /app/apps/backend/src ./apps/backend/src
COPY --from=installer /app/apps/backend/config ./apps/backend/config
COPY --from=installer /app/apps/backend/.tmp ./apps/backend/.tmp
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/package.json ./package.json

WORKDIR /app/apps/backend
EXPOSE 1337
CMD ["yarn", "start"]