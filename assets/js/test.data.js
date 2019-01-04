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
};

var scriptsArray = [
    {
        name: 'Add User Mapping',
        description: 'Adds a mapping for the user in table "vusrextid"',
        inputs: [
            {
                name: 'card name',
                type: 'text',
                width: 2,
                optional: false
            },
            {
                name: 'username',
                type: 'text',
                width: 2,
                optional: false
            }
        ]
    }
];

var userProfiles = [
    {
        id: 0,
        personal: {
            first_name: 'Ofir',
            last_name: 'Levi',
            birthday: '24.01.1993'
        },
        nickname: 'ofirl',
        defaults: {
            logon: [
                {
                    description: 'CRM Dev',
                    system: 'CKD',
                    username: 'OFIRL'
                    
                },
                {
                    description: 'CRM Test',
                    system: 'CKT',
                    username: 'OFIRL',
                    default: true
                },
                {
                    description: 'CRM Prod',
                    system: 'CKP',
                    username: 'OFIRL'
                }
            ]
        }
    }
];