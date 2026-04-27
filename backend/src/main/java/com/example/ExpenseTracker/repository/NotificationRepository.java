package com.example.ExpenseTracker.repository;

import com.example.ExpenseTracker.entity.Notification;
import com.example.ExpenseTracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Fetch all notifications for a specific user, newest first
    List<Notification> findByUserOrderByCreatedAtDesc(User user);

    // Fetch only unread notifications (useful for the red dot badge on the bell icon)
    List<Notification> findByUserAndIsReadFalse(User user);
}