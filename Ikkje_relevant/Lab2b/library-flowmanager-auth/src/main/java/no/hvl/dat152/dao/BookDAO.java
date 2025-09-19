package no.hvl.dat152.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import no.hvl.dat152.model.Book;

/**
 * @author tdoy
 */

public class BookDAO {
	
	/**
	 * 
	 * @param isbn
	 * @return Book
	 */
	public Book getBookByISBN(String isbn) {
	  
	  Book book = null;
	  
	  String sql = "SELECT * FROM Lib.Books where isbn = '"+isbn+"'";

	    Connection c = null;
	    Statement s = null;
	    ResultSet r = null;

	    try {        
	      c = DatabaseHelper.getConnection();
	      s = c.createStatement();       
	      r = s.executeQuery(sql);
	      
	      if (r.next()) {
	    	  book = new Book(
	    			  r.getString("isbn"),
	    			  r.getString("title"),
	    			  r.getInt("authorid"));
	      }
	    } catch (Exception e) {
	      System.out.println(e);
	    } finally {
	      DatabaseHelper.closeConnection(r, s, c);
	    }
	    
	    return book;
	}
  
	/**
	 * 
	 * @return books
	 */
	public List<Book> getAllBooks(){
		
		String sql = "SELECT * FROM Lib.Books ORDER BY title DESC";
		
		//  LIMIT 10
	    // Derby lacks LIMIT
		return getBooks(sql, 10);
	}
	
	/**
	 * 
	 * @return books
	 */
	public List<Book> getBooksByAuthorId(String authorid){
		
		String sql = "SELECT * FROM Lib.Books Where authorid = '"+authorid
		+"' ORDER BY title DESC";
		
		return getBooks(sql, 10);
	}
	
  /**
   * Get all books
   * @return books
   */
  private List<Book> getBooks(String sql, int limit) {
	  
	List<Book> books = new ArrayList<Book>();

    Connection c = null;
    Statement s = null;
    ResultSet r = null;

    try {        
      c = DatabaseHelper.getConnection();
      s = c.createStatement();  
      if (limit > 0) s.setMaxRows(limit);
      r = s.executeQuery(sql);

      while (r.next()) {
    	  Book book = new Book(
    			  r.getString("isbn"),
    			  r.getString("title"),
    			  r.getInt("authorid"));
    	  books.add(book);
      }

    } catch (Exception e) {
      System.out.println(e);
    } finally {
      DatabaseHelper.closeConnection(r, s, c);
    }
	  
	  return books;
  }
  
  /**
   * 
   * @param isbn
   * @param title
   * @return true or false
   */
  public boolean updateBook(String isbn, String title, int authorid) {

    String sql = "UPDATE Lib.Books "
    		+ "SET title = '" + title + "', authorid= "+authorid
    				+ " WHERE isbn = '" + isbn + "'";

    Connection c = null;
    Statement s = null;
    ResultSet r = null;

    try {        
      c = DatabaseHelper.getConnection();
      s = c.createStatement();       
      int row = s.executeUpdate(sql);
      System.out.println("Update successful for "+isbn);
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
   * @param book
   * @return true or false
   */
  	public boolean addBook(Book book) {

	    String sql = "INSERT INTO Lib.Books VALUES (" 
	        + "'" + book.getIsbn()  + "', "
	        + "'" + book.getTitle()  + "', "
	        + book.getAuthorId() + ")";

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

}

