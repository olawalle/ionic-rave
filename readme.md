# Ionic 4 Rave

 This Ionic 4 Module let's you add [Rave](https://www.flutterwave.com) Pay Button into your Cordova/Phonegap apps builds. <br/>

 This is a fork of the Ionic 3 Rave package by [Jake Parker] ((https://github.com/jake-parker/ionic-rave.git)


## Installation
<br/>

The Rave Ionic 4 Module adds support for spinning up the Rave modal on IOS and Android. It uses the Rave Standard endpoint and has done all the hard work for you. All you need to is add the necessary file and call the appropriate functions.

1. Follow the official [Rave](https://www.flutterwave.com) documentation on how to create an account if you don't have one yet.
2. Create a dummy project. For example ```ionic start myapp blank```
3. Install the Module

```
$ cd myapp
$ npm install --save rave-ionic4
$ ionic cordova plugin add cordova-plugin-inappbrowser
$ npm install --save @ionic-native/in-app-browser
```
4. [Add the module to your AppModule](https://ionicframework.com/docs/native/#Add_Plugins_to_Your_App_Module)
  i.e Go to app.module.ts
```
import { HttpClientModule } from '@angular/common/http';
import { Rave, RavePayment, Misc } from 'rave-ionic4';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'; 
```
<br />
 Add `HttpClientModule` to imports <br />

add  `InAppBrowser, Rave, RavePayment, Misc` to providers <br />

On the page you want to call the inline payment,  inside the page.ts file

```
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { Rave, RavePayment, Misc } from 'rave-ionic4'; 
```

add to the constructor the following <br />
```
  private rave: Rave, 
  private ravePayment: RavePayment, 
  private misc: Misc,
  private iab: InAppBrowser
  ```
5. **Ensure** that you have set up a redirect url to handle the response sent from rave. See [here](https://medium.com/@jake_parkers/3d-secure-guidelines-9e17f9a6cf32) for guide lines on how to set up your redirect url
5. See Usage


##  Usage
<br/>

```
import { Rave, RavePayment, Misc } from 'rave-ionic4';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/

constructor(
  private rave: Rave, 
  private ravePayment: RavePayment, 
  private misc: Misc,
  private iab: InAppBrowser,
  ) { }

...


// this function uses a form input with ngmodel to set the amount  (see the working tutorial)
// you can set the form input to hidden or arbitray om the amount if you do not need for the user to change the amount.
ravePay() {
      this.rave.init(true, "PUBLIC_KEY") //true = production, false = test
      .then(_ => {
        var paymentObject = this.ravePayment.create({
          customer_email: "user@example.com",
          amount: this.amount,
          customer_phone: "234099940409",
          currency: "NGN",
          txref: "rave-123456",
          meta: [{
              metaname: "flightID",
              metavalue: "AP1234"
          }]
      })
        this.rave.preRender(paymentObject)
          .then(secure_link => {
            secure_link = secure_link +" ";
            const browser: InAppBrowserObject = this.rave.render(secure_link, this.iab);
            browser.on("loadstop")
                .subscribe((event: InAppBrowserEvent) => {
                  if(event.url.indexOf('https://your-callback-url') != -1) {
                    if(this.rave.paymentStatus('url') == 'failed') {
                      console.log("failed Message");
                    }else {
                      console.log("Transaction Succesful");

                    }
                    browser.close()
                  }
                })
          }).catch(error => {
            // Error or invalid paymentObject passed in
            console.log ("error", error);
          })
      })

    }


```
 <br/>
 [see this sample implementation](https://github.com/cavewebs/myraveapp) <br />
## Instance Members

### Rave

**```init(PRODUCTION_FLAG, PUBLIC_KEY)```**

You must call the init method with the ```PRODUCTION_FLAG``` set to ```true``` or ```false``` and your ```PUBLIC KEY```. If your production flag is set to ```true```, you will need to pass in your ```live``` ```public key``` otherwise, you pass in your ```sandbox``` ```public key```

- Returns: ```Promise```

**```preRender(validatedPaymentObject)```**
You must preconnect to Rave to obtain a secure link that will enable you to load the payment UI. Prior to calling this method you must have called ```RavePayment.create()``` to validate your payment object.

- Returns: ```Promise```

**```render(paymentLink)```**
Start the Rave UI to collect payment from user.

- Returns: ```InAppBrowserObject```

Use the ```InAppBrowserObject``` returned to close the modal once the transaction completes by binding to the ```loadend``` event and checking for your redirect url as was shown above.

**```paymentStatus(url)```**
Get's the status of the transaction and returns it as a string. The status could either be ```success``` or ```failed```.

Parameter(s)

- url: this is the url gotten from the inappbroswer event ```event.url```

- Returns: ```String```

You should use the returned status to determine whether or not you shoud show a success or error message to your users.

**NOTE: IOS users ```may``` still need to rely on the ```Done``` button at the bottom left of the opened.**

### Rave Payment

**```create(paymentObject)```**
You must validate the paymentObject you want to use to load the Rave payment UI. See [https://developer.flutterwave.com/docs/rave-inline-1](https://developer.flutterwave.com/docs/rave-inline-1) for more documentation of the parameters.

- Returns: ```Object``` (either an error or your validated payment object)

**```amount()```**
The amount of the payment

**```email()```**
The customer's email

**```txref()```**
The transaction reference of the payment

**```currency()```**
The currency of the payment


# License
<br/>

Released under [MIT License](https://github.com/cavewebs/ionic-rave/blob/master/License)


# Contributions
<br/>

Pull requests and new issues are welcome. See [CONTRIBUTING.md](https://github.com/cavewebs/ionic-rave/blob/master/CONTRIBUTING.md) for details.
