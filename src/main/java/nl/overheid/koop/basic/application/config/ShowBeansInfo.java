package nl.overheid.koop.basic.application.config;

import nl.overheid.koop.basic.application.config.properties.ShowBeansInfoProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
//another example how to inject properties vs ConditionalOnProperty
@EnableConfigurationProperties(ShowBeansInfoProperties.class)
public class ShowBeansInfo implements CommandLineRunner {

    @Autowired
    private ApplicationContext applicationContext;

    @Autowired
    private ShowBeansInfoProperties loadInfoProperties;

    @Override
    public void run(final String... args) throws Exception {
        if (loadInfoProperties.getEnabled()) {

            System.out.println("<------------- Inspect which beans spring-boot initializes --------------->");
            Arrays.stream(applicationContext.getBeanDefinitionNames())
                .forEach(System.out::println);
        }
    }
}
