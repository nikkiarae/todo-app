# Use a multi-architecture compatible JDK image
FROM eclipse-temurin:18-jdk-jammy AS build

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

# Copy the project files
COPY . /app

# Set the working directory
WORKDIR /app

# Build the project
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:18-jre-jammy

# Copy the built JAR file
COPY --from=build /app/target/*.jar app.jar

# Set the entry point
ENTRYPOINT ["java", "-jar", "/app.jar"]