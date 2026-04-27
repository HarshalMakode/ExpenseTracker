package com.example.ExpenseTracker.controller;

import com.example.ExpenseTracker.entity.Notification;
import com.example.ExpenseTracker.entity.User;
import com.example.ExpenseTracker.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications(Authentication auth) {
        User user = (User) auth.getPrincipal();
        return ResponseEntity.ok(notificationRepository.findByUserOrderByCreatedAtDesc(user));
    }

    @GetMapping("/unread-count")
    public ResponseEntity<?> getUnreadCount(Authentication auth) {
        User user = (User) auth.getPrincipal();
        int count = notificationRepository.findByUserAndIsReadFalse(user).size();
        return ResponseEntity.ok(Map.of("unreadCount", count));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Long id, Authentication auth) {
        User user = (User) auth.getPrincipal();
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        if (!notification.getUser().getUserId().equals(user.getUserId())) {
            return ResponseEntity.status(403).body("Unauthorized");
        }

        notification.setRead(true);
        notificationRepository.save(notification);
        return ResponseEntity.ok(Map.of("message", "Marked as read"));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearAll(Authentication auth) {
        User user = (User) auth.getPrincipal();
        List<Notification> userNotifications = notificationRepository.findByUserOrderByCreatedAtDesc(user);
        notificationRepository.deleteAll(userNotifications);
        return ResponseEntity.ok(Map.of("message", "Notifications cleared"));
    }
}