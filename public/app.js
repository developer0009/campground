const ids = document.querySelectorAll('#checkavailable')
for (let id of ids) {
    if (id.innerText.trim() === 'true') {
        id.innerText = 'yay hurray available!!'
        id.classList = 'text-success card-text'
    }
    else {
        id.innerText = 'sorry not-available!!'
        id.classList = 'text-danger card-text'
    }
}
