# ansi-to-html-converter

Hey there! 👋 This is a nifty little tool that turns ANSI escape codes into HTML. Perfect for showing off those colorful terminal outputs on a webpage.

## What's it do?

- Converts ANSI color codes to HTML styles
- Handles text formatting (bold, italic, underline, you name it)
- Works with both foreground and background colors
- Keeps things safe by escaping HTML special characters

## Getting Started

Just grab the `ansiToHtml.js` file and drop it into your project. Easy peasy!

## How to Use

Here's a quick example of how to use it in the browser:

1. Throw this line in your HTML:

```html
<script src="ansiToHtml.js"></script>
```

2. Then use it like this:

```html
<!DOCTYPE html>
<html>
<head>
    <title>ANSI to HTML Test</title>
</head>
<body>
    <div id="output"></div>

    <script src="ansiToHtml.js"></script>
    <script>
        // Some sample ANSI text
        var ansiText = "\x1b[31mThis is red\x1b[0m and \x1b[32mthis is green\x1b[0m";
        
        // Convert it to HTML
        var html = ansiToHtml(ansiText);

        // Show it off
        document.getElementById('output').innerHTML = html;
    </script>
</body>
</html>
```

And boom! You've got red and green text on your page.

Want to see it in action? Check out this [live example on CodeSandbox](https://codesandbox.io/p/sandbox/sck9np). Play around with it!

## Supported Styles

Here's what you can do:

- **Bold**: `\x1b[1m`
- **Italic**: `\x1b[3m`
- **Underline**: `\x1b[4m`
- **Blink**: `\x1b[5m` (careful with this one, it's flashy!)
- **Strikethrough**: `\x1b[9m`
- **Text colors** (like red: `\x1b[31m`)
- **Background colors** (like red background: `\x1b[41m`)
- **Reset**: `\x1b[0m` (back to normal)

## More Examples

Let's get creative:

```javascript
// Red text
var text1 = ansiToHtml("\x1b[31mDanger zone!\x1b[0m");
console.log(text1); 
// You get: <span style="color:#f87171">Danger zone!</span>

// Bold green text
var text2 = ansiToHtml("\x1b[32m\x1b[1mMission accomplished\x1b[0m");
console.log(text2);
// Gives you: <span style="color:#34d399;font-weight:bold">Mission accomplished</span>

// Underlined text
var text3 = ansiToHtml("\x1b[4mDon't forget this\x1b[0m");
console.log(text3);
// Results in: <span style="text-decoration:underline">Don't forget this</span>

// Text with a red background
var text4 = ansiToHtml("\x1b[41mHot stuff coming through\x1b[0m");
console.log(text4);
// Outputs: <span style="background-color:#f87171">Hot stuff coming through</span>
```

Mix and match to your heart's content!

## Throw Some Crypto My Way

If you're feeling generous and want to support this project, here are some crypto addresses:

- **USDT (TRC20)**: `TSWKDdtY9jKnL8zbQfEb28mGHWdF2ZZfGq`
- **USDC (SOL)**: `CDAzUsKtxiEvChE1Koqyvs3SEaEBmdXqNRcNmhntnm5Y`
- **Bitcoin (BTC)**: `0xdc7abcf93ffbab185826b98f324c931b351b8d9d`
- **Ethereum (ETH)**: `0xdc7abcf93ffbab185826b98f324c931b351b8d9d`

Every little bit helps keep the code flowing!

Cooked up by **[botnick](https://github.com/botnick)**. Happy coding! 🚀
