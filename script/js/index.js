var currentTab = "index";

const showWork = () => {

    if(currentTab != "work") {
	const wrapper = document.getElementById("content-wrapper");
	const work = document.getElementById("content-work");

	if(currentTab == "index") {
	    wrapper.classList.remove("h-0");
	}

	wrapper.classList.remove("overflow-hidden");
	wrapper.classList.add("overflow-auto");

	work.classList.remove("h-0");
	work.classList.remove("collapse");
	
	currentTab = "work";
    }
}
