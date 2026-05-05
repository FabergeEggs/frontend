FROM node:lts AS deps
WORKDIR /frontend
COPY package*.json ./
RUN npm ci

FROM node:lts AS builder
WORKDIR /frontend
COPY . .
COPY --from=deps /frontend/node_modules ./node_modules
RUN yarn build

# -------- DEV --------
FROM node:20-alpine AS dev
WORKDIR /frontend
ENV NODE_ENV=development

COPY package*.json ./
RUN yarn install

# COPY . . # Wanna make sure that docker makes it by volume mapping, not by simply copying this
# Once we have everything working we can return COPY . . - that's good for production, when we want our source code to be in the image

EXPOSE 3000
CMD ["yarn", "dev"]

# -------- PROD --------
FROM node:lts AS prod
WORKDIR /frontend
ENV NODE_ENV=production

COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/package.json ./package.json
COPY --from=builder /frontend/node_modules ./node_modules

EXPOSE 3000
<<<<<<< HEAD
CMD ["yarn", "start"]

=======
CMD ["yarn", "start"]
>>>>>>> 7f4d649 (feat(api+FeedCard): Fixing API connection + feedcard)
