# <img src="https://github.com/pip-webui/pip-webui/blob/master/doc/Logo.png" alt="Pip.WebUI Logo" style="max-width:30%"> <br/> Navigation controls

![](https://img.shields.io/badge/license-MIT-blue.svg)

Good navigation in complex Line-of-Business applications is absoletely critical. It shall allow users to jump from one page to another and access features quickly and freely. Cumbersome navigation, unintuitive links and lots of clicks can ruin any application. Ease of use and productivity of users in the first place depend on it. Pip.WebUI.Nav module provides controls for global and local navigation.

### Side navigation bar
<a href="doc/images/img-side-nav.png" style="border: 3px ridge #c8d2df; display: block">
    <img src="doc/images/img-side-nav.png"/>
</a>

Side navigation is located on the left of a screen. It fills a whole screen height. There are several sections which can
be grouped as need. Navigation items can have icon before text. At the top there is located user avatar.

Side navigation bar [API reference](http://link.com)

[Online Example](http://webui.pipdevs.com/pip-webui-nav/sidenav/index.html)

<br/>

### <a name="app_bar"></a>Application bar
<a href="doc/images/img-app-bar.png" style="border: 3px ridge #c8d2df; margin: 0 auto; display: inline-block">
    <img src="doc/images/img-app-bar.png"/>
</a>

Application bar is located on the top of page and contains many controls. It includes:
* burger side navigation button
* Plain title text or breadcrumbs
* notification icons
* some local actions
* any icons
* right submenu (usual there is signout button)

This component is responsive and stretched on a whole screen width.


Single document layout [API reference](http://link.com)

[Online Example](http://webui.pipdevs.com/pip-webui-nav/appbar/index.html)

<br/>

### <a name="tabs"></a>Navigation tabs control
<a href="doc/images/img-tabs.png" style="border: 3px ridge #c8d2df; margin: 0 auto; display: inline-block">
    <img src="doc/images/img-tabs.png"/>
</a>

Tabs are navigation elements to another states. They are located on the bottom of application navigation bar.

If tabs are not fit into available space on different sides appear navigation arrows. On mobile screen tabs are transformed
into dropdown menu.

Tabs control [API reference](http://link.com)

[Online Example](http://webui.pipdevs.com/pip-webui-nav/nav_controls/index.html#/tabs)

<br/>

### <a name="dropdown"></a>Dropdown control
<a href="doc/images/img-dropdown.png" style="border: 3px ridge #c8d2df; margin: 0 auto; display: inline-block">
    <img src="doc/images/img-dropdown.png"/>
</a>

This control styled list which appears after click on source field. Dropped list is styled due to chosen theme.

Dropdown control [API reference](http://link.com)

[Online Example](http://webui.pipdevs.com/pip-webui-nav/nav_controls/index.html#/dropdown)


## Learn more about the module

- [User's guide](doc/UsersGuide.md)
- [Online samples](http://webui.pipdevs.com/pip-webui-nav/index.html)
- [API reference](http://webui-api.pipdevs.com/pip-webui-nav/index.html)
- [Developer's guide](doc/DevelopersGuide.md)
- [Changelog](CHANGELOG.md)
- [Pip.WebUI project website](http://www.pipwebui.org)
- [Pip.WebUI project wiki](https://github.com/pip-webui/pip-webui/wiki)
- [Pip.WebUI discussion forum](https://groups.google.com/forum/#!forum/pip-webui)
- [Pip.WebUI team blog](https://pip-webui.blogspot.com/)

## <a name="dependencies"></a>Module dependencies

* [pip-webui-lib](https://github.com/pip-webui/pip-webui-lib): angular, angular material and other 3rd party libraries
* [pip-webui-css](https://github.com/pip-webui/pip-webui-css): CSS styles and web components
* [pip-webui-core](https://github.com/pip-webui/pip-webui-core): localization and other core services
* [pip-webui-rest](https://github.com/pip-webui/pip-webui-rest): REST resources for users and files

## <a name="license"></a>License

This module is released under [MIT license](License) and totally free for commercial and non-commercial use.
