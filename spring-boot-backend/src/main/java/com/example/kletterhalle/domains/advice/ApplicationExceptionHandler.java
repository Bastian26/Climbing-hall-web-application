package com.example.kletterhalle.domains.advice;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApplicationExceptionHandler {

    // If you are getting this particular exception then invoke/redirect to this method -> syntax error = BAD_REQUEST
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public Map<String, CustomError> handleInvalidArgument(MethodArgumentNotValidException exception) {
        Map<String, CustomError> errorMap = new HashMap<>();
        // You get an list of erros -> for each error
        exception.getBindingResult().getFieldErrors().forEach(error -> {
            errorMap.put(error.getField(), new CustomError(error.getDefaultMessage(), 400, "Bad Request", LocalDateTime.now()));
            System.out.println(errorMap);
        });
        return errorMap;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<CustomError> membersNotFound(NotFoundException exception) {
        CustomError response = new CustomError();
        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setError(HttpStatus.BAD_REQUEST.getReasonPhrase());
        response.setErrorMessage(exception.getMessage());
        response.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<CustomError>(response, HttpStatus.BAD_REQUEST);
    }

    @Data
    @NoArgsConstructor
    private class CustomError {

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
        private LocalDateTime timestamp;
        private String errorMessage;
        private int status;
        private String error;

        public CustomError(String errorMessage, int status, String error, LocalDateTime timestamp) {
            this.errorMessage = errorMessage;
            this.status = status;
            this.error = error;
            this.timestamp = timestamp;
        }
    }
}
