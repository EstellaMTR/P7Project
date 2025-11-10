

Deleted (or changed into location.replace()):
function performFastExit(event) {
        event.preventDefault(); // Prevent default link behavior if it's an anchor
        // Redirect to a neutral, common website
        window.location.href = 'https://www.google.com';
    }

If you wanna test locally on your phone, use:

npx serve

You have to be located in the same directory as your index.html
Remember to download node.js
