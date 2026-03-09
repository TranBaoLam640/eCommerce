package com.example.demo.controller;

import com.example.demo.enity.Account;
import com.example.demo.service.AccountService;
import com.example.demo.utils.PasswordHasherUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/accounts")
public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public List<Account> getAccounts() {
        return accountService.getAllAccounts();
    }

    @PostMapping
    public Account createAccount(@RequestBody Account account) {
        String password = account.getPasswordHash();
        account.setPasswordHash(PasswordHasherUtils.hashPassword(password));
        return accountService.createAccount(account);
    }
}
