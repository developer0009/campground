const a = document.querySelectorAll('#link')
for (let link of a) {
    link.addEventListener('click', (e) => {
        // console.log('hello')
        link.classList.add("active")
    })
}
