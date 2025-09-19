<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Home Page</title>
</head>
<body>
	<div>
		<h3>Welcome to e-Library Service (FrontController With FlowManager)</h3>
		<p><font color="blue">Logged in: ${auth_user.username}</font></p>
		<p><font color="red">${message}</font></p>
	</div>
	<div class="text-left">
		<p>
			<a href="/library">Home</a> | <a href="do/viewbooks">View Books</a> | 
			<a href="do/addbookform">Add Book</a> 
			<a href="do/addauthorform">Add Author</a>
		</p>
		
	</div>

</body>
</html>