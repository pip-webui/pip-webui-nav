export class NavIconConfig {
    // Type of nav icon: 'back', 'menu', 'image' or 'none'
    public type: string;
    // Image url
    public imageUrl: string;
    // Icon name
    public icon: string;
    // Handle nav icon click event
    click: () => void;
    // Event name
    event: string
};