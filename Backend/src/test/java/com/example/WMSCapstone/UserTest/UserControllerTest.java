package com.example.WMSCapstone.UserTest;


import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.notNullValue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.example.WMSCapstone.controller.UserController;
import com.example.WMSCapstone.model.User;
import com.example.WMSCapstone.modelDTO.LoginRequestDTO;
import com.example.WMSCapstone.modelDTO.LoginResponseDTO;
import com.example.WMSCapstone.modelDTO.SignUpRequestDTO;
import com.example.WMSCapstone.repository.UserRepository;
import com.example.WMSCapstone.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import jakarta.servlet.http.HttpSession;


@RunWith(MockitoJUnitRunner.class)
class UserControllerTest {
	
	private MockMvc mockMvc;
	
	ObjectMapper objectMapper = new ObjectMapper();
	ObjectWriter objectWriter = objectMapper.writer();
	
	@Mock
	private UserRepository userRepo;
	
	@Mock
	private UserService userService;
	
	@InjectMocks
	private UserController userController;
	
	User user_1 = new User("1", "Avina", "avina@gmail.com", "Avina123!", "9080706050", "admin");
	User user_2 = new User("2", "Skinix", "skinix@gmail.com", "Skinix001!!", "9060456766", "supplier");
	User user_3 = new User("3", "Tom", "tom@gmail.com", "Tom1234!", "9876512340", "staff");
	User user_4 = new User("4", "Harry", "harry@gmail.com", "Harry80!", "9876012345", "vendor");
	User user_5 = new User("5", "Mydeo", "mydeo@gmail.com", "Mydeo0012!", "9988776655", "supplier");
	
	@BeforeEach
    public void setUp() {
    	MockitoAnnotations.initMocks(this);
    	this.mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }
	
	@Test
	public void getAllUsers_success() throws Exception {
		List<User> records = new ArrayList<>(Arrays.asList(user_1, user_2, user_3, user_4));
		
		Mockito.when(userService.getAllUsers()).thenReturn(records);
		
		mockMvc.perform(MockMvcRequestBuilders
				.get("/users")
				.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(4)))
				.andExpect(jsonPath("$[2].userName", is("Tom")));  
				
	}
	
	@Test
	public void getUsersByRole_success() throws Exception {
		List<User> records = new ArrayList<>(Arrays.asList(user_2, user_5));
		

		Mockito.when(userService.getUsersByRole(user_2.getRole())).thenReturn(records);
		
		mockMvc.perform(MockMvcRequestBuilders
				.get("/users/role/supplier")
				.contentType(MediaType.APPLICATION_JSON))
		        .andExpect(status().isOk())
		        .andExpect(jsonPath("$", notNullValue()))
		        .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(2)))
		        .andExpect(jsonPath("$[1].userName", is("Mydeo")));
		
	}
	
	@Test
	public void getUserById_success() throws Exception {
		
		Mockito.when(userService.findById(user_1.getUserId())).thenReturn(user_1);
		
		mockMvc.perform(MockMvcRequestBuilders
				.get("/users/1")
				.contentType(MediaType.APPLICATION_JSON))
		        .andExpect(status().isOk())
		        .andExpect(jsonPath("$", notNullValue()))
		        .andExpect(jsonPath("$.userName", is("Avina")));
	}
	
	@Test 
	public void getSupplierName_success() throws Exception {

		Mockito.when(userService.findSupplierName(user_2.getUserId())).thenReturn("Skinix");

		mockMvc.perform(MockMvcRequestBuilders
		        .get("/users/supplierName/2")
		        .contentType(MediaType.APPLICATION_JSON))
		        .andExpect(status().isOk())
		        .andExpect(jsonPath("$", notNullValue()))
		        .andExpect(jsonPath("$", is("Skinix")));
	}
	
	@Test
	public void saveAllUsers_success() throws Exception {
		List<User> records = new ArrayList<>(Arrays.asList(user_1, user_2, user_3, user_4, user_5));
		
		Mockito.when(userService.saveAllUsers(Mockito.anyList())).thenReturn(records);
		
		MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.post("/allusers")
    			.contentType(MediaType.APPLICATION_JSON)
    			.accept(MediaType.APPLICATION_JSON)
    			.content(objectWriter.writeValueAsString(records));
		 
		mockMvc.perform(builder)
		         .andExpect(status().isOk())
		         .andExpect(jsonPath("$", notNullValue()))
		         .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(5)))
		         .andExpect(jsonPath("$[1].userName", is("Skinix")));
	}
	
	@Test
	public void saveStaff_success() throws Exception {
		
		User record = user_3;
		
		Mockito.when(userService.saveUser(Mockito.any(User.class))).thenReturn(record);
		
		MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.post("/users/staff")
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON)
				.content(objectWriter.writeValueAsString(record));
		
		mockMvc.perform(builder)
		         .andExpect(status().isOk())
		         .andExpect(jsonPath("$", notNullValue()))
		         .andExpect(jsonPath("$.userName", is("Tom")));
		
	}
	
	@Test
	public void signup_success() throws Exception {
	    
	    SignUpRequestDTO request = new SignUpRequestDTO();
	    request.setUserName("John");
	    request.setEmail("john@example.com");
	    request.setPassword("password");
	    request.setContact("1234567890");
	    request.setRole("vendor");

	    User user = new User("1", request.getUserName(), request.getEmail(), request.getPassword(), request.getContact(), request.getRole());
	    Mockito.when(userService.saveUser(Mockito.any(User.class))).thenReturn(user);
	    MvcResult result = mockMvc.perform(post("/signup")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content(objectWriter.writeValueAsString(request)))
	            .andExpect(status().isOk())
	            .andReturn();
    
	}
	
	@Test
	public void signup_whenUserRoleIsNotVendor() throws Exception {
	    SignUpRequestDTO request = new SignUpRequestDTO();
	    request.setUserName("John");
	    request.setEmail("john@example.com");
	    request.setPassword("password");
	    request.setContact("1234567890");
	    request.setRole("admin");

	    MvcResult result = mockMvc.perform(post("/signup")
	            .contentType(MediaType.APPLICATION_JSON)
	            .content(objectWriter.writeValueAsString(request)))
	            .andExpect(status().isOk())
	            .andReturn();

	    String responseText = result.getResponse().getContentAsString();
	    assertEquals("User role must be 'vendor'", responseText);
	}
}
