package nl.overheid.koop.basic.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

//@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan(basePackages = "nl.overheid.koop.basic.application")
@Configuration
public class Main {

    public static void main(final String[] args) {

        final var springApplication = new SpringApplication(Main.class);
        springApplication.run(args);
    }

}