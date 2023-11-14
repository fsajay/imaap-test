var reusableMethods = require("ReusableMethods");
let hotspotIdentificationPage=reusableMethods.browserObj.HotspotIdentificationPageSelector;
let templateSelectButton=reusableMethods.browserObj.HotspotIdentificationPageSelector.selectTemplatesButton;
let autoTemplate=reusableMethods.browserObj.HotspotIdentificationPageSelector.automationTemplate;
let openTemplateButton=reusableMethods.browserObj.HotspotIdentificationPageSelector.openTemplateButton;
let runTemplateButton=reusableMethods.browserObj.HotspotIdentificationPageSelector.hotspotIdentificationRunButton;
let analysisResultButton=reusableMethods.browserObj.HotspotIdentificationPageSelector.resultAnalysisButton;
let dateRangeInputField=reusableMethods.browserObj.HotspotIdentificationPageSelector.dateRangeInputField;
let panelHotspotIdentificationResult =reusableMethods.browserObj.HotspotIdentificationPageSelector.panelHotspotIdentificationResult;
let hotspotOption=reusableMethods.browserObj.HotspotIdentificationPageSelector.panelHotspot1;
let hotspotIdentificationOptions=reusableMethods.browserObj.HotspotIdentificationPageSelector.hotspotIdentificationOptions;
let goToDropdown=reusableMethods.browserObj.HotspotIdentificationPageSelector.goToDropdown;
let saveHotspot=reusableMethods.browserObj.HotspotIdentificationPageSelector.savePotentialHotspot;
let hotspotName=reusableMethods.browserObj.HotspotIdentificationPageSelector.hotspotName;
let hotspotTypeDropdown=reusableMethods.browserObj.HotspotIdentificationPageSelector.hotspotType;
let identificationYr=reusableMethods.browserObj.HotspotIdentificationPageSelector.identificationYear;
let mpfVal=reusableMethods.browserObj.HotspotIdentificationPageSelector.mpfTextbox;
let hotspotSave=reusableMethods.browserObj.HotspotIdentificationPageSelector.potentialHotspotSave;
let intersectPotentialSaveButton=hotspotIdentificationPage.savePotentialIntersectionYesButton;
var dateText,hotSpotName=Project.Variables.hotspotName+reusableMethods.getRandomNumber();

//To run the hotspot with template
//Prerequisite:AutoTemplate
function TemplateRun()
{
  Delay(10000);
  reusableMethods.PageWait(hotspotIdentificationPage);
  Delay(3000);
  dateText=reusableMethods.RetrieveTextFromElement(dateRangeInputField);
  reusableMethods.WaitForElementVisible(hotspotIdentificationPage,templateSelectButton,5000);
  reusableMethods.Click(templateSelectButton);
  reusableMethods.WaitForElementVisible(hotspotIdentificationPage,autoTemplate,5000);
  reusableMethods.Click(autoTemplate);
  reusableMethods.Click(openTemplateButton);
  reusableMethods.WaitForElementVisible(hotspotIdentificationPage,runTemplateButton,5000);
  Delay(5000);
  reusableMethods.Click(runTemplateButton);  
}

//To verify that the 'Analysis Result Details' are displayed
function AnalysisResultDetails()
{
  reusableMethods.WaitForElementVisible(hotspotIdentificationPage,analysisResultButton,5000);
  reusableMethods.Click(analysisResultButton);
  reusableMethods.WaitForElementVisible(hotspotIdentificationPage,panelHotspotIdentificationResult,5000);
  reusableMethods.ElementVisible(panelHotspotIdentificationResult,"verify that the tab 'Hotspot Identification Result Details' are displayed");
  reusableMethods.Click(hotspotOption);
  reusableMethods.ElementVisible(hotspotIdentificationOptions,"verify that the tab 'Options' are displayed");
}

//To verify that the option labels are displayed correctly
function VerifyOptionDetails()
{
  var opt1Label=Project.Variables.optionLabel1.split(",");
  var opt2Label=Project.Variables.optionLabel2.split(",");
  let optionCount1=hotspotIdentificationPage.FindElements("//div[@class='trl-l-popover__map-data']/ul/li//span");
  for(var i=1;i<=optionCount1.length;i++)
  {
    let viewOptionLabel=hotspotIdentificationPage.FindElement("//div[@class='trl-l-popover__map-data']/ul/li["+i+"]//span").contentText;
    reusableMethods.CompareStrings(opt1Label[i-1],viewOptionLabel,true,0,"verify that the '"+opt1Label[i-1]+"' labels are displayed successfully");
  }
  reusableMethods.Click(goToDropdown);
  Delay(1000);
  let optionCount2=hotspotIdentificationPage.FindElements("//div[@class='trl-popover-content__accordion']//ul//li//span");
  for(var j=1;j<=optionCount2.length;j++)
  {
    let viewOptionLabel2=hotspotIdentificationPage.FindElement("//div[@class='trl-popover-content__accordion']//ul/li["+j+"]//span").contentText;
    reusableMethods.CompareStrings(opt2Label[j-1],viewOptionLabel2,true,0,"verify that the '"+opt2Label[j-1]+"' labels are displayed successfully");
  }  
}

//To save the hotspot
function SaveHotspot()
{
 Delay(1000);
 reusableMethods.Click(saveHotspot); 
 reusableMethods.WaitForElementVisible(hotspotIdentificationPage,hotspotName,5000);
 reusableMethods.SendKeys(hotspotName,hotSpotName);
 hotspotTypeDropdown.ClickItem(Project.Variables.bandType);
 reusableMethods.SendKeys(identificationYr,Project.Variables.identificationYr);
 reusableMethods.SendKeys(mpfVal,Project.Variables.mpf);
 reusableMethods.Click(hotspotSave);
 Delay(2000);
 if(intersectPotentialSaveButton.Exists)
 {
   reusableMethods.Click(intersectPotentialSaveButton);
 }
}

module.exports.AnalysisResultDetails=AnalysisResultDetails;
module.exports.TemplateRun=TemplateRun;
module.exports.VerifyOptionDetails=VerifyOptionDetails;
module.exports.SaveHotspot=SaveHotspot;
module.exports.hotSpotName=hotSpotName;