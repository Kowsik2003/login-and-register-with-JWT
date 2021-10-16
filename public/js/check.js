const alertFn = (data,json) => {
		if(data.status == 200)
		{
			alert(`${json.email} is loggedIn`);
		}
		else if(data.status == 400)
	  	{
	  		alert('Invalid Token');
	  	}  		
	  	else if(data.status == 401)
	  	{
	  		alert('The User not found');
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


document.getElementById('btn').addEventListener('click',async  e => {
	const token = localStorage.getItem('jwt');
	if(!token)
		return alert('User does not login');
	await postData('https://kowsik-2003.herokuapp.com/check',{token});
	//console.log(token);
});
