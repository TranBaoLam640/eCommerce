package com.example.demo.service;

public interface JwtService {
    public String generateToken(String username);
    public String extractUsername(String token);
}
