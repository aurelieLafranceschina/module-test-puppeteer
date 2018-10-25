const timeout = 15000

// série de tests sur la page d'accueil
describe("Tests basiques", () => {
    let page

    // vérification du chargement de la page d'accueil
    test('home', async () => {
        // charger la page d'accueil
        await page.goto('http://polr.campus-grenoble.fr')
        // attendre que l'élément <body> soit chargé
        await page.waitForSelector('body')
        // récupérer le contenu de l'élément <body>
        const html = await page.$eval('body', e => e.innerHTML)
        // vérifier que dans cet élément Body on trouve "Polr du campus"
        await page.screenshot({path: './tests/img/basic-home.png'});
        expect(html).toContain("Polr du campus")
    }, timeout)

    // parcours client avec about
    test('home and about', async () => {
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('#navbar li a')
        // click sur le lien "About" de la navigation
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( '#navbar li a' ) )
                .filter( el => el.textContent === 'About' )[0].click();
        });
        // on attent que l'élément ".about-contents" soit chargé
        await page.waitForSelector('.about-contents')
        // on récupère le code HTML
        const html = await page.$eval('.about-contents', e => e.innerHTML)
        // on vérifie qu'il contient la bonne chaîne de caractères
        expect(html).toContain("powered by Polr 2")
    }, timeout)



    test('generate QRCode' , async () => {
         // charger la page d'accueil
         await page.goto('http://polr.campus-grenoble.fr')
        // attendre que l'élément <body> soit chargé
        await page.waitForSelector('body')
        // récupérer le contenu de l'élément <body>
         const html = await page.$eval('body', e => e.innerHTML)
         // vérifier que dans cet élément Body on trouve "Polr du campus"
         await page.screenshot({path: './tests/img/basic-home.png'});
         expect(html).toContain("Polr du campus")
         // entrer une URL
         await page.waitForSelector('input[type="url"]')
         await page.type('input[type="url"]','https://mail.ovh.net/roundcube/?_task=mail&_mbox=INBOX')
        
         // click sur le boutton "Shorten" du formulaire
         await page.$eval( '#shorten', el => el.click() );

        // on attent que l'élément ".generate-qr-code" soit chargé
        await page.waitForSelector('a[id="generate-qr-code"]')
        // click sur le boutton "Generate QR code"
        await page.$eval( 'a[id="generate-qr-code"]', el => el.click() );       
        const yo = page.$eval('#short_url', el => el.value);
            // on attent que l'élément ".about-contents" soit chargé
            await page.waitForSelector('div.qr-code-container')
            await page.screenshot({path: './tests/img/url1.png'});
    },timeout)


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    },timeout)

})
