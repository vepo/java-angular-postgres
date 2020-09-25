package io.vepo.jap;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.Initialized;
import javax.enterprise.event.Observes;
import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.vepo.jap.infra.PasswordEncrypter;
import io.vepo.jap.user.User;
import io.vepo.jap.user.UserService;

@ApplicationScoped
public class ApplicationListener {
    private static final Logger logger = LoggerFactory.getLogger(ApplicationListener.class);
    @Inject
    private UserService userService;

    @Inject
    private PasswordEncrypter passwordEncrypter;

    public void postConstruct(@Observes @Initialized(ApplicationScoped.class) Object o) {
        if (!userService.findByUsername("admin").isPresent()) {
            logger.info("Admin not found! Creating it...");
            User adminUser = userService
                    .create(User.builder()
                            .username("admin")
                            .email("admin@jap.com")
                            .firstName("Admin")
                            .lastName("Administrator")
                            .hashedPassword(passwordEncrypter.encrypt("qwas1234"))
                            .admin(true)
                            .build());

            logger.info("admin={}", adminUser);
        }
    }

}
