(function() {
    directoryApp
        .controller("directoryCtrl", function(directoryService) {
            var vmApp = this;
            vmApp.emp = {};
            vmApp.emp.DOB = new Date();
            vmApp.ListAllEmployees = ShowAll;
            vmApp.AddEmployee = Add;
            vmApp.UpdateEmployee = Update;
            vmApp.DeleteEmployee = Delete;
            vmApp.PopulateData = PopulateData;
            vmApp.loading = false;
            vmApp.empEdit=false;
            vmApp.isUpdateVisible = false;

            vmApp.ListAllEmployees();

            vmApp.reset = function() {
                vmApp.emp.Name = vmApp.emp.Email = vmApp.emp.DOB = vmApp.emp.Age = vmApp.emp.Gender = vmApp.emp.Department = "";
                if (vmApp.isUpdateVisible) {
            vmApp.empEdit=false;                    
                    vmApp.isUpdateVisible = false;
                }
            }
            vmApp.calendar = function() {
                vmApp.toggleCalendar = !vmApp.toggleCalendar;
            }
            vmApp.empDetails = [];
            vmApp.calculateAge = function() {
                var seconds, minutes, hours;
                seconds = parseInt((new Date() - vmApp.emp.DOB) / 1000);
                minutes = parseInt(seconds / 60);
                hours = parseInt(minutes / 60);
                vmApp.emp.Age = parseInt(hours / (24 * 360));
            }

            function ShowAll() {
                vmApp.loading = true;
                directoryService.ShowAll().then(function(response) {
                        vmApp.empDetails = response.data;
                        vmApp.error = "";
                        vmApp.loading = false;
                    },
                    function(error) {
                        vmApp.loading = false;
                        vmApp.error = error.data.message;
                    });
            }

            function Add(emp) {
                vmApp.loading = true;
                directoryService.Add(emp).then(function(response) {
                    vmApp.empDetails = response.data;
                    vmApp.error = "";
                    vmApp.isUpdateVisible = false;
                    vmApp.loading = false;
                    vmApp.reset();
                }, function(error) {
                    vmApp.loading = false;
                    vmApp.isUpdateVisible = false;
                    vmApp.error = error.data.message;
                });
            }

            function Update(emp) {
                vmApp.loading = true;
                directoryService.Update(emp).then(function(response) {
                    vmApp.empDetails = response.data;
                    vmApp.error = "";
                    vmApp.loading = false;
                    vmApp.isUpdateVisible = false;
                    vmApp.reset();
                }, function(error) {
                    vmApp.loading = false;
                    vmApp.isUpdateVisible = false;
                    vmApp.error = error.data.message;
                });
            }

            function Delete(emp) {
                console.log(emp.name)
                vmApp.loading = true;
                directoryService.Delete({ "name": emp.name }).then(function(response) {
                    vmApp.empDetails = response.data;
                    vmApp.error = "";
                    vmApp.loading = false;
                    vmApp.reset();
                }, function(error) {
                    vmApp.loading = false;
                    vmApp.error = error.data.message;
                });
            }

            function PopulateData(emp) {
                vmApp.isUpdateVisible = true;
                vmApp.emp.Name = emp.name;
                vmApp.emp.Email = emp.email;
                vmApp.emp.DOB = new Date(emp.dob);
                vmApp.emp.Age = parseInt(emp.age);
                vmApp.emp.Gender = emp.gender;
                vmApp.emp.Department = emp.department;
            }
        });
})();