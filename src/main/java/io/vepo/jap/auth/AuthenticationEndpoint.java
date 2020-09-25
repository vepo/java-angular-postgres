package io.vepo.jap.auth;

import static java.util.Objects.isNull;

import javax.annotation.security.PermitAll;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.Consumes;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.vepo.jap.infra.JwtUtils;
import io.vepo.jap.infra.PasswordEncrypter;
import io.vepo.jap.user.UserService;

@ApplicationScoped
@Path("/login")
public class AuthenticationEndpoint {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationEndpoint.class);

    @Inject
    private UserService userService;

    @Inject
    private PasswordEncrypter passwordEncrypter;

    @Inject
    private JwtUtils jwtUtils;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @PermitAll
    public AuthenticationResponse login(AuthenticationCredentials credentials) {
        logger.info("Trying to login: {}", credentials);
        validate(credentials);
        return userService.findByUsernameAndHashedPassword(credentials.getUsername(),
                passwordEncrypter.encrypt(credentials.getPassword()))
                .map(user -> AuthenticationResponse.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .token(jwtUtils.generate(user))
                        .build())
                .orElseThrow(() -> new NotAuthorizedException(""));
    }

    private void validate(AuthenticationCredentials credentials) {
        if (isNull(credentials)) {
            throw new BadRequestException("No credetials!");
        } else if (isNull(credentials.getUsername()) || credentials.getUsername().trim().isEmpty()) {
            throw new BadRequestException("No username!");
        } else if (isNull(credentials.getPassword()) || credentials.getPassword().trim().isEmpty()) {
            throw new BadRequestException("No password!");
        }
    }

}
