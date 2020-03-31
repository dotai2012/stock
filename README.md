# Mobile Project
1.[Technologies](#1)
2.[Installation](#2)
3.[Running The Application](#3)
4.[Functionalities](#4)
5.[Team](#5)

<a name="1"></a>
# 1. Technologies:
In this project we have used the following Technologies:
1. React Native
2. ASP.net(API) 
3. Sql-Server

### 1.1 Authentication
For Authentication we implemented JWT based authentication in our project. It is a self-managed authentication system.
### 1.2 Stock Data
The project used https://finnhub.io/ API to pull stock data into the project. 
### 1.3 User Data
For persistent data storage, We have Used ASP.net API end points, hosted through Azure which stored the data in Sql Server for user portfolio data. Below is the UML Diagram:

![Stock_Schema](/./public/StockUml.png)
### 1.4 UI
For the UI, React Native has been used. The UI is user-friendly for the end users. 
<a name="2"></a>
# 2. Installation
To run the project the following steps are required:
### 2.1 Clone
This repo should be cloned to your local machine using https://github.com/tomkf/mobile_project.git
### 2.2 Installation (Client)
    cd to the root folder of clinet 
    npm install
### 2.3 Installation (Server)
    Drop-Database
    Remove-Migration
    Add-Migration InitialCreate
    Update-Database

<a name="3"></a>
# 3. Running the Application
1. After installing the dependencies, from the client folder run the command "npm start" 
2. This will open the Expo client in your browser, from here ensure "lan" is selected, and copy paste this address to your clipboard.
3. Run an emulator of your choice (we choose to use BlueStacks for development), and copy paste the lan address to it. 

<a name="4"></a>
# 4. Functionalities
1.	Register for an account
2.	Login/Logout
3.	Search stocks by symbol or company name
4.	Buy and Sell stocks 
4. User Portfolio
    - Current total portfolio value
    - List of current positions
    - Simple line chart of portfolio 

<a name="5"></a>
# 5. Team
1. <a href="https://github.com/dotai2012" target="_blank"> Tai Thien </a>
2. <a href="https://github.com/tomkf" target="_blank"> Thomas </a>
3. <a href="https://github.com/choipeter11" target="_blank"> Peter </a>
4. <a href="https://github.com/Ibrahimshahristani" target="_blank"> Ibrahim </a> 
