FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install
# Add nodemon globally
RUN npm install -g nodemon

COPY . .

EXPOSE 8000

CMD ["nodemon", "index.js"]
