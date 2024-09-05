package nl.overheid.koop.basic.application.config.context;

import org.springframework.core.NamedInheritableThreadLocal;
import org.springframework.core.NamedThreadLocal;
import org.springframework.lang.Nullable;


public class TrackingContextHolder {

    private static final ThreadLocal<TrackingContext> localRequestContextHolder = new NamedThreadLocal<>(
        "TrackingContext");
    private static final ThreadLocal<TrackingContext> inheritableRequestContextHolder = new NamedInheritableThreadLocal<>(
        "InheritableTrackingContext");

    public static void clear() {
        localRequestContextHolder.remove();
        inheritableRequestContextHolder.remove();
    }

    public static void setContext(
        @Nullable
        final TrackingContext attributes,
        final boolean inheritable) {

        if (attributes == null) {
            clear();
        } else {
            if (inheritable) {
                inheritableRequestContextHolder.set(attributes);
                localRequestContextHolder.remove();
            } else {
                localRequestContextHolder.set(attributes);
                inheritableRequestContextHolder.remove();
            }
        }
    }

    public static TrackingContext getContext() {

        var context = localRequestContextHolder.get();
        if (context == null) {
            context = inheritableRequestContextHolder.get();
        }

        return context;
    }

}