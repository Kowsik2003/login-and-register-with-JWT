const alertFn = (data,json) => {
		if(data.status == 200)
		{
			localStorage.setItem('jwt',`${json.token}`);
			alert('User data available in database AND user loggedIn');
		}
		else if(data.status == 401)
	  	{
	  		alert('email or password is wrong');
	  	} 
}


const postData = async (url,data) => 
{
	  const response = await fetch(url, {
	    method: 'POST', 
	    mode: 'cors', 
	    cache: 'no-cache',
	    credentials: 'same-origin', 
	    headers: {
	      'Content-Type': 'application/json'
	    },
	    redirect: 'follow', 
	    referrerPolicy: 'no-referrer', 
	    body: JSON.stringify(data) 
	  }).then(data => {
	  		data.json().then(json => alertFn(data,json));	  	  
	  }
		)
	  .catch(err => console.log('Error1 :',err));
} 

const setNULL = () => {
	document.getElementById('email').value = '';
	document.getElementById('password').value = '';
}

document.querySelector('.form').addEventListener('submit',async e => {
	e.preventDefault();
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	if(!email || !password)
		return alert('provide email and password');

	await postData('https://kowsik-2003.herokuapp.com/',{email , password});

	setNULL();
});
