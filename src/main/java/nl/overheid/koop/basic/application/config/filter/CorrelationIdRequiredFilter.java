package nl.overheid.koop.basic.application.config.filter;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

//@Component see ServletConfig for imperative configuration instead.
public class CorrelationIdRequiredFilter extends OncePerRequestFilter {

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

        final var correlationId = request.getHeader(CORRELATION_ID);
        if (correlationId == null || !correlationId.trim().isEmpty()) {
            response.sendError(
                HttpServletResponse.SC_BAD_REQUEST,
                String.format("The '%s' header is required", CORRELATION_ID));
            return;
        }

        filterChain.doFilter(request, response);
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
