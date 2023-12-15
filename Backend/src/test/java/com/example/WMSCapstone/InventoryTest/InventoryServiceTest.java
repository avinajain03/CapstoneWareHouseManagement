package com.example.WMSCapstone.InventoryTest;




import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.WMSCapstone.model.Inventory;
import com.example.WMSCapstone.modelDTO.InventoryDTO;
import com.example.WMSCapstone.repository.InventoryRepository;
import com.example.WMSCapstone.service.InventoryService;


@ExtendWith(MockitoExtension.class)
class InventoryServiceTest {
	
	@Mock
	private InventoryRepository inventoryRepo;
	
	@InjectMocks
	private InventoryService inventoryService;
	
	Inventory record_1 = new Inventory("1",	"Cappucino Cocktail", 52, 638.55, "beverages","Thoughtbridge","RBV676022RF");
	Inventory record_2 = new Inventory("2",	"Bar Nature Valley", 24, 322.45, "food","Skinix","ABC12345BV");
	Inventory record_3 = new Inventory("3",	"Carrot Muffin Spice", 12, 130.23, "personal care","Skinix","CVB45678AS");
	
	Inventory record1 = new Inventory("1",	"Cappucino Cocktail", 52, 638.55, "beverages","ThoughtBridge","RBV676022RF");
	Inventory record2 = new Inventory("2",	"Bar Nature Valley", 24, 322.45, "food","ThoughtBridge","ABC12345BV");
	Inventory record3 = new Inventory("3",	"Carrot Muffin Spice", 12, 130.23, "personal care","ThoughtBridge","CVB45678AS");
	
	
	
	// Mockito.verify() method to check if a particular method of a mocked object has been called a certain number of times
	//or not during the execution of a test.
	
	@Test
	public void saveInventory_success() throws Exception {
		
		
		Mockito.when(inventoryRepo.save(Mockito.any(Inventory.class))).thenReturn(record_1);
		
		Inventory result = inventoryService.saveInventory(record_1);
		
		assertThat(result).isEqualTo(record_1);
		Mockito.verify(inventoryRepo, Mockito.times(1)).save(any(Inventory.class));
		Mockito.verifyNoMoreInteractions(inventoryRepo);
	}
	
	@Test
	public void getAllProducts_success() throws Exception {
		
		Mockito.when(inventoryRepo.findAll()).thenReturn(List.of(record_1, record_2));
		
		assertThat(inventoryService.getAllProducts()).hasSize(2);
		Mockito.verify(inventoryRepo, Mockito.times(1)).findAll();
		Mockito.verifyNoMoreInteractions(inventoryRepo);
		
	}
	
	@Test
	public void saveAllProducts_success() throws Exception {
		List<Inventory> records = new ArrayList<>(Arrays.asList(record_1, record_2, record_3));
		
		Mockito.when(inventoryRepo.saveAll(Mockito.anyList())).thenReturn(records);
		
		List<Inventory> result = inventoryService.saveAllProducts(records);
		
		assertThat(result).isEqualTo(records);
		assertThat(result).hasSize(3);
		Mockito.verify(inventoryRepo, Mockito.times(1)).saveAll(records);
		Mockito.verifyNoMoreInteractions(inventoryRepo);
	
	}
	
	@Test
	public void getSupplierProducts_success() throws Exception {
		
		List<Inventory> records = new ArrayList<>(Arrays.asList(record1, record2, record3));
		String supplierName = "ThoughtBridge";
		
		Mockito.when(inventoryRepo.findBySupplierName(supplierName)).thenReturn(records);
		List<Inventory> result = inventoryService.getSupplierProducts(supplierName);
		
		assertThat(result).isEqualTo(records);
		assertThat(result).hasSize(3);
		Mockito.verify(inventoryRepo, Mockito.times(1)).findBySupplierName(supplierName);
		Mockito.verifyNoMoreInteractions(inventoryRepo);		
	}
	
	@Test
	public void getAllInventory_success() throws Exception {
	    
	    List<Inventory> records = new ArrayList<>(Arrays.asList(record_1, record_2, record_3));
	    
	    Mockito.when(inventoryRepo.findAll()).thenReturn(records);
	    
	    List<InventoryDTO> result = inventoryService.getAllInventory();
	    
	    assertThat(result).hasSize(3);
	    
	    InventoryDTO inventoryDTO_1 = new InventoryDTO(record_1.getProductId(), record_1.getProductName(),
	            record_1.getPrice(), record_1.getCategory(), record_1.getSupplierName());
	    InventoryDTO inventoryDTO_2 = new InventoryDTO(record_2.getProductId(), record_2.getProductName(),
	            record_2.getPrice(), record_2.getCategory(), record_2.getSupplierName());
	    InventoryDTO inventoryDTO_3 = new InventoryDTO(record_3.getProductId(), record_3.getProductName(),
	            record_3.getPrice(), record_3.getCategory(), record_3.getSupplierName());
	    
	    assertThat(result.get(0)).isEqualToComparingFieldByField(inventoryDTO_1);
	    assertThat(result.get(1)).isEqualToComparingFieldByField(inventoryDTO_2);
	    assertThat(result.get(2)).isEqualToComparingFieldByField(inventoryDTO_3);
	    
	    Mockito.verify(inventoryRepo, Mockito.times(1)).findAll();
	    Mockito.verifyNoMoreInteractions(inventoryRepo);
	}
 
	

	

}
