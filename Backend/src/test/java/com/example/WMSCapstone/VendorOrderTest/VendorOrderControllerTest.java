package com.example.WMSCapstone.VendorOrderTest;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.*;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.example.WMSCapstone.controller.VendorOrderController;
import com.example.WMSCapstone.model.Inventory;
import com.example.WMSCapstone.model.VendorOrder;
import com.example.WMSCapstone.repository.InventoryRepository;
import com.example.WMSCapstone.repository.VendorOrderRepository;
import com.example.WMSCapstone.service.VendorOrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

@RunWith(MockitoJUnitRunner.class)
class VendorOrderControllerTest {
	
	private MockMvc mockMvc;
	
	ObjectMapper objectMapper = new ObjectMapper();
	ObjectWriter objectWriter = objectMapper.writer();
	
	
	@Mock
	private VendorOrderService vendorOrderService;
	
	@Mock
	private VendorOrderRepository vendorOrderRepo;
	
	@Mock
	InventoryRepository inventoryRepo;
	
	@InjectMocks
	private VendorOrderController vendorOrderController;
	
	VendorOrder record1 = new VendorOrder("1", "p1", "Perfume", "Skinix",120.75, 5, "personal care");
	VendorOrder record2 = new VendorOrder("2", "p2", "Carrot Muffin Spice", "ThoughtBridge", 275.00, 23, "food");
	VendorOrder record3 = new VendorOrder("3", "p3", "Curtains", "Mydeo",300.25, 2, "household");
	
	Inventory record_1 = new Inventory("p1", "Perfume", 52, 120.75, "personal care","Skinix","RBV676022RF");
	
	@BeforeEach
    public void setUp() {
    	MockitoAnnotations.initMocks(this);
    	this.mockMvc = MockMvcBuilders.standaloneSetup(vendorOrderController).build();
    }
	
	@Test
	public void getAllOrders_success() throws Exception {
		
		List<VendorOrder> records = new ArrayList<>(Arrays.asList(record1, record2, record3));
		
		Mockito.when(vendorOrderService.getAllOrders()).thenReturn(new ResponseEntity<List<VendorOrder>>(records, HttpStatus.OK));
		
	    //the test actually runs the getAllOrders method on the mock VendorOrderController object, which should 
		//return the same ResponseEntity object we created earlier. We're then verifying that the HTTP status 
		//code is 200 OK and that the body of the ResponseEntity contains three VendorOrder objects
		
	    ResponseEntity<List<VendorOrder>> responseEntity = vendorOrderController.getAllOrders();
	    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	    assertEquals(3, responseEntity.getBody().size());
	}
	
	@Test
	public void getAllOrders_failure() throws Exception{
	    Mockito.when(vendorOrderService.getAllOrders()).thenReturn(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
	        
	    ResponseEntity<List<VendorOrder>> responseEntity = vendorOrderController.getAllOrders();
	    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
	}
	
	@Test
	public void addToCart_success() throws Exception {
		
		Inventory product = record_1;
	    VendorOrder order = record1;
	    
	    Mockito.when(vendorOrderService.addToCart(product)).thenReturn(new ResponseEntity<>(order, HttpStatus.OK));

	    ResponseEntity<VendorOrder> responseEntity = vendorOrderController.addToCart(product);
	    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
	    assertEquals(5, responseEntity.getBody().getProductQuantity());
	    assertEquals(52, product.getQuantity());
		
	}
	
	@Test
	public void addToCart_failure() throws Exception {
	    Inventory product = record_1;
	    Mockito.when(vendorOrderService.addToCart(product)).thenReturn(new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR));

	    ResponseEntity<VendorOrder> responseEntity = vendorOrderController.addToCart(product);
	    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
	    assertNull(responseEntity.getBody());
	}
	
	@Test 
	public void updateVendorOrder_success() throws Exception { 
		String vendorOrderId = "1"; 
		VendorOrder updatedOrder = new VendorOrder("1","p1","Perfume","Skinix",120.75,10,"personal care");

		Mockito.when(vendorOrderService.updateVendorOrder(vendorOrderId, updatedOrder)).thenReturn("Order with ID " + vendorOrderId + " updated successfully.");
	
		String responseMessage = vendorOrderController.updateVendorOrder(vendorOrderId, updatedOrder);
		assertEquals("Order with ID 1 updated successfully.", responseMessage);
	}

	@Test 
	public void updateVendorOrder_failure() throws Exception { 
		String vendorOrderId = "4"; 
		VendorOrder updatedOrder = new VendorOrder("1","p1","Perfume","Skinix", 120.75, 10, "personal care");

		Mockito.when(vendorOrderService.updateVendorOrder(vendorOrderId, updatedOrder)).thenReturn("Order with ID " + vendorOrderId + " not found.");
	
		String responseMessage = vendorOrderController.updateVendorOrder(vendorOrderId, updatedOrder);
		assertEquals("Order with ID 4 not found.", responseMessage);
	}
	
	@Test 
	public void updateInventory_success() throws Exception { 
		String productId = "p1"; 
		int quantity = 3;

		Inventory updatedInventory = new Inventory("p1","Perfume", 49, 120.75, "personal care","Skinix","RBV676022RF");
	
		Mockito.when(vendorOrderService.updateInventory(productId, quantity)).thenReturn(new ResponseEntity<>("Inventory for product with ID " + productId + " updated successfully.", HttpStatus.OK));
		Mockito.when(inventoryRepo.findByProductId(productId)).thenReturn(updatedInventory);
	
		ResponseEntity<String> responseEntity = vendorOrderController.updateInventory(productId, quantity);
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertEquals("Inventory for product with ID p1 updated successfully.", responseEntity.getBody());
	}

	@Test 
	public void updateInventory_failure() throws Exception { 
		String productId = "p4"; 
		int quantity = 10;

		Mockito.when(vendorOrderService.updateInventory(productId, quantity)).thenReturn(new ResponseEntity<>("Product with ID " + productId + " not found.", HttpStatus.NOT_FOUND));
		Mockito.when(inventoryRepo.findByProductId(productId)).thenReturn(null);
	
		ResponseEntity<String> responseEntity = vendorOrderController.updateInventory(productId, quantity);
		assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
		assertEquals("Product with ID p4 not found.", responseEntity.getBody());
	}
	
	
	@Test
	public void deleteOrderById_success() throws Exception {
		String orderId = "1";
		
		Mockito.when(vendorOrderService.deleteByVendorOrderId(orderId)).thenReturn(new ResponseEntity<>("Order with ID " + orderId + " deleted successfully.", HttpStatus.OK));
		
		ResponseEntity<String> responseEntity = vendorOrderController.deleteOrderById(orderId);
		assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
		assertEquals("Order with ID 1 deleted successfully.", responseEntity.getBody());
	}
	

	@Test
	public void deleteOrderById_failure() throws Exception {
		String orderId = "4";
		
		Mockito.when(vendorOrderService.deleteByVendorOrderId(orderId)).thenReturn(new ResponseEntity<>("Order with ID " + orderId + " not found.", HttpStatus.NOT_FOUND));
		
		ResponseEntity<String> responseEntity = vendorOrderController.deleteOrderById(orderId);
		assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
		assertEquals("Order with ID 4 not found.", responseEntity.getBody());
	}
	

	
}
