package io.vepo.jap.utils;

import static java.util.Objects.nonNull;

public class StringUtils {

    public static String capitalize(String value) {
        if (nonNull(value) && value.length() > 0 && (value.charAt(0) < 'A' || value.charAt(0) > 'Z')) {
            return value.substring(0, 1).toUpperCase() + value.substring(1);
        } else {
            return value;
        }

    }

}
