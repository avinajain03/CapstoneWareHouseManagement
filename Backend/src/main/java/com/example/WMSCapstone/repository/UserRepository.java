package com.example.WMSCapstone.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.WMSCapstone.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
	
	List<User> findByRole(String role);

    User findByEmail(String email);
    
    List<User> findByUserId(String userId);
    
    

}
