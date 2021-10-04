let counter = 0;
let q_list = document.getElementById('general_questions_list');
let a_list = document.querySelectorAll('.answer')

let res_list = [];
a_list.forEach((x) => {
    let title = x.textContent;
    res_list += [`<li><a href="#q${counter}">${title}</a></li>`]
    counter += 1;
})
q_list.innerHTML = res_list