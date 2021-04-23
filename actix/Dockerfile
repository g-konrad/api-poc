# Build and compile app
FROM rust:1.5 as builder
WORKDIR /usr/src/poc
COPY . .
RUN cargo install --path .

# Copy app to lighter image, run it
FROM debian:buster-slim
RUN apt-get update && \
    apt-get install -y extra-runtime-dependencies && \
    rm -rf /var/lib/apt/lists/*
COPY --from=builder /usr/local/cargo/bin/poc /usr/local/bin/poc

CMD ["poc"]
