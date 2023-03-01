# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
FROM node:lts-alpine3.13
RUN  apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
    chromium \
    harfbuzz \
    "freetype>2.8" \
    ttf-freefont \
    nss

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /app

COPY ./package.json ./
# COPY ./package-lock.json ./

RUN npm install

COPY . .

ENV PORT 3006
EXPOSE 3006
EXPOSE 2525
# Set the executable path for Chromium
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser"
CMD [ "npm", "start" ]