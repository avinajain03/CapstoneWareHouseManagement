package com.example.WMSCapstone.VendorOrderTest;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.WMSCapstone.model.Inventory;
import com.example.WMSCapstone.model.VendorOrder;
import com.example.WMSCapstone.repository.InventoryRepository;
import com.example.WMSCapstone.repository.VendorOrderRepository;
import com.example.WMSCapstone.service.VendorOrderService;

@ExtendWith(MockitoExtension.class)
class VendorOrderServiceTest {

	@Mock
	private VendorOrderRepository vendorOrderRepo;
	
	@Mock
	private InventoryRepository inventoryRepo;
	
	@InjectMocks
	private VendorOrderService vendorOrderService;
	
	VendorOrder record1 = new VendorOrder("1", "p1", "Perfume", "Skinix",120.75, 5, "personal care");
	VendorOrder record2 = new VendorOrder("2", "p2", "Carrot Muffin Spice", "ThoughtBridge", 275.00, 23, "food");
	VendorOrder record3 = new VendorOrder("3", "p3", "Curtains", "Mydeo",300.25, 2, "household");
	
	Inventory record_1 = new Inventory("p1", "Perfume", 52, 120.75, "personal care","Skinix","RBV676022RF");
	
	@Test 
	public void getAllOrders_success() throws Exception { 
		List<VendorOrder> records = new ArrayList<>(Arrays.asList(record1, record2, record3)); 
		
		Mockito.when(vendorOrderRepo.findAll()).thenReturn(records);
		ResponseEntity<List<VendorOrder>> response = vendorOrderService.getAllOrders();

		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(records, response.getBody());
	}
	
	@Test
	public void getAllOrders_failure() throws Exception{
		
	    Mockito.when(vendorOrderRepo.findAll()).thenReturn(null);
	        
	    ResponseEntity<List<VendorOrder>> response = vendorOrderService.getAllOrders();
	    assertEquals(HttpStatus.OK, response.getStatusCode());
	    assertNull(response.getBody());
	}
	
	@Test 
	public void addToCart_success() throws Exception { 
		VendorOrder record1 = new VendorOrder("1", "p1", "Perfume", "Skinix",120.75, 1, "personal care");
		Mockito.when(inventoryRepo.findByProductId("p1")).thenReturn(record_1); 
		Mockito.when(vendorOrderRepo.save(Mockito.any(VendorOrder.class))).thenReturn(record1);

		// call the service method
		ResponseEntity<VendorOrder> response = vendorOrderService.addToCart(record_1);

		// assert the response
		assertEquals(HttpStatus.OK, response.getStatusCode());
		VendorOrder order = response.getBody();
		assertEquals(record1.getProductId(), order.getProductId());
		assertEquals(record1.getProductName(), order.getProductName());
		assertEquals(record1.getSupplierName(), order.getSupplierName());
		assertEquals(record1.getPrice(), order.getPrice());
		assertEquals(record1.getCategory(), order.getCategory());
		assertEquals(1, order.getProductQuantity());

		// assert that the inventory was updated
		Mockito.verify(inventoryRepo, Mockito.times(1)).findByProductId("p1");
		Inventory updatedProduct = inventoryRepo.findByProductId("p1");
		assertEquals(51, updatedProduct.getQuantity());
	}
	
	@Test 
	public void deleteByVendorOrderId_success() throws Exception { 
		String vendorOrderId = "1"; 
		Mockito.doNothing().when(vendorOrderRepo).deleteByVendorOrderId(vendorOrderId); 
		ResponseEntity<String> response = vendorOrderService.deleteByVendorOrderId(vendorOrderId); 
		
		assertEquals(HttpStatus.OK, response.getStatusCode()); 
		assertEquals("Order with ID " + vendorOrderId + " deleted successfully.", response.getBody());

	}
	
	@Test 
	public void updateInventory_success() throws Exception { 
		String productId = "p1"; 
		int quantity = 5; 
		Inventory record_1 = new Inventory("p1", "Perfume", 52, 120.75, "personal care","Skinix","RBV676022RF"); 
		
		Mockito.when(inventoryRepo.findByProductId(productId)).thenReturn(record_1); 
		ResponseEntity<String> response = vendorOrderService.updateInventory(productId, quantity);

		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals("Inventory for product with ID " + productId + " updated successfully.", response.getBody());
	
		Inventory updatedProduct = inventoryRepo.findByProductId(productId);
		assertEquals(57, updatedProduct.getQuantity());
	}

	@Test 
	public void updateInventory_failure() throws Exception { 
		String productId = "p1"; 
		int quantity = 5; 
		
		Mockito.when(inventoryRepo.findByProductId(productId)).thenReturn(null); 
		ResponseEntity<String> response = vendorOrderService.updateInventory(productId, quantity);

		assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
		assertEquals("Product with ID " + productId + " not found.", response.getBody());
	}
	
	@Test 
	public void updateVendorOrder_success() throws Exception{ 
		String vendorOrderId = "1"; 
		VendorOrder updatedOrder = new VendorOrder("1", "p1", "Perfume", "Skinix",120.75, 3, "personal care"); 
		
		VendorOrder existingOrder = new VendorOrder("1", "p1", "Perfume", "Skinix",120.75, 2, "personal care");

		Mockito.when(vendorOrderRepo.findByVendorOrderId(vendorOrderId)).thenReturn(existingOrder);
		String response = vendorOrderService.updateVendorOrder(vendorOrderId, updatedOrder);
	
		assertEquals("Order customm with ID " + vendorOrderId + " updated successfully" + HttpStatus.OK, response);
		Mockito.verify(vendorOrderRepo, Mockito.times(1)).save(existingOrder);
	}

	@Test 
	public void updateVendorOrder_failure() throws Exception { 
		String vendorOrderId = "1"; 
		VendorOrder updatedOrder = new VendorOrder("1", "p1", "Perfume", "Skinix",120.75, 3, "personal care");

		Mockito.when(vendorOrderRepo.findByVendorOrderId(vendorOrderId)).thenReturn(null);
		String response = vendorOrderService.updateVendorOrder(vendorOrderId, updatedOrder);
	
		assertEquals("Order with ID " + vendorOrderId + " not found." + HttpStatus.NOT_FOUND, response);
	    Mockito.verify(vendorOrderRepo, Mockito.times(0)).save(Mockito.any());
	}
	
	@Test 
	public void updateVendorOrder_exception() { 
		String vendorOrderId = "1"; 
		VendorOrder updatedOrder = new VendorOrder("1", "p1", "Perfume", "Skinix",120.75, 3, "personal care"); 
		
		VendorOrder existingOrder = new VendorOrder("1", "p1", "Perfume", "Skinix",120.75, 2, "personal care");

		Mockito.when(vendorOrderRepo.findByVendorOrderId(vendorOrderId)).thenReturn(existingOrder);
		Mockito.when(vendorOrderRepo.save(Mockito.any(VendorOrder.class))).thenThrow(new RuntimeException());
	
		String response = vendorOrderService.updateVendorOrder(vendorOrderId, updatedOrder);
	
		assertEquals("Unsuccessfuljava.lang.RuntimeException" + HttpStatus.INTERNAL_SERVER_ERROR, response);
		Mockito.verify(vendorOrderRepo, Mockito.times(1)).save(existingOrder);
	}
	
}
