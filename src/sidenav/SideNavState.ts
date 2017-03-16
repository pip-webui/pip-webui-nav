export class SideNavStateNames {
    static Toggle: string = 'toggle';
    static Small: string = 'small';
    static Large: string = 'large';
    static XLarge: string = 'xlarge';
}

export class SideNavState {
    id: SideNavStateNames;
    // Class which added to sidenav in this state
    addClass: string;
    // Side nav always open
    isLockedOpen: boolean;
    // Show SideNav header 
    showHeader: boolean;
    // Show expanded button
    expandedButton: boolean;
    // SideNav has expand
    isExpanded: boolean;
    // SideNav is Expanded in this state by default
    expand: boolean;
    // Tooltype is show
    showIconTooltype: boolean;
}

export class SideNavStateConfig {
    toggle: SideNavState = { // media(sm, xs)
        id: SideNavStateNames.Toggle,
        addClass: 'sidenav-mobile',
        showHeader: true,
        isLockedOpen: false,
        expandedButton: false,
        isExpanded: true,
        expand: true,
        showIconTooltype: false
    };
    small: SideNavState = { // media(md)
        id: SideNavStateNames.Small,
        addClass: 'pip-sticky-nav-small sidenav-smalldesktop',
        showHeader: false,
        isLockedOpen: true,
        expandedButton: false,
        isExpanded: false,
        expand: false,
        showIconTooltype: true
    };
    large: SideNavState = { // media(lg)
        id: SideNavStateNames.Large,
        addClass: 'sidenav-smalldesktop',
        showHeader: false,
        isLockedOpen: true,
        expandedButton: true,
        isExpanded: true,
        expand: true,
        showIconTooltype: true
    };
    xlarge: SideNavState = { // media(xl)
        id: SideNavStateNames.XLarge,
        addClass: 'sidenav-desktop',
        showHeader: false,
        isLockedOpen: true,
        expandedButton: false,
        isExpanded: true,
        expand: true,
        showIconTooltype: false
    };
}

export class SideNavConfig {
    parts: any;
    classes: string[];
    state: SideNavState;
    type: string;
    visible: boolean;
}