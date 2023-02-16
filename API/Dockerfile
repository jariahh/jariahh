FROM node:18-buster AS nodePackages
WORKDIR /app
COPY package.* ./
RUN npm i

# Specify the Dart SDK base image version using dart:<version> (ex: dart:2.12)
FROM dart:stable AS build

# Resolve app dependencies.
WORKDIR /app
COPY pubspec.* ./
RUN dart pub get

# Copy app source code and AOT compile it.
COPY . .
# Ensure packages are still up-to-date if anything has changed
RUN dart pub get --offline
RUN dart compile exe bin/server.dart -o bin/server

# Build minimal serving image from AOT-compiled `/server` and required system
# libraries and configuration files stored in `/runtime/` from the build stage.
FROM alpine:3.14
COPY --from=build /runtime/ /
COPY --from=build /app/bin/server /app/bin/
COPY --from=build /app/bin/web /app/bin/web
COPY --from=nodePackages /app/node_modules /app/bin/node_modules
RUN ls /app/bin
# Start server.
EXPOSE 80
WORKDIR /app/bin
CMD ["./server"]
