const timeout = 15000

// test d'un raccourcisseur d'URL
describe("Shorten Anonymous", () => {
    let page

    // vérification du chargement de la page d'accueil
    test('basic shorten', async () => {
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('.long-link-input')
        await page.type('.long-link-input', 'https://campus-skills.meteorapp.com/ZgF5ABnGWQQ2hxfoR/skills');
        //await page.screenshot({path: './tests/img/shorten1.png'});
        await page.waitForSelector('#shorten')
        await page.$eval( '#shorten', el => el.click() );
        await page.waitForSelector('#short_url')
        const val = await page.$eval('#short_url', el => el.value)
        expect(val).toMatch(/^http:\/\/polr\.campus\-grenoble\.fr\/[0-9]+/)
        //await page.screenshot({path: './tests/img/shorten2.png'});
    }, timeout)


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

})
