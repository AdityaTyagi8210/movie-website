package com.movie.service;

import com.movie.dto.AuthResponse;
import com.movie.dto.LoginRequest;
import com.movie.dto.RegisterRequest;
import com.movie.model.User;
import com.movie.repository.UserRepository;
import com.movie.util.JwtUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public ResponseEntity<?> register(RegisterRequest request) {
        Optional<User> existingUser = userRepository.findByUsernameOrEmail(request.getUsername(), request.getEmail());
        if (existingUser.isPresent()) {
            User u = existingUser.get();
            String msg;
            if (u.getEmail() != null && u.getEmail().equals(request.getEmail())) {
                msg = "Email already exists";
            } else {
                msg = "Username already exists";
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(msg));
        }

        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        
        User savedUser = userRepository.save(newUser);
        
        String token = jwtUtil.generateToken(savedUser.getId());
        
        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(false) 
                .path("/")
                .maxAge(5 * 24 * 60 * 60)
                .build();
                
        AuthResponse response = new AuthResponse("User registered successfully", savedUser.getUsername(), savedUser.getEmail());
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }

    public ResponseEntity<?> login(LoginRequest request) {
        Optional<User> userOptional = userRepository.findByUsernameOrEmail(request.getUsername(), request.getEmail());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("User not found"));
        }
        
        User user = userOptional.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Invalid password"));
        }
        
        String token = jwtUtil.generateToken(user.getId());
        
        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(false)
                .path("/")
                .maxAge(24 * 60 * 60)
                .build();
                
        AuthResponse response = new AuthResponse("LogedIn successfully", user.getUsername(), user.getEmail());
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(response);
    }
    
    public record ErrorResponse(String message) {}
}
