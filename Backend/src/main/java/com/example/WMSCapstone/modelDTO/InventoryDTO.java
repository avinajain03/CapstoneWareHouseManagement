package com.example.WMSCapstone.modelDTO;


public class InventoryDTO {
	
	private String productId;
	private String productName;
	private double price;
	private String category;
	private String supplierName;
	
	
	public InventoryDTO(String productId, String productName, double price, String category, String supplierName) {
		super();
		this.productId = productId;
		this.productName = productName;
		this.price = price;
		this.category = category;
		this.supplierName = supplierName;
	}
	public InventoryDTO() {
		// TODO Auto-generated constructor stub
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
	public String getSupplierName() {
		return supplierName;
	}
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
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

}
