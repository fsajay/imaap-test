//Launch the browser and iMAAP application 
function LaunchBrowser() 
{ 
  Browsers.Item(btChrome).RunOptions = "--incognito"; 
  Browsers.Item(btChrome).Run("https://imaap-stg.rtatestdom.local/"); 
  Sys.Browser().BrowserWindow(0).Maximize();  
} 

//To close the browser
function CloseBrowser()
{
  Sys.Browser().Close();
}
module.exports.LaunchBrowser = LaunchBrowser;
module.exports.CloseBrowser=CloseBrowser;