var reusableMethods = require("ReusableMethods");

//Login to the application
function Login()
{    
  let loginPage=reusableMethods.browserObj.LoginPageSelector;
  let userNameTextBox=reusableMethods.browserObj.LoginPageSelector.loginUserName;
  let loginPassword=reusableMethods.browserObj.LoginPageSelector.loginPass;
  let loginButton=reusableMethods.browserObj.LoginPageSelector.loginButton;
  let authorizePage=reusableMethods.browserObj.AuthorizePageSelector;
  let homePage=reusableMethods.browserObj.HomePageSelector;
  
  reusableMethods.PageWait(loginPage);
  reusableMethods.SendKeys(userNameTextBox,Project.Variables.userName);
  reusableMethods.SendKeys(loginPassword,Project.Variables.appPassword);
  reusableMethods.ButtonClick(loginButton);
  reusableMethods.PageWait(authorizePage);
}
module.exports.Login=Login;