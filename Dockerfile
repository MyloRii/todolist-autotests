FROM mcr.microsoft.com/playwright:v1.21.0-focal

USER root
WORKDIR /automation

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . ./

RUN npx playwright install chromium

CMD npm run test