// goal: inject the page with all the necessary elements to match wireframes/phase-1.png
window.onload = () => { 

    let score = localStorage.score || 0; 

    const container = document.createElement('section'); 
    container.setAttribute('class', 'container'); 
    document.body.appendChild(container); 

    // inject header in html
    const header = document.createElement('h1')
    header.innerText = 'Catstagram'; 
    container.appendChild(header); 

    const picContainer = document.createElement('div');
    picContainer.setAttribute('id', 'picture-container');
    container.appendChild(picContainer);

    const pic = document.createElement('img'); 
    pic.setAttribute('id', 'fetched-picture'); 
    picContainer.appendChild(pic); 

    const newCat = document.createElement('button');
    newCat.innerText = 'New Cat'
    newCat.setAttribute('type', 'button');
    newCat.setAttribute('id', 'new-cat-btn');
    container.appendChild(newCat);

    // popularity section
    const popularity = document.createElement('div'); 
    popularity.setAttribute('id', 'popularity')
    popularity.innerText = 'Popularity Score: '
    container.appendChild(popularity);
    const popularityScore = document.createElement('span'); 
    popularityScore.setAttribute('id', 'popularity-score'); 
    popularityScore.innerText = score;
    popularity.appendChild(popularityScore); 

    const buttons = document.createElement('div'); 
    buttons.setAttribute('id', 'buttons'); 
    container.appendChild(buttons); 

    const thumbsUp = document.createElement('button');
    thumbsUp.setAttribute('type', 'button');  
    thumbsUp.setAttribute('class', 'button'); 
    thumbsUp.setAttribute('id', 'thumbs-up'); 
    thumbsUp.innerHTML = '<i class="fa-regular fa-thumbs-up"></i>'
    buttons.appendChild(thumbsUp); 

    const thumbsDown = document.createElement('button');
    thumbsDown.setAttribute('type', 'button');
    thumbsDown.setAttribute('class', 'button');
    thumbsDown.setAttribute('id', 'thumbs-down');
    thumbsDown.innerHTML = '<i class="fa-regular fa-thumbs-down"></i>'
    buttons.appendChild(thumbsDown); 

    // comment section
    const commentSection = document.createElement('div'); 
    commentSection.setAttribute('id', 'comment-section'); 
    container.appendChild(commentSection); 

    const textAreaLabel = document.createElement('label'); 
    textAreaLabel.setAttribute('id', 'textarea-label');
    textAreaLabel.setAttribute('for', 'textarea'); 
    textAreaLabel.innerText = 'Leave a Comment:'; 
    commentSection.appendChild(textAreaLabel); 


    const textArea = document.createElement('textarea'); 
    textArea.setAttribute('id', 'textarea'); 
    textArea.setAttribute('name', 'textarea'); 
    textArea.setAttribute('rows', '4'); 
    textArea.setAttribute('cols', '30'); 
    commentSection.appendChild(textArea); 

    const submit = document.createElement('button');
    submit.setAttribute('type', 'button');
    submit.setAttribute('class', 'button');
    submit.setAttribute('id', 'submit');
    submit.innerHTML = '<i class="fa-solid fa-thumbtack"></i>'
    commentSection.appendChild(submit); 

    const comments = document.createElement('ul'); 
    comments.setAttribute('id', 'comments'); 
    container.appendChild(comments); 

    // check if previous session exists 
    if (localStorage.url) {
        pic.setAttribute('src', localStorage.url);
        popularityScore.innerText = localStorage.score;
        
        comments.innerHTML = ''; 
        const savedComments = JSON.parse(localStorage.comments); 
        savedComments.forEach(comment => { 
            comments.innerHTML += `<li class=comment>${comment}</li>`
        });

    } else { 
        getCat().then((url) => pic.setAttribute('src', url))
    }

    // event listeners: 
    newCat.addEventListener('click', event => {
        getCat().then((url) => {

            // 1. capture state
            localStorage.setItem('url', url); 
            localStorage.setItem('score', 0); 
            localStorage.setItem('comments', JSON.stringify([])); 

            // 2. update DOM elements
            pic.setAttribute('src', url); 
            score = 0;
            popularityScore.innerText = 0; 
            comments.innerHTML = '';
        });
    });

    thumbsUp.addEventListener('click', () => {
        score++; 
        localStorage.score = score; 
        popularityScore.innerText = score; 
    });

    thumbsDown.addEventListener('click', () => {
        score--;
        localStorage.score = score; 
        popularityScore.innerText = score;
    });

    submit.addEventListener('click', () => {
        const text = textArea.value; 
        const newComment = document.createElement('li'); 
        newComment.setAttribute('class', 'comment'); 
        newComment.innerText = text; 
        comments.appendChild(newComment); 

        const savedComments = JSON.parse(localStorage.comments); 
        savedComments.push(text); 
        localStorage.comments = JSON.stringify(savedComments); 

        textArea.value = ''; 
    });

    // fetch new cat urls
    async function getCat(){ 
        try { 
            let res = await fetch('https://api.thecatapi.com/v1/images/search', {
                method: 'GET',
                header: { 'x-api-key': 'DEMO-API-KEY' },
            });

            let arr = await res.json(); // note: json() is async
            let obj = arr[0];
            let url = obj.url;
            console.log(url)

            return url; 

        } catch(error) { 
            console.log('Ehm...', error)
        }
    };


}
