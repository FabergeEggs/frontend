# FROM node:lts AS deps
# WORKDIR /frontend
# COPY package*.json ./
# RUN npm ci

# FROM node:lts AS builder
# WORKDIR /frontend
# COPY . .
# COPY --from=deps /frontend/node_modules ./node_modules
# RUN npm run build

# # -------- DEV --------
# FROM node:20-alpine AS dev
# WORKDIR /frontend
# ENV NODE_ENV=development

# COPY package*.json ./
# RUN npm install

# COPY . .

# EXPOSE 3000
# CMD ["npm", "run", "dev"]

# # -------- PROD --------
# FROM node:lts AS prod
# WORKDIR /frontend
# ENV NODE_ENV=production

# COPY --from=builder /frontend/.next ./.next
# COPY --from=builder /frontend/public ./public
# COPY --from=builder /frontend/package.json ./package.json
# COPY --from=builder /frontend/node_modules ./node_modules

# EXPOSE 3000
# CMD ["npm", "start"]

FROM node:20-alpine AS base
WORKDIR /frontend
RUN corepack enable && corepack prepare yarn@stable --activate

FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --immutable

FROM base AS builder
COPY . .
COPY --from=deps /frontend/node_modules ./node_modules
RUN yarn build

FROM base AS dev
ENV NODE_ENV=development
COPY package.json yarn.lock ./
RUN yarn install --no-immutable
COPY . .
EXPOSE 3000
CMD ["yarn", "dev"]

FROM node:20-alpine AS prod
WORKDIR /frontend
ENV NODE_ENV=production
COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/package.json ./package.json
COPY --from=builder /frontend/node_modules ./node_modules
EXPOSE 3000
CMD ["yarn", "start"]