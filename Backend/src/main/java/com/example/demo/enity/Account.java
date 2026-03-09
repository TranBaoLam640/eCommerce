package com.example.demo.enity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer accountId;

    private String username;
    private String passwordHash;
    private String fullName;
    private String email;
    private String phone;
    private String status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Integer getAccountId() {
        return accountId;
    }

    public String getUsername() {
        return username;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getStatus() {
        return status;
    }
    public String getPasswordHash(){
        return passwordHash ;
    }
    public void setPasswordHash(String passwordHash){
        this.passwordHash = passwordHash;
    }
}