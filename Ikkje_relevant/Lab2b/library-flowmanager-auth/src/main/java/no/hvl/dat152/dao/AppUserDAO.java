package no.hvl.dat152.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;

import no.hvl.dat152.security.model.AppUser;


public class AppUserDAO {

  public AppUser getAuthenticatedUser(String username, String password) {

    String hashedPassword = DigestUtils.sha256Hex(password);

    String sql = "SELECT * FROM Lib.AppUser" 
        + " WHERE username = '" + username + "'"
        + " AND passhash = '" + hashedPassword + "'";
    
    
    AppUser user = null;

    Connection c = null;
    Statement s = null;
    ResultSet r = null;

    try {        
      c = DatabaseHelper.getConnection();
      s = c.createStatement();       
      r = s.executeQuery(sql);

      if (r.next()) {
        user = new AppUser(
            r.getString("username"),
            r.getString("passhash"),
            r.getString("firstname"),
            r.getString("lastname"),
            r.getString("role")
            );
      }

    } catch (Exception e) {
      System.out.println(e);
    } finally {
      DatabaseHelper.closeConnection(r, s, c);
    }

    return user;
  }
  

  public boolean saveUser(AppUser user) {

    String sql = "INSERT INTO Lib.AppUser VALUES (" 
        + "'" + user.getUsername()  + "', "
        + "'" + user.getPasshash()  + "', "
        + "'" + user.getFirstname() + "', "
        + "'" + user.getLastname()  + "', "
        + "'" + user.getRole()  + "')";

    Connection c = null;
    Statement s = null;
    ResultSet r = null;

    try {        
      c = DatabaseHelper.getConnection();
      s = c.createStatement();       
      int row = s.executeUpdate(sql);
      if(row >= 0)
    	  return true;
    } catch (Exception e) {
    	System.out.println(e);
    	return false;
    } finally {
      DatabaseHelper.closeConnection(r, s, c);
    }
    
    return false;
  }
  
  public List<String> getUsernames() {
	  
	  List<String> usernames = new ArrayList<String>();
	  
	  String sql = "SELECT username FROM Lib.AppUser";

		    Connection c = null;
		    Statement s = null;
		    ResultSet r = null;

		    try {        
		      c = DatabaseHelper.getConnection();
		      s = c.createStatement();       
		      r = s.executeQuery(sql);

		      while (r.next()) {
		    	  usernames.add(r.getString("username"));
		      }

		    } catch (Exception e) {
		      System.out.println(e);
		    } finally {
		      DatabaseHelper.closeConnection(r, s, c);
		    }
	  
	  return usernames;
  }
  
  public boolean updateUserPassword(String username, String passwordnew) {
	  
	  	String hashedPassword = DigestUtils.sha256Hex(passwordnew);
	  
	    String sql = "UPDATE Lib.AppUser "
	    		+ "SET passhash = '" + hashedPassword + "' "
	    				+ "WHERE username = '" + username + "'";
	
	    Connection c = null;
	    Statement s = null;
	    ResultSet r = null;
	
	    try {        
	      c = DatabaseHelper.getConnection();
	      s = c.createStatement();       
	      int row = s.executeUpdate(sql);
	      System.out.println("Password update successful for "+username);
	      if(row >= 0)
	    	  return true;
	      
	    } catch (Exception e) {
	      System.out.println(e);
	      return false;
	    } finally {
	      DatabaseHelper.closeConnection(r, s, c);
	    }
	    
	    return false;
  }
  
  public boolean updateUserRole(String username, String role) {

	    String sql = "UPDATE Lib.AppUser "
	    		+ "SET role = '" + role + "' "
	    				+ "WHERE username = '" + username + "'";
	
	    Connection c = null;
	    Statement s = null;
	    ResultSet r = null;
	
	    try {        
	      c = DatabaseHelper.getConnection();
	      s = c.createStatement();       
	      int row = s.executeUpdate(sql);
	      System.out.println("Role update successful for "+username+" New role = "+role);
	      if(row >= 0)
	    	  return true;
	      
	    } catch (Exception e) {
	      System.out.println(e);
	      return false;
	    } finally {
	      DatabaseHelper.closeConnection(r, s, c);
	    }
	    return false;
  }

}

