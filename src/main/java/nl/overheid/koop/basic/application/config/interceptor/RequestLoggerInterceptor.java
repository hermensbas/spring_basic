package nl.overheid.koop.basic.application.config.interceptor;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.Nullable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.util.UUID;

@Slf4j
//@Component //see WebMvcConfig for imperative configuration instead.
public class RequestLoggerInterceptor implements HandlerInterceptor {

    private static final String START_TIME_ATTR_NAME = "startTime";
    private static final String EXECUTION_TIME_ATTR_NAME = "executionTime";
    private static final String CORRELATION_ID = "X-Correlation-Id";

    @Override
    public boolean preHandle(
        @NonNull
        final HttpServletRequest request,
        @NonNull
        final HttpServletResponse response,
        @NonNull
        final Object handler) throws Exception {

        log.info(
            "[preHandle][{}][{}] invoked by following user: {}",
            request.getMethod(),
            request.getRequestURI(),
            SecurityContextHolder.getContext().getAuthentication().getName());

        long startTime = System.currentTimeMillis();
        request.setAttribute(START_TIME_ATTR_NAME, startTime);

        var correlationId = request.getHeader(CORRELATION_ID);
        if (correlationId == null || correlationId.trim().isEmpty()) {

            correlationId = UUID.randomUUID().toString();
        }

        return HandlerInterceptor.super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(
        @NonNull
        final HttpServletRequest request,
        @NonNull
        final HttpServletResponse response,
        @NonNull
        final Object handler,
        @Nullable
        final ModelAndView modelAndView) throws Exception {

        log.info("[postHandle][{}][{}]", request.getMethod(), request.getRequestURI());

        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(
        @NonNull
        final HttpServletRequest request,
        @NonNull
        final HttpServletResponse response,
        @NonNull
        final Object handler,
        @Nullable
        final Exception ex) throws Exception {

        long startTime = (Long) request.getAttribute(START_TIME_ATTR_NAME);
        long endTime = System.currentTimeMillis();
        double executionTimeSeconds = (double) (endTime - startTime) / 1000;
        request.setAttribute(EXECUTION_TIME_ATTR_NAME, startTime);

        log.info(
            "[afterCompletion][{}][{}][executionTime:{}s]",
            request.getMethod(),
            request.getRequestURI(),
            executionTimeSeconds,
            ex);

        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
