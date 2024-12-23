// Event listener to initialize functions once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
	initSearch();
	initNavigation();
	initFormValidation();
	initYear();
});

// Initializes the search functionality
const initSearch = () => {
	const searchBtn = document.querySelector(".btn.search.open"); // Search button
	const searchForm = document.querySelector(".search__form"); // Search form

	// If search button or form doesn't exist, exit
	if (!searchBtn || !searchForm) return;

	// Toggles the visibility of the search form when the button is clicked
	const toggleSearchVisibility = (e) => {
		e.stopPropagation(); // Prevents event bubbling
		searchForm.classList.toggle("visible"); // Toggle "visible" class on form
	};

	// Hides the search form if the click is outside the form and button
	const hideSearchForm = (e) => {
		if (!searchForm.contains(e.target) && e.target !== searchBtn) {
			searchForm.classList.remove("visible");
		}
	};

	// Closes the search form if the Escape key is pressed
	const closeOnEscape = (e) => {
		if (e.key === "Escape") {
			searchForm.classList.remove("visible");
		}
	};

	// Event listeners
	searchBtn.addEventListener("click", toggleSearchVisibility);
	document.addEventListener("click", hideSearchForm);
	document.addEventListener("keydown", closeOnEscape);
};

// Initializes the navigation (hamburger menu) functionality
const initNavigation = () => {
	const hamburgerBtn = document.querySelector(".btn.hamburger"); // Hamburger button
	const navigation = document.querySelector(".header__nav--list"); // Navigation list
	const body = document.body; // Body element

	// If hamburger button or navigation doesn't exist, exit
	if (!hamburgerBtn || !navigation) return;

	// Toggles the navigation visibility when the hamburger button is clicked
	const toggleNavigation = (e) => {
		e.stopPropagation(); // Prevents event bubbling
		navigation.classList.toggle("open"); // Toggle "open" class on navigation
		body.classList.toggle("transformed"); // Toggle "transformed" class on body
	};

	// Closes the navigation if the click is outside the navigation and button
	const closeNavigation = (e) => {
		if (!navigation.contains(e.target) && e.target !== hamburgerBtn) {
			navigation.classList.remove("open");
			body.classList.remove("transformed");
		}
	};

	// Closes the navigation if the Escape key is pressed
	const closeOnEscape = (e) => {
		if (e.key === "Escape") {
			navigation.classList.remove("open");
			body.classList.remove("transformed");
		}
	};

	// Event listeners
	hamburgerBtn.addEventListener("click", toggleNavigation);
	document.addEventListener("click", closeNavigation);
	document.addEventListener("keydown", closeOnEscape);
};

// Initializes the form validation functionality
const initFormValidation = () => {
	const form = document.querySelector(".form.contacts"); // Contact form
	const nameInput = document.querySelector(".name"); // Name input field
	const emailInput = document.querySelector(".email"); // Email input field
	const messageInput = document.querySelector(".message"); // Message input field

	// If form or any input fields are missing, exit
	if (!form || !nameInput || !emailInput || !messageInput) return;

	// Functions to add or remove error class
	const addErrorClass = (input) => input.classList.add("error");
	const removeErrorClass = (input) => input.classList.remove("error");

	// Email validation function
	const validateEmail = (email) => {
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailPattern.test(email); // Returns true if email is valid
	};

	// Validates an input field based on a condition and adds/removes error class
	const validateInput = (input, condition) => {
		condition ? removeErrorClass(input) : addErrorClass(input);
	};

	// Validates the entire form
	const validateForm = () => {
		// Validate each input field
		validateInput(nameInput, nameInput.value.trim());
		validateInput(emailInput, emailInput.value.trim() && validateEmail(emailInput.value));
		validateInput(messageInput, messageInput.value.trim());

		// Returns true if all fields are valid
		return nameInput.value.trim() && validateEmail(emailInput.value) && messageInput.value.trim();
	};

	// Event listeners for real-time input validation
	nameInput.addEventListener("input", () => validateInput(nameInput, nameInput.value.trim()));
	emailInput.addEventListener("input", () => validateInput(emailInput, emailInput.value.trim() && validateEmail(emailInput.value)));
	messageInput.addEventListener("input", () => validateInput(messageInput, messageInput.value.trim()));

	// Prevents form submission if validation fails
	form.addEventListener("submit", (e) => {
		e.preventDefault(); // Prevent form from submitting
		if (validateForm()) {
			return true; // If valid, allow form submission
		} else {
			return false; // If invalid, prevent form submission
		}
	});
};

// Sets the current year in the copyright section
const initYear = () => {
	const yearSpan = document.querySelector(".copyright span"); // Year span element
	if (yearSpan) {
		yearSpan.textContent = new Date().getFullYear(); // Set current year
	} else {
		return;
	}
};
