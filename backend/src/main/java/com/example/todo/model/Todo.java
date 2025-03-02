package com.example.todo.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column
    private String description;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean completed = false;
}