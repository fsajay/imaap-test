﻿var reusableMethods = require("ReusableMethods");
var crashRecordsData=require("CrashRecords");
var savedCrashId;
let crashOptionValues = {};
let crashRecordPage = reusableMethods.browserObj.CrashRecordPageSelector;
let crashRecordFormPage = reusableMethods.browserObj.CrashRecordFormSelector;
let vehicleTabButton = reusableMethods.browserObj.CrashRecordFormSelector.linkVehicle;
let casualtyTabButton = reusableMethods.browserObj.CrashRecordFormSelector.casualtyTabButton;
let casualtyAddButton = reusableMethods.browserObj.CrashRecordFormSelector.casualityAddNewButton;
let crashSaveButton = reusableMethods.browserObj.CrashRecordFormSelector.crashRecordsSave;
let crashId = reusableMethods.browserObj.CrashRecordFormSelector.retieveCrashId;
let cancelButton = reusableMethods.browserObj.CrashRecordFormSelector.crashSaveCancelButton;
let crashHeaderId = reusableMethods.browserObj.CrashRecordPageSelector.savedCrashHeader;
let detailedViewToggle=reusableMethods.browserObj.CrashRecordPageSelector.sectionSearch.crashDetailedViewToggle;
let crashRecordsDetailedViewPage=reusableMethods.browserObj.CrashRecordsDetailedViewSelector;
let recordFilterButton=reusableMethods.browserObj.CrashRecordsDetailedViewSelector.sectionSearch.buttonEditFilterForColumnField;
let searchFilterRecord=reusableMethods.browserObj.CrashRecordsDetailedViewSelector.searchInFilterRecord;
let filterApplyButton=reusableMethods.browserObj.CrashRecordsDetailedViewSelector.filterApplyButton
let filterField=reusableMethods.browserObj.CrashRecordsDetailedViewSelector.sectionSearch.filterField;
let filterValue=reusableMethods.browserObj.CrashRecordsDetailedViewSelector.sectionSearch.filterValue;
let vehicleTabVerification=reusableMethods.browserObj.CrashRecordsDetailedViewSelector.linkVehicle;
let casualityTabVerification=reusableMethods.browserObj.CrashRecordsDetailedViewSelector.linkCasualty;
let detailViewToggle=reusableMethods.browserObj.CrashRecordsDetailedViewSelector.detailedViewToggle;
let searchCrashButton=reusableMethods.browserObj.CrashRecordPageSelector.searchCrashButton;
let searchCrashTextbox=reusableMethods.browserObj.CrashRecordPageSelector.searchTextbox;
let searchIcon=reusableMethods.browserObj.CrashRecordPageSelector.searchIconButton;
let detailViewCloseButton=reusableMethods.browserObj.CrashRecordsDetailedViewSelector.buttonClose;

//Navigate to 'Add Crash Record' Page
function NavigateToAddCrashRecordForm()
{
  let addCrashRecordButton=reusableMethods.browserObj.CrashRecordPageSelector.addCrashRecord;  
  reusableMethods.PageWait(crashRecordPage);  
  Delay(15000);
  reusableMethods.Click(addCrashRecordButton);
}

//Reusable method to add crash records
function AddRecords(fieldTab) 
{
    for (var i = 0; i < fieldTab.length; i++) 
    {
        var fieldObj = fieldTab[i];
        let field = reusableMethods.browserObj.CrashRecordFormSelector[fieldObj.path];
        if (fieldObj.path.includes("TextBox")) 
        {
            reusableMethods.SendKeys(field, fieldObj.value);
        } else if (fieldObj.path.includes("Dropdown")) 
        {
            let fieldOption = reusableMethods.browserObj.CrashRecordFormSelector[fieldObj.option];
            let dropdownOption = reusableMethods.SelectAndRetrieveValueFromDropdown(field, fieldOption);
            if (fieldObj.label.includes("Time")) 
            {
                fieldObj.value = dropdownOption;
            } else 
            {
                fieldObj.value = dropdownOption.slice(2);
            }
        }
    }
}

//To add crash records
function AddCrashRecords() {
    reusableMethods.PageWait(crashRecordFormPage);
    AddRecords(crashRecordsData.crashFieldNames);
    reusableMethods.Click(vehicleTabButton);
    AddRecords(crashRecordsData.vehicleFieldNames);
    reusableMethods.Click(casualtyTabButton);
    reusableMethods.Click(casualtyAddButton);
    AddRecords(crashRecordsData.casualityFieldNames);
    reusableMethods.Click(crashSaveButton);
    reusableMethods.WaitForElementVisible(crashRecordFormPage,cancelButton,15000);
    reusableMethods.Click(cancelButton);
    reusableMethods.PageWait(crashRecordPage);
  }
  
//Reusable method to verify crash records
function VerificationOfCrashRecords(fieldTab)
{          
    for(var i = 0; i < fieldTab.length; i++)
    {
      reusableMethods.ButtonClick(recordFilterButton);
      var fieldObj = fieldTab[i]; 
      reusableMethods.SendKeys(searchFilterRecord,fieldObj.label);   
      Delay(2000);
      reusableMethods.ButtonClick(filterApplyButton);
      Delay(2000);
      let tempValue=reusableMethods.RetrieveTextFromElement(filterValue);
      reusableMethods.CompareStrings(tempValue,fieldObj.value,true,0,"verify the saved '"+fieldObj.label+"' of crash records");            
      Delay(1000);      
    }
  }
 
