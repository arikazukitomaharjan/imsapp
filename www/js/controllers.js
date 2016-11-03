var base_url = "http://192.168.0.109/inventorymanagementsystem/public/api/v1/";
var product = base_url + 'products';
var category = base_url + 'categories';
var report = base_url + 'sales';
var expense = base_url + 'expenses';
var login = base_url + 'login';
var logout = base_url + 'logout/';


var categoryStore = base_url + 'categories/store';
var productStore = base_url + 'products/store';
var expenseStore = base_url + 'expenses/store';
var productSale = base_url + 'productSale/';


var token = false;
// var product = base_url + 'product';
angular.module('app.controllers', ['ionic', 'ionic-toast'])

    .controller('productCtrl', ['$scope', '$stateParams', '$http', '$ionicModal', '$window', 'ionicToast',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $http, $ionicModal, $window, ionicToast) {


            $scope.tokenCheck = function () {

                try {
                    var token = JSON.parse($window.localStorage['token']);
                    if (token == false) {
                        token = false;
                        $window.location.href = '#/';
                    }
                    else {
                        token = true;

                    }
                } catch (e) {
                    $window.location.href = '#/';
                    // set default value if localStorage parsing failed
                }


            };
            $scope.init = function () {

                $http.get(product, {
                    headers: {

                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json; charset=UTF-8'

                    }
                })
                    .success(function (response) {
                        console.log("fdsaf" + response.data);

                        $scope.category_btn = true;
                        $scope.products = response.data;


                    });
            };

            /*  $scope.btnShow = function () {
             console.log('i am here');
             $scope.category_btn = !$scope.category_btn;
             };
             */
            $http.get(category).success(function (response) {
                $scope.categories = response.data;
            });
            var date_added = new Date();

            var date_added = date_added.toISOString().slice(0, 10);
            $scope.input = {date_added: date_added};

            $ionicModal.fromTemplateUrl('productModal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.addModal = modal;
            });


            $ionicModal.fromTemplateUrl('editProductModal.html', {

                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {

                console.log('hell' + $scope.id);
                $scope.editModal = modal;
            });
            $ionicModal.fromTemplateUrl('saleProduct.html', {

                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {

                console.log('hell' + $scope.id);
                $scope.saleModal = modal;
            });

            $scope.openModal = function () {

                $scope.saleModal.show();
            };
            $scope.closeModal = function () {
                $scope.addModal.hide();
            };
// Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.saleModal.remove();
            });
// Execute action on hide modal
            $scope.$on('saleModal.hidden', function () {
// Execute action
            });
// Execute action on remove modal
            $scope.$on('saleModal.removed', function () {
// Execute action
            });


            $scope.openEditModal = function (id, name, information, stock, cost_price, category_id, date_added) {
                $scope.input = {
                    id: id,
                    name: name,
                    information: information,
                    stock: stock,
                    cost_price: cost_price,
                    category_id: category_id,
                    date_added: date_added
                };
                /*$scope.id = id;
                 $scope.name = name;
                 $scope.description = description;*/


                $scope.editModal.show();
            };
            $scope.closeModal = function () {
                $scope.editModal.hide();
            };
// Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.editModal.remove();
            });
// Execute action on hide modal
            $scope.$on('editModal.hidden', function () {
// Execute action
            });
// Execute action on remove modal
            $scope.$on('editModal.removed', function () {
// Execute action
            });

            $scope.openModal = function (id, name, MRP, stock, cost_price) {

                var token = JSON.parse($window.localStorage['token']);
                $scope.input = {
                    id: id,
                    name: name,
                    MRP: MRP,
                    stock: stock,
                    cost_price: cost_price
                };
                console.log(token);
                $scope.totalSale = function () {
                    $scope.input.total_cost_price = $scope.input.cost_price * $scope.input.quantity;
                    if ($scope.input.sale_price == "") {
                        $scope.input.sale_price = "0";
                    }

                    var price = $scope.input.price;
                    var quantity = $scope.input.quantity;
                    $scope.input.sale_price = price * quantity;


                };


                $scope.saleModal.show();
            };

            $scope.closeModal = function () {
                $scope.editModal.hide();
            };
// Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.editModal.remove();
            });
// Execute action on hide modal
            $scope.$on('editModal.hidden', function () {
// Execute action
            });
// Execute action on remove modal
            $scope.$on('editModal.removed', function () {
// Execute action
            });


