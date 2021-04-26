const path = require('path');

const PROJECT_ROOT = path.resolve(process.cwd(), './');

module.exports = () => {

    const SOURCE = './package.json';
    const DESTINATION = './dist/package.json';

    const config = {
        'source': path.join(PROJECT_ROOT, SOURCE),
        'destination': path.join(PROJECT_ROOT, DESTINATION),
        'keeplist': [
            "author",
            "bin",
            "browser",
            "bugs",
            "contributors",
            "cpu",
            "description",
            "dependencies",
            "engines",
            "files",
            "funding",
            "homepage",
            "keywords",
            "license",
            "main",
            "module",
            "name",
            "os",
            "private",
            "productName",
            "repository",
            "version",
        ],
        'loglevel': 'info'
    }

    return config;
};
