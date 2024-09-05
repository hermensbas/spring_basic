package nl.overheid.koop.basic.application.config.properties;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Data
@Validated
@ConfigurationProperties(prefix = "application.show-beans-info")
public class ShowBeansInfoProperties {

    @NotNull
    private final Boolean enabled;
}