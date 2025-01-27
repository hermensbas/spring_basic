package nl.overheid.koop.basic.application.controller;

import lombok.extern.slf4j.Slf4j;
import nl.overheid.koop.basic.application.config.context.TrackingContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Secured({"ROLE_admin"})
@RequestMapping("/private/admin")
@RestController
public class AdminRoleController {

    @GetMapping(value = "/hi", produces = {MediaType.TEXT_PLAIN_VALUE})
    public ResponseEntity<String> hi() {

        final Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        final UserDetails user = (UserDetails) principal;

        log.info("correlationId: {}", TrackingContextHolder.getContext().correlationId());

        return ResponseEntity
            .status(HttpStatus.OK)
            .body("Hello " + user.getUsername());
    }

}
