package io.vepo.jap.infra;

import java.security.PrivateKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JOSEObjectType;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSSigner;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import io.vepo.jap.user.User;

@ApplicationScoped
public class JwtUtils {
    private static final String[] USER_ROLES = new String[] {
        "USER"
    };

    private static final String[] ADMIN_ROLES = new String[] {
        "ADMIN",
        "USER"
    };

    @Inject
    @ConfigProperty(name = "mp.jwt.verify.issuer")
    String issuer;

    @Inject
    PrivateKey privateKey;

    @Inject
    @ConfigProperty(name = "mp.jwt.expiration.time.in.minutes", defaultValue = "1000")
    int expirationTime;

    public String generate(User user) {
        try {
            JWTClaimsSet jwtClaims = new JWTClaimsSet.Builder()
                    .issuer(issuer)
                    .subject(user.getId().toString())
                    .issueTime(Date.from(Instant.now()))
                    .notBeforeTime(Date.from(Instant.now()))
                    .expirationTime(Date.from(Instant.now().plus(expirationTime, ChronoUnit.MINUTES)))
                    .jwtID(UUID.randomUUID().toString())
                    .claim("nickname", user.getUsername())
                    .claim("givenName", user.getFirstName())
                    .claim("familyName", user.getLastName())
                    .claim("email", user.getEmail())
                    .claim("groups", user.isAdmin() ? ADMIN_ROLES : USER_ROLES)
                    .build();

            JWSSigner signer = new RSASSASigner(privateKey);
            JWSHeader jwtHeader = new JWSHeader.Builder(JWSAlgorithm.RS256).type(JOSEObjectType.JWT).build();

            SignedJWT signedJWT = new SignedJWT(jwtHeader, jwtClaims);
            signedJWT.sign(signer);
            return signedJWT.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }
}
