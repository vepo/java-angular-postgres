package io.vepo.jap.user;

import static java.util.stream.Collectors.toList;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.eclipse.microprofile.jwt.JsonWebToken;

import io.vepo.jap.infra.PaginatedResponse;
import io.vepo.jap.infra.PasswordEncrypter;
import io.vepo.jap.infra.QueryOptions;
import io.vepo.jap.infra.QueryOptions.Order;
import io.vepo.jap.infra.RandomPassword;

@Path("/user")
@RequestScoped
public class UserEndpoint {

    @Inject
    private JsonWebToken token;

    @Inject
    private UserService userService;

    @Inject
    private PasswordEncrypter passwordEncrypter;

    @Inject
    private RandomPassword randomPassword;

    @GET
    @RolesAllowed("admin")
    @Produces(MediaType.APPLICATION_JSON)
    public PaginatedResponse<UserResponse> getUsers(
            @QueryParam("limit") @DefaultValue("-1") int limit,
            @QueryParam("offset") @DefaultValue("0") int offset,
            @QueryParam("enabled") Boolean enabled,
            @QueryParam("admin") Boolean admin,
            @QueryParam("sortField") @DefaultValue("id") String sortField,
            @QueryParam("sortOrder") @DefaultValue("ASC") Order sortOrder) {
        QueryOptions options = QueryOptions.builder()
                .field("admin", admin)
                .field("enabled", enabled)
                .limit(limit)
                .offset(offset)
                .sortField(sortField)
                .sortOrder(sortOrder)
                .build();
        return PaginatedResponse.<UserResponse>builder()
                .total(userService.count(options))
                .offset(offset)
                .items(userService.findAll(options).stream()
                        .map(UserEndpoint::toResponse)
                        .collect(toList()))
                .build();
    }

    @POST
    @Path("/{userId}/enable")
    @RolesAllowed("admin")
    @Produces(MediaType.APPLICATION_JSON)
    public UserResponse enableUser(@PathParam("userId") int userId) {
        return userService.updateUser(userId, user -> user.setEnabled(true))
                .map(UserEndpoint::toResponse)
                .orElseThrow(() -> new NotFoundException("User not found!"));
    }

    @POST
    @Path("/{userId}/disable")
    @RolesAllowed("admin")
    @Produces(MediaType.APPLICATION_JSON)
    public UserResponse disableUser(@PathParam("userId") int userId) {
        return userService.updateUser(userId, user -> user.setEnabled(false))
                .map(UserEndpoint::toResponse)
                .orElseThrow(() -> new NotFoundException("User not found!"));
    }

    @GET
    @Path("/{userId}")
    @RolesAllowed("admin")
    @Produces(MediaType.APPLICATION_JSON)
    public UserResponse findUserById(@PathParam("userId") int userId) {
        return userService.findById(userId)
                .map(UserEndpoint::toResponse)
                .orElseThrow(() -> new NotFoundException("User not found!"));
    }

    @POST
    @Path("/{userId}")
    @RolesAllowed("admin")
    @Produces(MediaType.APPLICATION_JSON)
    public UserResponse updateUser(@PathParam("userId") int userId, UserUpdateRequest userUpdate) {
        return userService.updateUser(
                userId, user -> {
                    user.setUsername(userUpdate.getUsername());
                    user.setEmail(userUpdate.getEmail());
                    user.setFirstName(userUpdate.getFirstName());
                    user.setLastName(userUpdate.getLastName());
                    user.setAdmin(userUpdate.isAdmin());
                })
                .map(UserEndpoint::toResponse)
                .orElseThrow(() -> new NotFoundException("User not found!"));
    }

    @POST
    @RolesAllowed("admin")
    @Produces(MediaType.APPLICATION_JSON)
    public UserResponse updateUser(UserCreateRequest userCreate) {
        return toResponse(userService.create(User.builder()
                .username(userCreate.getUsername())
                .email(userCreate.getEmail())
                .firstName(userCreate.getFirstName())
                .lastName(userCreate.getLastName())
                .admin(userCreate.isAdmin())
                .hashedPassword(passwordEncrypter
                        .encrypt(userCreate.isGeneratePassword() ? randomPassword.generatePassword()
                                : userCreate.getPassword()))
                .build()));
    }

    @GET
    @Path("/me")
    @RolesAllowed("user")
    @Produces(MediaType.APPLICATION_JSON)
    public UserResponse getLoggedUser() {
        return userService.findById(Integer.parseInt(token.getSubject()))
                .map(UserEndpoint::toResponse)
                .orElseThrow(() -> new NotFoundException("User not found!"));
    }

    @POST
    @Path("/me/password")
    @RolesAllowed("user")
    @Produces(MediaType.APPLICATION_JSON)
    public UserResponse changeLoggedUserPassword(ChangePasswordRequest changePasswordRequest) {
        return userService
                .updateUser(Integer.parseInt(token.getSubject()),
                        user -> user.setHashedPassword(passwordEncrypter.encrypt(changePasswordRequest.getPassword())))
                .map(UserEndpoint::toResponse)
                .orElseThrow(() -> new NotFoundException("User not found!"));
    }

    @POST
    @Path("/me")
    @RolesAllowed("user")
    @Produces(MediaType.APPLICATION_JSON)
    public UserResponse updateLoggedUser(ProfileUpdateRequest profileUpdate) {
        return userService.updateUser(Integer.parseInt(token.getSubject()),
                user -> {
                    user.setUsername(profileUpdate.getUsername());
                    user.setEmail(profileUpdate.getEmail());
                    user.setFirstName(profileUpdate.getFirstName());
                    user.setLastName(profileUpdate.getLastName());
                })
                .map(UserEndpoint::toResponse)
                .orElseThrow(() -> new NotFoundException("User not found!"));
    }

    private static UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .admin(user.isAdmin())
                .enabled(user.isEnabled())
                .build();
    }
}
