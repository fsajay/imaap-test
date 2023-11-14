var AppSetup = require("AppSetup");
var LoginPage = require("LoginPage");
var HomePage=require("HomePage");
var CrashRecordPage=require("CrashRecordPage");

 //Test Objecive:To verify that the user is able to add crash records
 function CrashDataTest() {
   AppSetup.LaunchBrowser();
   LoginPage.Login();
   HomePage.MenuNavigation("Data Management","Crash Records");
   CrashRecordPage.NavigateToAddCrashRecordForm();
   CrashRecordPage.AddCrashRecords();
   CrashRecordPage.VerificationOfAddedCrashRecords("Add");
   CrashRecordPage.EditCrashRecords();
   CrashRecordPage.DeleteCrashRecords();
   HomePage.LogoutApplication();
   AppSetup.CloseBrowser();    
 }