(function() {
    directoryApp
        .service("directoryService", function($http) {
            this.ShowAll = function() {
                return $http.get("/emp");
            }
            this.Add = function(payload) {
                return $http.post("/insert", payload);
            }
            this.Update = function(payload) {
                return $http.put("/update", payload);
            }
            this.Delete = function(payload) {
                console.log(payload)
                return $http({
                    method: "DELETE",
                    url: "/delete",
                    data: payload,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        });
})();