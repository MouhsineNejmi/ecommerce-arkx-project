FROM node:18

WORKDIR /server

COPY package*.json ./
COPY prisma prisma

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

CMD [ "npm", "run", "dev" ]