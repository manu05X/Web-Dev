<%@ page import="java.sql.*"%>
<%
String name = request.getParameter("username");
String pass = request.getParameter("password");

  try {
		Class.forName("com.mysql.jdbc.Driver");
		Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/ninad","root","root123");
		
        Statement stmt = conn.createStatement();
		String query = "SELECT * FROM login WHERE username= \'"+name+"\' AND password= \'"+pass+"\'";
		ResultSet rs = stmt.executeQuery(query);

		if(rs.next()==false){
			out.println("Invalid username/password. Log In Denied");
		} else {
			response.sendRedirect("welcome.html");
		}
		stmt.close();
		conn.close();
  }
  catch(Exception e) {out.println(e);}

%>