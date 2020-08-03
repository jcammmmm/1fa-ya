@@echo off

REM launch cdn server at port 8000 (default)
call python -m http.server -h 0.0.0.0

REM start database container
docker start postgresdb

REM launch backend services at port 8080 (default)
REM server configured to listen at 0.0.0.0 (application.properties)
cd server
call mvn spring-boot:run -DskipTests
cd ..

REM serve client code at port 9000 (default)
REM server configured to listen at 0.0.0.0 (webpack.config.json)
cd client
npm start
cd ..


REM Now access the app at you local ip address e.g. 192.168.1.15:9000
