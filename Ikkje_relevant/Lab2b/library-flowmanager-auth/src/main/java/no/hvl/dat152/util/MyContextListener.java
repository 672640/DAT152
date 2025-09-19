package no.hvl.dat152.util;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import org.apache.commons.codec.digest.DigestUtils;

import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;
import no.hvl.dat152.dao.DatabaseHelper;
import no.hvl.dat152.security.model.Role;



@WebListener
public class MyContextListener implements ServletContextListener {

  @Override
  public void contextInitialized(ServletContextEvent arg0)  { 
    System.out.println("Application is started. The database will be created if it does not exist.");
    setupDB();
  }

  @Override
  public void contextDestroyed(ServletContextEvent arg0)  { 
    System.out.println("Application was stopped.");    
  }
  
  private void setupDB() {
    try (
        Connection conn = DatabaseHelper.getConnection();
        Statement st = conn.createStatement();
        ){
      try {
        st.executeUpdate("create schema Lib");
        System.out.println("Schema Lib was created.");
      } catch (Exception e) {
        System.out.println(e.toString());
      }

      try {
          st.executeUpdate("CREATE TABLE Lib.Authors ("
          	+ "authorid INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1),"
          	+ "firstname VARCHAR(50),"
            + "lastname VARCHAR(50),"
            + "PRIMARY KEY (authorid))");
         System.out.println("Table Lib.Authors was created.");
	  } catch (Exception e) {
	     System.out.println(e.toString());
      }
      
      try {
       st.executeUpdate("CREATE TABLE Lib.Books ("
           + "isbn VARCHAR(50) UNIQUE,"
           + "title VARCHAR(50),"
           + "authorid INT,"
           + "PRIMARY KEY (isbn, authorid),"
           + "FOREIGN KEY (authorid) REFERENCES Lib.Authors(authorid))");
        System.out.println("Table Lib.Books was created.");
      } catch (Exception e) {
        System.out.println(e.toString());
      }
      
      // create user table
      try {
          st.executeUpdate("create table Lib.AppUser ("
              + "username VARCHAR(50) UNIQUE,"
              + "passhash VARCHAR(256),"
              + "firstname VARCHAR(50),"
              + "lastname VARCHAR(50),"
              + "role VARCHAR(10),"
              + "PRIMARY KEY (username, passhash))");
           System.out.println("Table Lib.AppUser was created.");
         } catch (Exception e) {
           System.out.println(e.toString());
         }
      
      // initialize author table
      try {
          st.executeUpdate("INSERT INTO Lib.Authors (firstname, lastname) VALUES "
          		+ "	('Shari', 'Pfleeger'),"
          		+ "	('Perry', 'Lea'), "
          		+ "	('James', 'Kurose'),"
          		+ "	('Keith', 'Ross'),"
          		+ "	('Martin', 'Kleppmann')");

          System.out.println("Table Lib.Authors initialised with default authors.");

        } catch (Exception e) {
          System.out.println(e.toString());
        }
      
      // insert default admin user (username=admin (password=password))
      try {
          st.executeUpdate("INSERT INTO Lib.AppUser VALUES "
          		+ "('admin', "
          		+ "'"+DigestUtils.sha256Hex("password")+"',"
          		+ "'Admin', "
          		+ "'Admin', "
        		+"'"+Role.ADMIN.toString()+"')");

          System.out.println("Default admin user = \"admin\" password = \"password\" created...");

        } catch (Exception e) {
          System.out.println(e.toString());
        }
      // insert default user (username=user (password=password))
      try {
          st.executeUpdate("INSERT INTO Lib.AppUser VALUES "
          		+ "('user', "
          		+ "'"+DigestUtils.sha256Hex("password")+"',"
          		+ "'TestUser', "
          		+ "'TestUser', "
        		+"'"+Role.USER.toString()+"')");

          System.out.println("Default user = \"user\" password = \"password\" created...");

        } catch (Exception e) {
          System.out.println(e.toString());
        }
    } catch (Exception e) {
      System.out.println(e.toString());
    }
    
  }

}
