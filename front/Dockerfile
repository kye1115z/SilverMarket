# 프론트엔드 애플리케이션을 빌드하기 위한 이미지 설정
FROM node:14 as build

WORKDIR /app

# 프론트엔드 소스 코드 복사
COPY . .

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 프론트엔드 의존성 설치
RUN npm install

# 나머지 애플리케이션 빌드 및 실행 명령어 추가
# ...

# 컨테이너 실행 시 실행할 명령어 설정
CMD [ "npm", "start" ]