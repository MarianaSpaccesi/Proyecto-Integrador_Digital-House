package com.example.Backend.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.Backend.exceptions.ResourceNotFoundException;
import com.example.Backend.persistence.dto.AppUserDTO;
import com.example.Backend.persistence.dto.RoleToUserForm;
import com.example.Backend.persistence.entities.AppUser;
import com.example.Backend.persistence.entities.Role;
import com.example.Backend.service.impl.AppUserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/user")

@RequiredArgsConstructor
public class AppUserController {
    private final AppUserService userService;

    @GetMapping("/findAll")
    public ResponseEntity<List<AppUserDTO>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping("/create")
    public ResponseEntity<AppUserDTO> create(@RequestBody AppUserDTO userDTO){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/create").toUriString());
        // 201
        return ResponseEntity.created(uri).body(userService.create(userDTO));
    }
    @GetMapping("find/{id}")
    public ResponseEntity<AppUserDTO> find(@PathVariable Integer id) throws ResourceNotFoundException {
        return ResponseEntity.ok(userService.find(id));
    }
    @GetMapping()
    public ResponseEntity<AppUser> getUser(HttpServletRequest request, HttpServletResponse response) throws ResourceNotFoundException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        AppUser user = new AppUser();
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                // If request has the bearer token then remove first 7 characters
                String refreshToken = authorizationHeader.substring("Bearer ".length());

                // this can be updated to jwtUtil
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                //check if jwt is valid
                DecodedJWT decodedJWT = verifier.verify(refreshToken);
                // if here jwt is valid then extract info
                String username = decodedJWT.getSubject();
                // Check if username exists in db
                user = userService.findByUsername(username);
                user.setPassword("");

            } catch (Exception ex) {
                response.setHeader("error", ex.getMessage());
                response.setStatus(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", ex.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
            }
        } else {
            throw new RuntimeException("Refresh token is not present.");
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                // If request has the bearer token then remove first 7 characters
                String refreshToken = authorizationHeader.substring("Bearer ".length());

                // this can be updated to jwtUtil
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                //check if jwt is valid
                DecodedJWT decodedJWT = verifier.verify(refreshToken);
                // if here jwt is valid then extract info
                String username = decodedJWT.getSubject();
                // Check if username exists in db
                AppUser user = userService.findByUsername(username);

                String accessToken = JWT.create()
                        .withSubject(user.getUsername())
                        .withSubject(user.getUsername())
                        // login timeout = 10min
                        .withExpiresAt(new Date(System.currentTimeMillis() * 60 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                        .sign(algorithm);
                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", accessToken);
                tokens.put("refresh_token", refreshToken);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception ex) {
                response.setHeader("error", ex.getMessage());
                response.setStatus(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", ex.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is not present.");
        }
    }

    @PostMapping("/addRole")
    public ResponseEntity<?> addRole(@RequestBody RoleToUserForm form) throws ResourceNotFoundException {
        userService.addRoleToUser(form.getUsername(), form.getRoleName());
        return ResponseEntity.ok().build();
    }
}
