FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/*.jar restapp2.jar
ENTRYPOINT ["java","-jar","/restapp2.jar"]