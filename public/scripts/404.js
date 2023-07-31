const goBackBtn = document.getElementById('back');

const goBack = (e) => {
	e.preventDefault();
	history.bac();
}

goBackBtn.addEventListener('click', goBack);