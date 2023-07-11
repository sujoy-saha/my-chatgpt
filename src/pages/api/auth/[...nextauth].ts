import NextAuth from 'next-auth'
import Okta from 'next-auth/providers/okta'

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        Okta({
            clientId: process.env.OKTA_OAUTH2_CLIENT_ID as string,
            clientSecret: process.env.OKTA_OAUTH2_CLIENT_SECRET as string,
            issuer: process.env.OKTA_OAUTH2_ISSUER as string,
            authorization: {
                params: {
                    scope: "openid email profile offline_access"
                }
            }
        }),
    ],
    secret: process.env.SECRET as string,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }: any ) {          
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                return true;
            } 
            else {
              // Return false to display a default error message
              return false;
              // Or you can return a URL to redirect to:
              // return '/unauthorized'
            }
        },
        async redirect({ url, baseUrl }: any) {
            // Allows relative callback URLs
            if (url.startsWith("/")) 
                return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) 
                return url;

            return baseUrl;
            
        },        
        async session({ session, token }: any) {
            session.accessToken = token.accessToken;
            session.idToken = token.idToken;
            session.oktaId = token.oktaId;
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }: any) {         
            if (account) {
                token.accessToken = account.access_token;
                token.idToken = account.id_token;
                token.oktaId = account.providerAccountId;
                token.refreshToken = account.refresh_token;
            }
            // Decrypting JWT to check if expired
            var tokenParsed = JSON.parse(Buffer.from(token.idToken.split('.')[1], 'base64').toString());
            const dateNowInSeconds = new Date().getTime() / 1000
            const tokenIsNotExpired = dateNowInSeconds < tokenParsed.exp;
            if (tokenIsNotExpired) {
                return token;
            } 
            else {
                const url = `${process.env.OKTA_DOMAIN}/v1/token`;
                const body = `grant_type=refresh_token&client_id=${process.env.OKTA_CLIENTID}&client_secret=${process.env.OKTA_CLIENTSECRET}&refresh_token=${token.refreshToken}`;
                const headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                };
                const response = await fetch(url, { method: 'POST', body, headers });
                const data = await response.json();
                if (data.error) {
                    throw new Error("Unable to refresh token");
                }
                token.accessToken = data.access_token;
                token.idToken = data.id_token;
                token.oktaId = data.providerAccountId;
                token.refreshToken = data.refresh_token;
            
                return token;
            }        
        }
    }
}
export default NextAuth(authOptions)