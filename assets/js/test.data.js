var menuJson = {
    menu: [
        {
            name: 'Dashboards',
            featherIcon: 'home',
            href: 'sidebarDashboards',
            children: [
                {
                    name: 'Default',
                    href: 'index.html'
                },
                {
                    name: 'Alternative',
                    href: 'index.html',
                    badge: 'soft-success',
                    badgeText: 'New'
                }
            ]
        },
        {
            name: 'Scripts',
            featherIcon: 'code',
            href: 'sidebarScripts',
            children: [
                {
                    name: 'General',
                    href: 'sidebarScriptsGeneral',
                    children: [
                        {
                            name: 'Add User Mapping',
                            href: 'addusermapping.html'
                        }
                    ]
                }
            ]
        }
    ]
}

var scriptsJson = {
    name: 'Add User Mapping',
    inputs: [
        {
            name: 'card name',
            type: 'text'
        },
        {
            name: 'username',
            type: 'text'
        }
    ]
}