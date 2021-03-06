# Orient Device

**Installation**
```bash
npm install --save-dev orient-device
```
**Usage**
**1.**
Add `orient.js` file to your project code and initialise it.
```html
<html>
<head></head>
<body>

    ...
    <script type="text/javascript" src="path/to/orient.js"></script>

    <script>
        var options = {
            prefferedOrient: 'landscape',
            text: {
                error: '<p><strong>Whoops</strong> can you please rotate your device <br><em>:)</em></p>',
                color: 'rgba(255, 255, 255, 1)'
            },
            onRotate: function() {
              console.log('rotated');
            },
            onError: function() {
              console.log('error - wrong orientation');
            }
        };
        OrientDevice.init(options);
    </script>
</body>
</html>
```

**Or**
using webpack 
```javascript
let OrientDevice = require('orient-device');
OrientDevice.init();
```

---

Here is a list of options:
<table>
    <thead>
        <tr>
            <th>Option</th>
            <th>Default Value</th>
            <th>Comments</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>prefferedOrient</td>
            <td>portrait (String)</td>
            <td>Can take 2 values either <code>landscape</code> or <code>portrait</code></td>
        </tr>
        <tr>
            <td>background</td>
            <td>Value will depend on browser (String)</td>
            <td>Plugin does browser detection and there is an official documentation of browsers primary colors. If you want you can specify background yourself, rgba, hex ...</td>
        </tr>
        <tr>
            <td>error</td>
            <td>&lt;p&gt;&lt;strong&gt;Whoops&lt;/strong&gt; can you please rotate your device back to &lt;span id="preferred"&gt;&lt;/span&gt; &lt;em&gt; :) &lt;/em&gt;&lt;/p&gt; <br> Yes, HTML.
           </td>
            <td>If you want to dynamically pull value of your prefered orientation please include an element with an id="preferred" or it will throw a <code>Javascript</code> error</strong></td>
        </tr>
        <tr>
            <td>color</td>
            <td>rgba(255, 255, 255, 1) (String)</td>
            <td>You can include hex, rgb, rgba, or just words (like green, blue etc...)</td>
        </tr>
    </tbody>
</table>

---

**Custom Callbacks**

`onRotate` - fires when devices is rotated (also fires initially)

`onError` - fires when devices is in the wrong orientation (fires initially if its in wrong orientation)

