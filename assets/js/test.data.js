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
                            href: 'script-input.html'
                        }
                    ]
                }
            ]
        }
    ]
}

var scriptsArray = [
    {
        name: 'Add User Mapping',
        inputs: [
            {
                name: 'card name',
                type: 'text',
                width: 2
            },
            {
                name: 'username',
                type: 'text',
                width: 2
            }
        ]
    }
]