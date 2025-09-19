package no.hvl.dat152.security.filters;


import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;


/**
 * @author tdoy
 * Servlet Filter implementation class AuthenticationFilter
 */
public class AuthenticationFilter extends HttpFilter implements Filter {
       
    private static final long serialVersionUID = 1L;
    
    private String[] loginPath;
	/**
     * @see HttpFilter#HttpFilter()
     */
    public AuthenticationFilter() {
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
		String path =req.getPathInfo();
		
		/*
		 * To access any resource, we check that:
		 * the user has an authenticated session. Otherwise, send the user to login page
		 */
		if(RequestHelper.isLoggedIn((HttpServletRequest) request) || loginPath[0].equals(path) || loginPath[1].equals(path)) {
			// pass the request along the filter chain
			chain.doFilter(request, response);
		} else {
			
			request.getRequestDispatcher("loginform").forward(request, response);
		}

		
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		
		loginPath = fConfig.getInitParameter("excludeLogin").split(",");
		
	}

}
