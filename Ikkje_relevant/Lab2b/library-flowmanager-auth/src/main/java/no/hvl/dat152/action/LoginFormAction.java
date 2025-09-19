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
public class LoginFormAction implements ControllerAction {

	@Override
	public int execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		request.setAttribute("message", "Please, login to access this resource");
		
		return ControllerAction.SUCCESS;

	}
	

}
