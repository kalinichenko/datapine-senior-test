{
    "logLevel": "1",
    "baseUrl": "./app/scripts/",
    "mainConfigFile": "./app/scripts/main.js",
    "dir": "./.tmp/scripts",
    "removeCombined": true,
    "optimize": "none",
    "modules": [{
      "name": "main",
      "include": ["text"]
    },{
      "name": "apps/charts/charts_controller",
      "exclude": ["main"]
    },{
      "name": "apps/main_menu/menu_controller",
      "exclude": ["main"]
    },{
      "name": "apps/about/about_controller",
      "exclude": ["main"]
    }]
}

