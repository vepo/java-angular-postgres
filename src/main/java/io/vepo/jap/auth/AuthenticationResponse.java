package io.vepo.jap.auth;

public class AuthenticationResponse {
    public static class AuthenticationResponseBuilder {
        private int id;
        private String username;
        private String email;
        private String firstName;
        private String lastName;
        private String token;
        private boolean admin;

        private AuthenticationResponseBuilder() {
        }

        public AuthenticationResponseBuilder id(int id) {
            this.id = id;
            return this;
        }

        public AuthenticationResponseBuilder username(String username) {
            this.username = username;
            return this;
        }

        public AuthenticationResponseBuilder email(String email) {
            this.email = email;
            return this;
        }

        public AuthenticationResponseBuilder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public AuthenticationResponseBuilder lastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public AuthenticationResponseBuilder token(String token) {
            this.token = token;
            return this;
        }

        public AuthenticationResponseBuilder admin(boolean admin) {
            this.admin = admin;
            return this;
        }

        public AuthenticationResponse build() {
            return new AuthenticationResponse(this);
        }
    }

    public static AuthenticationResponseBuilder builder() {
        return new AuthenticationResponseBuilder();
    }

    private int id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String token;
    private boolean admin;

    public AuthenticationResponse() {
    }

    private AuthenticationResponse(AuthenticationResponseBuilder builder) {
        id = builder.id;
        username = builder.username;
        email = builder.email;
        firstName = builder.firstName;
        lastName = builder.lastName;
        token = builder.token;
        admin = builder.admin;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (admin ? 1231 : 1237);
        result = prime * result + ((email == null) ? 0 : email.hashCode());
        result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
        result = prime * result + id;
        result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
        result = prime * result + ((token == null) ? 0 : token.hashCode());
        result = prime * result + ((username == null) ? 0 : username.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        AuthenticationResponse other = (AuthenticationResponse) obj;
        if (admin != other.admin) {
            return false;
        }
        if (email == null) {
            if (other.email != null) {
                return false;
            }
        } else if (!email.equals(other.email)) {
            return false;
        }
        if (firstName == null) {
            if (other.firstName != null) {
                return false;
            }
        } else if (!firstName.equals(other.firstName)) {
            return false;
        }
        if (id != other.id) {
            return false;
        }
        if (lastName == null) {
            if (other.lastName != null) {
                return false;
            }
        } else if (!lastName.equals(other.lastName)) {
            return false;
        }
        if (token == null) {
            if (other.token != null) {
                return false;
            }
        } else if (!token.equals(other.token)) {
            return false;
        }
        if (username == null) {
            if (other.username != null) {
                return false;
            }
        } else if (!username.equals(other.username)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "AuthenticationResponse [id=" + id + ", username=" + username + ", email=" + email + ", firstName="
                + firstName + ", lastName=" + lastName + ", token=" + token + ", admin="
                + admin + "]";
    }

}