//category add section

            $scope.addProduct = function (input) {

                var data = {
                    'name': input.name,
                    'information': input.information,
                    'stock': input.stock,
                    'date_added': input.date_added,
                    'cost_price': input.cost_price,
                    'category_id': input.category_id

                };

                console.log(data);
                $http.post(productStore, data, {
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json; charset=UTF-8'
                        }
                    }
                ).success(function (response) {
                    ionicToast.show('Category is inserted successfully.', 'bottom', false, 1500);
                    $scope.input = {
                        name: '',
                        description: ''
                    };
                    $scope.init();


                });
            };
            $scope.editProduct = function (input) {

                console.log(input.name);
                console.log(input.description);
                var id = input.id;

                var credential = {
                    'id': input.id,
                    'name': input.name,
                    'information': input.information,
                    'stock': input.stock,
                    'date_added': input.date_added,
                    'cost_price': input.cost_price,
                    'category_id': input.category_id
                };

                console.log("cre" + credential);
                $http({
                    method: 'PATCH',
                    url: product + '/' + id,
                    data: credential,

                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json; charset=UTF-8'
                    }


                }).success(function (data) {
//success.

                    console.log("result from controller" + data);

                    ionicToast.show('Successfully Updated', 'bottom', false, 1500);
                    $scope.init();
                    $window.localStorage['token'] = JSON.stringify(data.token);


                }).error(function (error) {

                    ionicToast.show('Error while updating data', 'bottom', false, 1500);
//failed.
                });
            }
            $scope.deleteProduct = function (id) {


                $http({
                    method: 'DELETE',
                    url: product + '/' + id,
                    data: {id: id},

                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json; charset=UTF-8'
                    }


                }).success(function (data) {
//success.

                    console.log(data);

                    ionicToast.show('Successfully Deleted', 'bottom', false, 1500);
                    $scope.init();
                    $window.localStorage['token'] = JSON.stringify(data.token);

                }).error(function (error) {

                    ionicToast.show('Error while updating data', 'bottom', false, 1500);
//failed.
                });
            };
            $scope.saleProduct = function (input) {

                //
                // if ($scope.input.quantity > $scope.input.stock) {
                //     ionicToast.show('Please insert valid value', 'bottom', false, 1000);
                //     return false;
                // }
                var token = JSON.parse($window.localStorage['token']);
                console.log("token:" + token);
                var id = input.id;
                var data = {

                    quantity: input.quantity,
                    sale_price: input.sale_price,
                    cost_price: input.total_cost_price
                };
                console.log(data);
                console.log("token" + token);
                $http.post(productSale + id, data, {
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json; charset=UTF-8'
                        }
                    }
                ).success(function (response) {
                    ionicToast.show('Successfully Sold', 'bottom', false, 1500);


                    $scope.init();

                }).error(function (error) {

                    ionicToast.show('Error while Selling product', 'bottom', false, 1500);
//failed.
                });
            }

        }])

    .controller('reportCtrl', ['$scope', '$stateParams', '$http', '$ionicModal', '$window', 'ionicToast',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $http, $ionicModal, $window, ionicToast) {


            $scope.tokenCheck = function () {

                try {
                    var token = JSON.parse($window.localStorage['token']);
                    if (token == false) {
                        token = false;
                        $window.location.href = '#/';
                    }
                    else {
                        token = true;

                    }
                } catch (e) {
                    $window.location.href = '#/';
                    // set default value if localStorage parsing failed
                }


            };
            $scope.init = function () {

                $http.get(report, {
                    headers: {

                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json; charset=UTF-8'

                    }
                })
                    .success(function (response) {
                        console.log("fdsaf" + response.data);

                        $scope.category_btn = true;
                        $scope.reports = response.data;


                    });
            };
        }])

    .controller('expenseCtrl', ['$scope', '$stateParams', '$http', '$ionicModal', '$window', 'ionicToast',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $http, $ionicModal, $window, ionicToast) {

            $scope.tokenCheck = function () {

                try {
                    var token = JSON.parse($window.localStorage['token']);
                    if (token == false) {
                        token = false;
                        $window.location.href = '#/';
                    }
                    else {
                        token = true;

                    }
                } catch (e) {
                    $window.location.href = '#/';
                    // set default value if localStorage parsing failed
                }


            };
            $scope.init = function () {

                $http.get(expense, {
                    headers: {

                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json; charset=UTF-8'

                    }
                })
                    .success(function (response) {
                        console.log(response.data);

                        $scope.category_btn = true;
                        $scope.expenses = response.data;


                    });
            };

            $ionicModal.fromTemplateUrl('expenseModal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.addModal = modal;
            });


            $ionicModal.fromTemplateUrl('editProductModal.html', {

                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {

                console.log('hell' + $scope.id);
                $scope.editModal = modal;
            });


            $ionicModal.fromTemplateUrl('saleProduct.html', {

                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {

                console.log('hell' + $scope.id);
                $scope.saleModal = modal;
            });

            $scope.openModal = function () {

                $scope.addModal.show();
            };
            $scope.closeModal = function () {
                $scope.addModal.hide();
            };
// Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.addModal.remove();
            });
// Execute action on hide modal
            $scope.$on('addModal.hidden', function () {
// Execute action
            });
// Execute action on remove modal
            $scope.$on('addModal.removed', function () {
// Execute action
            });


            $scope.openModal = function (id, name, description, cost, date) {
                $scope.input = {
                    id: id,
                    name: name,
                    description: description,

                    cost: cost,

                    date: date
                };


                $scope.editModal.show();
            };
            $scope.closeModal = function () {
                $scope.editModal.hide();
            };
// Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.editModal.remove();
            });
