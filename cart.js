
        // initialisation des ressources pour la validation du formulaire
        const contact = {};
        const products = [];
        // vérification des inputs du formulaire via les REGEX
        validInput = () => {
            const validNumber = /[0-9]/;
            const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const validCharacter = /[§!@#$%^&*().?":{}|<>]/;

            //récupération des inputs
            const firstNameForm = document.getElementById("firstName").value;
            const lastNameForm = document.getElementById("lastName").value;
            const emailForm = document.getElementById("email").value;
            const addressForm = document.getElementById("address").value;
            const cityForm = document.getElementById("city").value;

            //Vérification des champs de saisi du formulaire
            //Test prénom
            if (firstNameForm == "" || validNumber.test(firstName) == true || validCharacter.test(firstNameForm) == true) {
                const feedbackFName = document.getElementById("feedback-firstname");
                feedbackFName.innerHTML = "Un prénom valide est obligatoire";
                feedbackFName.classList.add("text-danger");
            };

            //Test nom
            if (lastNameForm == "" || validNumber.test(firstNameForm) == true || validCharacter.test(lastNameForm) == true) {
                const feedbackLName = document.getElementById("feedback-lastname");
                feedbackLName.innerHTML = "Un nom valide est obligatoire";
                feedbackLName.classList.add("text-danger");
            };

            //Test Email
            if (emailForm == "" || validEmail.test(emailForm) == false) {
                const feedbackEmail = document.getElementById("feedback-email");
                feedbackEmail.innerHTML = "Un email valide est obligatoire";
                feedbackEmail.classList.add("text-danger");
            };

            //Test Adresse
            if (addressForm == "" || validCharacter.test(addressForm) == true) {
                const feedbackAddress = document.getElementById("feedback-address");
                feedbackAddress.innerHTML = "Une adresse valide est obligatoire";
                feedbackAddress.classList.add("text-danger");
            };

            //Test Ville
            if (cityForm == "" || validNumber.test(cityForm) == true || validCharacter.test(cityForm) == true) {
                const feedbackCity = document.getElementById("feedback-city");
                feedbackCity.innerHTML = "Une ville valide est obligatoire";
                feedbackCity.classList.add("text-danger");
            };