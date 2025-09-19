<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Add New Book</title>
</head>
<body>
	<div class="container">
		<a href="/library">Home</a>
		<p>
		<form action="addbook" method="post">
			<table>
				<tr>
					<td>ISBN:</td>
					<td>${isbn} <input type="hidden" name="isbn" value="${isbn}" /></td>
					
				</tr>
				<tr>
					<td>Title:</td>
					<td><input name="title" /></td>
				</tr>
				<tr>
					<td>Author:</td>
					<td>
						<select id="authorid" name="authorid" >
							<c:forEach var="author" items="${authors}">
								<option value="${author.authorId}">${author.firstname} ${author.lastname}</option>
							</c:forEach>
						</select>
					</td>
				</tr>
			</table>
			<br>
			<div>
				<input type="submit" value="Submit" name="submit">
				<a href="logout">Logout</a>
			</div>
		</form>		
	</div>
</body>
</html>