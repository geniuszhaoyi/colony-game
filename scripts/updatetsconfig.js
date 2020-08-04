const fs = require('fs');

fs.readFile('./tsconfig.json', { encoding: "utf8" }, (err, content) => {
    content = content.replace(/(?<="module":\s*)"esnext"(?=\s*,)/, '"commonjs"');   
    content = content.replace(/(?<="noEmit":\s*)true(?=\s*,)/, 'false');   
    fs.writeFile('./tsconfig.json', content, (err) => {});
});
