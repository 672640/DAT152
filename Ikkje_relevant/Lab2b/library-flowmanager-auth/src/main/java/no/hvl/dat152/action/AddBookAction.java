/**
 * 
 */
package no.hvl.dat152.action;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import no.hvl.dat152.dao.BookDAO;
import no.hvl.dat152.model.Book;

/**
 * 
 */
public class AddBookAction implements ControllerAction {

	@Override
	public int execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String isbn = request.getParameter("isbn");
		String title = request.getParameter("title");
		String authorid = request.getParameter("authorid");

		int author = Integer.parseInt(authorid);
		
		Book book = new Book(isbn, title, author);
		
		// save in DB
		BookDAO dao = new BookDAO();
		dao.addBook(book);
		
		request.setAttribute("books", dao.getAllBooks());
		
//		response.sendRedirect("viewbooks");
		return ControllerAction.SUCCESS;

	}

}
