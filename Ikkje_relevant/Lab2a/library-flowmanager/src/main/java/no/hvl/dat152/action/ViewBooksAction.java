/**
 * 
 */
package no.hvl.dat152.action;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import no.hvl.dat152.dao.BookDAO;
import no.hvl.dat152.model.Book;

/**
 * 
 */
public class ViewBooksAction implements ControllerAction {

	@Override
	public int execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		BookDAO bookDAO = new BookDAO();
		
		List<Book> books = bookDAO.getAllBooks();
		request.setAttribute("books", books);
		
		return ControllerAction.SUCCESS;

	}

}
