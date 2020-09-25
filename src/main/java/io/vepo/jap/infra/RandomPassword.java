package io.vepo.jap.infra;

import java.util.Random;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RandomPassword {

    private Random random;
    private String validChars = "ABCDEFGHIJLMNOPQRSTUVXZWKYabcdefghiljmnopqrstuvxzwky0123456789$%@&*";

    @PostConstruct
    void setup() {
        random = new Random();
    }

    public String generatePassword() {
        return random.ints(0, validChars.length())
                .limit(10)
                .mapToObj(validChars::charAt)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }
}
