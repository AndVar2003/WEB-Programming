let FormA = [
    {p: "Для отправки заявки, заполните форму:", name: "form"},
    {label: "Фамилия:", type: "text", name: "surname"},
    {label: "Имя:", type: "text", name: "person_name"},
    {label: "Отчество:", type: "text", name: "person_f_name"},
    {label: "Дата доставки:", type: "text", name: "date"},
    {label: "Название издания", type: "text", name: "izd_name"},
    {label: "E-mail для связи:", type: "email", name: "address"},
    {
        label: "Тип издания:",
        type: "select",
        name: "name",
        options: [{value: "1", text: "журнал"}, {value: "2", text: "газета"},
            {value: "3", text: "ежедневник"}],
    },
    {
        label: "Способ оплаты:",
        type: "radio",
        name: "public",
        options: [{value: "1", text: "наличными"}, {value: "2", text: "картой"},
            {value: "3", text: "ЕРИП"}],
    },
    {label: "Комментарии к заказу:", type: "textarea", name: "article"},
    {label: "Подписаться на наши новости:", type: "checkbox", name: "comments", checked: "true"},
    {value: "Отправить", type: "submit"}
];

function formConstruction(arr, form) {
    if (arr) {
        arr.forEach(formInput);
    }

    function formInput(element) {
        if (element.name === "form") {
            let NewTagElement = document.createElement('div');
            let NewTextElement = document.createTextNode(element.p);
            NewTagElement.appendChild(NewTextElement);
            form.appendChild(NewTagElement);
        } else if (element.type === "email" || element.type === "text") {
            let NewTagElement = document.createElement('div');
            let NewLabelElement = document.createElement('label');
            let NewInputElement = document.createElement('input');
            let NewTextElement = document.createTextNode(element.label);
            NewInputElement.type = element.type;
            NewInputElement.name = element.name;
            NewTagElement.className = "field";
            NewLabelElement.appendChild(NewTextElement);
            NewTagElement.appendChild(NewLabelElement);
            NewTagElement.appendChild(NewInputElement);

            if (element.name === "date" || element.name === "izd_name") {
                NewTagElement.style.paddingRight = '212px';
                NewInputElement.style.width = '100px';
            }
            NewInputElement.id = element.name + "_field";
            form.appendChild(NewTagElement);
        } else if (element.type === "select") {
            let NewTagElement = document.createElement('div');
            let NewLabelElement = document.createElement('label');
            let NewTextElement = document.createTextNode(element.label);
            let NewSelectElement = document.createElement('select');
            NewLabelElement.appendChild(NewTextElement);

            for (let i = 0; i < element.options.length; i++) {
                let NewOptionElement = document.createElement('option');
                let NewTextElement = document.createTextNode(element.options[i].text);
                NewOptionElement.value = element.options[i].value;
                NewOptionElement.appendChild(NewTextElement);
                NewSelectElement.appendChild(NewOptionElement);
            }
            NewTagElement.appendChild(NewLabelElement);
            NewTagElement.appendChild(NewSelectElement);
            NewTagElement.className = "field";
            NewTagElement.style.paddingRight = '197px';
            form.appendChild(NewTagElement);
        } else if (element.type === "radio") {
            let NewTagElement = document.createElement('div');
            let NewLabelElement = document.createElement('label');
            let NewTextElement = document.createTextNode(element.label);
            NewLabelElement.appendChild(NewTextElement);
            NewLabelElement.style.paddingRight = '43px';
            NewTagElement.appendChild(NewLabelElement);

            for (let i = 0; i < element.options.length; i++) {
                let NewRadioElement = document.createElement('input');
                let NewLabelRElement = document.createElement('label');
                let NewTextElement = document.createTextNode(element.options[i].text);
                NewRadioElement.value = element.options[i].value;
                NewRadioElement.type = "radio";
                NewRadioElement.name = element.name;
                if (i === 0)
                    NewRadioElement.checked = true;
                NewLabelRElement.appendChild(NewRadioElement);
                NewLabelRElement.appendChild(NewTextElement);
                NewTagElement.appendChild(NewLabelRElement);
            }
            //NewTagElement.lastChild.firstChild.v
            NewTagElement.style.paddingBottom = '25px';
            form.appendChild(NewTagElement);
        } else if (element.type === "checkbox") {
            let NewTagElement = document.createElement('div');
            let NewLabelElement = document.createElement('label');
            let NewTextElement = document.createTextNode(element.label);
            let NewCheckElement = document.createElement('input');
            NewCheckElement.type = element.type;
            NewCheckElement.checked = true;
            NewLabelElement.appendChild(NewTextElement);
            NewTagElement.appendChild(NewCheckElement);
            NewTagElement.appendChild(NewLabelElement);
            NewTagElement.style.clear = "both";
            form.appendChild(NewTagElement);
        } else if (element.type === "textarea") {
            let NewTagElement = document.createElement('div');
            let NewLabelElement = document.createElement('label');
            let NewTextElement = document.createTextNode(element.label);
            let NewTextareaElement = document.createElement('textarea');
            NewLabelElement.appendChild(NewTextElement);
            NewLabelElement.appendChild(NewTextareaElement);
            NewTagElement.appendChild(NewLabelElement);
            NewTagElement.style.width = '200px';
            form.appendChild(NewTagElement);
        } else if (element.type === "submit") {
            let NewTagElement = document.createElement('div');
            let NewInputElement = document.createElement('input');
            NewInputElement.type = element.type;
            NewInputElement.value = element.value;
            NewTagElement.appendChild(NewInputElement);
            NewTagElement.style.clear = "both";
            form.appendChild(NewTagElement);
        }
    }
}

