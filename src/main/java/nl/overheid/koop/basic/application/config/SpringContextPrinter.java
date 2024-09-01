package nl.overheid.koop.basic.application.config;

import nl.overheid.koop.basic.application.config.properties.LoadInfoProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
@EnableConfigurationProperties(LoadInfoProperties.class)
public class SpringContextPrinter implements CommandLineRunner {

    @Autowired
    private ApplicationContext applicationContext;

    @Autowired
    private LoadInfoProperties loadInfoProperties;

    @Override
    public void run(String... args) throws Exception {
        if (loadInfoProperties.getEnabled()) {

            System.out.println("<------------- Beans loaded --------------->");
            Arrays.stream(applicationContext.getBeanDefinitionNames())
                .forEach(System.out::println);
        }
    }
}
