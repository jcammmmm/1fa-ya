@@echo off

REM launch cdn server
call python -m http.server --directory static

REM start database container
docker start postgresdb

REM launch backend services
cd server
call mvn spring-boot:run -DskipTests
cd ..

REM serve client code
cd client
npm start
cd ..
