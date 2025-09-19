/**
 * 
 */
package no.hvl.dat152.action;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import no.hvl.dat152.dao.AuthorDAO;
import no.hvl.dat152.dao.BookDAO;
import no.hvl.dat152.model.Author;
import no.hvl.dat152.model.Book;

/**
 * 
 */
public class UpdateBookFormAction implements ControllerAction {

	@Override
	public int execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String isbn = request.getParameter("isbn");	
		
		BookDAO bookDAO = new BookDAO();		
		Book book = bookDAO.getBookByISBN(isbn);
		request.setAttribute("book", book);
		
		// collect authors
		AuthorDAO dao = new AuthorDAO();
		List<Author> authors = dao.getAllAuthors();
		request.setAttribute("authors", authors);
		
		return ControllerAction.SUCCESS;
		
	}

}
