package com.example.WMSCapstone.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.WMSCapstone.model.Inventory;

import com.example.WMSCapstone.modelDTO.InventoryDTO;
import com.example.WMSCapstone.repository.InventoryRepository;
import com.example.WMSCapstone.service.InventoryService;


@CrossOrigin(origins="http://localhost:4200")
@RestController
public class InventoryController {
	
	@Autowired 
	InventoryService inventoryService;
	
	@Autowired
	InventoryRepository inventoryRepo;
	
	@PostMapping("/inventory")
	public String createInventory(@RequestBody Inventory inventory) {
		return inventoryService.saveInventory(inventory);
	}
	
	@GetMapping("/inventory")
	public List<Inventory> getAllProducts(){
		return inventoryService.getAllProducts();
	}
	
	@PostMapping("/allproducts")
	public String saveAllProducts(@RequestBody List<Inventory> inventories) {
        return inventoryService.saveAllProducts(inventories);
       
    }
	
	@GetMapping("/product")
    public ResponseEntity<List<InventoryDTO>> getAllInventory() {
        List<InventoryDTO> inventoryDTOList = inventoryService.getAllInventory();
        return new ResponseEntity<>(inventoryDTOList, HttpStatus.OK);
    }
	

	   @GetMapping("/inventory/supplierProducts/{supplierName}")
	   public List<Inventory> getSupplierProducts(@PathVariable String supplierName) {
	      return inventoryRepo.findBySupplierName(supplierName);
	   }
	   
	   @PostMapping("/inventory/{productId}/{quantity}")
	   public ResponseEntity<Inventory> updateProductQuantity(@PathVariable String productId, @PathVariable int quantity) {
	       Optional<Inventory> inventoryData = inventoryRepo.findById(productId);
	       if (inventoryData.isPresent()) {
	           Inventory inventory = inventoryData.get();
	           inventory.setQuantity(quantity);
	           return new ResponseEntity<>(inventoryRepo.save(inventory), HttpStatus.OK);
	       } else {
	           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	       }
	   }
	   
	   @PostMapping("/addInventory")
	   public String saveInventory(@RequestBody Inventory inventory) {
		   inventoryService.saveInventory(inventory);
		    return "Inventory Added";
	   }
		
	
	
	 

}
