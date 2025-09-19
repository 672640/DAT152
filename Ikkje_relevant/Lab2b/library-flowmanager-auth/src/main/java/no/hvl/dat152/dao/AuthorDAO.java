package no.hvl.dat152.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import no.hvl.dat152.model.Author;

/**
 * @author tdoy
 */

public class AuthorDAO {
	
  /**
   * 
   * @param author
   * @return true or false
   */
  	public boolean addAuthor(Author author) {

	    String sql = "INSERT INTO Lib.Authors (firstname, lastname) VALUES (" 
	        + "'" + author.getFirstname()  + "', "
	        + "'" + author.getLastname() + "')";

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
	  	
	/**
	 * 
	 * @param authorid
	 * @return Author
	 */
	public Author getAuthorByID(int authorid) {
	  
	  Author author = null;
	  
	  String sql = "SELECT * FROM Lib.Authors where authorid = "+authorid;

	    Connection c = null;
	    Statement s = null;
	    ResultSet r = null;

	    try {        
	      c = DatabaseHelper.getConnection();
	      s = c.createStatement();       
	      r = s.executeQuery(sql);
	      
	      if (r.next()) {
	    	  author = new Author(
	    			  r.getInt("authorid"),
	    			  r.getString("firstname"),
	    			  r.getString("lastname"));
	      }
	    } catch (Exception e) {
	      System.out.println(e);
	    } finally {
	      DatabaseHelper.closeConnection(r, s, c);
	    }
	    
	    return author;
	}
	
	/**
	 * 
	 * @return authors
	 */
	public List<Author> getAuthorsByLastname(String lastname){
		
		String sql = "SELECT * FROM Lib.Authors Where lastname = '"+lastname
		+"' ORDER BY lastname DESC";
		
		return getAuthors(sql, 10);
	}
	
	  
	/**
	 * 
	 * @return authors
	 */
	public List<Author> getAllAuthors(){
		
		String sql = "SELECT * FROM Lib.Authors ORDER BY lastname DESC";
		
		//  LIMIT 10
	    // Derby lacks LIMIT
		return getAuthors(sql, 10);
	}
	
  /**
   * Get all authors
   * @return authors
   */
  private List<Author> getAuthors(String sql, int limit) {
	  
	List<Author> authors = new ArrayList<Author>();

    Connection c = null;
    Statement s = null;
    ResultSet r = null;

    try {        
      c = DatabaseHelper.getConnection();
      s = c.createStatement();  
      if (limit > 0) s.setMaxRows(limit);
      r = s.executeQuery(sql);

      while (r.next()) {
    	  Author author = new Author(
    			  r.getInt("authorid"),
    			  r.getString("firstname"),
    			  r.getString("lastname"));
    	  authors.add(author);
      }

    } catch (Exception e) {
      System.out.println(e);
    } finally {
      DatabaseHelper.closeConnection(r, s, c);
    }
	  
	  return authors;
  }
  

}

