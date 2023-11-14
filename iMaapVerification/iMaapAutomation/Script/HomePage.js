var reusableMethods = require("ReusableMethods");
let homePage=reusableMethods.browserObj.HomePageSelector;
let hamburgerMenu=reusableMethods.browserObj.HomePageSelector.hamburgerMenu; 
let crashRecordOption=reusableMethods.browserObj.HomePageSelector.crashRecordOption;
let importMenuOption=reusableMethods.browserObj.HomePageSelector.importMenuOption;
let homeButton=reusableMethods.browserObj.HomePageSelector.homeButton;
let userAccountButton=reusableMethods.browserObj.HomePageSelector.userAccountButton;
let clearCacheLogoutButton=reusableMethods.browserObj.HomePageSelector.clearCacheLogoutButton
let logoutPage=reusableMethods.browserObj.LogoutPageSelector;
let logoutPageVerify=reusableMethods.browserObj.LogoutPageSelector.logoutText;
let importPage=reusableMethods.browserObj.ImportPageSelector;

//To navigate to the menu items
function MenuNavigation(menu, option) {
  Delay(30000);
	reusableMethods.WaitForElementVisible(homePage, hamburgerMenu, 20000);
	reusableMethods.Click(hamburgerMenu);
	Delay(2000);
	let mnu = homePage.FindElements("//ul[contains(@class, 'content--menu-items')]/li[@class='trl-c-item_collapsed']/div/label");
	for (var i = 1; i < mnu.length; i++) {
		let menuItems = homePage.FindElement("//ul[contains(@class, 'content--menu-items')]/li[@class='trl-c-item_collapsed'][" + i + "]/div/label").contentText;
		if (aqString.Compare(menuItems, menu, true) == 0) {
			let menuOptionsCount = homePage.FindElements("//ul[contains(@class, 'content--menu-items')]/li[@class='trl-c-item_collapsed'][" + i + "]/ul/li//label");
			for (var j = 1; j <= menuOptionsCount.length; j++) {
				let menuOptions = homePage.FindElement("//ul[contains(@class, 'content--menu-items')]/li[@class='trl-c-item_collapsed'][" + i + "]/ul/li[ " + j + " ]//label");
				if (aqString.Compare(menuOptions.contentText, option, true) == 0) {
					Delay(2000);
					reusableMethods.Click(menuOptions);
					break;
				}
			}
		}
	}
}

//To logout from the application
function LogoutApplication()
{
 let tempLogoutText;
 reusableMethods.WaitForElementVisible(homePage,hamburgerMenu,10000);
 reusableMethods.Click(hamburgerMenu);
 reusableMethods.Click(homeButton);
 reusableMethods.WaitForElementVisible(homePage,userAccountButton,15000);
 reusableMethods.Click(userAccountButton);
 reusableMethods.Click(clearCacheLogoutButton);
 reusableMethods.PageWait(logoutPage);
 tempLogoutText=reusableMethods.RetrieveTextFromElement(logoutPageVerify);
 reusableMethods.CompareStrings(tempLogoutText,Project.Variables.logoutMessage,true,0,"verify that the application is logout successfully");
}
module.exports.MenuNavigation=MenuNavigation;
module.exports.LogoutApplication=LogoutApplication;