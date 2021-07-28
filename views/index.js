const button = document.querySelector('#dl');
const ytbId = document.querySelector('#ytb');

button.addEventListener('click', (e) => {
    e.preventDefault();

    if (ytbId.value) {
        window.open(`http://localhost:3000/download/${ytbId.value}`)
    }
})