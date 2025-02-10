# Use Golang image
FROM golang:1.22.3 AS builder

WORKDIR /app

# Copy files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the application
RUN go build -o main .

CMD ["./main"]
