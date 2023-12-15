package com.example.WMSCapstone.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.WMSCapstone.model.User;
import com.example.WMSCapstone.modelDTO.LoginRequestDTO;
import com.example.WMSCapstone.modelDTO.LoginResponseDTO;
import com.example.WMSCapstone.modelDTO.SignUpRequestDTO;
import com.example.WMSCapstone.repository.UserRepository;
import com.example.WMSCapstone.service.UserService;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserController {
	
	@Autowired 
	UserService userService;
	
	@Autowired
	UserRepository userRepo;
	
	@GetMapping("/users")
	public List<User> getAllUsers(){
		return userService.getAllUsers();
	}
	
	@PostMapping("/allusers")
	public List<User> saveAllUsers(@RequestBody List<User> users) {
        return userService.saveAllUsers(users);
       
    }
	@PostMapping("/users/staff")
	public User saveStaff(@RequestBody User staff) {
		return userService.saveUser(staff);	
    }

	
	@GetMapping("/users/role/{role}")
    public List<User> getUsersByRole(@PathVariable String role) {
        return userService.getUsersByRole(role);
    }
	
	@PostMapping("/signup")
    public String signup(@RequestBody SignUpRequestDTO request) {
        if (!request.getRole().equals("vendor")) {
            return "User role must be 'vendor'";
        }
        
        User user = new User();
        user.setUserName(request.getUserName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setContact(request.getContact());
        user.setRole("vendor");
        
        userService.saveUser(user);
        
        return "User created successfully";
    }
    
    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request, HttpSession session) {
        User user = userService.getUserByEmail(request.getEmail());
        
        if (user != null && user.getPassword().equals(request.getPassword())) {
            session.setAttribute("userId", user.getUserId());
            return new LoginResponseDTO(user.getUserName(), user.getEmail(), user.getRole(), user.getUserId());
        }
        
        return null; 
    }
    
    @GetMapping("/users/{userId}")
    public User getUserById(@PathVariable String userId) {
    	return userService.findById(userId);
    }
  
    @GetMapping("/users/supplierName/{userId}")
    public String getSupplierName(@PathVariable String userId) {
    	return userService.findSupplierName(userId);
    }
    
}
