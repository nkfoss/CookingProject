### Setting up Authentication
There are some changes you should make to your Firebase realtime database rules. Instead of simply using read/write: true/false, we are going to need to do something authentication-based.

```
{
    "rules" : {
        ".read" : "auth != null",
        ".write" : "auth != null"
    }
}
```

Now look to left... in the develop menu, select 'authentication'. Click on 'setup sign-in method', click email/password, and then enable it (but don't enable passwordless login). Then click save. The 'users' tab in authentication will then start to display the users when the sign-up.

https://firebase.google.com/docs/reference/rest/auth

^ This documentation will be useful moving forward. We are concerned with the sign-up/sign-in API methods (seen on the right). Observe the request/response payloads for both APIs. 


### Auto-login

We store our access token in local-storage so we can persist our login.

1. In handleAuthentication(), we create our user object upon sign-in. 
2. After creation and next-ing our user subject, we store the user object in local-storage.
3. Next, we call autoLogin whenever the application starts. This method accesses local-storage to get the userData. If it doesn't exist, the method does nothing.
If it exists, we create a loadedUser from the userData loaded from local-storage. 
4. Then we check the token expiration... if it exists, then we can be sure that it is valid
(because there is a method that sets the token, but will not if it's already expired). If valid, then we set current user to loadedUser.

Auto sign-in gets called whenever the app component is initialized. Of course, we clear the userData from local-storage whenever we logout.


### Auto-logout

Since the access token can expire, we should account for that. 

1. When an access token is received, we set a timer for its expiration. Our autoLogout() method receives the time until the token expires.
We set a timeout that calls logout() automcatically after time has expired.
2. Whenever we emit a new user object to our app, we need to call autoLogout(). This happens in handleAuthentication (which is a subroutine of signUp and signIn) and autoLogin().

### Auth Guard

We need to make sure users cannot access recipes without being logged in. Our AuthGuard will handle this. So we guard the recipes route (in the routing module) and
then subscribe to the authService's user subject (but only once, since we only need to check it once). If the user object is true-ish, we continue. If not, then we redirect.





