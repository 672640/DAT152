package no.hvl.dat152.security.model;

/**
 * @author tdoy
 */
public class AppUser {

	private String username; 
	private String passhash; 
	private String firstname;
	private String lastname;
	private String role;
	
	/**
	 * 
	 * @param username
	 * @param passhash
	 * @param firstname
	 * @param lastname
	 * @param role
	 */
	public AppUser(String username, String passhash, String firstname, 
			String lastname, String role) {
		this.username = username;
		this.passhash = passhash;
		this.firstname = firstname;
		this.lastname = lastname;
		this.role = role;
	}

	public String getUsername() {
		return username;
	}

	public String getPasshash() {
		return passhash;
	}

	public String getFirstname() {
		return firstname;
	}

	public String getLastname() {
		return lastname;
	}
	
	public String getRole() {
		return role;
	}
	
}

