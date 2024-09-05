package nl.overheid.koop.basic.application.config;

import nl.overheid.koop.basic.application.config.filter.CorrelationIdPropagateFilter;
import nl.overheid.koop.basic.application.config.filter.CorrelationIdRequiredFilter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServletConfig {

    private static final String URL_PATTERN_ALL = "/*";

    @Bean
    @ConditionalOnProperty(prefix = "application.correlation-id", name = "enabled", havingValue = "true", matchIfMissing = true)
    public FilterRegistrationBean<CorrelationIdPropagateFilter> correlationIdPropagateFilter() {

        var filterRegistrationBean = new FilterRegistrationBean<CorrelationIdPropagateFilter>();
        //filterRegistrationBean.addInitParameter("paramName", "paramValue");
        filterRegistrationBean.setName(CorrelationIdPropagateFilter.class.getSimpleName());

        filterRegistrationBean.setFilter(new CorrelationIdPropagateFilter());
        filterRegistrationBean.addUrlPatterns(URL_PATTERN_ALL);
        filterRegistrationBean.setOrder(1);

        return filterRegistrationBean;
    }

    @Bean
    @ConditionalOnProperty(prefix = "application.correlation-id", name = "required", havingValue = "true", matchIfMissing = true)
    public FilterRegistrationBean<CorrelationIdRequiredFilter> correlationIdRequiredFilter() {

        var filterRegistrationBean = new FilterRegistrationBean<CorrelationIdRequiredFilter>();
        //filterRegistrationBean.addInitParameter("paramName", "paramValue");
        filterRegistrationBean.setName(CorrelationIdRequiredFilter.class.getSimpleName());

        filterRegistrationBean.setFilter(new CorrelationIdRequiredFilter());
        filterRegistrationBean.addUrlPatterns(URL_PATTERN_ALL);
        filterRegistrationBean.setOrder(2);

        return filterRegistrationBean;
    }
}