// Execute action on hide modal
            $scope.$on('editModal.hidden', function () {
// Execute action
            });
// Execute action on remove modal
            $scope.$on('editModal.removed', function () {
// Execute action
            });


//category add section

            $scope.addExpense = function (input) {

                var data = {
                    'name': input.name,
                    'description': input.description,
                    'date': input.date,
                    'cost': input.cost

                };

                console.log(data);
                $http.post(expenseStore, data, {
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json; charset=UTF-8'
                        }
                    }
                ).success(function (response) {
                    ionicToast.show('Category is inserted successfully.', 'bottom', false, 1500);
                    $scope.input = {
                        name: '',
                        description: ''
                    };
                    $scope.init();


                });
            };
            $scope.editExpense = function (input) {

                console.log(input.name);
                console.log(input.description);
                var id = input.id;

                var credential = {
                    'id': input.id,
                    'name': input.name,
                    'description': input.description,

                    'date': input.date,
                    'cost': input.cost

                };

                console.log("cre" + credential);
                $http({
                    method: 'PATCH',
                    url: expense + '/' + id,
                    data: credential,

                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json; charset=UTF-8'
                    }


                }).success(function (data) {
//success.

                    console.log("result from controller" + data);

                    ionicToast.show('Successfully Updated', 'bottom', false, 1500);
                    $scope.init();



                }).error(function (error) {

                    ionicToast.show('Error while updating data', 'bottom', false, 1500);
//failed.
                });
            }
            $scope.deleteExpense = function (id) {


                $http({
                    method: 'DELETE',
                    url: expense + '/' + id,
                    data: {id: id},

                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json; charset=UTF-8'
                    }


                }).success(function (data) {
//success.

                    console.log(data);

                    ionicToast.show('Successfully Deleted', 'bottom', false, 1500);
                    $scope.init();


                }).error(function (error) {

                    ionicToast.show('Error while updating data', 'bottom', false, 1500);
//failed.
                });
            }


        }])

    .controller('categoryCtrl', ['$scope', '$stateParams', '$http', '$ionicModal', '$window', 'ionicToast',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $http, $ionicModal, $window, ionicToast) {
            var token = JSON.parse($window.localStorage['token']);
            $scope.tokenCheck = function () {

                try {
                    var token = JSON.parse($window.localStorage['token']);
                    if (token == false) {
                        token = false;
                        $window.location.href = '#/';
                    }
                    else {
                        token = true;

                    }
                } catch (e) {
                    $window.location.href = '#/';
                    // set default value if localStorage parsing failed
                }


            };
            $scope.init = function () {

                $http.get(category, {
                    headers: {

                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json; charset=UTF-8'

                    }
                })
                    .success(function (response) {
                        console.log(response.data);

                        $scope.category_btn = true;
                        $scope.categories = response.data;


                    });
            };

            /*  $scope.btnShow = function () {
             console.log('i am here');
             $scope.category_btn = !$scope.category_btn;
             };
             */

            $ionicModal.fromTemplateUrl('categoryModal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.addModal = modal;
            });


            $ionicModal.fromTemplateUrl('editCategoryModal.html', {

                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {

                console.log('hell' + $scope.id);
                $scope.editModal = modal;
            });

            $scope.openModal = function () {

                $scope.addModal.show();
            };
            $scope.closeModal = function () {
                $scope.addModal.hide();
            };
// Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.addModal.remove();
            });
