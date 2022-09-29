
document.addEventListener('DOMContentLoaded', ()=>{
    let form = document.getElementById('github-form');
    let searchButton = form.submit;
    let searchBox = form.search;
    let userlist = document.getElementById("user-list");
    let reposlist = document.getElementById('repos-list');
    searchButton.addEventListener('click', (e) =>{
        e.preventDefault();
        console.log(searchBox.value);
        fetch(`https://api.github.com/search/users?q=${searchBox.value}`,{
            method: 'GET',
            headers:{
                'Content-Type':'application/json',
                Accept: 'application/vnd.github.v3+json',
            },
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            console.log(data.items);
            console.log(data['total_count']);
            while(userlist.firstChild){
                    userlist.removeChild(userlist.firstChild)
                }
            for (let entry of data.items){
                const user = document.createElement('li');
                user.setAttribute('id', `${entry.id}`);
                user.innerHTML = `<h3>${entry.login}  </h3><img src=${entry['avatar_url']} class='user-avatar'/> <a href=${entry.url}>Profile link</a>`;
                userlist.appendChild(user)
                let name = user.getElementsByTagName('h3')[0];
                name.addEventListener('click', ()=>{
                    console.log(entry['repos_url']);
                    fetch(`${entry['repos_url']}`, {
                        method: 'GET',
                        headers:{
                            'Content-Type':"application/json",
                            Accept: 'application/vnd.github.v3+json',
                        },
                    })
                    .then(resp=>resp.json())
                    .then(data=>{
                        while(reposlist.firstChild){
                            reposlist.removeChild(reposlist.firstChild)
                        }
                        for(let item of data){
                            console.log(item.name)
                            let repo = document.createElement('li');
                            repo.textContent = `${item.name}`;
                            reposlist.appendChild(repo)

                        }
                    })
                })
        }
        })
    })
})

// Accept: application/vnd.github.v3+json