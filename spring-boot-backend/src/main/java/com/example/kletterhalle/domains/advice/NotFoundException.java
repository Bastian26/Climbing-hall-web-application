package com.example.kletterhalle.domains.advice;

public class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super(message);
    }
}