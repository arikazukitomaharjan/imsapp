angular.module('app.routes', [])
    
    .config(function ($stateProvider, $urlRouterProvider) {
        
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider


            .state('tabsController.product', {
                url: '/product',
                views: {
                    'tab1': {
                        templateUrl: 'templates/product.html',
                        controller: 'productCtrl'
                    }
                }
            })
            
            .state('tabsController.report', {
                url: '/report',
                views: {
                    'tab2': {
                        templateUrl: 'templates/report.html',
                        controller: 'reportCtrl'
                    }
                }
            })
            
            .state('tabsController.expense', {
                url: '/expense',
                views: {
                    'tab3': {
                        templateUrl: 'templates/expense.html',
                        controller: 'expenseCtrl'
                    }
                }
            })
            
            .state('tabsController.category', {
                url: '/category',
                views: {
                    'tab6': {
                        templateUrl: 'templates/category.html',
                        controller: 'categoryCtrl'
                    }
                }
            })
            
            .state('tabsController', {
                url: '/tab',
                templateUrl: 'templates/tabsController.html',
                abstract: true
            })
            
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            })

            .state('logout', {
                url: '/logout',

                controller: 'logoutCtrl'
            });
        $urlRouterProvider.otherwise('/login')
        
        
    });