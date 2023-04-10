let error = [];

document.getElementById("errors").style.display = "none";
document.getElementById("succes").style.display = "none";
document.getElementById("betalingswijze").style.display = "none";

document.getElementById("activeer").addEventListener("click", Start);

function Start() {
  event.preventDefault();

  const error = [];
  const errorsP = document.querySelector("#errorsP");
  errorsP.innerHTML = "";
  let voorwaarden = document.getElementById("voorwaarden");
  let betaling = document.querySelectorAll('input[name="betalingswijze"]');
  LeegOfNiet("uwVoornaam", "Het veld voornaam is vereist");
  LeegOfNiet("uwnaam", "Het veld naam is vereist");

  gebruikersnaamCheck("gebruikersnaam");

  emailCheck("email");

  wwCheck("Wachtwoord", "HWachtwoord");

  LeegOfNiet("adres", "Het veld adres is vereist");
  LeegOfNiet("land", "Gelieve een land te selecteren");
  LeegOfNiet("Provincie", "Gelieve een provincie te selecteren");

  postcodeCheck("Postcode");

  betaalwijzeCheck(betaling);

  if (!voorwaarden.checked) {
    error.push("Je moet de algemene voorwaarden accepteren");
  }

  const succes = document.getElementById("succes");
  const betalingswijze = document.getElementById("betalingswijze");
  const errors = document.getElementById("errors");

  if (error.length === 0) {
    succes.style.display = "block";
    betalingswijze.style.display = "block";
    errors.style.display = "none";
  } else {
    errors.style.display = "block";
    succes.style.display = "none";
    betalingswijze.style.display = "none";

    error.forEach((err) => {
      const p = document.createElement("p");
      p.textContent = err;
      p.classList.add("my-1");
      errorsP.appendChild(p);
    });
  }

  function LeegOfNiet(field, melding) {
    if (document.getElementById(field)) {
      const x = document.getElementById(field).value;
      if (x == "") {
        error.push(melding);
        return false;
      }
      return true;
    }
    error.push(melding);
    return false;
  }
  function emailCheck(id) {
    if (LeegOfNiet(document.getElementById(id), "Het veld email is vereist")) {
      const emailRegex =
        /^[A-Za-z0-9_][._\-A-Za-z0-9]*@[A-Za-z0-9]+[A-Za-z0-9\.\-]*\.[A-Za-z]+/;
      if (!emailRegex.test(email.value)) {
        error.push("E-mailadres is niet correct");
      }
    }
  }
  function wwCheck(password, HPassword) {
    password = document.getElementById(password);
    HPassword = document.getElementById(HPassword);
    let passwordNietLeeg = LeegOfNiet(
      password,
      "Het veld wachtwoord is vereist!"
    );

    if (password.value.length < 8 && password.value.length !== 0) {
      error.push("Je wachtwoord is te kort");
    }

    let HPasswordNietLeeg = LeegOfNiet(
      HPassword,
      "Het veld herhaal wachtwoord is vereist!"
    );
    if (HPasswordNietLeeg && passwordNietLeeg) {
      if (password.value !== HPassword.value) {
        error.push("Je wachtwoorden komen niet overeen!");
      }
    }
  }

  function gebruikersnaamCheck(input) {
    const patroon = /^[a-zA-Z0-9_.-]*$/;
    const patroon1 = /^[a-zA-Z0-9_]/;
    if (LeegOfNiet(input, "Het veld gebruikersnaam is vereist")) {
      if (!patroon.test(document.getElementById(input))) {
        error.push(
          "De gebruikersnaam mag enkel bestaan uit letters, cijfers, '.', '_', '-'"
        );
      }
      if (!patroon1.test(document.getElementById(input))) {
        error.push(
          "De gebruikersnaam mag niet beginnen met een '.' of een '-'"
        );
      }
      if (input.length < 2) {
        error.push("De gebruikersnaam moet meer dan 1 karakter bevatten");
      }
    }
  }
  function betaalwijzeCheck(Input) {
    const selectedInput = Array.from(Input).find((input) => input.checked);

    if (!selectedInput) {
      error.push("Selecteer een betaal wijze!");
    } else {
      const betaalwijze = selectedInput.value;
      const alert = document.querySelector("#betalingswijze");

      alert.textContent = `je betaalwijze is : ${betaalwijze}.`;
    }
  }

  function postcodeCheck(input) {
    postcode = document.getElementById(input);
    if (LeegOfNiet(postcode, "postcode is vereist!")) {
      const postalCodeValue = Number(postcode.value);

      if (postalCodeValue < 1000 || postalCodeValue > 9999) {
        error.push("Postcode waarde moet tussen de 1000 en 9999 zijn!");
      }
    }
  }
}
