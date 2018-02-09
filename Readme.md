Getting Started:

First time starting running the project:
1. In terminal, cd into this folder
2. cd into client Run npm install
3. Make sure you have php5.6 or above installed on your computer
4. Install composer GLOBALLY https://getcomposer.org/doc/00-intro.md
5. cd into server folder and run composer install

Everytime you pull (or if you get errors after you pull):
1. cd into client and run npm install

Folder Structure:

Frontend
    client ->
        dist* -> (is generated after running npm run build)
        src ->
            app ->
            environments* ->
            tsconfig.app.json*
            main.ts*
            index.html
            styles.less
            polyfills.ts*
            constants.module.ts
        node_modules* ->
        .angular-cli.json*
        package.json*
        tsconfig.json*
        tslint.json*
        
Backend
    server ->
        vendor* ->
        .htaccess*
        composer.json*
        composer.lock*
        index.php (only change files to new routes)
        logic ->
            ADD LOGIC FILES
        api ->
            ADD API ROUTES

*DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING