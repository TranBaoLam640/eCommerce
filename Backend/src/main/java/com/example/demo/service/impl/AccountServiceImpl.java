package com.example.demo.service;

import com.example.demo.enity.Account;
import com.example.demo.repository.AccountRepository;
import com.example.demo.utils.PasswordHasherUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public boolean login(String username, String password) {
        Optional<Account> accountOpt = accountRepository.findByUsername(username);
        if (accountOpt.isEmpty()) {
            return false ;
        }
        Account account = accountOpt.get();
        return PasswordHasherUtils.checkPassword(password, account.getPasswordHash());
    }
}
