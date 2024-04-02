// Function to filter users based on search query and filters
function filterUsers(users, searchQuery, filters) {
    return users.filter(user => {
        // Filter by search query
        const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
        if (searchQuery && fullName.indexOf(searchQuery.toLowerCase()) === -1) {
            return false;
        }

        // Filter by department/category
        if (filters.domain && filters.domain !== "All") {
            if (user.domain !== filters.domain) {
                return false;
            }
        }

        // Filter by gender
        if (filters.gender && user.gender.toLowerCase() !== filters.gender.toLowerCase()) {
            return false;
        }

        // Filter by availability
        if (filters.availability && user.available !== filters.availability) {
            return false;
        }

        return true; // Default to true if no filters applied
    });
}

// Function to display users for the current page
function displayCurrentPageUsers(users, currentPage, usersPerPage) {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const currentPageUsers = users.slice(startIndex, endIndex);
    displayFilteredUsers(currentPageUsers);
}

// Function to display filtered users
function displayFilteredUsers(users) {
    let placeholder = document.querySelector("#data_output");
    let out = "";
    for (let user of users) {
        out += `
            <div class="card">
                <img src="${user.avatar}" alt="Avatar">
                <h3>${user.first_name} ${user.last_name}</h3>
                <p>ID: ${user.id}</p>
                <p>Email: ${user.email}</p>
                <p>Gender: ${user.gender}</p>
                <p>Domain: ${user.domain}</p>
                <p>Availability: ${user.available ? 'Available' : 'Not Available'}</p>
            </div>
        `;
    }
    placeholder.innerHTML = out;
}

// Fetch data from JSON file
fetch("product.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(product) {
        const usersPerPage = 20;
        let currentPage = 1;
        let filteredUsers = product; // Initialize with all users
        let searchInput = document.querySelector("#search_input");
        let domainSelect = document.querySelector("#domain_select");
        let genderSelect = document.querySelector("#gender_select");
        let availabilityCheckbox = document.querySelector("#availability_checkbox");
        let paginationContainer = document.querySelector(".pagination");

        // Event listener for search input
        searchInput.addEventListener("input", function() {
            filteredUsers = filterUsers(product, searchInput.value, {
                domain: domainSelect.value,
                gender: genderSelect.value,
                availability: availabilityCheckbox.checked
            });
            currentPage = 1; // Reset to first page when search input changes
            displayCurrentPageUsers(filteredUsers, currentPage, usersPerPage);
            updatePagination();
        });

        // Event listeners for filters
        domainSelect.addEventListener("change", function() {
            filteredUsers = filterUsers(product, searchInput.value, {
                domain: domainSelect.value,
                gender: genderSelect.value,
                availability: availabilityCheckbox.checked
            });
            currentPage = 1; // Reset to first page when domain filter changes
            displayCurrentPageUsers(filteredUsers, currentPage, usersPerPage);
            updatePagination();
        });

        genderSelect.addEventListener("change", function() {
            filteredUsers = filterUsers(product, searchInput.value, {
                domain: domainSelect.value,
                gender: genderSelect.value,
                availability: availabilityCheckbox.checked
            });
            currentPage = 1; // Reset to first page when gender filter changes
            displayCurrentPageUsers(filteredUsers, currentPage, usersPerPage);
            updatePagination();
        });

        availabilityCheckbox.addEventListener("change", function() {
            filteredUsers = filterUsers(product, searchInput.value, {
                domain: domainSelect.value,
                gender: genderSelect.value,
                availability: availabilityCheckbox.checked
            });
            currentPage = 1; // Reset to first page when availability filter changes
            displayCurrentPageUsers(filteredUsers, currentPage, usersPerPage);
            updatePagination();
        });

        // Function to handle pagination
        function updatePagination() {
            const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
            paginationContainer.innerHTML = `
                <button id="prev_page">Previous</button>
                <span>Page ${currentPage} of ${totalPages}</span>
                <button id="next_page">Next</button>
            `;
            const prevButton = document.getElementById("prev_page");
            const nextButton = document.getElementById("next_page");

            prevButton.addEventListener("click", function() {
                if (currentPage > 1) {
                    currentPage--;
                    displayCurrentPageUsers(filteredUsers, currentPage, usersPerPage);
                    updatePagination(); // Update pagination UI
                }
            });

            nextButton.addEventListener("click", function() {
                if (currentPage < totalPages) {
                    currentPage++;
                    displayCurrentPageUsers(filteredUsers, currentPage, usersPerPage);
                    updatePagination(); // Update pagination UI
                }
            });
        }

        // Initial display
        displayCurrentPageUsers(filteredUsers, currentPage, usersPerPage);
        updatePagination();
    })
    .catch(function(error) {
        console.log("Error fetching data:", error);
    });

console.log("check");
