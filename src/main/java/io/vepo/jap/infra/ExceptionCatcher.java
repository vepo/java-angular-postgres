package io.vepo.jap.infra;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Provider
public class ExceptionCatcher implements ExceptionMapper<RuntimeException> {
    private static final Logger logger = LoggerFactory.getLogger(ExceptionCatcher.class);

    @Override
    public Response toResponse(RuntimeException exception) {
        ExceptionResponse response = new ExceptionResponse();
        if (exception instanceof WebApplicationException) {
            response.setMessage(exception.getMessage());
            response.setStatusCode(((WebApplicationException) exception).getResponse().getStatus());
        } else {
            response.setStatusCode(500);
            response.setMessage("Internal Server Error!");
            logger.error("Uncached exception. Send 500!", exception);
        }
        return Response.status(response.getStatusCode()).entity(response).build();
    }

}
