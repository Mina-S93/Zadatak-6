let modalPledge = document.querySelector(".modal-pledge");
let closeModal = document.querySelector(".close-modal");
let pledgeLeft = document.querySelectorAll(".pledge-left");
let modalForm = document.querySelector("#modal-form");
let pledgeContainer = document.querySelectorAll(".pledge-info");
let pledgeSubmit = document.querySelectorAll(".pledge-sumbit");
let agreeModal = document.querySelector(".agree-modal");
let agreeModalButton = document.querySelector(".agree-modal-container button");
let dataMoney = document.querySelector("#data-money");
let dataBackers = document.querySelector("#data-backers");
let progresBar = document.querySelector(".progres-bar-filled");
let rewardsLeft = document.querySelectorAll(".reward-footer-left");
let containers = document.querySelectorAll(".pledge-container");

//close modal without pledge
closeModal.addEventListener("click", () => {
	modalPledge.style.display = "none";
});

//if 0 pledge left disable option
pledgeLeft.forEach((pledge) => {
	let overlay = document.createElement("div");
	overlay.classList.add("overlay");

	if (pledge.innerText == "0") {
		pledge.parentElement.parentElement.appendChild(overlay);
		pledge.parentElement.parentElement.childNodes[1].setAttribute(
			"disabled",
			true
		);
	}
});

//if pledge selected add border
containers.forEach((container) => {
	container.addEventListener("click", () => {
		containers.forEach((container) => {
			container.style.border = "1px solid hsl(0, 0%, 48%)";
		});

		if (container.childNodes[1].childElementCount <= 4) {
			container.style.border = "2px solid hsl(176, 50%, 47%)";
		}
	});
});

//if pledge is disabled you can't see submit button fot it
pledgeContainer.forEach((pledgeContainer) => {
	pledgeContainer.addEventListener("click", () => {
		pledgeSubmit.forEach((pledgeSubmit) => {
			pledgeSubmit.style.display = "none";
		});
		if (pledgeContainer.childElementCount <= 4) {
			pledgeContainer.nextElementSibling.style.display = "flex";
		}
	});
});

//submit form
modalForm.addEventListener("submit", (e) => {
	e.preventDefault();
	//get gelected pledge
	let chosenPledge = modalForm.pledgeModal.value;

	//get input value (money) from selected pledge
	if (
		document.querySelector('input[name="pledgeModal"]:checked').parentElement
			.nextElementSibling.childElementCount >= 2
	) {
		let pledgeValue = document.querySelector(
			'input[name="pledgeModal"]:checked'
		).parentElement.nextElementSibling.childNodes[3].childNodes[1].childNodes[2]
			.value;

		//when second modal is clicked, activate animation for progres bar, counting backers and money
		agreeModalButton.addEventListener("click", () => {
			agreeModal.style.display = "none";
			data(pledgeValue);
			generatePledgeLeft(chosenPledge);
		});
	} else {
		//if pledge with no reward is selected
		agreeModalButton.addEventListener("click", () => {
			agreeModal.style.display = "none";
			pledgeValue = 0;
			data(pledgeValue);
			generatePledgeLeft(chosenPledge);
		});
	}

	modalPledge.style.display = "none";
	agreeModal.style.display = "flex";
	window.scrollTo(0, 0);
});

//progress bar width after submiting pledge
function data(pledgeMoney) {
	let moneyPercent =
		((Number(dataMoney.innerText.replace(",", "")) + Number(pledgeMoney)) *
			100) /
		100000;
	progresBar.style.width = `${moneyPercent}%`;

	progresBar.animate([{ width: "0%" }, { width: `${moneyPercent}%` }], {
		duration: 3000,
		iterations: 1,
	});

	//money raised
	let startMoney = Number(dataMoney.innerText.replace(",", ""));
	let endMoney = Number((moneyPercent * 100000) / 100);
	animateValue(dataMoney, startMoney, endMoney, 3000);

	//number of backers
	let startBackers = Number(dataBackers.innerText.replace(",", ""));
	let endBackers = Number(dataBackers.innerText.replace(",", "")) + 1;
	animateValue(dataBackers, startBackers, endBackers, 3000);
}

//progress bar width before submiting pledge
(function setProgressBarWidth() {
	let moneyPercent = (dataMoney.innerText.replace(",", "") * 100) / 100000;
	progresBar.style.width = `${moneyPercent}%`;
})();

//animate total backers and money raised
function animateValue(obj, start, end, duration) {
	if (start === end) return;
	var range = end - start;
	var current = start;
	var increment = end > start ? 1 : -1;
	var stepTime = Math.abs(Math.floor(duration / range));
	var timer = setInterval(function () {
		current += increment;
		obj.innerHTML = current;
		if (current == end) {
			obj.innerHTML = end.toLocaleString();
			clearInterval(timer);
		}
	}, stepTime);
}

//change pledge with 0 left
rewardsLeft.forEach((reward) => {
	if (reward.innerText == "0") {
		reward.parentElement.parentElement.parentElement.style.opacity = "0.5";
		reward.parentElement.parentElement.childNodes[3].innerText = "Out of stock";
		reward.parentElement.parentElement.childNodes[3].style.backgroundColor =
			"hsl(0, 0%, 48%)";
	}
});

//pledge counter, decrease left when pledge is submited
function generatePledgeLeft(id) {
	rewardsLeft.forEach((reward) => {
		if (reward.id == id) {
			let leftStart = Number(reward.innerText);
			let leftEnd = leftStart - 1;
			animateValue(reward, leftStart, leftEnd, 3000);
		}
	});
}

//bookmarked or not
let bookmarkButton = document.querySelector(".bookmark-container button");
let bookmarkSVGCircle = document.querySelector("#bookmarkSVG g circle");
let bookmarkSVGPath = document.querySelector("#bookmarkSVG g path");
let bookmark = document.querySelector(".bookmark-container");

bookmark.addEventListener("click", () => {
	bookmarkButton.classList.toggle("bookmark-button");
	bookmarkSVGCircle.classList.toggle("bookmarkSVG-circle");
	bookmarkSVGPath.classList.toggle("bookmarkSVG-path");
});

//mobile menu
let closeMenu = document.querySelector(".mobile-close");
let mobileNav = document.querySelector(".mobile-nav");
let hamburgerBtn = document.querySelector(".hamburger-menu");
let mobileNavigationHeader = document.querySelector(
	".mobile-navigation-header"
);
let menuItems = document.querySelectorAll(".mobile-li li");

hamburgerBtn.addEventListener("click", () => {
	mobileNav.style.display = "block";
	mobileNavigationHeader.style.display = "none";
});

closeMenu.addEventListener("click", () => {
	mobileNav.style.display = "none";
	mobileNavigationHeader.style.display = "flex";
});

menuItems.forEach((item) => {
	item.addEventListener("click", () => {
		mobileNav.style.display = "none";
		mobileNavigationHeader.style.display = "flex";
	});
});
