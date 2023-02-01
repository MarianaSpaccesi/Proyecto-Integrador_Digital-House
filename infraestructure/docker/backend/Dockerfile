FROM amazoncorretto:17-alpine-jdk
ARG user db host password
ENV MYSQL_USER=$user MYSQL_DB=$db MYSQL_HOST=$host MYSQL_PASSWORD=$password
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
ADD Backend-0.0.1-SNAPSHOT.jar  app.jar
ADD application.properties application.properties
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
