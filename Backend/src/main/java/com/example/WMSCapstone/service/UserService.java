package com.example.WMSCapstone.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.WMSCapstone.model.User;
import com.example.WMSCapstone.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepo;
	
	public List<User> getAllUsers(){
        return userRepo.findAll();	
    }
	
	public String saveAllUsers(List<User> users) {
        userRepo.saveAll(users);
        return "Users Added";
    }
	
	public String saveUser(User user) {
	    userRepo.save(user);
	    return "User Added";
	}

	public List<User> getUsersByRole(String role) {
	    return userRepo.findByRole(role);
	}
	
	public User getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }
	

	public List<User> findById(String userId) {
	    return userRepo.findByUserId(userId);
	}

	

}
