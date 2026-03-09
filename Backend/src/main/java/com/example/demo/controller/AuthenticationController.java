package com.example.demo.controller;


import com.example.demo.dto.LoginRequest;
import com.example.demo.service.AccountService;
import com.example.demo.service.impl.JwtServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AccountService accountService;
    private final JwtServiceImpl jwtService;

    public AuthenticationController(AccountService accountService,JwtServiceImpl jwtService) {
        this.accountService = accountService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public  Map<String, String> login(@RequestBody LoginRequest request) {

        boolean success = accountService.login(
                request.getUsername(),
                request.getPassword()
        );

        if (success) {
            String token =  jwtService.generateToken(request.getUsername());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return response ;
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Invalid username or password");
            return response ;
        }
    }
}