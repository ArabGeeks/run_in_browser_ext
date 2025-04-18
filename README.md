# Run in Browser README

Opens the currently active PHP or HTML file in your default web browser, constructing the URL based on your local web server configuration.

## Features

- Adds a "Run in Browser: Open File" command to the editor context menu (right-click menu) for PHP and HTML files.
- Calculates the correct URL by combining your server's base URL and the file's path relative to the server's document root.

## Requirements

- You must have a local web server (like WAMP, MAMP, XAMPP, `php -S`, etc.) running.
- Your project files (PHP/HTML) should be located within the web server's document root directory.

## Extension Settings

This extension contributes the following settings (found in VS Code Settings under "Run in Browser"):

- `run-in-browser.baseUrl`: (Required) The base URL of your local web server.
  - _Default:_ `http://localhost`
  - _Example:_ `http://localhost`, `http://127.0.0.1:8080`, `http://myproject.local`
- `run-in-browser.browserPath`: (Required) The absolute path to the browser executable you want to use.
  - _Default:_ `C:\Program Files\Firefox Developer Edition\firefox.exe` (You will likely need to change this!)
  - _Example (Windows):_ `C:\Program Files\Google\Chrome\Application\chrome.exe`
  - _Example (macOS):_ `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
  - _Example (Linux):_ `/usr/bin/google-chrome-stable`
- `run-in-browser.documentRoot`: (Optional) The absolute path to your web server's document root directory (the folder your server serves files from).
  - _Default:_ If left empty, the root of your VS Code workspace folder is used.
  - _Example:_ `d:\wamp64\www`, `/Users/yourname/Sites`, `/var/www/html`
  - **Note:** Set this if your VS Code workspace folder is _not_ the same as your web server's document root, to ensure the correct relative URL is generated (e.g., `http://localhost/subfolder/file.php` instead of `http://localhost/file.php`).

## Known Issues

- No known issues currently.

## Release Notes

### 0.0.1

- Initial release.
- Adds context menu command to open PHP/HTML files in a browser.
- Configurable base URL, browser path, and document root.

---

**Enjoy!**
