let signInButton = document.querySelector("#login-button");

function login() {
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;

  fetch(" https://enigmatic-mesa-96671.herokuapp.com//user-registration/", {
    method: "PATCH",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.data) {
        localStorage.setItem("user", JSON.stringify(data.data));
        window.location.href = "./main.html";
      }
    });
}
