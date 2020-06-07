# Pills-on-Wheels-HTNE
## Mobile app designed to allow users to view and order prescriptions
### Features:
- Secure login system, with personal accounts for drivers and customers
- Customers can add prescriptions, which can then be viewed or ordered from a pharmacy
- Upon ordering of prescription from customer, driver's available deliveries updates in real time to allow driver to accept any delivery in their area in their area
- Smooth in-app experience, easy-to-use UI for both customer and driver
- Secure storage of backend data, fetch requests used to push and pull data as needed
- Verification on every form, cannot enter empty fields or invalid emails/mobile numbers

### Design:
- This app was created in React Native using the Expo client
- The app can be run on any Android device using the Expo Client by scanning the QR code at the following link: https://expo.io/@areez_visram/PillsOnWheels
- The app will be available on the Google Play Store in the coming days

### Dependencies:
- The list of dependencies used in our app can be found in the package.json file
- The dependencies are all pre-built into Expo and React Native
- However there were some that we installed into our app:
  - "react-navigation-stack": "^2.5.1"
  - "validator": "^13.0.0"
  - "react-navigation": "^2.18.3"
  - "react-native-keyboard-aware-scroll-view": "^0.9.1"
  
- There are also a few backend dependencies (Python libraries)
  - flask==1.1.2
  - flask-sqlalchemy==2.4.3
  - gunicorn==20.0.4
  
- To install these dependencies, simply open a command line in the server directory and run the command  

  `$ pip install -r requirements.txt` 

- Please ensure you have both Python and Pip Package Manager installed

The backend API is hosted at: https://pillsonwheels.herokuapp.com

