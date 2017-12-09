# MyNote
See also: https://www.codeproject.com/Articles/1193423/Integrating-the-Angular-CLI-With-Visual-Studio

http://bitoftech.net/2014/06/01/token-based-authentication-asp-net-web-api-2-owin-asp-net-identity/

Selfhosted WebApi service as an Azure worker role:
1) Create Azure Cloud project - accept default (See also: https://docs.microsoft.com/en-us/aspnet/web-api/overview/hosting-aspnet-web-api/host-aspnet-web-api-in-an-azure-worker-role)
2) Edit the project file of my class library and add this: <RoleType>Worker</RoleType> to the first <PropertyGroup> element.
3) Service entry point class had to extend RoleEntryPoint
4) Change Context constructor to use cloud connection instead public MyNoteContext() : base(RoleEnvironment.GetConfigurationSettingValue("MyNoteContext"))

https://medium.com/@WorkloadRancher/step-by-step-building-and-deploying-an-angular-2-cli-project-to-azure-app-services-using-vsts-a0bc2d4fec25

