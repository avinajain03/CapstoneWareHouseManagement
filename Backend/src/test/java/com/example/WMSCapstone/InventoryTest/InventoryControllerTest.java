package com.example.WMSCapstone.InventoryTest;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.example.WMSCapstone.controller.InventoryController;
import com.example.WMSCapstone.model.Inventory;
import com.example.WMSCapstone.modelDTO.InventoryDTO;
import com.example.WMSCapstone.repository.InventoryRepository;
import com.example.WMSCapstone.service.InventoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;


@RunWith(MockitoJUnitRunner.class)
class InventoryControllerTest {
	
	private MockMvc mockMvc;
	
	ObjectMapper objectMapper = new ObjectMapper();
	ObjectWriter objectWriter = objectMapper.writer();
	
	@Mock
	private InventoryRepository inventoryRepo;
	
	@Mock
	private InventoryService inventoryService;
	
	@InjectMocks
	private InventoryController inventoryController;
	
	Inventory record_1 = new Inventory("1",	"Cappucino Cocktail", 52, 638.55, "beverages","Thoughtbridge","RBV676022RF");
	Inventory record_2 = new Inventory("2",	"Bar Nature Valley", 24, 322.45, "food","Skinix","ABC12345BV");
	Inventory record_3 = new Inventory("3",	"Carrot Muffin Spice", 12, 130.23, "personal care","Skinix","CVB45678AS");
	
	InventoryDTO Record_1 = new InventoryDTO("1","Cappucino Cocktail", 638.55, "beverages","Thoughtbridge");
	InventoryDTO Record_2 = new InventoryDTO("2", "Bar Nature Valley", 322.45, "food","Skinix");
	InventoryDTO Record_3 = new InventoryDTO("3","Carrot Muffin Spice",130.23, "personal care","Skinix");
	
	Inventory record1 = new Inventory("1",	"Cappucino Cocktail", 52, 638.55, "beverages","ThoughtBridge","RBV676022RF");
	Inventory record2 = new Inventory("2",	"Bar Nature Valley", 24, 322.45, "food","ThoughtBridge","ABC12345BV");
	Inventory record3 = new Inventory("3",	"Carrot Muffin Spice", 12, 130.23, "personal care","ThoughtBridge","CVB45678AS");
	
	
    @BeforeEach
    public void setUp() {
    	MockitoAnnotations.initMocks(this);
    	this.mockMvc = MockMvcBuilders.standaloneSetup(inventoryController).build();
    }
	
    @Test
    public void getAllProducts_success() throws Exception{
    	List<Inventory> records = new ArrayList<>(Arrays.asList(record_1, record_2, record_3));
    	
    	Mockito.when(inventoryService.getAllProducts()).thenReturn(records);
    	
    	mockMvc.perform(MockMvcRequestBuilders
    			.get("/inventory")
    			.contentType(MediaType.APPLICATION_JSON))
    			.andExpect(status().isOk())
    			.andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(3)))
    			.andExpect(jsonPath("$[2].productName", is("Carrot Muffin Spice")));    	
    }
    
    
    @Test
    public void getAllInventory_success() throws Exception{
    	
    	List<InventoryDTO> Records = new ArrayList<>(Arrays.asList(Record_1, Record_2, Record_3));
    	
    	Mockito.when(inventoryService.getAllInventory()).thenReturn(Records);
    	
    	mockMvc.perform(MockMvcRequestBuilders
    			.get("/product")
    			.contentType(MediaType.APPLICATION_JSON))
    	        .andExpect(status().isOk())
    	        .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(3)))
    	        .andExpect(jsonPath("$[1].productName", is("Bar Nature Valley")));
    }
    
    @Test
    public void getSupplierProducts_success() throws Exception{
    	
    	List<Inventory> RecordsSupplier = new ArrayList<>(Arrays.asList(record1, record2, record3));
    	
    	Mockito.when(inventoryService.getSupplierProducts(record1.getSupplierName())).thenReturn(RecordsSupplier);
    	
    	mockMvc.perform(MockMvcRequestBuilders
    			.get("/inventory/supplierProducts/ThoughtBridge")
    			.contentType(MediaType.APPLICATION_JSON))
    			.andExpect(status().isOk())
    			.andExpect(jsonPath("$", notNullValue()))
    			.andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(3)))
    			.andExpect(jsonPath("$[0].productName", is("Cappucino Cocktail")));
    }
    
    @Test 
    public void saveAllProducts_success() throws Exception{ 
    	List<Inventory> records = new ArrayList<>(Arrays.asList(record_1, record_2, record_3));
    	
    	Mockito.when(inventoryService.saveAllProducts(Mockito.anyList())).thenReturn(records);
    	
    	MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.post("/allproducts")
    			.contentType(MediaType.APPLICATION_JSON)
    			.accept(MediaType.APPLICATION_JSON)
    			.content(objectWriter.writeValueAsString(records));
    	
    	mockMvc.perform(builder)
    	         .andExpect(status().isOk())
    	         .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(3)))
    	         .andExpect(jsonPath("$[0].productName", is("Cappucino Cocktail")))
    	         .andReturn();   
    }
    
    @Test 
    public void updateProductQuantity_success() throws Exception{ 
    	Optional<Inventory> record = Optional.of(record_1);
    	
    	Mockito.when(inventoryRepo.findById(record_1.getProductId())).thenReturn(record);
    	Mockito.when(inventoryRepo.save(Mockito.any(Inventory.class))).thenReturn(record_1);
    	
    	MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.post("/inventory/1/30");

	    mockMvc.perform(builder)
	            .andExpect(status().isOk())
	            .andExpect(MockMvcResultMatchers.jsonPath("$.productId", is("1")))
	            .andExpect(MockMvcResultMatchers.jsonPath("$.quantity", is(30)));   
    }
    
    @Test 
    public void updateProductQuantity_notFound() throws Exception{ 
    	Optional record = Optional.empty(); 
    	String invalidProductId = "invalidId";

	    Mockito.when(inventoryRepo.findById(invalidProductId)).thenReturn(record);
	
	    MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.post("/inventory/" + invalidProductId + "/30");
	
	    mockMvc.perform(builder)
	            .andExpect(status().isNotFound());
    }
    
    @Test 
    public void saveInventory_success() throws Exception{ 
    	
    	Mockito.when(inventoryService.saveInventory(Mockito.any(Inventory.class))).thenReturn(record_1);
    	
    	MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.post("/addInventory")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON)
            .content(objectWriter.writeValueAsString(record_1));
    	
    	MvcResult result = mockMvc.perform(builder)
    			.andExpect(status().isOk())
    			.andExpect(MockMvcResultMatchers.jsonPath("$.productId", is("1")))
    			.andExpect(MockMvcResultMatchers.jsonPath("$.productName", is("Cappucino Cocktail")))
    			.andReturn();
    }
    
  

}
