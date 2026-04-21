FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

FROM node:18-alpine

WORKDIR /app

# Copy only necessary artifacts from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/app.js ./app.js

RUN chown -R node:node /app
USER node

CMD ["node", "app.js"]