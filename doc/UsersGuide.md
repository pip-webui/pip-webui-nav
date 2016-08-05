# Pip.WebUI.Nav User's Guide

## <a name="contents"></a> Contents
- [Installing](#install)
- [pipSidenav provider](#sidenav_provider)
- [pip-sidenav directive](#sidenav)
- [pipAppbar provider](#appbar_provider)
- [pip-appbar directive](#appbar)
- [pip-tabs directive](#tabs)
- [pip-dropdown directive](#dropdown)
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
<link rel="stylesheet" href=".../pip-webui.min.css"/>
...
<script src=".../pip-webui-lib.min.js"></script>
<script src=".../pip-webui.min.js"></script>
```

Register **pipNav** module in angular module dependencies.
```javascript
angular.module('myApp',[..., 'pipNav']);
```

## <a name="sidenav_provider"></a> pipSidenav provider

**pipSidenav** provider allows to configure **pip-sidenav** during configure and run phases. 
The configuration includes user or application info and naviation links.

### Usage
```javascript
pipSideNavProvider.sections([
    {
        links: [
            {
                title: 'Dashboard', url: '/dashboard?party_id=:party_id', access: function () {
                    // return any_conditions;
                }
            },
            {title: 'About', url: '/about?party_id=:party_id'}
        ]
    },
    {
        title: 'Get',
        access: function () {
            // return any_conditions;
        },
        links: [
            {title: 'Incoming', icon: 'icons:folder', url: '/ideas?party_id=:party_id'},
            {title: 'Big Picture', icon: 'icons:goal', url: '/unfinished?party_id=:party_id'},
            {title: 'Events', icon: 'icons:star', url: '/ultimate_todo?party_id=:party_id'}
        ]
    },
    {
        links: [
            {title: 'Help', url: '/help'},
            {title: 'Support', url: '/support?party_id=:user_id'},
            {title: 'Settings', url: '/settings?party_id=:party_id'}
        ]
    }
]);
```

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
  - 
* **open(): void** - opens sidenav
* **close(): void** - closes sidenav
* **toggle(): void** - toggles sidenav open/close state
  
### Sections Configuration object
* **title(text: string): string** - title on the sidenav section
* **access : function** - function, which will show or hide section depending on the conditions specified inside
* **links : array** - array of links in current section
    + title - title of the link
    + icon - icon of the link
    + url - link url, which will set $location.url() after click link
    + access - function, which will show or hide link depending on the conditions specified inside
    + href - link href, which will set to $window.location.href after click link
    + state - link state, in which will navigate by function $state.go() after click link

## <a name="sidenav"></a> pip-sidenav directive

**pip-sidenav** directive inserts into HTML markup the navigation Sidenav panel. It presents information, configured in **pipSidenav** provider.

### Usage
```html
<pip-sidenav></pip-sidenav>
```

<img src="images/img-side-nav.png"/>

## <a name="appbar_provider"></a> pipAppbar provider

**pipAppbar** provider allows to configure **pip-appbar** during configure and run phases. 
The configuration includes title and breadcrumb text, primary and secondary actions.

### Usage
Todo: Add here code snippet to demonstrate configuration of appbar

### Methods
Todo: Describe all provider methods here

### Action configuration object
Todo: Add here description of action configuration fields


## <a name="appbar"></a> pip-appbar directive

**pip-appbar** directive inserts into HTML markup the navigation Appbar panel. It has a complex structure that includes:
- Menu icon that can be shown as avatar or logo
- Application title
- Breadcrumb that can replace the title
- Primary actions visualized we icons
- Secondary actions places into popup menu under three dots on the right
- Integrated search bar with history

Primary and secondary actions are divided into global, that are set once during configure phase, and local, that are changed in runtime by every page.

### Usage
Todo: Add HTML snippet that demonstrates this directive with all attributes

Todo: Add screenshots with breadcrumb, secondary actions and search bar
<img src="images/img-app-bar.png"/>

### Attributes
Todo: Describe the directive attributes here


## <a name="tabs"></a> pip-tabs directive

Navigation tabs control. Besides other small modifications it provides responsive capabilities. To improve usability on smaller screens it turns into **pip-dropdown**.

### Usage
Todo: Add HTML snippet that demonstrates this directive with all attributes

Todo: Add similar image with dropdown on small screen
<img src="images/img-tabs.png"/>

### Attributes
Todo: Describe the directive attributes here


## <a name="dropdown"></a> pip-dropdown directive

Navigation dropdown control is similar to popup but it looks and behaves slightly different. It is styled to be seemlessly integrated into application title. It resizes itself to entire available width and can go down to the bottom of the screen. If list takes more space then the screen height, the drop down is smart enough to scroll it while standard popup doesn't do that.

### Usage
Todo: Add HTML snippet that demonstrates this directive with all attributes

Todo: Add similar image with dropdown on small screen
<img src="images/img-dropdown.png"/>

### Attributes
Todo: Describe the directive attributes here


## <a name="issues"></a> Questions and bugs

If you have any questions regarding the module, you can ask them using our 
[discussion forum](https://groups.google.com/forum/#!forum/pip-webui).

Bugs related to this module can be reported using [github issues](https://github.com/pip-webui/pip-webui-nav/issues).
