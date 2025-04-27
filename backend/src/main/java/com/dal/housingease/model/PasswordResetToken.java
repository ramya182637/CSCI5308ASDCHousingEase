package com.dal.housingease.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
/**
 * Represents a Password Reset Token entity in the system.
 */
@Entity
@Table(name = "password_reset_tokens")
public class PasswordResetToken 
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private LocalDateTime expiryDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

	public Long getId() 
	{
		return id;
	}

	public void setId(Long id) 
	{
		this.id = id;
	}

	public String getToken()
	{
		return token;
	}

	public void setToken(String token) 
	{
		this.token = token;
	}

	public LocalDateTime getExpiryDate()
	{
		return expiryDate;
	}

	public void setExpiryDate(LocalDateTime expiryDate) 
	{
		this.expiryDate = expiryDate;
	}

	public User getUser()
	{
		return user;
	}

	public void setUser(User user) 
	{
		this.user = user;
	}

}
