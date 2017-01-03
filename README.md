# Orient Device

**Installation**
```bash
npm install --save-dev orient-device
```
**Usage**
**1.**
Add .css and .js files to your project code.
```html
<head>
	...
	<link rel="stylesheet" href="node_modules/orient-device/src/orient.min.css">
	...
</head>
<body>
	...
	<script type="text/javascript" src="node_modules/orient-device/src/orient.min.js"></script>
</body>
```
**2.**
Initialise app and pass your preferred orientation to it:
```javascript
orient.init('landscape');
```