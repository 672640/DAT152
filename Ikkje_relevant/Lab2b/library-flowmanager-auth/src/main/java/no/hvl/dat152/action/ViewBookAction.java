/**
 * 
 */
package no.hvl.dat152.action;

import java.io.IOException;

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
public class ViewBookAction implements ControllerAction {

	@Override
	public int execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String isbn = request.getParameter("isbn");
		String authorid = request.getParameter("authorid");

		BookDAO bookDAO = new BookDAO();
		Book book = bookDAO.getBookByISBN(isbn);
		
		AuthorDAO authorDAO = new AuthorDAO();
		Author author = authorDAO.getAuthorByID(Integer.parseInt(authorid));
		
		request.setAttribute("book", book);
		request.setAttribute("author", author);
		
		return ControllerAction.SUCCESS;

	}

}
