package com.example.WMSCapstone.InventoryTest;

import static org.assertj.core.api.Assertions.assertThat;


import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import com.example.WMSCapstone.model.Inventory;
import com.example.WMSCapstone.repository.InventoryRepository;

@DataMongoTest
@ExtendWith(MockitoExtension.class)
class InventoryRepositoryTest {
	
	@Autowired
    private InventoryRepository inventoryRepository;
	
	Inventory record_1 = new Inventory("1", "Cappucino Cocktail", 52, 638.55, "beverages", "Thoughtbridge", "RBV676022RF");
    Inventory record_2 = new Inventory("2", "Bar Nature Valley", 24, 322.45, "food", "Thoughtbridge", "ABC12345BV");
    Inventory record_3 = new Inventory("3", "Carrot Muffin Spice", 12, 130.23, "personal care", "Thoughtbridge", "CVB45678AS");


    @Test
    public void findByProductId_success() throws Exception {
        
        inventoryRepository.save(record_1);
        Inventory result = inventoryRepository.findByProductId(record_1.getProductId());
        assertThat(result).isNotNull();
    }

    @Test
    public void findBySupplierName_success() throws Exception {
        
        inventoryRepository.saveAll(List.of(record_1, record_2, record_3));
        
        List<Inventory> result = inventoryRepository.findBySupplierName("Thoughtbridge");

        assertThat(result).isNotNull();
        assertThat(result.get(0).getSupplierName()).isEqualTo("Thoughtbridge");
    }

	
}
