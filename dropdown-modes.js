let mode;
const cpsText = document.getElementById("text");
const openDropdown = () =>
	document.getElementById('dropdown-content').classList.toggle('show');

window.onclick = function(event) {
	if (!event.target.matches('#dropdown')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
		for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show'))
        openDropdown.classList.remove('show');
    }
  }
}
					
const cont = (function cont() {
	firstClick = true;
	mode = 'cont';
	text.innerHTML = "clicks in the last second";
	
	return cont;
})();

const timed = () => {
	firstClick = true;

	
	mode = 'timed';
};

const dc = () => {
	firstClick = true;
	mode = 'dc';

	text.innerHTML = "clicks";
};