package nl.overheid.koop.basic.application.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

// Apart from wanting to control your error output, it also prevents the spring '/error' redirect which
// also creates new a request with a new correlation-id as side effect.
@ControllerAdvice
public class ExceptionConfig {

    @ExceptionHandler({AccessDeniedException.class})
    public ResponseEntity<Object> handleAccessDeniedException(final AccessDeniedException exception) {

        return ResponseEntity
            .status(HttpStatus.FORBIDDEN)
            .body(HttpStatus.FORBIDDEN.getReasonPhrase());
    }

    @ExceptionHandler({RuntimeException.class})
    public ResponseEntity<Object> handleRuntimeException(final RuntimeException exception) {

        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase());
    }
}