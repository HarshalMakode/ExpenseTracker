package com.example.ExpenseTracker.service;

import com.example.ExpenseTracker.dto.BudgetRequest;
import com.example.ExpenseTracker.entity.Budget;
import com.example.ExpenseTracker.entity.Expense;
import com.example.ExpenseTracker.entity.TransactionType;
import com.example.ExpenseTracker.entity.User;
import com.example.ExpenseTracker.repository.BudgetRepository;
import com.example.ExpenseTracker.repository.ExpenseRepository;
import com.example.ExpenseTracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;
    @Autowired
    private UserRepository userRepository ;
    @Autowired
    private ExpenseRepository expenseRepository;

    public Budget setBudget(BudgetRequest request) {

        Budget budget = new Budget();

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        budget.setMonth(request.getMonth());
        budget.setLimitAmount(request.getLimitAmount());
        budget.setUser(user);

        return budgetRepository.save(budget);
    }

    public List<Budget> getBudgetByUserId(Long userId) {

        return budgetRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Budget not found"));
    }

    public List<Budget> getAllBudgets() {

        return budgetRepository.findAll();
    }

    public double getRemainingBudget(Long userId, String month) {
        List<Budget> budgets = budgetRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("No budgets found for this user"));

        Budget budget = budgets.stream()
                .filter(b -> b.getMonth().equalsIgnoreCase(month))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No budget set for the month: " + month));

        // Sum all expenses for this user in this month
        double totalSpent = expenseRepository.findByUser(budget.getUser()).stream()
                .filter(e -> e.getType() == TransactionType.EXPENSE) // Only subtract expenses
                .mapToDouble(Expense::getAmount)
                .sum();

        return budget.getLimitAmount() - totalSpent;
    }
}