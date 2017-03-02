# <img src="https://github.com/pip-webui/pip-webui/raw/master/doc/Logo.png" alt="Pip.WebUI Logo" style="max-width:30%"> <br/> Navigation controls

![](https://img.shields.io/badge/license-MIT-blue.svg)

Good navigation in complex Line-of-Business applications is absolutely critical. It shall allow users to jump from one page to another and access features quickly and freely. Cumbersome navigation, unintuitive links and lots of clicks can ruin any application. Ease of use and productivity of users in the first place depend on it. Pip.WebUI.Nav module provides controls for global and local navigation.

### Side navigation panel

Navigation **Sidenav** provided by this module is defined by configuration and does not require HTML markup. It shows navigation links with optional icons that can be combined into groups. The top of the **Sidenav** may contain information about the user or application.

```javascript
pipSideNavProvider.sections = [
            {
                title: 'Appbar',
                icon: 'icons:goal',
                links: [
                    { title: 'Nav icons', icon: 'icons:archive', url: '/nav_icons' },
                    { title: 'Titles', icon: 'icons:list', url: '/titles' },
                    { title: 'Actions', icon: 'icons:action', url: '/actions' },
                    { title: 'Search', icon: 'icons:search', url: '/search' },
                    { title: 'Shadows', icon: 'icons:lamp', url: '/shadows' },

                    { title: 'Tabs', icon: 'icons:folder', url: '/tabs' },
                    { title: 'Dropdown', icon: 'icons:list', url: '/dropdown' },
                ]
            },
            {
                title: 'SideNav',
                icon: 'icons:area',
                links: [
                    { title: 'StickySideNav', icon: 'icons:submenu', url: '/sticky_sidenav' },
                    { title: 'Navigations', icon: 'icons:preview', url: '/navigations' }
                ]
            }
        ];
```

<a href="doc/images/img-sidenav-popup.png" style="border: 3px ridge #c8d2df; display: block">
    <img src="doc/images/img-sidenav-popup.png"/>
</a>

Sidenav have to representation: popup-sidenav and sticky-sidenav. A popup-sidenav can be opened and closed programatically. By default, upon opening it will slide out on left of the main content area.
A sticky-sidenav have some state which depend on the size of the browser window. Please see pipMedia [breakpoints...](http://webui.pipdevs.com/pip-webui-layouts/index.html#/media)

| Breakpoint | sticky-sidenav state| 
|---|---|
| xs, sm | popup-sidenav |
| md | icon-sidenav |
| lg | resized-sidenav |
| xl | full-sidenav |

**popup-sidenav**

**icon-sidenav**

**resized-sidenav**

**full-sidenav**


### Application bar

**Appbar** similar to **Sidenav** has a complex structure that if defined by configuration. 
It contains menu icon, title that can be turned into breadcrumb, primary actions on the bar, secondary actions hidden in popup menu and search.

<a href="doc/images/img-app-bar.png" style="border: 3px ridge #c8d2df; margin: 0 auto; display: inline-block">
    <img src="doc/images/img-app-bar.png"/>
</a>

**menu icon**
<a href="doc/images/img-app-bar.png" style="border: 3px ridge #c8d2df; margin: 0 auto; display: inline-block">
    <img src="doc/images/img-app-bar.png"/>
</a>

**title**
<a href="doc/images/img-app-bar.png" style="border: 3px ridge #c8d2df; margin: 0 auto; display: inline-block">
    <img src="doc/images/img-app-bar.png"/>
</a>

**breadcrumb**
<a href="doc/images/img-app-bar.png" style="border: 3px ridge #c8d2df; margin: 0 auto; display: inline-block">
    <img src="doc/images/img-app-bar.png"/>
</a>

**primary actions**
<a href="doc/images/img-app-bar.png" style="border: 3px ridge #c8d2df; margin: 0 auto; display: inline-block">
    <img src="doc/images/img-app-bar.png"/>
</a>

**secondary actions**
<a href="doc/images/img-app-bar.png" style="border: 3px ridge #c8d2df; margin: 0 auto; display: inline-block">
    <img src="doc/images/img-app-bar.png"/>
</a>

**search**
<a href="doc/images/img-app-bar.png" style="border: 3px ridge #c8d2df; margin: 0 auto; display: inline-block">
    <img src="doc/images/img-app-bar.png"/>
</a>

### Navigation tabs

**Navigation tabs** are similar to regular tabs. But they contain links and turn into **Navigation dropdown** on smaller screens.

<a href="doc/images/img-tabs.png" style="border: 3px ridge #c8d2df; margin: 0 auto; display: inline-block">
    <img src="doc/images/img-tabs.png"/>
</a>

### Navigation dropdown

**Navigation dropdown** control is places at the top of the page, properly styled and contains navigation links

<a href="doc/images/img-dropdown.png" style="border: 3px ridge #c8d2df; margin: 0 auto; display: inline-block">
    <img src="doc/images/img-dropdown.png"/>
</a>


## Learn more about the module

- [User's guide](https://github.com/pip-webui/pip-webui-nav/blob/master/doc/UsersGuide.md)
- [Online samples](http://webui.pipdevs.com/pip-webui-nav/index.html)
- [API reference](http://webui-api.pipdevs.com/pip-webui-nav/index.html)
- [Developer's guide](https://github.com/pip-webui/pip-webui-nav/blob/master/doc/DevelopersGuide.md)
- [Changelog](https://github.com/pip-webui/pip-webui-nav/blob/master/CHANGELOG.md)
- [Pip.WebUI project website](http://www.pipwebui.org)
- [Pip.WebUI project wiki](https://github.com/pip-webui/pip-webui/wiki)
- [Pip.WebUI discussion forum](https://groups.google.com/forum/#!forum/pip-webui)
- [Pip.WebUI team blog](https://pip-webui.blogspot.com/)

## <a name="dependencies"></a>Module dependencies

* [pip-webui-lib](https://github.com/pip-webui/pip-webui-lib): angular, angular material and other 3rd party libraries
* [pip-webui-css](https://github.com/pip-webui/pip-webui-css): CSS styles and web components
* [pip-webui-services](https://github.com/pip-webui/pip-webui-services): localization and other core services

## <a name="license"></a>License

This module is released under [MIT license](License) and totally free for commercial and non-commercial use.
