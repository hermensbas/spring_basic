package nl.overheid.koop.basic.application;

import jakarta.annotation.PreDestroy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.Banner;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;


//@SpringBootApplication we used explicit annotations instead to expose the abstractions.

@Slf4j
@EnableAutoConfiguration
@ComponentScan(basePackages = "nl.overheid.koop.basic.application")
@Configuration
public class Main {

    public static void main(final String[] args) {

        final var springApplication = new SpringApplicationBuilder(Main.class)
            .bannerMode(Banner.Mode.CONSOLE)
            .logStartupInfo(true)
            .build();

        springApplication.run(args);
    }

    @EventListener
    void onStartup(ApplicationReadyEvent event) {
        log.info("################################# APPLICATION STARTED #################################");
    }

    @PreDestroy
    void onShutdown() {
        log.info("################################# APPLICATION STOPPED #################################");
    }

}