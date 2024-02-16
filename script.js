const formData = [
    {
        "id": "c0ac49c5-871e-4c72-a878-251de465e6b4",
        "type": "input",
        "label": "Sample Label",
        "placeholder": "Sample placeholder"
    },
    {
        "id": "146e69c2-1630-4a27-9d0b-f09e463a66e4",
        "type": "select",
        "label": "Sample Label",
        "options": ["Sample Option", "Sample Option", "Sample Option"]
    },
    {
        "id": "45002ecf-85cf-4852-bc46-529f94a758f5",
        "type": "input",
        "label": "Sample Label",
        "placeholder": "Sample Placeholder"
    },
    {
        "id": "680cff8d-c7f9-40be-8767-e3d6ba420952",
        "type": "textarea",
        "label": "Sample Label",
        "placeholder": "Sample Placeholder"
    },
];

const form = document.getElementById('form');
const saveBtn = document.getElementById('save-btn');
const addInputBtn = document.getElementById('add-input-btn');
const addSelectBtn = document.getElementById('add-select-btn');
const addTextareaBtn = document.getElementById('add-textarea-btn');

// Function to render form elements
// Function to render form elements
function renderForm() {
    form.innerHTML = '';
    formData.forEach(item => {
        const div = document.createElement('div');
        const div2 = document.createElement('div');
        div2.classList.add('div2');
        div.classList.add('form-element');
        div.setAttribute('draggable', true); //  draggable attribute
        div.setAttribute('data-id', item.id); //  data-id attribute to identify elements
        let inputElement;
        if (item.type === 'input' || item.type === 'textarea') {
            inputElement = document.createElement(item.type);
            inputElement.setAttribute('placeholder', item.placeholder);
        } else if (item.type === 'select') {
            inputElement = document.createElement('select');
            item.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.textContent = option;
                inputElement.appendChild(optionElement);
            });
        }
        const label = document.createElement('label');
        label.textContent = item.type.toUpperCase();

        // delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `<img src='images/del.png' height='12px'/>`;
        deleteBtn.addEventListener('click', () => deleteElement(item.id));

        div2.appendChild(label);
        div2.appendChild(deleteBtn);
        div.appendChild(div2);
        div.appendChild(inputElement); 
        form.appendChild(div);
    });
}


// Function to save form data
function saveFormData() {
    console.log(JSON.stringify(formData, null, 2));
}

// Function to delete form element
function deleteElement(id) {
    const index = formData.findIndex(item => item.id === id);
    if (index !== -1) {
        formData.splice(index, 1);
        renderForm();
    }
}

// Function to add new input element
function addInput() {
    const newInput = {
        "id": generateUUID(),
        "type": "input",
        "label": "New Input",
        "placeholder": "Enter text"
    };
    formData.push(newInput);
    renderForm();
}

// Function to add new select element
function addSelect() {
    const newSelect = {
        "id": generateUUID(),
        "type": "select",
        "label": "New Select",
        "options": ["Option 1", "Option 2", "Option 3"]
    };
    formData.push(newSelect);
    renderForm();
}

// Function to add new textarea element
function addTextarea() {
    const newTextarea = {
        "id": generateUUID(),
        "type": "textarea",
        "label": "New Textarea",
        "placeholder": "Enter text"
    };
    formData.push(newTextarea);
    renderForm();
}

// Event listener for save button
saveBtn.addEventListener('click', saveFormData);

// Event listener for add input button
addInputBtn.addEventListener('click', addInput);

// Event listener for add select button
addSelectBtn.addEventListener('click', addSelect);

// Event listener for add textarea button
addTextareaBtn.addEventListener('click', addTextarea);

// Initial render
renderForm();

// Drag and Drop Functionality
let dragged;

form.addEventListener('dragstart', function(event) {
  dragged = event.target.closest('.form-element');
  event.dataTransfer.setData('text/html', dragged.outerHTML);
  event.target.style.opacity = 0.5;
});

form.addEventListener('dragover', function(event) {
  event.preventDefault();
  const closestElement = getClosestElement(event.clientY);
  if (closestElement) {
    form.insertBefore(dragged, closestElement);
  } else {
    form.appendChild(dragged);
  }
});

form.addEventListener('dragend', function(event) {
  event.target.style.opacity = '';
});

function getClosestElement(y) {
  const elements = Array.from(form.children);
  return elements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Function to generate UUID
function generateUUID() { 
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
