package nl.overheid.koop.basic.application.config.filter;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import nl.overheid.koop.basic.application.config.context.TrackingContext;
import nl.overheid.koop.basic.application.config.context.TrackingContextHolder;
import org.slf4j.MDC;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

//@Component see ServletConfig for imperative configuration instead.
public class CorrelationIdPropagateFilter extends OncePerRequestFilter {

    private static final String CORRELATION_ID = "X-Correlation-Id";

    @Override
    protected void doFilterInternal(
        @NonNull
        final HttpServletRequest request,
        @NonNull
        final HttpServletResponse response,
        @NonNull
        final FilterChain filterChain)
        throws ServletException, IOException {

        var correlationId = request.getHeader(CORRELATION_ID);
        if (correlationId == null || correlationId.trim().isEmpty()) {

            correlationId = UUID.randomUUID().toString();
        }

        // Add to our custom context holder (mainly for learning purpose)
        TrackingContextHolder.setContext(new TrackingContext(correlationId), false);

        // Add the logback MDC in order to expose value to our logging pattern.
        MDC.put("cid", correlationId);

        // set correlation on the response header.
        response.setHeader(CORRELATION_ID, correlationId);

        try {
            filterChain.doFilter(request, response);
        } finally {
            TrackingContextHolder.clear();
            MDC.clear();
        }
    }

    //If the shouldNotFilterAsyncDispatch() method returns true, then the filter will not be called for the
    // subsequent async dispatch. However, if it returns false, the filter will be invoked for each async
    // dispatch, exactly once per thread
    @Override
    protected boolean shouldNotFilterAsyncDispatch() {
        return false;
    }

    @Override
    protected boolean shouldNotFilterErrorDispatch() {
        return false;
    }
}
