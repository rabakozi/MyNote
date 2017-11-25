using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using MyNote.Api.Model;
using System;
using System.Threading.Tasks;
using System.Linq;

namespace MyNote.Api.Repositories
{
    public class AuthRepository : IDisposable
    {
        private MyNoteContext ctx;

        private UserManager<IdentityUser> userManager;

        public AuthRepository()
        {
            ctx = new MyNoteContext();
            userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(ctx));
        }

        public async Task<IdentityResult> RegisterUser(UserModel userModel)
        {
            IdentityUser user = new IdentityUser
            {
                UserName = userModel.UserName
            };

            var result = await userManager.CreateAsync(user, userModel.Password);

            return result;
        }

        public async Task<IdentityUser> FindUser(string userName, string password)
        {
            IdentityUser user = await userManager.FindAsync(userName, password);

            return user;
        }

        public Client FindClient(string clientId)
        {
            var client = ctx.Clients.Find(clientId);

            return client;
        }


        public async Task<bool> AddRefreshToken(RefreshToken token)
        {

            var existingToken = ctx.RefreshTokens.Where(r => r.Subject == token.Subject && r.ClientId == token.ClientId).SingleOrDefault();

            if (existingToken != null)
            {
                var result = await RemoveRefreshToken(existingToken);
            }

            ctx.RefreshTokens.Add(token);

            return await ctx.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveRefreshToken(string refreshTokenId)
        {
            var refreshToken = await ctx.RefreshTokens.FindAsync(refreshTokenId);

            if (refreshToken != null)
            {
                ctx.RefreshTokens.Remove(refreshToken);
                return await ctx.SaveChangesAsync() > 0;
            }

            return false;
        }

        public async Task<bool> RemoveRefreshToken(RefreshToken refreshToken)
        {
            ctx.RefreshTokens.Remove(refreshToken);
            return await ctx.SaveChangesAsync() > 0;
        }

        public async Task<RefreshToken> FindRefreshToken(string refreshTokenId)
        {
            var refreshToken = await ctx.RefreshTokens.FindAsync(refreshTokenId);

            return refreshToken;
        }

        public void Dispose()
        {
            ctx.Dispose();
            userManager.Dispose();

        }
    }
}