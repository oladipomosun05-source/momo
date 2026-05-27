const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
        page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
        page.on('requestfailed', request => console.log('BROWSER NETWORK ERROR:', request.url(), request.failure().errorText));

        console.log("Navigating to http://localhost:5173...");
        await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 15000 });
        
        console.log("Page loaded. Taking screenshot...");
        await page.screenshot({ path: 'screenshot.png' });
        
        const content = await page.content();
        if (content.includes('div id="root"></div>')) {
            console.log("Root div is empty!");
        } else {
            console.log("Root div has content.");
        }
        
        await browser.close();
    } catch (e) {
        console.error("Script Error:", e);
        process.exit(1);
    }
})();
