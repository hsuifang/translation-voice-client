FROM node:18-alpine AS build

WORKDIR /app/client

# Copy only the package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile

# Copy the rest of your source code
COPY . .

RUN pnpm run build

FROM nginx:alpine
RUN rm /usr/share/nginx/html/*
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/client/dist /usr/share/nginx/html