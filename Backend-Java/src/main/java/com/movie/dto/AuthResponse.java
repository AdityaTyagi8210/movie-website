package com.movie.dto;

public class AuthResponse {
    private String message;
    private UserDto user;
    
    public static class UserDto {
        private String username;
        private String email;
        
        public UserDto(String username, String email) {
            this.username = username;
            this.email = email;
        }

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }
    
    public AuthResponse(String message, String username, String email) {
        this.message = message;
        this.user = new UserDto(username, email);
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public UserDto getUser() { return user; }
    public void setUser(UserDto user) { this.user = user; }
}
