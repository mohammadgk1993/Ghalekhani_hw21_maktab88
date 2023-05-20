$(() => {
    console.log('hello')

    $("#delete-user").on('submit',function (e) { 
        e.preventDefault();
        
        fetch(`/user/${$('body').attr('id')}`,
        {method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
            res.json()
            document.location.pathname = "/auth/register"
        })
    });

    $("#update-user").on('submit',function (e) {
        e.preventDefault();

        const updatedUser = {}

        if (!!$("#name-update").val()) updatedUser.name = $("#name-update").val()
        if (!!$("#email-update").val()) updatedUser.email = $("#email-update").val()
        if (!!$("#password-update").val()) updatedUser.password = $("#password-update").val()
        
        fetch(`/user/${$('body').attr('id')}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data => {
        JSON.parse(JSON.stringify(data))
        })
    });
})