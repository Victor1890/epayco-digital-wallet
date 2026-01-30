FROM node:22

WORKDIR /app

RUN npm install -g pnpm@10.11.0

COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev", "--", "--host", "0.0.0.0"]
