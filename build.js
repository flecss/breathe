const { readFileSync, writeFileSync, mkdirSync } = require("fs");
const { join } = require("path");


const OUT_DIR = join(__dirname, "./js");
const OUT_FILE = join("breathe.js");


const readSourceFile = (name) => {
    return readFileSync(join(__dirname, "./src", name)).toString();
};


function build() {
    mkdirSync(OUT_DIR, {
        recursive: true
    })
    writeFileSync(join(OUT_DIR, OUT_FILE),
        readSourceFile("script.js")
            .replace(/@CSS/i, [
                readSourceFile("base.css"),
                readSourceFile("patterns.css")
            ]
                .join("\n")
                .replace(/[\n\r]|\s{2,}/g, "")
        )
    );
    
    console.log(`\x1b[34mSuccessfully built ${join(OUT_DIR, OUT_FILE)}.\x1b[0m`);
}


build();