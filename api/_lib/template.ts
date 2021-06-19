
import { readFileSync } from 'fs';
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Light.ttf`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');

const fs = require('fs')


export function getHtml(parsedReq: ParsedRequest) {
    const { text, md } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src='https://unpkg.com/trianglify@^4/dist/trianglify.bundle.js'></script>
    <style>
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/ttf;charset=utf-8;base64,${rglr}) format('ttf');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    svg {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -2;
    }
    </style>
    <body>
    <div style="
        background-color: #FFFFFF99;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    ">
        <div>
            <img
                style="border-radius: 50%; margin: 100px; z-index: 1; transform: translateX(0);"
                alt="Jacob Paris"
                src="https://www.jacobparis.com/images/jacob.png"
                width="800"
            />

            <div style="position: absolute; right: 0; top: 0; padding: 100px; font-size: 120px; font-family: Inter; max-width: 1000px; text-align: right;">
                <div class="heading">${emojify(
                    md ? marked(text) : sanitizeHtml(text)
                    )}
                </div>
            </div>

            <div style="position: absolute; right: 0; bottom: 0; padding: 100px; font-size: 120px; font-family: Inter; max-width: 1000px; text-align: right;">
                <strong class="heading">by Jacob Paris
                </strong>
            </div>
        </div>
    </body>
    <script>

    const pattern = window.trianglify({
        cellSize: 200,
        width: 2050,
        height: 1200
    })
    
    // Render to SVG
    document.body.appendChild(pattern.toSVG())

    </script>
</html>`;
}