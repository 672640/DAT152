package no.hvl.dat152.security.filters;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import no.hvl.dat152.security.model.Role;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

/**
 * Servlet Filter implementation class AuthorizationFilter
 */
public class AuthorizationFilter extends HttpFilter implements Filter {
       
    private static final long serialVersionUID = 1L;

    private List<String> authzCommands;
	/**
     * @see HttpFilter#HttpFilter()
     */
    public AuthorizationFilter() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		
		HttpServletRequest req = (HttpServletRequest) request;
		String role = "";
		try {
			role = RequestHelper.getRole(req);
		} catch (Exception e) {
			//
		}

		String path = req.getPathInfo().substring(1);
		/*
		 * To access admin resource, we check that:
		 * the user has admin role. Otherwise, send the user to home page
		 */
		if(!authzCommands.contains(path)) {
			// pass the request along the filter chain
			chain.doFilter(request, response);
		} else {
			if(role.equals(Role.ADMIN.toString())) {
				request.getRequestDispatcher(path).forward(request, response);
			} else {
				
				HttpServletResponse res = (HttpServletResponse)response;
				
				req.getSession().setAttribute("message", "Forbidden! You are not authorized to access this page.");
				res.sendRedirect(req.getContextPath());
			}
		}

	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		
		authzCommands = Arrays.asList(fConfig.getInitParameter("includes").split(","));
	}

}
