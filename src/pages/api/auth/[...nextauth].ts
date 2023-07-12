import NextAuth from 'next-auth'
import Okta from 'next-auth/providers/okta'
import Auth0 from "next-auth/providers/auth0"
import Facebook from "next-auth/providers/facebook"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Twitter from "next-auth/providers/twitter"
import LinkedIn from "next-auth/providers/linkedin"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        Okta({
            idToken: true,
            clientId: process.env.OKTA_CLIENT_ID as string,
            clientSecret: process.env.OKTA_CLIENT_SECRET as string,
            issuer: process.env.OKTA_ISSUER as string,
            authorization: {
                params: {
                    scope: "openid email profile offline_access"
                }
            }
        }),
        Auth0({
            clientId: process.env.AUTH0_CLIENT_ID as string, 
            clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
            issuer: process.env.AUTH0_ISSUER as string,
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            }
        }),
        Twitter({
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
            version: process.env.TWITTER_VERSION as string,
        }),
        LinkedIn({
            clientId: process.env.LINKEDIN_CLIENT_ID as string,
            clientSecret: process.env.LINKEDIN__CLIENT_SECRET as string,            
        }),
    ],
    secret: process.env.SECRET as string,
    callbacks: {
        
        async signIn({ user, account, profile, email, credentials }: any ) {          
            const isAllowedToSignIn = true
            if (account.provider === "google") {
                return profile.email_verified && profile.email.endsWith("@gmail.com");
            }            
            return isAllowedToSignIn;
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
                console.log("invoking refresh token core!!!!");
                const url = `${process.env.OKTA_ISSUER}/v1/token`;
                const body = `grant_type=refresh_token&client_id=${process.env.OKTA_CLIENT_ID}&client_secret=${process.env.OKTA_CLIENT_SECRET}&refresh_token=${token.refreshToken}`;
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