/**
 * 
 */
package no.hvl.dat152.action;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * 
 */
public interface ControllerAction {
	
	int SUCCESS = 1;
	/**
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	int execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException;
}
