FROM node:lts AS dependencies
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm ci 
# ci означает чистую установку / используйте это для продакшена или просто используйте RUN npm install

FROM node:lts AS builder
WORKDIR /frontend
COPY . .
COPY --from=dependencies /frontend/node_modules ./node_modules
RUN npm run build

FROM node:lts AS runner
WORKDIR /frontend
ENV NODE_ENV=development

COPY --from=builder /frontend/public ./public
COPY --from=builder /frontend/package.json ./package.json
COPY --from=builder /frontend/.next ./.next
COPY --from=builder /frontend/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "dev"]