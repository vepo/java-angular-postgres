package io.vepo.jap.user;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private boolean admin;
}
