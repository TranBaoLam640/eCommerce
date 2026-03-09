package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TestController {

    // API 1: GET
    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot";
    }

    // API 2: POST
    @PostMapping("/echo")
    public String echo(@RequestBody String message) {
        return "Backend received: " + message;
    }
}