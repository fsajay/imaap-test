﻿var reusableMethods = require("ReusableMethods");
let importPage=reusableMethods.browserObj.ImportPageSelector;
let recordCount,oldRecCount,updatedRecCount;
let updateButton=reusableMethods.browserObj.ImportPageSelector.updateButton;
let updateCloseButton=reusableMethods.browserObj.ImportPageSelector.importUpdateCloseButton;
var oldRecNum,newRecNum;
  

//To retrieve the crash record counts for update records-Reusable
function RetrieveCrashRecordCount(compValue)
{
  let updateRecordsCount=importPage.FindElements("//div[@class='trl-c-query-data-item']//div[2]");
  reusableMethods.WaitForElementVisible(importPage,updateRecordsCount,10000);
  for(var i=1;i<=updateRecordsCount.length;i++)
  {
    let crashVal=importPage.FindElement("//div[@class='trl-c-query-data-item']["+i+"]//div[2]").contentText;
    if(crashVal.includes(compValue))
    {
      recordCount=importPage.FindElement("//div[@class='trl-c-query-data-item']["+i+"]//div[1]/span").contentText;
    }
  }
}

//To import crash records
function ImportCrashRecords(recordType,path)
{ 
  let importCompletedText;  
  let crashRadioButton= reusableMethods.browserObj.ImportPageSelector.crashDataRadioButton;
  let vehicleRadioButton=reusableMethods.browserObj.ImportPageSelector.vehicleDataRadioButton;
  let casualtyRadioButton=reusableMethods.browserObj.ImportPageSelector.casualtyDataRadioButton;
  let browseFileButton=reusableMethods.browserObj.ImportPageSelector.importBrowse;
  let importButton=reusableMethods.browserObj.ImportPageSelector.importButton;
  let viewLogButton=reusableMethods.browserObj.ImportPageSelector.viewLogButton;
  let importCompletedLabel=reusableMethods.browserObj.ImportPageSelector.importCompletedLabel;
  
  Delay(20000);
  if(recordType==="Crashes")
  {reusableMethods.Click(crashRadioButton);}
  else if(recordType==="Vehicles")
  {reusableMethods.Click(vehicleRadioButton);}
  else if(recordType==="Casualties")
  {reusableMethods.Click(casualtyRadioButton);}
  Delay(2000);
  RetrieveCrashRecordCount(recordType);
  oldRecCount=recordCount;
  reusableMethods.Click(browseFileButton);
  let dialogText= reusableMethods.browserObj.dlgOpen.cbxFileName.ComboBox.Edit;
  let dialogOpen=reusableMethods.browserObj.dlgOpen.btnOpen;
  reusableMethods.SendKeys(dialogText,path);
  reusableMethods.Click(dialogOpen);
  reusableMethods.Click(importButton);
  Delay(15000);
  importCompletedText=reusableMethods.RetrieveTextFromElement(importCompletedLabel);
  reusableMethods.CompareStrings(importCompletedText,Project.Variables.importCompletedText,true,0,"verify that the "+recordType+" records are imported successfully");
  UpdateRecords();
  RetrieveCrashRecordCount(recordType);
  updatedRecCount=recordCount;
  VerifyUpdatedCrashRecCount(recordType);
}

//To update the record count
function UpdateRecords()
{
  reusableMethods.Click(updateButton);
  reusableMethods.WaitForElementVisible(importPage,updateCloseButton,10000);
  reusableMethods.Click(updateCloseButton);
}

//To verify the updated crash record count
function VerifyUpdatedCrashRecCount(record)
{
  oldRecNum=reusableMethods.StringToInt(oldRecCount);
  newRecNum=reusableMethods.StringToInt(updatedRecCount);
  if(oldRecNum< newRecNum)
  {
    Log.Event("User is able to verify that the "+record+" record counts are updated successfully! Old Record Count:"+oldRecNum+" New Record Count:"+newRecNum);
  }
  else
  {
    Log.Error("User is not able to verify that the "+record+" record counts are updated successfully! Old Record Count:"+oldRecNum+" New Record Count:"+newRecNum)
  }
}

//To verify the imported details
function VerifyImportedFile(actualRecord,recordType)
{
  var viewLabelData=Project.Variables.viewLabelData.split(",");
  var viewActualRecord=actualRecord.split(",");
  let recentImportsButton=reusableMethods.browserObj.ImportPageSelector.recentImportsButton;
  let viewLogButton=reusableMethods.browserObj.ImportPageSelector.viewLogButton;  
  var date=reusableMethods.GetCurrentDate();
  reusableMethods.Click(recentImportsButton);
  Delay(2000);
  reusableMethods.WaitForElementVisible(importPage,viewLogButton,10000);
  reusableMethods.Click(viewLogButton);
  Delay(20000);
  let viewRecordCount=importPage.FindElements("//div[@class='trl-l-blackspot__details--block']/div//span");
  for(var i=1;i<viewRecordCount.length;i++)
  {
  let viewRecordLabel=importPage.FindElement("//div[@class='trl-l-blackspot__details--block']/div["+i+"]//label").contentText;
  if(viewRecordLabel.includes(viewLabelData[i-1])&& (viewLabelData[i-1]!=""))
    {
      crashVerify=importPage.FindElement("//div[@class='trl-l-blackspot__details--block']/div["+i+"]//span").contentText;
      reusableMethods.CompareStrings(viewActualRecord[i-1],crashVerify,true,0,"verify that the '"+viewLabelData[i-1]+"' record counts are updated successfully");
    }
    else if (viewRecordLabel.includes("Date"))
    {
      crashVerify=importPage.FindElement("//div[@class='trl-l-blackspot__details--block']/div["+i+"]//span").contentText;
      if(crashVerify.includes(date))
      {
        Log.Event("User is able to verify that the 'Date and Time of Import' record counts are updated successfully");
      }
      else
      Log.Error("User is not able to verify that the 'Date and Time of Import' record counts are updated successfully");
    }  
  }  
}
module.exports.ImportCrashRecords=ImportCrashRecords;
module.exports.VerifyImportedFile=VerifyImportedFile;