<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Update Book</title>
</head>
<body>
	<a href="/library">Home</a>
		<p>
		<form action="updatebook" method="post">
			<table>
				<tr>
					<td>ISBN:</td>
					<td>${book.isbn} <input type="hidden" name="isbn" value="${book.isbn}" /></td>
					
				</tr>
				<tr>
					<td>Title:</td>
					<td><input name="title" name="title" value="${book.title}"/></td>
				</tr>
				<tr>
					<td>Author:</td>
					<td>
						<select id="authorid" name="authorid" >
							<c:forEach var="author" items="${authors}">
								<option value="${author.authorId }">${author.firstname} ${author.lastname}</option>
							</c:forEach>
						</select>
					</td>
				</tr>
			</table>
			<br>
			<div>
				<input type="submit" value="Update" name="submit">
				<a href="logout">Logout</a> 
			</div>
		</form>		
</body>
</html>