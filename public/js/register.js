const alertFn = data => {
				if(data.status == 201)
				{
					alert('User registered Successfully !.Now you can login ');
				}
			  else if(data.status == 422)
	  		{
	  			alert('The usermail is exist already !');
	  		} 
}

const setNULL = () => {
	document.getElementById('email').value = '';
	document.getElementById('password').value = '';
	document.getElementById('confirmpassword').value = '';
}

const postData =  async (url, data = {}) =>
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
	  	  alertFn(data);
	  }
		)
	  .catch(err => console.log('Error1 :',err));
}


 document.querySelector('.form1').addEventListener('submit', async e => {
 	e.preventDefault();
 	const email = document.getElementById('email').value;
 	const password = document.getElementById('password').value;
 	const confirmpassword = document.getElementById('confirmpassword').value;

 	await postData('https://kowsik-2003.herokuapp.com/register',{email,password,confirmpassword});

 	setNULL();
 });
 