// Execute action on hide modal
            $scope.$on('addModal.hidden', function () {
// Execute action
            });
// Execute action on remove modal
            $scope.$on('addModal.removed', function () {
// Execute action
            });
            $scope.openModal = function (id, name, description) {
                $scope.input = {
                    id: id,
                    name: name,
                    description: description
                };
                /*$scope.id = id;
                 $scope.name = name;
                 $scope.description = description;*/


                $scope.editModal.show();
            };
            $scope.closeModal = function () {
                $scope.editModal.hide();
            };
// Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.editModal.remove();
            });
// Execute action on hide modal
            $scope.$on('editModal.hidden', function () {
// Execute action
            });
// Execute action on remove modal
            $scope.$on('editModal.removed', function () {
// Execute action
            });


//category add section

            $scope.addCategory = function (input) {
                var data = {
                    'name': input.name,
                    'description': input.description
                };

                console.log(data);
                $http.post(categoryStore, data, {
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json; charset=UTF-8'
                        }
                    }
                ).success(function (response) {
                    ionicToast.show('Category is inserted successfully.', 'bottom', false, 1500);
                    $scope.input = {
                        name: '',
                        description: ''
                    };
                    $scope.init();


                });
            };
            $scope.editCategory = function (input) {

                console.log(input.name);
                console.log(input.description);
                var id = input.id;

                var credential = {
                    id: input.id,
                    name: input.name,
                    description: input.description
                };

                console.log("cre" + credential);
                $http({
                    method: 'PATCH',
                    url: category + '/' + id,
                    data: credential,

                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json; charset=UTF-8'
                    }


                }).success(function (data) {
//success.

                    console.log("result from controller" + data);

                    ionicToast.show('Successfully Updated', 'bottom', false, 1500);
                    $scope.init();



                }).error(function (error) {

                    ionicToast.show('Error while updating data', 'bottom', false, 1500);
//failed.
                });
            }
            $scope.deleteCategory = function (id) {


                $http({
                    method: 'DELETE',
                    url: category + '/' + id,
                    data: {id: id},

                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json; charset=UTF-8'
                    }


                }).success(function (data) {
//success.

                    console.log(data);

                    ionicToast.show('Successfully Deleted', 'bottom', false, 1500);
                    $scope.init();


                }).error(function (error) {

                    ionicToast.show('Error while updating data', 'bottom', false, 1500);
//failed.
                });
            }

        }])

    .controller('loginCtrl', ['$scope', '$state', '$http', '$window', 'ionicToast', '$ionicSideMenuDelegate',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $state, $http, $window, ionicToast, $ionicSideMenuDelegate) {
            $ionicSideMenuDelegate.canDragContent(false);
            $scope.login = function (input) {


                console.log('i am here');

                var credential = {
                    email: input.email,
                    password: input.password,
                };

                console.log(credential);
                $http({
                    method: 'POST',
                    url: login,
                    data: credential,

                    headers: {

                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }


                }).success(function (data) {
//success.
                    console.log($state);
                    console.log(data);
                    ionicToast.show('Successfully login', 'bottom', false, 1500);
                    /*  $see = $window.localStorage['token'];
                     console.log('i have session');
                     console.log($see);*/

                    $state.go('tabsController.product');

                }).error(function (error) {

                    ionicToast.show('Email or password doesnot match.', 'bottom', false, 1500);
//failed.
                });

            };


        }])
    .controller('logoutCtrl', ['$scope', '$state', '$http', '$window', 'ionicToast', '$ionicHistory',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $state, $http, $window, ionicToast, $ionicHistory) {
            console.log('i ah');
            $state.go('login');

            var token = JSON.parse($window.localStorage['token']);
            console.log(token);


            if (token == false) {
                token = false;
                $window.location.href = '#/';
            }
            else {
                $http({
                    method: 'POST',
                    url: logout + token,
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json; charset=UTF-8'
                    }


                }).success(function (data) {
                    ionicToast.show('Successfully logout', 'bottom', false, 1500);
                    $window.localStorage.clear();
                    $ionicHistory.clearCache();
                    $ionicHistory.clearHistory();
                    $state.go('login');

                }).error(function (error) {
                    console.log('i am at error')
                    ionicToast.show('Email or password doesnot match.', 'bottom', false, 1500);

                });
            }


        }])





