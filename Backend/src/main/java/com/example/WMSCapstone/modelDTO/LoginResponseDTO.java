package com.example.WMSCapstone.modelDTO;

public class LoginResponseDTO {
	
	private String userName;
	private String userId;
	private String email;
	private String role;
	
    public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public LoginResponseDTO(String userName, String email, String role, String userId) {
	    this.userName = userName;
	    this.email = email;
	    this.role = role;
	    this.userId = userId;
	}

}
