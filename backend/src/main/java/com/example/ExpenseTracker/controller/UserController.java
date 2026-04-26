package com.example.ExpenseTracker.controller;

import com.example.ExpenseTracker.dto.UserResponse;
import com.example.ExpenseTracker.entity.User;
import com.example.ExpenseTracker.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ================= PROFILE =================
    @GetMapping("/profile")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<UserResponse> getProfile(Authentication auth) {
        User user = (User) auth.getPrincipal();

        return ResponseEntity.ok(
                new UserResponse(user.getName(), user.getEmail())
        );
    }

    // ================= UPDATE PROFILE =================
    @PutMapping("/update")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser,
                                           Authentication auth) {

        User user = (User) auth.getPrincipal();

        // Validate name
        if (updatedUser.getName() == null || updatedUser.getName().isBlank()) {
            return ResponseEntity.badRequest().body("Name is required");
        }

        user.setName(updatedUser.getName());

        // Validate & update email
        if (updatedUser.getEmail() != null &&
                !updatedUser.getEmail().equals(user.getEmail())) {

            if (userRepository.findByEmail(updatedUser.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("Email already in use");
            }

            user.setEmail(updatedUser.getEmail());
        }

        userRepository.save(user);

        return ResponseEntity.ok(
                new UserResponse(user.getName(), user.getEmail())
        );
    }

    // ================= CHANGE PASSWORD =================
    @PutMapping("/change-password")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> req,
                                                 Authentication auth) {

        User user = (User) auth.getPrincipal();

        String currentPassword = req.get("password");
        String newPassword = req.get("newPassword");

        // Validation
        if (currentPassword == null || newPassword == null ||
                currentPassword.isBlank() || newPassword.isBlank()) {

            return ResponseEntity.badRequest().body("All fields are required");
        }

        if (newPassword.length() < 6) {
            return ResponseEntity.badRequest().body("Password must be at least 6 characters");
        }

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            return ResponseEntity.badRequest().body("Incorrect current password");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return ResponseEntity.ok("Password updated successfully");
    }

    // ================= DELETE ACCOUNT =================
    @DeleteMapping("/delete")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<Void> deleteAccount(Authentication auth) {

        User user = (User) auth.getPrincipal();
        userRepository.delete(user);

        return ResponseEntity.noContent().build();
    }
}