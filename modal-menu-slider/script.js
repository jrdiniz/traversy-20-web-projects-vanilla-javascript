const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');


// Toggle Menu
toggle.addEventListener('click', ()=>{
    document.body.classList.toggle('show-nav');
})

// Show Modal
open.addEventListener('click', ()=>{
    modal.classList.add('show-modal');
});

// Hide Modal
close.addEventListener('click', ()=>{
    modal.classList.remove('show-modal');
})

// Hide Modal on outside click or click outsite of modal
window.addEventListener('click', e =>{
    if (e.target == modal){
        modal.classList.remove('show-modal')
    }
})