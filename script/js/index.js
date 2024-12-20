var currentTab = "index";

const goHome = () => {
	if (currentTab != "index") {
		const wrapper = document.getElementById("content-wrapper");
		wrapper.classList.add("h-0");
	}

	if (currentTab == "about")
		hideAbout()
	else if (currentTab == "work")
		hideWork();
	else if (currentTab == "contact")
		hideContact();

	currentTab = "index";
}

const showWork = () => {

	if (currentTab != "work") {
		const wrapper = document.getElementById("content-wrapper");
		const work = document.getElementById("content-work");

		if (currentTab == "index")
			wrapper.classList.remove("h-0");
		else if (currentTab == "about")
			hideAbout();
		else if (currentTab == "contact")
			hideContact();

		work.classList.remove("h-0");
		work.classList.remove("w-0");
		work.classList.add("h-[60vh]");
		work.classList.add("w-[60vw]");

		currentTab = "work";
	} else {
		hideWork();
	}

}

const hideWork = () => {
	const work = document.getElementById("content-work");
	work.classList.remove("h-[60vh]");
	work.classList.remove("w-[60vw]");
	work.classList.add("h-0");
	work.classList.add("w-0");
	currentTab = "index";
}

const showContact = () => {

	if (currentTab != "contact") {
		const wrapper = document.getElementById("content-wrapper");

		if (currentTab == "index")
			wrapper.classList.remove("h-0");
		else if (currentTab == "about")
			hideAbout();
		else if (currentTab == "work")
			hideWork();

		const contact = document.getElementById("content-contact");
		contact.classList.remove("h-0");
		contact.classList.remove("overflow-hidden");

		currentTab = "contact";
	} else {
		hideContact();
	}

}

const hideContact = () => {
	const contact = document.getElementById("content-contact");
	contact.classList.add("h-0");
	contact.classList.add("overflow-hidden");
	currentTab = "index";
}

const showAbout = () => {

	if (currentTab != "about") {
		const wrapper = document.getElementById("content-wrapper");

		if (currentTab == "index")
			wrapper.classList.remove("h-0");
		else if (currentTab == "work")
			hideWork();
		else if (currentTab == "contact")
			hideContact();

		const about = document.getElementById("content-about");
		about.classList.remove("h-0");
		about.classList.remove("overflow-hidden");

		currentTab = "about";
	} else {
		hideAbout();
	}

}

const hideAbout = () => {
	const about = document.getElementById("content-about");
	about.classList.add("h-0");
	about.classList.add("overflow-hidden");
	currentTab = "index";
}