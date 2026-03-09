package com.example.demo.service;

import com.example.demo.enity.Account;

import java.util.List;

public interface AccountService {
    List<Account> getAllAccounts();
    Account createAccount(Account account);
    boolean login(String username, String password);
}
