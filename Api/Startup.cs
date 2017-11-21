﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.Facebook;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.OAuth;
using MyNote.Api.Providers;
using Owin;

namespace Api
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Get HttpConfiguration in OWIN instead of using GlobalConfiguration
            var config = new HttpConfiguration();

            WebApiConfig.Register(config);
            SwaggerConfig.Register(config);

            // Setup IoC container
            var container = AutofacConfig.RegisterComponents(config);

            // OWIN WEB API SETUP:

            // Register the Autofac middleware FIRST, then the Autofac Web API middleware,
            // and finally the standard Web API middleware.
            // Registers components registered in AutofacConfig class
            app.UseAutofacMiddleware(container);

            //
            // Other configuration here
            //

            app.UseAutofacWebApi(config);
            app.UseWebApi(config);
        }

        //public void ConfigureOAuth(IAppBuilder app)
        //{
        //    //use a cookie to temporarily store information about a user logging in with a third party login provider
        //    app.UseExternalSignInCookie(Microsoft.AspNet.Identity.DefaultAuthenticationTypes.ExternalCookie);
        //    OAuthBearerOptions = new OAuthBearerAuthenticationOptions();

        //    OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
        //    {

        //        AllowInsecureHttp = true,
        //        TokenEndpointPath = new PathString("/token"),
        //        AccessTokenExpireTimeSpan = TimeSpan.FromMinutes(30),
        //        Provider = new SimpleAuthorizationServerProvider(),
        //        RefreshTokenProvider = new SimpleRefreshTokenProvider()
        //    };

        //    // Token Generation
        //    app.UseOAuthAuthorizationServer(OAuthServerOptions);
        //    app.UseOAuthBearerAuthentication(OAuthBearerOptions);

        //    //Configure Google External Login
        //    GoogleAuthOptions = new GoogleOAuth2AuthenticationOptions()
        //    {
        //        ClientId = "251633117325-aj3piklgegfggonlhegeip6oa96ro0hj.apps.googleusercontent.com",
        //        ClientSecret = "XOEefQauSKVUDUosrTD-m-QF",
        //        Provider = new GoogleAuthProvider()
        //    };
        //    app.UseGoogleAuthentication(GoogleAuthOptions);

        //    //Configure Facebook External Login
        //    FacebookAuthOptions = new FacebookAuthenticationOptions()
        //    {
        //        AppId = "332003483936366",
        //        AppSecret = "e98b8b9a55a8620b20bcd2e4c5e07ee8",
        //        Provider = new FacebookAuthProvider()
        //    };
        //    app.UseFacebookAuthentication(FacebookAuthOptions);

        //    app.Map("/signalr", map =>
        //    {
        //        map.UseCors(CorsOptions.AllowAll);
        //        map.RunSignalR(new HubConfiguration());
        //    });
        //}
    }
}