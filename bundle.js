const fs = require('fs');
const path = require('path');

const paths = {
    template: path.join(__dirname, 'src/public/index.template.html'),
    css: path.join(__dirname, 'src/public/style.css'),
    js: path.join(__dirname, 'src/public/script.js'),
    data: path.join(__dirname, 'src/data/talks.json'),
    output: path.join(__dirname, 'index.html')
};

function bundle() {
    try {
        console.log('📦 Starting bundle process...');

        let template = fs.readFileSync(paths.template, 'utf8');
        const css = fs.readFileSync(paths.css, 'utf8');
        const js = fs.readFileSync(paths.js, 'utf8');
        const data = fs.readFileSync(paths.data, 'utf8');

        // Simple string replacement for bundling
        let bundledHtml = template
            .replace('{{CSS}}', css)
            .replace('{{JS}}', js)
            .replace('{{DATA}}', data);

        fs.writeFileSync(paths.output, bundledHtml);

        console.log('✅ Bundle complete! Generated: index.html');
    } catch (error) {
        console.error('❌ Error during bundling:', error.message);
        process.exit(1);
    }
}

bundle();
