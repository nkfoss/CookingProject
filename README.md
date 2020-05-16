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

Now look to left... in the develop menu, select 'authentication'. Click on 'setup sign-in method', click email/password, and then enable it (but don't enable passwordless login). Then click save.

The 'users' tab in authentication will then start to display the users when the sign-up.