//To verify the added crash records   
function  VerificationOfAddedCrashRecords(option)
{
  reusableMethods.Click(detailedViewToggle); 
  Delay(2000);
  reusableMethods.WaitForElementVisible(crashRecordsDetailedViewPage,filterValue,8000);
  VerificationOfCrashRecords(crashRecordsData.crashFieldNames);
  reusableMethods.Click(vehicleTabVerification);  
  VerificationOfCrashRecords(crashRecordsData.vehicleFieldNames);
  reusableMethods.Click(casualityTabVerification);
  VerificationOfCrashRecords(crashRecordsData.casualityFieldNames); 
}
  
 //To edit the crash, vehicle and casuality records
function EditCrashRecords()
{
  let value1,crashEditDateText,casualityEditText; 
  let editButton=reusableMethods.browserObj.CrashRecordPageSelector.editCrashRecordButton
  let crashDateTextBox = reusableMethods.browserObj.CrashRecordFormSelector.crashDateTextBox;
  let casualityClassDropdown=reusableMethods.browserObj.CrashRecordFormSelector.casualityClassDropdown;
  let editCasualityClassDropdown=reusableMethods.browserObj.CrashRecordFormSelector.editCasualityClassDropdown;
  let fieldEditCasualityOption=reusableMethods.browserObj.CrashRecordFormSelector.editCasualityClassOption;
  let verifyCasualityRecord=reusableMethods.browserObj.CrashRecordPageSelector.casualityClassEdit;
  let verifyCrashDateEdit=reusableMethods.browserObj.CrashRecordsDetailedViewSelector.sectionSearch.verifyEditDateText;
  reusableMethods.Click(editButton);
  reusableMethods.PageWait(crashRecordFormPage); 
  reusableMethods.SendKeys(crashDateTextBox,Project.Variables.crashEditDateTextBox);
  Delay(2000);
  reusableMethods.Click(casualtyTabButton);
  reusableMethods.WaitForElementVisible(crashRecordFormPage,editCasualityClassDropdown,8000);
  Delay(8000);
  value1=reusableMethods.SelectAndRetrieveValueFromDropdown(editCasualityClassDropdown,fieldEditCasualityOption);
  reusableMethods.Click(crashSaveButton);
  reusableMethods.WaitForElementVisible(crashRecordFormPage,cancelButton,8000);
  reusableMethods.Click(cancelButton);
  reusableMethods.WaitForElementVisible(crashRecordsDetailedViewPage,detailViewToggle,8000);
  reusableMethods.Click(detailViewToggle);
  reusableMethods.PageWait(crashRecordPage);
  reusableMethods.WaitForElementVisible(crashRecordPage,verifyCrashDateEdit,8000);
  reusableMethods.WaitForElementVisible(crashRecordPage,verifyCasualityRecord,8000);
  //verification part
  crashEditDateText=reusableMethods.RetrieveTextFromElement(verifyCrashDateEdit);
  casualityEditText=reusableMethods.RetrieveTextFromElement(verifyCasualityRecord);
  reusableMethods.CompareStrings(crashEditDateText.slice(0,10),Project.Variables.crashEditDateTextBox,true,0,"verify the saved 'Crash Date' of crash records");
  reusableMethods.CompareStrings(casualityEditText.trim(),value1.slice(2),true,0,"verify the saved 'Casuality class' of crash records");
}

//To delete the added crash records
function DeleteCrashRecords()
{
  let deleteCrashButton=reusableMethods.browserObj.CrashRecordPageSelector.deleteCrashRecordButton;
  
  let delConfirm=reusableMethods.browserObj.CrashRecordPageSelector.delConfirm;
  let delOkButton=reusableMethods.browserObj.CrashRecordPageSelector.buttonOk;
  let delConfirmMessage;
  
  reusableMethods.Click(deleteCrashButton);
  reusableMethods.Click(delOkButton);
  SearchCrashRecord();
  reusableMethods.WaitForElementVisible(crashRecordPage,delConfirm,8000);
  delConfirmMessage=reusableMethods.RetrieveTextFromElement(delConfirm);
  reusableMethods.CompareStrings(delConfirmMessage,Project.Variables.delMessage,true,0,"verify the saved crash records are deleted successfully");
  reusableMethods.Click(delOkButton); 
}

//To search the added crash records
function SearchCrashRecord()
{
  reusableMethods.WaitForElementVisible(crashRecordPage,searchCrashButton,8000);
  reusableMethods.Click(searchCrashButton);
  Delay(10000);
  reusableMethods.SendKeys(searchCrashTextbox,Project.Variables.caseNoText);
  reusableMethods.Click(searchIcon);
  Delay(5000);
}

module.exports.NavigateToAddCrashRecordForm=NavigateToAddCrashRecordForm;
module.exports.AddCrashRecords=AddCrashRecords;
module.exports.VerificationOfAddedCrashRecords=VerificationOfAddedCrashRecords;
module.exports.EditCrashRecords=EditCrashRecords;
module.exports.SearchCrashRecord=SearchCrashRecord;
module.exports.DeleteCrashRecords=DeleteCrashRecords;