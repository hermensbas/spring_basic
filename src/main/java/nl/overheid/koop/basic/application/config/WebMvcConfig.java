package nl.overheid.koop.basic.application.config;

import nl.overheid.koop.basic.application.config.interceptor.RequestLoggerInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private static final String URL_PATTERN_ALL = "/**";

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new RequestLoggerInterceptor()).addPathPatterns(URL_PATTERN_ALL);
        //registry.addInterceptor(new AnotherExampleInterceptor()).addPathPatterns("/**").excludePathPatterns("/admin/**");
    }
}

