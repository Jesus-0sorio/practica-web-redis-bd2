document.getElementById("submitForm").addEventListener("click", () => {
  let email = document.querySelector("input#email").value;
  let name = document.querySelector("input#name").value;
  let tel = document.querySelector("input#tel").value;
  let birth = document.querySelector("input#birth").value;

  const res = submitForm(email, name, tel, birth);
  res.then((res) => {
    if (res.status === 200) {
      const toast = new bootstrap.Toast(document.getElementById("liveToast"));
      toast.show();
    }
  });
});

document.getElementById("findProfile").addEventListener("click", () => {
  const formProfile = document.getElementById("formProfile");
  const findProfile = document.getElementById("formFind");
  formProfile.classList.toggle("d-none");
  findProfile.classList.toggle("d-none");
});

document.getElementById("searchForm").addEventListener("click", async () => {
  let findEmail = document.querySelector("input#findEmail").value;
  let email = document.querySelector("input#staticEmail");
  let name = document.querySelector("input#staticName");
  let tel = document.querySelector("input#staticPhone");
  let birth = document.querySelector("input#staticBirth");

  const data = findData(findEmail);
  email.value = findEmail;
  data
    .then((res) => res.json())
    .then((data) => {
      name.value = data.name;
      tel.value = data.tel;
      birth.value = data.birth;
    });
});

const findData = async (findEmail) => {
  const url = `/profile/${findEmail}`;
  const res = await fetch(url);
  return res;
};

const submitForm = (email, name, tel, birth) => {
  const url = "/addprofile";
  const data = { email, name, tel, birth };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = fetch(url, options);
  return res;
};
