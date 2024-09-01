package nl.overheid.koop.basic.application.config.properties;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Data
@Validated
@ConfigurationProperties(prefix = "application.load-info")
public class LoadInfoProperties {

    @NotNull
    private final Boolean enabled;
}