package com.example.WMSCapstone.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.CrossOrigin;

import lombok.Builder;
import lombok.NoArgsConstructor;

@CrossOrigin(origins = "http://localhost:4200")
@Document(collection = "inventory" )
@NoArgsConstructor
@Builder
public class Inventory {
	
	@Id
	private String productId;
	private String productName;
	private int quantity;
	private double price;
	private String category;
	private String supplierName;
	private String sku;
	
	
	public Inventory(String productId, String productName, int quantity, double price, String category,
			String supplierName, String sku) {
		super();
		this.productId = productId;
		this.productName = productName;
		this.quantity = quantity;
		this.price = price;
		this.category = category;
		this.supplierName = supplierName;
		this.sku = sku;
	}
	public Inventory() {
	}
	
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getSupplierName() {
		return supplierName;
	}
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	public String getSku() {
		return sku;
	}
	public void setSku(String sku) {
		this.sku = sku;
	}

}