formConstruction(FormA, formBuild);

function validate() {
    let validation_result = true;
    !validate_fields(document.getElementById("surname_field")) ? validation_result = false : null;
    !validate_fields(document.getElementById("person_name_field")) ? validation_result = false : null;
    !validate_fields(document.getElementById("person_f_name_field")) ? validation_result = false : null;
    !validate_fields(document.getElementById("date_field")) ? validation_result = false : null;
    !validate_fields(document.getElementById("izd_name_field")) ? validation_result = false : null;
    !validate_fields(document.getElementById("address_field")) ? validation_result = false : null;
    return validation_result;
}

function validate_fields(element) {
    switch (element.id) {
        case "surname_field":
        case "person_name_field":
        case "person_f_name_field":
            if (element.value === "") {
                if (element.parentNode.lastChild === element)
                    mistake_message(element, '*Заполните поле!*');
                return false;
            } else if (element.parentNode.lastChild !== element)
                delete_mistake_message(element);
            return true;

        case "date_field":
            let arrD = element.value.split(".");
            arrD[1] -= 1;
            let date = new Date(arrD[2], arrD[1], arrD[0]);
            let now = new Date()
            let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).valueOf()
            if ((date.getFullYear() !== parseInt(arrD[2])) || (date.getMonth() !== parseInt(arrD[1]))
                || (date.getDate() !== parseInt(arrD[0])) || date <= today) {
                if (element.parentNode.lastChild === element)
                    mistake_message(element, '*Введите дату формата dd.mm.yyyy!*');
                return false;
            } else if (element.parentNode.lastChild !== element)
                delete_mistake_message(element);
            return true;

        case "izd_name_field":
            if (element.value === "") {
                if (element.parentNode.lastChild === element)
                    mistake_message(element, '*Заполните поле!*');
                return false;
            } else if (element.parentNode.lastChild !== element)
                delete_mistake_message(element);
            return true;

        case "address_field":
            let email = element.value;
            let email_regex = /^.+@.+\..+$/;
            if (!email_regex.test(email) || email.length > 50) {
                if (element.parentNode.lastChild === element)
                    mistake_message(element, '*Введите почту формата name@postname.domen!*');
                return false;
            } else if (element.parentNode.lastChild !== element)
                delete_mistake_message(element);
            return true;
    }

    function mistake_message(element, error) {
        element.parentNode.appendChild(document.createElement('br'));
        let text = document.createTextNode(error);
        let lbl = document.createElement('label')
        lbl.appendChild(text);
        lbl.style.color = 'red';
        lbl.style.float = 'right';
        lbl.style.paddingRight = '0px';
        element.parentNode.appendChild(lbl);
    }

    function delete_mistake_message(element) {
        for (let i = 0; i < 2; i++)
            element.parentNode.lastChild.remove();
    }
}