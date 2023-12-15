package com.example.WMSCapstone.UserTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.WMSCapstone.model.User;
import com.example.WMSCapstone.repository.UserRepository;
import com.example.WMSCapstone.service.UserService;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
	
	@Mock
	private UserRepository userRepo;
	
	@InjectMocks
	private UserService userService;
	
	User user_1 = new User("1", "Avina", "avina@gmail.com", "Avina123!", "9080706050", "admin");
	User user_2 = new User("2", "Skinix", "skinix@gmail.com", "Skinix001!!", "9060456766", "supplier");
	User user_3 = new User("3", "Tom", "tom@gmail.com", "Tom1234!", "9876512340", "staff");
	User user_4 = new User("4", "Harry", "harry@gmail.com", "Harry80!", "9876012345", "vendor");
	User user_5 = new User("5", "Mydeo", "mydeo@gmail.com", "Mydeo0012!", "9988776655", "supplier");
	
	@Test
	public void getAllUsers_success() throws Exception {
		
		Mockito.when(userRepo.findAll()).thenReturn(List.of(user_1, user_2, user_3, user_4, user_5));
		assertThat(userService.getAllUsers()).hasSize(5);
		Mockito.verify(userRepo, Mockito.times(1)).findAll();
		Mockito.verifyNoMoreInteractions(userRepo);
	}
	
	@Test
	public void saveAllUsers_success() throws Exception {
		List<User> records = new ArrayList<>(Arrays.asList(user_1, user_2, user_3, user_4, user_5));
		
		Mockito.when(userRepo.saveAll(Mockito.anyList())).thenReturn(records);
		List<User> result = userService.saveAllUsers(records);
		
		assertEquals(result, records);
		assertThat(result).hasSize(5);
		Mockito.verify(userRepo, Mockito.times(1)).saveAll(records);
		Mockito.verifyNoMoreInteractions(userRepo);
		
	}
	
	@Test
	public void saveUser_success() throws Exception {
		
		Mockito.when(userRepo.save(Mockito.any(User.class))).thenReturn(user_1);
		
		User result = userService.saveUser(new User());
		assertEquals(result, user_1);
		Mockito.verify(userRepo, Mockito.times(1)).save(Mockito.any(User.class));
		Mockito.verifyNoMoreInteractions(userRepo);
	}
	
	@Test
	public void getUsersByRole_success() throws Exception {
		List<User> records = new ArrayList<>(Arrays.asList(user_2, user_5));
		String role = "supplier";
		
		Mockito.when(userRepo.findByRole(role)).thenReturn(records);
		List<User> result = userService.getUsersByRole(role);
		
		assertEquals(result, records);
		assertThat(result).hasSize(2);
		Mockito.verify(userRepo, Mockito.times(1)).findByRole(role);
		Mockito.verifyNoMoreInteractions(userRepo);
		
	}

	@Test
	public void getUserByEmail_success() throws Exception {
		User record = user_1;
		
		Mockito.when(userRepo.findByEmail(record.getEmail())).thenReturn(record);
		User result = userService.getUserByEmail(user_1.getEmail());
		
		assertEquals(result, record);
		Mockito.verify(userRepo, Mockito.times(1)).findByEmail(record.getEmail());
		Mockito.verifyNoMoreInteractions(userRepo);
	}
	
	@Test
	public void findById_success() throws Exception {
		String userId = "4"; 
		User record = user_4;

		Mockito.when(userRepo.findByUserId(userId)).thenReturn(record);
		User result = userService.findById(userId);
		    
		assertEquals(result, record);
		Mockito.verify(userRepo, Mockito.times(1)).findByUserId(userId);
		Mockito.verifyNoMoreInteractions(userRepo);
        
	}
	
	@Test 
	public void findSupplierName_success() throws Exception { 
		String userId = "2"; 
		String supplierName = "Skinix"; 
		User record = user_2;

		Mockito.when(userRepo.findById(userId)).thenReturn(Optional.of(record));
		String result = userService.findSupplierName(userId);
		    
		assertEquals(result, supplierName);
		Mockito.verify(userRepo, Mockito.times(1)).findById(userId);
		Mockito.verifyNoMoreInteractions(userRepo);
	}

}
