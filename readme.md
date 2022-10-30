## How to develop on local machine

To start the development on the local machine, following are the steps:
1. Clone the repo on your development machine by

    `git clone https://github.com/i-siso/ionic-vaccine-portal-grp-25.git`
2. Open it with editor of choice, VSCode preferred
3. Open the `vaccine-portal` directory
4. Make sure you have Node 16 or above installed on your system and then run `npm install` and post that, run `npm install -g @ionic/cli` & `npm install -g @angular/cli`
5. Check if `ionic` is installed by running `ionic --help` command in the terminal.


For more info about setting up the environment for ionic development, refer following links
- [Ionic Environment Setup](https://ionicframework.com/docs/intro/environment)
- [Ionic Android Development](https://ionicframework.com/docs/developing/android)

Once this setup is done, the majority of development is done inside of the "src" folder, where the general Angular web app development standards are followed.

To start the live dev server:
`ionic serve` should start it over the port `8100`.

To login, you have to create a User on the following portal:
[PocketBase self hosted](http://140.238.171.33/_/#/users?filter=&sort=-created)

Use the following credentials to login:

Username: bits-assignment@example.com
Password: vaccineportal25

Create a new User and untick "Send Verification Mail" for now.

Once created, you can use those credentials to login into the app.

For making it into a build:

Use the following guide: https://ionicframework.com/docs/developing/android#project-setup with "Running with Capacitor" section