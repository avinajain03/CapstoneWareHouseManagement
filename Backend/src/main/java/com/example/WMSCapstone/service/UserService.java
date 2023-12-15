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
	
	public List<User> saveAllUsers(List<User> users) {
        return userRepo.saveAll(users);
        
    }
	
	public User saveUser(User user) {
	    return userRepo.save(user);
	    
	}

	public List<User> getUsersByRole(String role) {
	    return userRepo.findByRole(role);
	}
	
	public User getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }
	

	public User findById(String userId) {
	    return userRepo.findByUserId(userId);
	}
	
	public String findSupplierName(String userId) {
		User user = userRepo.findById(userId).orElse(null);
	       return user.getUserName();
	}

	

}
