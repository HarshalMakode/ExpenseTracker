package com.example.ExpenseTracker.controller;

import com.example.ExpenseTracker.entity.User;
import com.example.ExpenseTracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/profile")
    @PreAuthorize("hasAuthority('USER')")
    public User getProfile(Authentication auth) {
        return (User) auth.getPrincipal();
    }
}