# Pip.WebUI.Nav User's Guide

## <a name="contents"></a> Contents
- [Installing](#install)
- [pipSidenav provider](#sidenav_provider)
- [pip-sidenav](#sidenav)
- [pipAppbar provider](#appbar_provider)
- [pip-appbar](#appbar)
- [pip-tabs](#tabs)
- [pip-dropdown](#dropdown)
- [Questions and bugs](#issues)


## <a name="install"></a> Installing

Add dependency to **pip-webui** into your **bower.json** or **package.json** file depending what you use.
```javascript
"dependencies": {
  ...
  "pip-webui": "*"
  ...
}
```

Alternatively you can install **pip-webui** manually using **bower**:
```bash
bower install pip-webui
```

or install it using **npm**:
```bash
npm install pip-webui
```

Include **pip-webui** files into your web application.
```html
<link rel="stylesheet" href=".../pip-webui-lib.min.css"/>
...
<script src=".../pip-webui-lib.min.js"></script>
<script src=".../pip-webui-test.min.js"></script>
```

Register **pipNav** module in angular module dependencies.
```javascript
angular.module('myApp',[..., 'pipNav']);
```

## <a name="sidenav_provider"></a> pipSidenav provider

**pipSidenav** provider allows to configure **pip-sidenav** during configure and run phases. 
The configuration includes user or application info and naviation links.

### Usage
Todo: Add here code snippet to demonstrate configuration of sidenav

### Methods

* **theme(theme: string): string** - gets or sets color theme
  - Params:
    + theme - name of color theme or **null** to make no changes
  - Returns: the currently set name of color theme

* **avatarUrl(url: string): string** - gets or sets url of avatar displayed in the sidenav header
  - Params:
    + url - image url or **null** to make no changes
  - Returns: the currently set image url

* **title(text: string): string** - gets or sets title on the sidenav header
  - Params:
    text - text to be written on the title or **null** to make no changes
  - Returns: the currently set title text

* **subTitle(text: string): string** - gets or sets subtitle on the sidenav header
  - Params:
    text - text to be written on the subtitle or **null** to make no changes
  - Returns: the currently set subtitle text

* **sections(sections: any): any** - gets or sets configuration or navigation sections
  - Params:
    + sections - sections configuration or **null** to make no changes
  - Returns: the current configuration of navigation sections
  
### Sections Configuration object
Todo: Add here description of section configuration fields


## <a name="sidenav"></a> pip-sidenav

**pip-sidenav** directive inserts into HTML markup the location on navigation Sidenav panel. It presents information, configured in **pipSidenav** provider.

### Usage
Todo: Add HTML snippet that demonstrates this directive with all attributes

<img src="images/img-side-nav.png"/>

### Attributes
Todo: Describe the directive attributes here



## <a name="issues"></a> Questions and bugs

If you have any questions regarding the module, you can ask them using our 
[discussion forum](https://groups.google.com/forum/#!forum/pip-webui).

Bugs related to this module can be reported using [github issues](https://github.com/pip-webui/pip-webui-nav/issues).
