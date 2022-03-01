// Create a button in the context menu that calls the printProbabilities function when clicked.

chrome.contextMenus.create ({
    "title": "Get name origin",
    "contexts": ["selection"],
    "onclick" : printProbabilities()
});

// Function that will display the probable origin of the selected name.
function printProbabilities() {

    return function(info,tab) {

        // Trim the excess off the selected name.
        var full_name = info.selectionText.trim();
        full_name = full_name.split(' ');
        console.log(full_name);

        // Use the first and last words selected as full name.
        var first_name = full_name[0];
        var last_name = full_name[full_name.length - 1]

        if (full_name.length == 1){
            first_name = full_name[0]
            last_name = ""
        }

        let url = "https://v2.namsor.com/NamSorAPIv2/api2/json/country/" + first_name + "%20" + last_name;

        // Function to fetch the origin of the name using the Namsor API.
        // Insert your Namsor X-API-KEY.
        const response  = fetch(url, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "X-API-KEY": "cc8b1c04545239c948692f63f43ee62b"
            }
            })
            // Return the json response.
            .then((response) => response.json()).then((user) => {
                return user;
            })

        // Define the getObject function which awaits the json response and displays the result on the console.
        const getObject = async () => {
            const object = await response;

            window.alert("Name: " + object.name + "\n" 
                       + "Top country: " + object.country + "\n" 
                       + "Probability: " + (Math.round(object.probabilityCalibrated*10000) / 100) + "%\n" 
                       + "Top countries: " + object.countriesTop);
        }

        getObject();
    }
}
